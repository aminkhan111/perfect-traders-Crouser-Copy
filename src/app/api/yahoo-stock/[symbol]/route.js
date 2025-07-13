import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { symbol } = params;

  if (!symbol) {
    return NextResponse.json(
      { error: 'Stock symbol is required' },
      { status: 400 }
    );
  }

  try {
    console.log(`Fetching Yahoo Finance data for symbol: ${symbol}`);
    
    // Yahoo Finance symbol formats for Indian stocks
    const symbolFormats = [
      `${symbol}.NS`,    // NSE format (e.g., RELIANCE.NS)
      `${symbol}.BO`,    // BSE format (e.g., RELIANCE.BO)
      symbol,            // Original symbol
    ];

    let lastError = null;
    
    for (const symbolFormat of symbolFormats) {
      try {
        // Yahoo Finance API endpoint
        const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbolFormat}`;
        
        console.log(`Trying Yahoo Finance: ${yahooUrl}`);
        
        const response = await fetch(yahooUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json',
          },
        });

        console.log(`Yahoo Finance Response Status for ${symbolFormat}: ${response.status}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`Yahoo Finance Success Data for ${symbolFormat}:`, JSON.stringify(data, null, 2));
          
          // Extract data from Yahoo Finance response
          const chart = data?.chart?.result?.[0];
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
              source: 'yahoo',
              success: true,
              symbolFormat: symbolFormat,
              marketState: meta.marketState,
              currency: meta.currency,
              exchange: meta.exchangeName,
              rawData: data // Include raw data for debugging
            };

            console.log(`SUCCESS: Returning Yahoo Finance data for ${symbolFormat}:`, normalizedData);
            return NextResponse.json(normalizedData);
          } else {
            console.log(`Invalid data structure from Yahoo Finance for ${symbolFormat}:`, data);
            lastError = new Error(`Invalid data structure from Yahoo Finance for ${symbolFormat}`);
          }
        } else {
          const errorText = await response.text();
          console.log(`Yahoo Finance Error for ${symbolFormat}: ${response.status} - ${errorText}`);
          lastError = new Error(`Yahoo Finance error for ${symbolFormat}: ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.log(`Error with Yahoo Finance symbol format ${symbolFormat}:`, error.message);
        lastError = error;
        continue; // Try next format
      }
    }

    // If we get here, all symbol formats failed
    console.log(`All Yahoo Finance symbol formats failed for ${symbol}. Last error:`, lastError?.message);
    throw lastError || new Error(`All symbol formats failed for ${symbol}`);

  } catch (error) {
    console.error(`Yahoo Finance API route error for ${symbol}:`, error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch stock data from Yahoo Finance',
        details: error.message,
        symbol: symbol,
        source: 'yahoo-error',
        timestamp: Date.now()
      },
      { status: 500 }
    );
  }
}
