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

    // Fetch data for all symbols
    const results = await Promise.allSettled(
      symbols.map(async (symbol) => {
        // Try different endpoints for each symbol
        const endpoints = [
          `https://api.finage.co.uk/last/stock/${symbol}?apikey=${apiKey}`,
          `https://api.finage.co.uk/last/stock/${symbol}.NSE?apikey=${apiKey}`,
          `https://api.finage.co.uk/last/stock/${symbol}.BSE?apikey=${apiKey}`,
        ];

        for (const endpoint of endpoints) {
          try {
            const response = await fetch(endpoint, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'PerfectTraders/1.0',
              },
            });

            if (response.ok) {
              const data = await response.json();
              
              return {
                symbol: data.symbol || symbol,
                price: data.price || data.c || data.close || 0,
                change: data.change || data.d || 0,
                changePercent: data.changePercent || data.dp || 0,
                volume: data.volume || data.v || 0,
                timestamp: data.timestamp || Date.now(),
                source: 'finage',
                success: true
              };
            }
          } catch (error) {
            console.log(`Endpoint failed for ${symbol}: ${endpoint}`);
            continue;
          }
        }

        // If all endpoints failed, return mock data
        return {
          symbol: symbol,
          price: Math.random() * 3000 + 500,
          change: (Math.random() - 0.5) * 100,
          changePercent: (Math.random() - 0.5) * 5,
          volume: Math.floor(Math.random() * 5000000) + 100000,
          timestamp: Date.now(),
          source: 'mock',
          success: false,
          note: 'Using mock data - API endpoints failed'
        };
      })
    );

    // Process results
    const stockData = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        // Return mock data for failed requests
        return {
          symbol: symbols[index],
          price: Math.random() * 3000 + 500,
          change: (Math.random() - 0.5) * 100,
          changePercent: (Math.random() - 0.5) * 5,
          volume: Math.floor(Math.random() * 5000000) + 100000,
          timestamp: Date.now(),
          source: 'mock',
          success: false,
          error: result.reason?.message || 'Unknown error'
        };
      }
    });

    return NextResponse.json({
      success: true,
      data: stockData,
      timestamp: Date.now(),
      count: stockData.length
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
