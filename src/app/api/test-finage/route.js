import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_FINAGE_API_KEY;

  console.log('=== FINAGE API TEST START ===');
  console.log('Environment variables check:');
  console.log('NEXT_PUBLIC_FINAGE_API_KEY exists:', !!apiKey);
  console.log('API Key length:', apiKey?.length);
  console.log('API Key preview:', apiKey ? `${apiKey.substring(0, 15)}...${apiKey.substring(apiKey.length - 5)}` : 'NOT FOUND');

  if (!apiKey) {
    return NextResponse.json({
      error: 'Finage API key not configured',
      envCheck: 'NEXT_PUBLIC_FINAGE_API_KEY not found',
      allEnvVars: Object.keys(process.env).filter(key => key.includes('FINAGE') || key.includes('API'))
    }, { status: 500 });
  }

  try {
    console.log('Testing Finage API...');
    console.log(`API Key: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}`);

    // First, test basic API connectivity
    console.log('=== TESTING BASIC API CONNECTIVITY ===');

    // Test 1: Basic API endpoint without stock symbol
    try {
      const basicUrl = `https://api.finage.co.uk?apikey=${apiKey}`;
      console.log(`Testing basic connectivity: ${basicUrl}`);

      const basicResponse = await fetch(basicUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'PerfectTraders/1.0',
        },
      });

      console.log(`Basic API Status: ${basicResponse.status}`);
      const basicText = await basicResponse.text();
      console.log(`Basic API Response: ${basicText}`);
    } catch (error) {
      console.log(`Basic API Error: ${error.message}`);
    }

    // Test 2: Try different base URLs and endpoints
    const baseUrls = [
      'https://api.finage.co.uk',
      'https://api.finage.co.in',
      'https://finage.co.uk/api',
    ];

    const endpoints = [
      '/last/stock/AAPL',
      '/stock/last/AAPL',
      '/v1/last/stock/AAPL',
      '/api/v1/last/stock/AAPL'
    ];

    console.log('=== TESTING DIFFERENT API ENDPOINTS ===');
    const testResults = [];

    for (const baseUrl of baseUrls) {
      for (const endpoint of endpoints) {
        const testUrl = `${baseUrl}${endpoint}?apikey=${apiKey}`;

        try {
          console.log(`Testing: ${testUrl}`);

          const response = await fetch(testUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'PerfectTraders/1.0',
            },
            timeout: 10000 // 10 second timeout
          });

          const responseText = await response.text();
          console.log(`Status: ${response.status}, Response: ${responseText.substring(0, 200)}...`);

          let data;
          try {
            data = JSON.parse(responseText);
          } catch (parseError) {
            data = { parseError: parseError.message, rawText: responseText.substring(0, 500) };
          }

          testResults.push({
            baseUrl,
            endpoint,
            fullUrl: testUrl,
            status: response.status,
            success: response.ok,
            data: data,
            headers: Object.fromEntries(response.headers.entries())
          });

          // If we found a working endpoint, note it
          if (response.ok) {
            console.log(`✅ WORKING ENDPOINT FOUND: ${testUrl}`);
          }

        } catch (error) {
          console.log(`❌ Error with ${testUrl}: ${error.message}`);
          testResults.push({
            baseUrl,
            endpoint,
            fullUrl: testUrl,
            error: error.message,
            success: false
          });
        }
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
