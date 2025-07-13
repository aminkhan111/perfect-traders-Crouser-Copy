import { NextResponse } from 'next/server';

export async function GET() {
  console.log('=== TESTING ALTERNATIVE STOCK APIs ===');
  
  const testResults = [];
  
  // Test 1: Alpha Vantage (Free tier available)
  try {
    console.log('Testing Alpha Vantage API...');
    const alphaUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=RELIANCE.BSE&apikey=demo';
    
    const alphaResponse = await fetch(alphaUrl);
    const alphaData = await alphaResponse.json();
    
    testResults.push({
      provider: 'Alpha Vantage',
      url: alphaUrl,
      status: alphaResponse.status,
      success: alphaResponse.ok,
      data: alphaData,
      note: 'Free tier: 5 requests/minute, 500/day'
    });
    
    console.log('Alpha Vantage result:', alphaData);
  } catch (error) {
    testResults.push({
      provider: 'Alpha Vantage',
      error: error.message,
      success: false
    });
  }

  // Test 2: Yahoo Finance (Unofficial but free)
  try {
    console.log('Testing Yahoo Finance API...');
    const yahooUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/RELIANCE.NS';
    
    const yahooResponse = await fetch(yahooUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const yahooData = await yahooResponse.json();
    
    testResults.push({
      provider: 'Yahoo Finance',
      url: yahooUrl,
      status: yahooResponse.status,
      success: yahooResponse.ok,
      data: yahooData,
      note: 'Free but unofficial, may have rate limits'
    });
    
    console.log('Yahoo Finance result:', yahooData);
  } catch (error) {
    testResults.push({
      provider: 'Yahoo Finance',
      error: error.message,
      success: false
    });
  }

  // Test 3: Twelve Data (Free tier)
  try {
    console.log('Testing Twelve Data API...');
    const twelveUrl = 'https://api.twelvedata.com/quote?symbol=RELIANCE&exchange=NSE&apikey=demo';
    
    const twelveResponse = await fetch(twelveUrl);
    const twelveData = await twelveResponse.json();
    
    testResults.push({
      provider: 'Twelve Data',
      url: twelveUrl,
      status: twelveResponse.status,
      success: twelveResponse.ok,
      data: twelveData,
      note: 'Free tier: 800 requests/day'
    });
    
    console.log('Twelve Data result:', twelveData);
  } catch (error) {
    testResults.push({
      provider: 'Twelve Data',
      error: error.message,
      success: false
    });
  }

  // Test 4: Polygon.io (Free tier)
  try {
    console.log('Testing Polygon.io API...');
    const polygonUrl = 'https://api.polygon.io/v2/last/trade/RELIANCE?apikey=demo';
    
    const polygonResponse = await fetch(polygonUrl);
    const polygonData = await polygonResponse.json();
    
    testResults.push({
      provider: 'Polygon.io',
      url: polygonUrl,
      status: polygonResponse.status,
      success: polygonResponse.ok,
      data: polygonData,
      note: 'Free tier: 5 requests/minute'
    });
    
    console.log('Polygon.io result:', polygonData);
  } catch (error) {
    testResults.push({
      provider: 'Polygon.io',
      error: error.message,
      success: false
    });
  }

  // Test 5: IEX Cloud (Free tier)
  try {
    console.log('Testing IEX Cloud API...');
    const iexUrl = 'https://cloud.iexapis.com/stable/stock/RELIANCE/quote?token=demo';
    
    const iexResponse = await fetch(iexUrl);
    const iexData = await iexResponse.json();
    
    testResults.push({
      provider: 'IEX Cloud',
      url: iexUrl,
      status: iexResponse.status,
      success: iexResponse.ok,
      data: iexData,
      note: 'Free tier: 500,000 requests/month'
    });
    
    console.log('IEX Cloud result:', iexData);
  } catch (error) {
    testResults.push({
      provider: 'IEX Cloud',
      error: error.message,
      success: false
    });
  }

  return NextResponse.json({
    message: 'Alternative API test results',
    workingProviders: testResults.filter(r => r.success),
    failedProviders: testResults.filter(r => !r.success),
    allResults: testResults,
    recommendations: [
      'Yahoo Finance: Free, good Indian stock coverage, but unofficial',
      'Alpha Vantage: Official API, free tier, good for basic needs',
      'Twelve Data: Good free tier, supports Indian exchanges',
      'Consider switching from Finage if it continues to fail'
    ],
    timestamp: new Date().toISOString()
  });
}
