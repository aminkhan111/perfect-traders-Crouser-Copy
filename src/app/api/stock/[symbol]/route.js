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

    // If we get here, all symbol formats failed
    console.log(`All symbol formats failed for ${symbol}. Last error:`, lastError?.message);
    throw lastError || new Error(`All symbol formats failed for ${symbol}`);

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
