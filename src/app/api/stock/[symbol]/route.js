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
    // Try different Finage API endpoints
    const endpoints = [
      `https://api.finage.co.uk/last/stock/${symbol}?apikey=${apiKey}`,
      `https://api.finage.co.uk/last/stock/${symbol}.NSE?apikey=${apiKey}`,
      `https://api.finage.co.uk/last/stock/${symbol}.BSE?apikey=${apiKey}`,
    ];

    let lastError = null;
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'PerfectTraders/1.0',
          },
        });

        console.log(`Response status: ${response.status}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`Success data:`, data);
          
          // Normalize the response data
          const normalizedData = {
            symbol: data.symbol || symbol,
            price: data.price || data.c || data.close || 0,
            change: data.change || data.d || 0,
            changePercent: data.changePercent || data.dp || 0,
            volume: data.volume || data.v || 0,
            timestamp: data.timestamp || Date.now(),
            source: 'finage',
            endpoint: endpoint
          };

          return NextResponse.json(normalizedData);
        } else {
          const errorText = await response.text();
          console.log(`Error response: ${response.status} - ${errorText}`);
          lastError = new Error(`HTTP ${response.status}: ${errorText}`);
        }
      } catch (error) {
        console.log(`Endpoint failed: ${endpoint} - ${error.message}`);
        lastError = error;
        continue;
      }
    }

    // If all endpoints failed, try a mock response for testing
    console.log('All Finage endpoints failed, returning mock data');
    
    const mockData = {
      symbol: symbol,
      price: Math.random() * 3000 + 500,
      change: (Math.random() - 0.5) * 100,
      changePercent: (Math.random() - 0.5) * 5,
      volume: Math.floor(Math.random() * 5000000) + 100000,
      timestamp: Date.now(),
      source: 'mock',
      note: 'Mock data - Finage API endpoints failed'
    };

    return NextResponse.json(mockData);

  } catch (error) {
    console.error('API route error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch stock data',
        details: error.message,
        symbol: symbol
      },
      { status: 500 }
    );
  }
}
