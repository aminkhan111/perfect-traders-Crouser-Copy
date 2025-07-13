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
    // First, let's try the correct Finage API format for Indian stocks
    console.log(`Fetching data for symbol: ${symbol}`);
    console.log(`Using API key: ${apiKey.substring(0, 10)}...`);

    // Correct Finage API endpoint for Indian stocks
    const finageUrl = `https://api.finage.co.uk/last/stock/${symbol}?apikey=${apiKey}`;

    console.log(`Calling Finage API: ${finageUrl}`);

    const response = await fetch(finageUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'PerfectTraders/1.0',
      },
    });

    console.log(`Finage API Response Status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`Finage API Success Data:`, JSON.stringify(data, null, 2));

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
          rawData: data // Include raw data for debugging
        };

        console.log(`Returning normalized data:`, normalizedData);
        return NextResponse.json(normalizedData);
      } else {
        console.log(`Invalid data structure from Finage:`, data);
        throw new Error('Invalid data structure from Finage API');
      }
    } else {
      const errorText = await response.text();
      console.log(`Finage API Error: ${response.status} - ${errorText}`);

      if (response.status === 401) {
        throw new Error('Invalid API key - Please check your Finage API key');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded - Please wait before making more requests');
      } else if (response.status === 404) {
        throw new Error(`Stock symbol ${symbol} not found`);
      } else {
        throw new Error(`Finage API error: ${response.status} - ${errorText}`);
      }
    }

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
