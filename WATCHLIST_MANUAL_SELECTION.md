# Manual Stock Selection for Watchlist

This guide explains how to use the new manual stock selection feature in the Watchlist component.

## 🔐 Passcode Protection

The watchlist modification feature is protected with a passcode to prevent unauthorized changes.

**Passcode: `717273`**

## ✨ Features

### 1. Add Stock Button
- **Green "Add Stock" button** in the watchlist header
- **Passcode protection** - requires `717273` to access
- **Popular stocks selection** - Quick selection from 15 popular Indian stocks
- **Manual entry** - Add any stock with custom details

### 2. Remove Stock Functionality
- **Red X button** in each stock row
- **Confirmation dialog** before removal
- **Instant removal** from the watchlist

### 3. Passcode-Protected Modal
- **Two-step process**: Passcode → Add Stock
- **Visual feedback** for authentication status
- **Error handling** for incorrect passcode

## 🎯 How to Use

### Adding a Stock

1. **Click "Add Stock" button** in the watchlist header
2. **Enter passcode**: `717273`
3. **Choose method**:
   - **Quick Select**: Choose from popular stocks grid
   - **Manual Entry**: Fill in stock details manually

#### Popular Stocks Available:
- RELIANCE (Reliance Industries)
- TCS (Tata Consultancy Services)
- HDFCBANK (HDFC Bank)
- INFY (Infosys)
- ICICIBANK (ICICI Bank)
- KOTAKBANK (Kotak Mahindra Bank)
- BHARTIARTL (Bharti Airtel)
- ITC (ITC Limited)
- SBIN (State Bank of India)
- LT (Larsen & Toubro)
- ASIANPAINT (Asian Paints)
- MARUTI (Maruti Suzuki)
- NESTLEIND (Nestle India)
- ULTRACEMCO (UltraTech Cement)
- TITAN (Titan Company)

#### Manual Entry Fields:
- **Stock Symbol** (Required) - e.g., RELIANCE
- **Current Price** (Required) - e.g., 2825.50
- **Company Name** (Optional) - e.g., Reliance Industries
- **Change %** (Optional) - e.g., 1.25

### Removing a Stock

1. **Find the stock** in your watchlist
2. **Click the red X button** in the Actions column
3. **Confirm removal** in the dialog

## 🔧 Technical Details

### Data Storage
- **Local state only** - No backend integration
- **Session-based** - Data resets on page refresh
- **Automatic calculations** - Open, High, Low, Volume generated

### Stock Data Format
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
  color: "green" // or "red"
}
```

### Validation
- **Duplicate prevention** - Cannot add same symbol twice
- **Required fields** - Symbol and Price must be provided
- **Automatic formatting** - Symbol converted to uppercase
- **Color coding** - Green for positive, red for negative change

## 🎨 UI Components

### AddToWatchlistModal Features
- **Gradient header** with lock/unlock icons
- **Search functionality** for popular stocks
- **Responsive grid** layout for stock selection
- **Form validation** with error messages
- **Smooth animations** and transitions

### Watchlist Enhancements
- **Add Stock button** with green styling
- **Remove buttons** with red X icons
- **Actions column** in the table
- **Confirmation dialogs** for safety

## 🔒 Security Features

### Passcode Protection
- **6-digit passcode**: `717273`
- **Visual feedback** for authentication
- **Error handling** for wrong passcode
- **Session-based** authentication

### User Safety
- **Confirmation dialogs** for removal
- **Duplicate prevention** alerts
- **Clear error messages**
- **Undo-friendly** design

## 📱 Responsive Design

### Mobile Optimization
- **Touch-friendly** buttons
- **Responsive modal** sizing
- **Scrollable stock grid**
- **Optimized layouts** for small screens

### Desktop Features
- **Hover effects** on interactive elements
- **Keyboard navigation** support
- **Larger click targets**
- **Enhanced visual feedback**

## 🚀 Future Enhancements

### Potential Improvements
1. **Persistent storage** with localStorage
2. **Stock data validation** with real APIs
3. **Bulk operations** (add/remove multiple)
4. **Import/export** functionality
5. **Custom categories** or tags
6. **Price alerts** and notifications

### Integration Options
1. **Backend storage** with user accounts
2. **Real-time price updates** for added stocks
3. **Portfolio tracking** features
4. **Advanced analytics** and charts

## 💡 Tips

### Best Practices
- **Use popular stocks** for quick setup
- **Double-check symbols** before adding
- **Regular cleanup** of unused stocks
- **Test with sample data** first

### Troubleshooting
- **Passcode not working**: Ensure you're entering `717273`
- **Stock not adding**: Check required fields are filled
- **Duplicate error**: Stock already exists in watchlist
- **Modal not opening**: Check for JavaScript errors in console

## 📞 Support

If you encounter any issues:
1. **Check browser console** for error messages
2. **Verify passcode** is correct (`717273`)
3. **Refresh page** if modal becomes unresponsive
4. **Clear browser cache** if needed

The manual stock selection feature provides a secure, user-friendly way to customize your watchlist without requiring backend integration!
