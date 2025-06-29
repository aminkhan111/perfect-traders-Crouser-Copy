import { NextRequest, NextResponse } from 'next/server';
import { addStockToWatchlist, verifyPasscode } from '@/lib/kv';
import { fetchIndianStockQuote, convertToStockData } from '@/lib/yahoo-finance-india';

// POST - Add stock to shared watchlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stockData, passcode, userAgent } = body;
    
    console.log(`🔐 API: Verifying passcode for adding ${stockData?.symbol}...`);
    
    // Verify passcode
    if (!verifyPasscode(passcode)) {
      console.log('❌ API: Invalid passcode provided');
      return NextResponse.json(
        { success: false, message: 'Invalid passcode. Only authorized users can add stocks.' },
        { status: 401 }
      );
    }
    
    console.log('✅ API: Passcode verified successfully');
    
    // Validate required fields
    if (!stockData || !stockData.symbol) {
      console.log('❌ API: Missing stock symbol');
      return NextResponse.json(
        { success: false, message: 'Stock symbol is required' },
        { status: 400 }
      );
    }
    
    let finalStockData = stockData;
    
    // Try to fetch real-time data
    try {
      console.log(`📡 API: Fetching real-time data for ${stockData.symbol}...`);
      const quote = await fetchIndianStockQuote(stockData.symbol);
      
      if (quote) {
        finalStockData = convertToStockData(quote);
        console.log(`✅ API: Got real-time data for ${stockData.symbol} - Price: ₹${finalStockData.ltp}`);
      } else {
        console.log(`⚠️ API: No real-time data available for ${stockData.symbol}, using provided data`);
      }
    } catch (error) {
      console.log(`⚠️ API: Real-time data fetch failed for ${stockData.symbol}, using provided data`);
    }
    
    // Add to shared watchlist
    console.log(`💾 API: Adding ${stockData.symbol} to shared watchlist...`);
    const result = await addStockToWatchlist(finalStockData, userAgent || 'web-user');
    
    if (result.success) {
      console.log(`🎉 API: Successfully added ${stockData.symbol} to shared watchlist`);
      return NextResponse.json({
        success: true,
        message: `🎉 ${stockData.symbol} has been added to the SHARED watchlist! Everyone can now see this stock.`,
        data: finalStockData
      });
    } else {
      console.log(`❌ API: Failed to add ${stockData.symbol}: ${result.message}`);
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error occurred while adding stock',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
