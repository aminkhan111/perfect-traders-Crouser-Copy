# Alpha Vantage Real-Time Stock Data Integration

This guide explains how to use the Alpha Vantage API integration for real-time stock data in the Watchlist component.

## 🚀 Features

- **Real-time stock quotes** from Alpha Vantage API
- **Rate limiting** to respect API limits (5 requests/minute for free tier)
- **Fallback to sample data** if API fails
- **Toggle between real-time and sample data**
- **Visual API status indicator**
- **Automatic error handling**

## 🔑 API Key Setup

Your Alpha Vantage API key is already configured:
```
API Key: 3HTNOZ91ING4CIY8
```

The key is stored in `.env.local` as:
```
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=3HTNOZ91ING4CIY8
```

## 📊 Supported Features

### 1. Real-Time Stock Quotes
- Current price (LTP)
- Open, High, Low prices
- Previous close
- Volume
- Change percentage
- Latest trading day

### 2. Rate Limiting
- Free tier: 5 API requests per minute
- Automatic rate limiting built-in
- 12-second delay between requests

### 3. Stock Search
- Search for stocks by symbol or company name
- Get detailed company information

### 4. Intraday Data
- 1min, 5min, 15min, 30min, 60min intervals
- Historical intraday prices

## 🎛️ How to Use

### 1. Toggle Real-Time Mode
In the Watchlist component, you'll see a toggle switch:
- **OFF**: Uses sample data (fast, no API calls)
- **ON**: Fetches real-time data from Alpha Vantage

### 2. API Status Indicator
- 🟢 **Live Data**: Successfully connected to Alpha Vantage
- 🟡 **Connecting...**: Fetching data from API
- ⚪ **Sample Data**: Using fallback sample data

### 3. Refresh Data
Click the "Refresh" button to manually update stock prices.

## ⚠️ Important Limitations

### Free Tier Limits
- **5 API requests per minute**
- **500 requests per day**
- Currently limited to **5 stocks** to avoid rate limits

### Stock Symbols
For Indian stocks, use the format: `SYMBOL.BSE` or `SYMBOL.NSE`
Examples:
- `RELIANCE.BSE`
- `TCS.BSE`
- `HDFCBANK.BSE`

## 🔧 Technical Implementation

### Files Modified
1. **`src/lib/alphavantage.ts`** - Alpha Vantage API service
2. **`src/components/Watchlist.tsx`** - Updated with real-time functionality
3. **`.env.local`** - API key configuration

### Key Functions
```typescript
// Fetch single stock quote
fetchStockQuote(symbol: string)

// Fetch multiple stocks (with rate limiting)
fetchMultipleStockQuotes(symbols: string[])

// Search for stocks
searchStocks(keyword: string)

// Get intraday data
fetchIntradayData(symbol: string, interval: string)
```

### Rate Limiter
```typescript
const rateLimiter = new RateLimiter(5, 60000); // 5 requests per minute
await rateLimiter.waitIfNeeded();
```

## 📈 Data Format

### Input (Alpha Vantage)
```json
{
  "Global Quote": {
    "01. symbol": "RELIANCE.BSE",
    "02. open": "2800.00",
    "03. high": "2850.00",
    "04. low": "2790.00",
    "05. price": "2825.50",
    "06. volume": "1234567",
    "07. latest trading day": "2024-01-15",
    "08. previous close": "2810.00",
    "09. change": "15.50",
    "10. change percent": "0.55%"
  }
}
```

### Output (Converted)
```typescript
{
  symbol: "RELIANCE.BSE",
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

## 🛠️ Troubleshooting

### Common Issues

1. **"No data found for symbol"**
   - Check if the symbol format is correct (e.g., `RELIANCE.BSE`)
   - Verify the stock is listed and tradeable

2. **Rate limit exceeded**
   - Wait for the rate limit to reset (1 minute)
   - Reduce the number of stocks being fetched

3. **API key invalid**
   - Verify the API key in `.env.local`
   - Check if the key is active on Alpha Vantage

### Error Handling
- Automatic fallback to sample data
- Console logging for debugging
- User-friendly error messages

## 🔄 Upgrade Options

### Premium Plans
- **25 requests/minute** - $49.99/month
- **75 requests/minute** - $149.99/month
- **1200 requests/minute** - $499.99/month

### Benefits of Upgrading
- More stocks in watchlist
- Faster data updates
- Additional data points
- Historical data access

## 📝 Next Steps

1. **Test the integration** by toggling real-time mode
2. **Monitor API usage** in Alpha Vantage dashboard
3. **Consider upgrading** for more stocks
4. **Add more features** like charts and alerts

## 🔗 Useful Links

- [Alpha Vantage Documentation](https://www.alphavantage.co/documentation/)
- [API Key Dashboard](https://www.alphavantage.co/support/#api-key)
- [Pricing Plans](https://www.alphavantage.co/premium/)

## 💡 Tips

- Use real-time mode sparingly to conserve API calls
- Test with sample data first
- Monitor the console for API responses
- Consider caching data for better performance
