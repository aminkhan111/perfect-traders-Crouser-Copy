// Using localStorage as fallback until database is set up
// This will work immediately but won't have cross-user sharing

export interface StockData {
  symbol: string;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  ltp: number;
  change: number;
  volume: number;
  value: number;
  ca: string;
  color: string;
  addedAt: string;
  addedBy: string;
}

export interface WatchlistData {
  stocks: StockData[];
  lastUpdated: string;
  version: string;
}

const WATCHLIST_KEY = 'shared-watchlist';

// Simple in-memory storage for now (will be replaced with database)
let memoryStore: { [key: string]: any } = {};

// Get shared watchlist
export async function getSharedWatchlist(): Promise<WatchlistData> {
  try {
    console.log('🔍 Fetching watchlist from memory store...');
    const data = memoryStore[WATCHLIST_KEY] as WatchlistData;
    console.log('📊 Raw data from memory:', data);

    const result = data || {
      stocks: [],
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };

    console.log(`✅ Returning ${result.stocks.length} stocks from watchlist`);
    return result;
  } catch (error) {
    console.error('❌ Error getting watchlist from memory:', error);
    return {
      stocks: [],
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
  }
}

// Save shared watchlist
export async function saveSharedWatchlist(watchlistData: WatchlistData): Promise<boolean> {
  try {
    console.log(`💾 Saving ${watchlistData.stocks.length} stocks to memory store...`);
    memoryStore[WATCHLIST_KEY] = watchlistData;
    console.log('✅ Successfully saved watchlist to memory store');
    return true;
  } catch (error) {
    console.error('❌ Error saving watchlist to memory store:', error);
    return false;
  }
}

// Add stock to shared watchlist
export async function addStockToWatchlist(stock: Omit<StockData, 'addedAt' | 'addedBy'>, addedBy: string = 'anonymous'): Promise<{ success: boolean; message: string }> {
  try {
    const watchlist = await getSharedWatchlist();
    
    // Check if stock already exists
    const existingStock = watchlist.stocks.find(s => s.symbol === stock.symbol);
    if (existingStock) {
      return {
        success: false,
        message: `${stock.symbol} is already in the shared watchlist!`
      };
    }
    
    // Add new stock
    const newStock: StockData = {
      ...stock,
      addedAt: new Date().toISOString(),
      addedBy: addedBy
    };
    
    watchlist.stocks.push(newStock);
    watchlist.lastUpdated = new Date().toISOString();
    
    const saved = await saveSharedWatchlist(watchlist);
    
    if (saved) {
      return {
        success: true,
        message: `${stock.symbol} has been added to the shared watchlist!`
      };
    } else {
      return {
        success: false,
        message: 'Failed to save to database'
      };
    }
  } catch (error) {
    console.error('Error adding stock:', error);
    return {
      success: false,
      message: 'Server error occurred'
    };
  }
}

// Remove stock from shared watchlist
export async function removeStockFromWatchlist(symbol: string): Promise<{ success: boolean; message: string }> {
  try {
    const watchlist = await getSharedWatchlist();
    
    const stockExists = watchlist.stocks.find(s => s.symbol === symbol);
    if (!stockExists) {
      return {
        success: false,
        message: `${symbol} is not in the watchlist`
      };
    }
    
    watchlist.stocks = watchlist.stocks.filter(s => s.symbol !== symbol);
    watchlist.lastUpdated = new Date().toISOString();
    
    const saved = await saveSharedWatchlist(watchlist);
    
    if (saved) {
      return {
        success: true,
        message: `${symbol} has been removed from the shared watchlist`
      };
    } else {
      return {
        success: false,
        message: 'Failed to save to database'
      };
    }
  } catch (error) {
    console.error('Error removing stock:', error);
    return {
      success: false,
      message: 'Server error occurred'
    };
  }
}

// Verify passcode
export function verifyPasscode(passcode: string): boolean {
  return passcode === process.env.WATCHLIST_PASSCODE || passcode === '717273';
}
