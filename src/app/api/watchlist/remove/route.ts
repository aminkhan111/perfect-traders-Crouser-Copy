import { NextRequest, NextResponse } from 'next/server';
import { removeStockFromWatchlist, verifyPasscode } from '@/lib/kv';

// DELETE - Remove stock from shared watchlist
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol, passcode } = body;
    
    console.log(`🔐 API: Verifying passcode for removing ${symbol}...`);
    
    // Verify passcode
    if (!verifyPasscode(passcode)) {
      console.log('❌ API: Invalid passcode provided for removal');
      return NextResponse.json(
        { success: false, message: 'Invalid passcode. Only authorized users can remove stocks from the shared watchlist.' },
        { status: 401 }
      );
    }
    
    console.log('✅ API: Passcode verified for removal');
    
    // Validate required fields
    if (!symbol) {
      console.log('❌ API: Missing stock symbol for removal');
      return NextResponse.json(
        { success: false, message: 'Stock symbol is required' },
        { status: 400 }
      );
    }
    
    // Remove from shared watchlist
    console.log(`🗑️ API: Removing ${symbol} from shared watchlist...`);
    const result = await removeStockFromWatchlist(symbol);
    
    if (result.success) {
      console.log(`✅ API: Successfully removed ${symbol} from shared watchlist`);
      return NextResponse.json({
        success: true,
        message: `✅ ${symbol} has been removed from the shared watchlist.`
      });
    } else {
      console.log(`❌ API: Failed to remove ${symbol}: ${result.message}`);
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
        message: 'Server error occurred while removing stock',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
