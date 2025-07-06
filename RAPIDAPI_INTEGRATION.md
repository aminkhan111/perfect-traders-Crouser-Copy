# RapidAPI Integration for Indian Stock Data

This guide explains the new RapidAPI integration that provides better coverage for Indian stock data compared to Alpha Vantage.

## 🚀 Why RapidAPI?

### **Advantages over Alpha Vantage:**
- **Better Indian stock coverage** - NSE/BSE stocks readily available
- **Higher rate limits** - 100+ requests per minute vs 5 for Alpha Vantage
- **Multiple data sources** - Yahoo Finance, Indian Stock Exchange APIs
- **More reliable data** - Better uptime and data quality
- **Faster responses** - Optimized for Indian markets

## 🔑 API Configuration

### **API Key Setup:**
```
RapidAPI Key: 6f8d13bd7bmsh29c7a5949144d20p1862d1jsn39a06b159ac7
```

### **Environment Configuration:**
```bash
# .env.local
NEXT_PUBLIC_RAPIDAPI_KEY=6f8d13bd7bmsh29c7a5949144d20p1862d1jsn39a06b159ac7
```

## 📊 Supported Data Sources

### **1. Yahoo Finance API (Primary)**
- **Endpoint**: `yahoo-finance15.p.rapidapi.com`
- **Coverage**: NSE (.NS) and BSE (.BO) stocks
- **Data**: Real-time prices, volume, market cap
- **Format**: `SYMBOL.NS` or `SYMBOL.BO`

### **2. Indian Stock Exchange API (Fallback)**
- **Endpoint**: `latest-stock-price.p.rapidapi.com`
- **Coverage**: Major Indian stocks
- **Data**: Live prices, change percentages
- **Format**: Standard Indian symbols

### **3. NSE/BSE Direct APIs (Future)**
- **Endpoints**: `nse-data.p.rapidapi.com`, `bse-data.p.rapidapi.com`
- **Coverage**: Exchange-specific data
- **Data**: Official exchange data

## 🎯 Features Implemented

### **Enhanced Stock Coverage:**
- **10 stocks** displayed (vs 5 with Alpha Vantage)
- **Popular Indian stocks** with .NS suffix
- **Better symbol recognition**
- **Automatic fallback** between data sources

### **Improved Performance:**
- **Batch fetching** for multiple stocks
- **100 requests/minute** rate limit
- **1-second delays** between requests
- **Smart error handling**

### **Better Data Quality:**
- **Real-time NSE/BSE prices**
- **Accurate volume data**
- **Market cap information**
- **Company names included**

## 📈 Stock Symbols Supported

### **Default Watchlist (10 stocks):**
```javascript
[
  'RELIANCE.NS',    // Reliance Industries
  'TCS.NS',         // Tata Consultancy Services
  'HDFCBANK.NS',    // HDFC Bank
  'INFY.NS',        // Infosys
  'HINDUNILVR.NS',  // Hindustan Unilever
  'ICICIBANK.NS',   // ICICI Bank
  'KOTAKBANK.NS',   // Kotak Mahindra Bank
  'BHARTIARTL.NS',  // Bharti Airtel
  'ITC.NS',         // ITC Limited
  'SBIN.NS'         // State Bank of India
]
```

### **Additional Supported Stocks:**
- ASIANPAINT.NS, MARUTI.NS, AXISBANK.NS
- LT.NS, NESTLEIND.NS, ULTRACEMCO.NS
- TITAN.NS, WIPRO.NS, TECHM.NS, HCLTECH.NS

## 🔧 Technical Implementation

### **API Service (`src/lib/rapidapi.ts`):**
```typescript
// Fetch single stock quote
fetchYahooFinanceQuote(symbol: string)

// Fetch multiple stocks with rate limiting
fetchMultipleRapidAPIQuotes(symbols: string[])

// Search for Indian stocks
searchIndianStocks(query: string)

// Convert to internal format
convertRapidAPIToStockData(quote: RapidAPIStockQuote)
```

### **Rate Limiting:**
```typescript
const rateLimiter = new RapidAPIRateLimiter(100, 60000);
// 100 requests per minute vs 5 for Alpha Vantage
```

### **Error Handling:**
- **Primary source fails** → Try fallback API
- **All APIs fail** → Use sample data
- **Rate limit hit** → Automatic waiting
- **Invalid symbols** → Skip and continue

## 🎛️ User Experience

### **Default Behavior:**
1. **Page loads** with real-time mode ON
2. **Fetches 10 stocks** from RapidAPI
3. **Shows live NSE data** with green indicator
4. **Updates on refresh** or toggle

### **Status Indicators:**
- 🟢 **Live Data** - Connected to RapidAPI
- 🟡 **Connecting...** - Fetching from API
- ⚪ **Sample Data** - Using fallback data

### **Performance:**
- **Faster loading** than Alpha Vantage
- **More stocks** displayed simultaneously
- **Better reliability** with multiple fallbacks
- **Clearer error messages**

## 📱 API Response Format

### **Yahoo Finance Response:**
```json
{
  "symbol": "RELIANCE.NS",
  "longName": "Reliance Industries Limited",
  "regularMarketPrice": 2825.50,
  "regularMarketChange": 15.50,
  "regularMarketChangePercent": 0.55,
  "regularMarketOpen": 2800.00,
  "regularMarketDayHigh": 2850.00,
  "regularMarketDayLow": 2790.00,
  "regularMarketVolume": 1234567,
  "marketCap": 1900000000000
}
```

### **Converted Internal Format:**
```typescript
{
  symbol: "RELIANCE",
  open: 2800.00,
  high: 2850.00,
  low: 2790.00,
  prevClose: 2810.00,
  ltp: 2825.50,
  change: 0.55,
  volume: 1234567,
  value: 348.89, // In lakhs
  ca: "-",
  color: "green"
}
```

## 🔍 Troubleshooting

### **Common Issues:**

1. **"No data found for symbol"**
   - Check symbol format (use .NS for NSE)
   - Verify stock is actively traded
   - Try alternative symbol format

2. **Rate limit exceeded**
   - Wait 1 minute for reset
   - Reduce number of stocks
   - Check API usage dashboard

3. **API connection failed**
   - Verify API key in .env.local
   - Check internet connection
   - Try refreshing the page

### **Debug Information:**
- **Console logs** show API responses
- **Network tab** shows request details
- **Status indicator** shows connection state

## 🚀 Benefits Summary

### **For Users:**
- **More Indian stocks** available
- **Faster data loading**
- **Better reliability**
- **Real-time NSE/BSE prices**

### **For Developers:**
- **Higher rate limits**
- **Better error handling**
- **Multiple data sources**
- **Easier Indian stock integration**

## 📞 Support & Monitoring

### **API Dashboard:**
- Monitor usage at RapidAPI dashboard
- Track request counts and limits
- View error rates and performance

### **Upgrade Options:**
- **Basic Plan**: 1000 requests/month (Free)
- **Pro Plan**: 10,000 requests/month
- **Ultra Plan**: 100,000 requests/month

## 🔄 Migration from Alpha Vantage

### **What Changed:**
- ✅ **API provider**: Alpha Vantage → RapidAPI
- ✅ **Stock count**: 5 → 10 stocks
- ✅ **Rate limits**: 5/min → 100/min
- ✅ **Coverage**: Global → Indian-focused
- ✅ **Reliability**: Improved with fallbacks

### **What Stayed the Same:**
- ✅ **User interface** remains identical
- ✅ **Toggle functionality** works as before
- ✅ **Sample data fallback** still available
- ✅ **Manual stock addition** unchanged

The RapidAPI integration provides a significantly better experience for Indian stock data with improved coverage, performance, and reliability! 🎉
