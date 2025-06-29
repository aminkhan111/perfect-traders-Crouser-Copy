import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export async function GET() {
  try {
    console.log('🧪 Testing Redis connection...');
    console.log('Environment variables:');
    console.log('UPSTASH_REDIS_REST_URL:', process.env.UPSTASH_REDIS_REST_URL ? 'Set' : 'Missing');
    console.log('UPSTASH_REDIS_REST_TOKEN:', process.env.UPSTASH_REDIS_REST_TOKEN ? 'Set' : 'Missing');
    
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({
        success: false,
        message: 'Missing Upstash environment variables',
        debug: {
          url: process.env.UPSTASH_REDIS_REST_URL ? 'Set' : 'Missing',
          token: process.env.UPSTASH_REDIS_REST_TOKEN ? 'Set' : 'Missing'
        }
      }, { status: 500 });
    }

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // Test basic connection
    await redis.set('test-key', 'test-value');
    const testValue = await redis.get('test-key');
    
    // Test watchlist key
    const watchlistData = await redis.get('shared-watchlist');
    
    return NextResponse.json({
      success: true,
      message: 'Redis connection successful',
      debug: {
        testValue,
        watchlistExists: !!watchlistData,
        watchlistData: watchlistData
      }
    });
  } catch (error) {
    console.error('❌ Redis test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Redis connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
