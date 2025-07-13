import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { symbol } = params;
  const apiKey = process.env.NEXT_PUBLIC_FINAGE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Finage API key not configured' },
      { status: 500 }
    );
  }

  if (!symbol) {
    return NextResponse.json(
      { error: 'Stock symbol is required' },
      { status: 400 }
    );
  }

  try {
    // Try different symbol formats for Indian stocks
    console.log(`Fetching data for symbol: ${symbol}`);
    console.log(`Using API key: ${apiKey.substring(0, 10)}...`);

    // Different symbol formats to try for Indian stocks
    const symbolFormats = [
      symbol,                    // Original symbol (e.g., SBIN)
      `${symbol}.NSE`,          // NSE format (e.g., SBIN.NSE)
      `${symbol}.BSE`,          // BSE format (e.g., SBIN.BSE)
      `NSE:${symbol}`,          // Alternative NSE format
      `BSE:${symbol}`,          // Alternative BSE format
    ];

    let lastError = null;

    for (const symbolFormat of symbolFormats) {
      try {
        const finageUrl = `https://api.finage.co.uk/last/stock/${symbolFormat}?apikey=${apiKey}`;
        console.log(`Trying symbol format: ${symbolFormat}`);
        console.log(`Calling Finage API: ${finageUrl}`);

        const response = await fetch(finageUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'PerfectTraders/1.0',
          },
        });

        console.log(`Finage API Response Status for ${symbolFormat}: ${response.status}`);

        if (response.ok) {
          const data = await response.json();
          console.log(`Finage API Success Data for ${symbolFormat}:`, JSON.stringify(data, null, 2));

          // Check if we got valid data
          if (data && (data.price || data.c || data.close)) {
            const price = parseFloat(data.price || data.c || data.close || 0);
            const change = parseFloat(data.change || data.d || 0);
            const changePercent = parseFloat(data.changePercent || data.dp || 0);
            const volume = parseInt(data.volume || data.v || 0);

            const normalizedData = {
              symbol: data.symbol || symbol,
              price: price,
              change: change,
              changePercent: changePercent,
              volume: volume,
              timestamp: Date.now(),
              source: 'finage',
              success: true,
              symbolFormat: symbolFormat, // Show which format worked
              rawData: data // Include raw data for debugging
            };

            console.log(`SUCCESS: Returning normalized data for ${symbolFormat}:`, normalizedData);
            return NextResponse.json(normalizedData);
          } else {
            console.log(`Invalid data structure from Finage for ${symbolFormat}:`, data);
            lastError = new Error(`Invalid data structure from Finage API for ${symbolFormat}`);
          }
        } else {
          const errorText = await response.text();
          console.log(`Finage API Error for ${symbolFormat}: ${response.status} - ${errorText}`);

          if (response.status === 401) {
            lastError = new Error('Invalid API key - Please check your Finage API key');
            break; // Don't try other formats if API key is invalid
          } else if (response.status === 429) {
            lastError = new Error('Rate limit exceeded - Please wait before making more requests');
            break; // Don't try other formats if rate limited
          } else {
            lastError = new Error(`Finage API error for ${symbolFormat}: ${response.status} - ${errorText}`);
          }
        }
      } catch (error) {
        console.log(`Error with symbol format ${symbolFormat}:`, error.message);
        lastError = error;
        continue; // Try next format
      }
    }

    // If Finage failed, try Yahoo Finance as fallback
    console.log(`All Finage symbol formats failed for ${symbol}. Trying Yahoo Finance fallback...`);

    try {
      // Try Yahoo Finance directly
      const yahooSymbolFormats = [`${symbol}.NS`, `${symbol}.BO`, symbol];

      for (const yahooSymbol of yahooSymbolFormats) {
        try {
          const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}`;
          console.log(`Trying Yahoo Finance: ${yahooUrl}`);

          const yahooResponse = await fetch(yahooUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
              'Accept': 'application/json',
            },
          });

          if (yahooResponse.ok) {
            const yahooData = await yahooResponse.json();
            const chart = yahooData?.chart?.result?.[0];

            if (chart && chart.meta) {
              const meta = chart.meta;
              const currentPrice = meta.regularMarketPrice || meta.previousClose || 0;
              const previousClose = meta.previousClose || currentPrice;
              const change = currentPrice - previousClose;
              const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0;

              const normalizedData = {
                symbol: meta.symbol || symbol,
                price: parseFloat(currentPrice),
                change: parseFloat(change),
                changePercent: parseFloat(changePercent),
                volume: parseInt(meta.regularMarketVolume || 0),
                timestamp: Date.now(),
                source: 'yahoo-fallback',
                success: true,
                symbolFormat: yahooSymbol,
                note: 'Finage API failed, using Yahoo Finance as fallback'
              };

              console.log(`Yahoo Finance fallback SUCCESS for ${yahooSymbol}:`, normalizedData);
              return NextResponse.json(normalizedData);
            }
          }
        } catch (yahooError) {
          console.log(`Yahoo Finance format ${yahooSymbol} failed:`, yahooError.message);
          continue;
        }
      }

      console.log(`Yahoo Finance fallback also failed for all formats`);
    } catch (yahooError) {
      console.log(`Yahoo Finance fallback error for ${symbol}:`, yahooError.message);
    }

    // If both APIs failed
    throw lastError || new Error(`Both Finage and Yahoo Finance failed for ${symbol}`);

  } catch (error) {
    console.error(`API route error for ${symbol}:`, error);

    // Return error instead of mock data - we want to know when API fails
    return NextResponse.json(
      {
        error: 'Failed to fetch real-time stock data',
        details: error.message,
        symbol: symbol,
        source: 'error',
        timestamp: Date.now()
      },
      { status: 500 }
    );
  }
}
