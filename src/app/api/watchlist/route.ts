import { NextRequest, NextResponse } from 'next/server';
import { getSharedWatchlist } from '@/lib/kv';

// GET - Fetch shared watchlist
export async function GET() {
  try {
    console.log('📡 API: Fetching shared watchlist...');
    const watchlist = await getSharedWatchlist();
    
    console.log(`✅ API: Retrieved ${watchlist.stocks.length} stocks from shared watchlist`);
    
    return NextResponse.json({
      success: true,
      data: watchlist,
      message: `Retrieved ${watchlist.stocks.length} stocks`
    });
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch watchlist',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
