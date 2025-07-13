import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_FINAGE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      error: 'Finage API key not configured',
      envCheck: 'NEXT_PUBLIC_FINAGE_API_KEY not found'
    }, { status: 500 });
  }

  try {
    console.log('Testing Finage API...');
    console.log(`API Key: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}`);
    
    // Test with a simple stock symbol
    const testSymbol = 'RELIANCE';
    const testUrl = `https://api.finage.co.uk/last/stock/${testSymbol}?apikey=${apiKey}`;
    
    console.log(`Test URL: ${testUrl}`);
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'PerfectTraders/1.0',
      },
    });

    console.log(`Response Status: ${response.status}`);
    console.log(`Response Headers:`, Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log(`Response Text: ${responseText}`);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      return NextResponse.json({
        error: 'Failed to parse JSON response',
        status: response.status,
        responseText: responseText,
        parseError: parseError.message
      });
    }

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      apiKey: `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}`,
      testSymbol: testSymbol,
      testUrl: testUrl,
      responseData: data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Test API error:', error);
    
    return NextResponse.json({
      error: 'Test failed',
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
