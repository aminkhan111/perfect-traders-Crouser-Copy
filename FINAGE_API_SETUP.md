# 📈 Finage API Integration Guide

This guide explains how to use the Finage API integration for real-time Indian stock market data in your PerfectTraders application.

## 🚀 Quick Setup

### Step 1: Get Finage API Key
1. Visit [Finage.co.uk](https://finage.co.uk/)
2. Sign up for a free account
3. Choose the **Free API Plan** ($0/month)
4. Get your API key from the dashboard
5. Copy your API key (format: API_KEYXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX)

### Step 2: Configure Environment
Add your API key to `.env.local`:
```
NEXT_PUBLIC_FINAGE_API_KEY=API_KEY63GFEPREZ85ET1J6L1LWAX3Q61T33AHQ
```

### Step 3: Access Live Stocks
Visit `/live-stocks` page to see the Finage integration in action.

## 📊 Features

### Real-time Stock Data
- **Live Prices**: Updated every 30 seconds during market hours
- **Price Changes**: Absolute and percentage changes
- **Volume Data**: Trading volume information
- **Market Status**: Open/Closed indicators

### Indian Stock Coverage
- **NSE Stocks**: Complete National Stock Exchange coverage
- **BSE Stocks**: Complete Bombay Stock Exchange coverage
- **Popular Stocks**: Pre-loaded with top Indian stocks
- **Search Function**: Find any Indian stock by symbol or name

### Watchlist Management
- **Add Stocks**: Search and add any Indian stock
- **Remove Stocks**: Manage your watchlist
- **Passcode Protection**: Secure watchlist management (717273)
- **Persistent Storage**: Watchlist saved in browser

## 🔧 API Endpoints Used

### Stock Quote
```javascript
GET /last/stock?symbol=RELIANCE.NSE&apikey=YOUR_API_KEY
```

### Multiple Quotes
```javascript
GET /last/stock?symbols=RELIANCE.NSE,TCS.NSE&apikey=YOUR_API_KEY
```

### Search Stocks
```javascript
GET /search/stock?search=RELIANCE&apikey=YOUR_API_KEY
```

### Market Status
```javascript
GET /market/status?apikey=YOUR_API_KEY
```

## 📈 Popular Indian Stocks Included

### Large Cap Stocks
- RELIANCE.NSE - Reliance Industries
- TCS.NSE - Tata Consultancy Services
- HDFCBANK.NSE - HDFC Bank
- INFY.NSE - Infosys
- HINDUNILVR.NSE - Hindustan Unilever

### Banking Stocks
- ICICIBANK.NSE - ICICI Bank
- KOTAKBANK.NSE - Kotak Mahindra Bank
- SBIN.NSE - State Bank of India

### Technology Stocks
- TCS.NSE - Tata Consultancy Services
- INFY.NSE - Infosys
- HCLTECH.NSE - HCL Technologies
- WIPRO.NSE - Wipro

### Consumer Goods
- HINDUNILVR.NSE - Hindustan Unilever
- ITC.NSE - ITC Limited
- NESTLEIND.NSE - Nestle India

## 🎯 Usage Examples

### Basic Stock Quote
```javascript
import { getStockQuote } from '@/lib/finageApi';

const quote = await getStockQuote('RELIANCE.NSE');
console.log(quote);
// Output: { symbol: 'RELIANCE.NSE', price: 2450.75, change: 25.30, changePercent: 1.04 }
```

### Multiple Stocks
```javascript
import { getMultipleQuotes } from '@/lib/finageApi';

const quotes = await getMultipleQuotes(['RELIANCE.NSE', 'TCS.NSE']);
console.log(quotes);
```

### Search Stocks
```javascript
import { searchStocks } from '@/lib/finageApi';

const results = await searchStocks('HDFC');
console.log(results);
// Returns array of matching stocks
```

## 📱 Components

### FinageWatchlist Component
Main component for displaying live stock data:
- Real-time price updates
- Add/remove stocks functionality
- Search and filter capabilities
- Market status display

### Usage
```jsx
import FinageWatchlist from '@/components/FinageWatchlist';

export default function StocksPage() {
  return <FinageWatchlist />;
}
```

## 🔒 Security & Rate Limits

### Free Tier Limits
- **1000 requests/month**: Generous allocation for personal use
- **Rate Limiting**: Built-in protection against exceeding limits
- **Request Tracking**: Monitor usage to stay within limits

### Security Best Practices
- API key stored in environment variables
- Client-side rate limiting
- Error handling for API failures
- Fallback data when API is unavailable

## 🛠️ Troubleshooting

### Common Issues

#### API Key Not Working
```
Error: Finage API error: 401 Unauthorized
```
**Solution**: Check your API key in `.env.local` file

#### Rate Limit Exceeded
```
Error: Finage API error: 429 Too Many Requests
```
**Solution**: Wait for rate limit reset or upgrade plan

#### Stock Not Found
```
Error: Finage API error: 404 Not Found
```
**Solution**: Check stock symbol format (should include .NSE or .BSE)

#### Network Issues
```
Error: Failed to fetch
```
**Solution**: Check internet connection and API status

### Debug Mode
Enable debug logging by adding to `.env.local`:
```
NEXT_PUBLIC_DEBUG=true
```

## 📊 Data Format

### Stock Quote Response
```json
{
  "symbol": "RELIANCE.NSE",
  "price": 2450.75,
  "change": 25.30,
  "changePercent": 1.04,
  "volume": 1234567,
  "timestamp": 1640995200000,
  "currency": "INR"
}
```

### Search Results
```json
[
  {
    "symbol": "RELIANCE.NSE",
    "name": "Reliance Industries Limited",
    "exchange": "NSE",
    "type": "stock"
  }
]
```

## 🔄 Auto-refresh

### Market Hours
- **Refresh Interval**: 30 seconds during market hours
- **Market Detection**: Automatic market status checking
- **Pause When Closed**: No unnecessary API calls when market is closed

### Manual Refresh
Users can manually refresh data using the refresh button.

## 📈 Analytics Integration

### Tracked Events
- Stock views and interactions
- Watchlist additions/removals
- Search queries
- API usage patterns

### Google Analytics
All user interactions are tracked for business insights.

## 🚀 Performance

### Optimization Features
- **Batch Requests**: Multiple stocks in single API call
- **Caching**: Browser storage for watchlist persistence
- **Error Handling**: Graceful degradation when API fails
- **Loading States**: User-friendly loading indicators

## 📞 Support

### Finage Support
- [Finage Documentation](https://finage.co.uk/docs/)
- [API Reference](https://finage.co.uk/docs/api/)
- [Support Portal](https://finage.co.uk/support/)

### Application Support
- Check console for error messages
- Verify API key configuration
- Monitor rate limit usage
- Test with popular stocks first

---

**Your PerfectTraders application now has professional-grade Indian stock market data! 📈🚀**
