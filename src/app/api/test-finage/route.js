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

    // Test with different symbol formats
    const testSymbols = ['RELIANCE', 'RELIANCE.NSE', 'NSE:RELIANCE', 'SBIN', 'SBIN.NSE'];
    const testResults = [];

    for (const testSymbol of testSymbols) {
      const testUrl = `https://api.finage.co.uk/last/stock/${testSymbol}?apikey=${apiKey}`;

      console.log(`Testing symbol: ${testSymbol}`);
      console.log(`Test URL: ${testUrl}`);

      try {
        const response = await fetch(testUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'PerfectTraders/1.0',
          },
        });

        console.log(`Response Status for ${testSymbol}: ${response.status}`);

        const responseText = await response.text();
        console.log(`Response Text for ${testSymbol}: ${responseText}`);

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          data = { parseError: parseError.message, rawText: responseText };
        }

        testResults.push({
          symbol: testSymbol,
          url: testUrl,
          status: response.status,
          success: response.ok,
          data: data,
          headers: Object.fromEntries(response.headers.entries())
        });

        // If we found a working format, we can stop
        if (response.ok && data && (data.price || data.c || data.close)) {
          console.log(`Found working format: ${testSymbol}`);
          break;
        }
      } catch (error) {
        testResults.push({
          symbol: testSymbol,
          url: testUrl,
          error: error.message,
          success: false
        });
      }
    }

    return NextResponse.json({
      apiKey: `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}`,
      testResults: testResults,
      workingFormats: testResults.filter(r => r.success),
      failedFormats: testResults.filter(r => !r.success),
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
