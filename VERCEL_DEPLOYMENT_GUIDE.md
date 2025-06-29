# Vercel Deployment Guide - Shared Watchlist

Complete guide to deploy your shared community watchlist to Vercel with proper cross-user functionality.

## 🎯 **Deployment Strategy**

### **Current Issue:**
- **localStorage** only works within the same browser
- **Different users** can't see each other's additions
- **No real sharing** between devices/people

### **Solution: Vercel + Vercel KV (Redis)**
- **Vercel KV** for shared data storage
- **API Routes** for backend functionality
- **Real-time sharing** between all users
- **Free tier available**

## 🛠️ **Step 1: Install Dependencies**

First, let's add the required dependencies:

```bash
npm install @vercel/kv
npm install --save-dev @types/node
```

## 📁 **Step 2: Create API Routes**

We'll create API routes to handle the shared watchlist:

### **File Structure:**
```
src/
├── app/
│   └── api/
│       └── watchlist/
│           ├── route.ts          # GET/POST watchlist
│           ├── add/
│           │   └── route.ts      # Add stock
│           └── remove/
│               └── route.ts      # Remove stock
├── lib/
│   └── kv.ts                     # KV database helper
└── components/
    ├── Watchlist.tsx             # Updated component
    └── AddToWatchlistModal.tsx   # Updated modal
```

## 🔧 **Step 3: Environment Setup**

### **Create `.env.local`:**
```env
# Vercel KV Database
KV_URL="your-kv-url"
KV_REST_API_URL="your-kv-rest-api-url"
KV_REST_API_TOKEN="your-kv-rest-api-token"
KV_REST_API_READ_ONLY_TOKEN="your-kv-rest-api-read-only-token"

# Watchlist Passcode
WATCHLIST_PASSCODE="717273"
```

### **Update `.env.example`:**
```env
# Vercel KV Database (get these from Vercel dashboard)
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=

# Watchlist Management
WATCHLIST_PASSCODE=717273
```

## 🗄️ **Step 4: Database Helper**

Create `src/lib/kv.ts`:

```typescript
import { kv } from '@vercel/kv';

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

// Get shared watchlist
export async function getSharedWatchlist(): Promise<WatchlistData> {
  try {
    const data = await kv.get<WatchlistData>(WATCHLIST_KEY);
    return data || {
      stocks: [],
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
  } catch (error) {
    console.error('Error getting watchlist:', error);
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
    await kv.set(WATCHLIST_KEY, watchlistData);
    return true;
  } catch (error) {
    console.error('Error saving watchlist:', error);
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
  return passcode === process.env.WATCHLIST_PASSCODE;
}
```

## 🌐 **Step 5: API Routes**

### **Create `src/app/api/watchlist/route.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSharedWatchlist } from '@/lib/kv';

// GET - Fetch shared watchlist
export async function GET() {
  try {
    const watchlist = await getSharedWatchlist();
    
    return NextResponse.json({
      success: true,
      data: watchlist
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch watchlist' },
      { status: 500 }
    );
  }
}
```

### **Create `src/app/api/watchlist/add/route.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { addStockToWatchlist, verifyPasscode } from '@/lib/kv';
import { fetchIndianStockQuote, convertToStockData } from '@/lib/yahoo-finance-india';

// POST - Add stock to shared watchlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stockData, passcode, userAgent } = body;
    
    // Verify passcode
    if (!verifyPasscode(passcode)) {
      return NextResponse.json(
        { success: false, message: 'Invalid passcode' },
        { status: 401 }
      );
    }
    
    // Validate required fields
    if (!stockData || !stockData.symbol) {
      return NextResponse.json(
        { success: false, message: 'Stock symbol is required' },
        { status: 400 }
      );
    }
    
    let finalStockData = stockData;
    
    // Try to fetch real-time data
    try {
      console.log(`📡 Fetching real-time data for ${stockData.symbol}...`);
      const quote = await fetchIndianStockQuote(stockData.symbol);
      
      if (quote) {
        finalStockData = convertToStockData(quote);
        console.log(`✅ Got real-time data for ${stockData.symbol}`);
      } else {
        console.log(`⚠️ Using provided data for ${stockData.symbol}`);
      }
    } catch (error) {
      console.log(`⚠️ API failed for ${stockData.symbol}, using provided data`);
    }
    
    // Add to shared watchlist
    const result = await addStockToWatchlist(finalStockData, userAgent || 'web-user');
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        data: finalStockData
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error occurred' },
      { status: 500 }
    );
  }
}
```

### **Create `src/app/api/watchlist/remove/route.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { removeStockFromWatchlist, verifyPasscode } from '@/lib/kv';

// DELETE - Remove stock from shared watchlist
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol, passcode } = body;
    
    // Verify passcode
    if (!verifyPasscode(passcode)) {
      return NextResponse.json(
        { success: false, message: 'Invalid passcode' },
        { status: 401 }
      );
    }
    
    // Validate required fields
    if (!symbol) {
      return NextResponse.json(
        { success: false, message: 'Stock symbol is required' },
        { status: 400 }
      );
    }
    
    // Remove from shared watchlist
    const result = await removeStockFromWatchlist(symbol);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error occurred' },
      { status: 500 }
    );
  }
}
```

## 🔄 **Step 6: Update Components**

The components need to be updated to use API calls instead of localStorage.

### **Key Changes:**
1. **Replace localStorage** with API calls
2. **Add proper error handling**
3. **Implement real-time updates**
4. **Handle loading states**

## 🚀 **Step 7: Vercel Deployment**

### **1. Push to GitHub:**
```bash
git add .
git commit -m "Add shared watchlist with Vercel KV"
git push origin main
```

### **2. Deploy to Vercel:**
1. **Go to** [vercel.com](https://vercel.com)
2. **Import your GitHub repository**
3. **Configure project settings**
4. **Deploy**

### **3. Set up Vercel KV:**
1. **Go to Vercel Dashboard** → Your Project
2. **Click "Storage"** tab
3. **Create KV Database**
4. **Copy environment variables** to your project
5. **Redeploy**

## 🎯 **Step 8: Testing**

### **Test Cross-User Functionality:**
1. **User A** (with passcode) adds RELIANCE
2. **User B** (different device/browser) sees RELIANCE
3. **User B** cannot add stocks (no passcode)
4. **User A** can remove stocks with passcode

## 🎉 **Result**

After deployment, you'll have:

✅ **True shared watchlist** across all users
✅ **Passcode protection** for adding/removing stocks  
✅ **Real-time updates** for all users
✅ **Scalable backend** with Vercel KV
✅ **Production-ready** deployment

## 📋 **Next Steps**

1. **Install dependencies**
2. **Create API routes** (I'll help you with the code)
3. **Update components** to use APIs
4. **Deploy to Vercel**
5. **Set up Vercel KV**
6. **Test cross-user functionality**

Would you like me to start implementing these changes step by step?
