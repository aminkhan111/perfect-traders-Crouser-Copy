import { NextResponse } from 'next/server';

export async function POST(request) {
  const apiKey = process.env.NEXT_PUBLIC_FINAGE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Finage API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { symbols } = await request.json();

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return NextResponse.json(
        { error: 'Symbols array is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching data for symbols: ${symbols.join(', ')}`);

    // Fetch data for all symbols using individual API calls with multiple format attempts
    const results = await Promise.allSettled(
      symbols.map(async (symbol) => {
        console.log(`Fetching batch data for: ${symbol}`);

        // Try different symbol formats
        const symbolFormats = [
          symbol,
          `${symbol}.NSE`,
          `${symbol}.BSE`,
          `NSE:${symbol}`,
          `BSE:${symbol}`,
        ];

        for (const symbolFormat of symbolFormats) {
          try {
            const finageUrl = `https://api.finage.co.uk/last/stock/${symbolFormat}?apikey=${apiKey}`;
            console.log(`Batch trying format: ${symbolFormat}`);

            const response = await fetch(finageUrl, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'PerfectTraders/1.0',
              },
            });

            if (response.ok) {
              const data = await response.json();
              console.log(`Batch success for ${symbolFormat}:`, data);

              if (data && (data.price || data.c || data.close)) {
                return {
                  symbol: data.symbol || symbol,
                  price: parseFloat(data.price || data.c || data.close || 0),
                  change: parseFloat(data.change || data.d || 0),
                  changePercent: parseFloat(data.changePercent || data.dp || 0),
                  volume: parseInt(data.volume || data.v || 0),
                  timestamp: Date.now(),
                  source: 'finage',
                  success: true,
                  symbolFormat: symbolFormat
                };
              }
            } else {
              const errorText = await response.text();
              console.log(`Batch error for ${symbolFormat}: ${response.status} - ${errorText}`);

              // If it's an auth or rate limit error, don't try other formats
              if (response.status === 401 || response.status === 429) {
                throw new Error(`HTTP ${response.status}: ${errorText}`);
              }
              // Continue to next format for other errors
            }
          } catch (error) {
            console.log(`Batch format ${symbolFormat} failed:`, error.message);
            // If it's a critical error, stop trying
            if (error.message.includes('401') || error.message.includes('429')) {
              throw error;
            }
            // Continue to next format
          }
        }

        // If all formats failed
        throw new Error(`All symbol formats failed for ${symbol}`);
      })
    );

    // Process results - only return successful ones
    const stockData = [];
    const errors = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        stockData.push(result.value);
      } else {
        errors.push({
          symbol: symbols[index],
          error: result.reason?.message || 'Unknown error'
        });
        console.error(`Failed to fetch ${symbols[index]}:`, result.reason);
      }
    });

    return NextResponse.json({
      success: stockData.length > 0,
      data: stockData,
      errors: errors,
      timestamp: Date.now(),
      successCount: stockData.length,
      errorCount: errors.length,
      totalRequested: symbols.length
    });

  } catch (error) {
    console.error('Batch API route error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch batch stock data',
        details: error.message
      },
      { status: 500 }
    );
  }
}
