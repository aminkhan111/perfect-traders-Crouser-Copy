# Troubleshooting Guide - Watchlist & RapidAPI Issues

This guide helps resolve common issues with real-time data fetching and the add watchlist functionality.

## 🔧 Fixed Issues

### **1. Real-Time Data Not Loading**

#### **Problem:** 
- Watchlist shows sample data instead of real-time data
- API status shows "Sample Data" instead of "Live Data"

#### **Root Causes Fixed:**
- ✅ **Default state**: Changed `isRealTimeMode` from `false` to `true`
- ✅ **API endpoints**: Updated to working RapidAPI endpoints
- ✅ **Error handling**: Added comprehensive logging and fallbacks
- ✅ **Rate limiting**: Improved with RapidAPI's higher limits

#### **Solution Applied:**
```typescript
// Fixed default state
const [isRealTimeMode, setIsRealTimeMode] = useState<boolean>(true);
const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'loading'>('loading');
```

### **2. Add Watchlist Search Not Working**

#### **Problem:**
- Search in Add Watchlist modal doesn't show results
- Limited stock options available

#### **Root Causes Fixed:**
- ✅ **Stock database**: Expanded from 15 to 35+ popular Indian stocks
- ✅ **Search algorithm**: Improved to handle partial matches and multiple search terms
- ✅ **Symbol coverage**: Added more sectors (Banking, FMCG, Auto, Pharma, etc.)

#### **Solution Applied:**
```typescript
// Enhanced search functionality
const filteredStocks = popularStocks.filter(stock => {
  const query = searchQuery.toLowerCase().trim();
  return (
    stock.symbol.toLowerCase().includes(query) ||
    stock.name.toLowerCase().includes(query) ||
    stock.symbol.toLowerCase().startsWith(query) ||
    stock.name.toLowerCase().split(' ').some(word => word.startsWith(query))
  );
});
```

## 🚀 How to Test the Fixes

### **Step 1: Test Real-Time Data**
1. **Open the Watchlist page**
2. **Check the toggle** - should be ON by default
3. **Look for "Live Data" indicator** with green WiFi icon
4. **Click "Debug API" button** to test connection
5. **Check browser console** for detailed logs

### **Step 2: Test Add Watchlist**
1. **Click "Add Stock" button** (green)
2. **Enter passcode**: `717273`
3. **Try searching** for stocks:
   - Type "REL" → Should show Reliance
   - Type "TCS" → Should show Tata Consultancy Services
   - Type "HDFC" → Should show HDFC Bank, HDFC Life
   - Type "Tata" → Should show TCS, Tata Motors

### **Step 3: Verify Console Logs**
Open browser console (F12) and look for:
```
✅ Successfully loaded X real-time stocks from RapidAPI
📡 Live data from RapidAPI (10 stocks max)
=== Manual API Debug ===
```

## 🔍 Debugging Tools Added

### **1. Debug API Button**
- **Location**: Next to Refresh button
- **Purpose**: Test RapidAPI connection manually
- **Usage**: Click and check console for detailed results

### **2. Enhanced Console Logging**
- **API requests**: Shows symbols being fetched
- **API responses**: Shows raw data received
- **Conversion process**: Shows how data is transformed
- **Error details**: Shows specific failure reasons

### **3. Status Indicators**
- **Green WiFi + "Live Data"**: RapidAPI working
- **Yellow + "Connecting..."**: Fetching data
- **Gray + "Sample Data"**: Using fallback

## 📊 Stock Database Expansion

### **Added Stocks by Sector:**

#### **Banking & Finance:**
- HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, AXISBANK
- HDFCLIFE, BAJFINANCE, BAJAJFINSV

#### **Technology:**
- TCS, INFY, WIPRO, TECHM, HCLTECH

#### **FMCG:**
- HINDUNILVR, BRITANNIA, DABUR, MARICO, NESTLEIND

#### **Auto:**
- MARUTI, TATAMOTORS, M&M, BAJAJ-AUTO

#### **Pharma:**
- SUNPHARMA, DRREDDY, CIPLA

#### **Energy & Infrastructure:**
- RELIANCE, LT, NTPC, POWERGRID, ONGC, ADANIPORTS

#### **Others:**
- ITC, BHARTIARTL, ASIANPAINT, ULTRACEMCO, TITAN

## 🛠️ API Configuration

### **Environment Variables:**
```bash
# .env.local
NEXT_PUBLIC_RAPIDAPI_KEY=6f8d13bd7bmsh29c7a5949144d20p1862d1jsn39a06b159ac7
```

### **API Endpoints Used:**
- **Primary**: `latest-stock-price.p.rapidapi.com`
- **Fallback**: Mock data generation for demo
- **Rate Limit**: 100 requests/minute

## 🔄 Fallback System

### **Data Source Priority:**
1. **RapidAPI Live Data** (Primary)
2. **Mock Data Generation** (If API fails)
3. **Sample Static Data** (Final fallback)

### **Error Handling:**
- **Network errors**: Automatic retry with fallback
- **Invalid symbols**: Skip and continue with others
- **Rate limits**: Automatic waiting and retry
- **API key issues**: Clear error messages

## 📱 User Experience Improvements

### **Visual Feedback:**
- **Loading states**: Spinner and "Connecting..." text
- **Success states**: Green indicator with stock count
- **Error states**: Clear messages with retry options
- **Debug information**: Console logs for troubleshooting

### **Search Improvements:**
- **Partial matching**: "REL" finds "RELIANCE"
- **Word matching**: "Tata" finds "Tata Consultancy Services"
- **Case insensitive**: Works with any case
- **Real-time filtering**: Updates as you type

## 🎯 Expected Behavior

### **On Page Load:**
1. **Toggle should be ON** (real-time mode)
2. **Status shows "Connecting..."** briefly
3. **Then shows "Live Data"** with green indicator
4. **10 stocks displayed** with real-time prices
5. **Console shows success messages**

### **Add Stock Flow:**
1. **Click "Add Stock"** → Modal opens
2. **Enter passcode** `717273` → Authentication screen
3. **Search for stocks** → Filtered results appear
4. **Click stock** → Auto-fills form
5. **Click "Add to Watchlist"** → Stock added successfully

## 🚨 Common Issues & Solutions

### **Issue: "Sample Data" instead of "Live Data"**
**Solution:** 
- Check console for API errors
- Click "Debug API" button
- Verify internet connection
- Check if API key is correct

### **Issue: Search shows no results**
**Solution:**
- Try shorter search terms (e.g., "REL" instead of "RELIANCE")
- Check spelling
- Try searching by company name instead of symbol
- Clear search and browse all stocks

### **Issue: Passcode not working**
**Solution:**
- Ensure you're entering exactly: `717273`
- No spaces before or after
- Try typing slowly
- Refresh page if modal is stuck

## 📞 Support

If issues persist:
1. **Check browser console** for error messages
2. **Try the Debug API button** for connection testing
3. **Refresh the page** to reset state
4. **Clear browser cache** if needed
5. **Check network connection** for API access

The fixes ensure a smooth experience with real-time data and comprehensive stock search functionality! 🎉
