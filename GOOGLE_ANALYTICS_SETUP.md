# 📊 Google Analytics Setup Guide

This guide will help you set up Google Analytics 4 (GA4) for your PerfectTraders web application.

## 🚀 Quick Setup

### Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create an account name (e.g., "PerfectTraders")
4. Choose your data sharing settings
5. Click "Next"

### Step 2: Set Up Property
1. Enter property name: "PerfectTraders Website"
2. Select your time zone and currency (India/INR)
3. Click "Next"

### Step 3: Choose Business Information
1. Select your industry category: "Finance"
2. Select business size
3. Choose how you plan to use Analytics
4. Click "Create"

### Step 4: Set Up Data Stream
1. Choose "Web" platform
2. Enter your website URL (e.g., https://your-domain.com)
3. Enter stream name: "PerfectTraders Web"
4. Click "Create stream"

### Step 5: Get Measurement ID
1. Copy the Measurement ID (starts with G-XXXXXXXXXX)
2. This is your `NEXT_PUBLIC_GA_ID`

## 🔧 Configuration

### Environment Variables
Add to your `.env.local` file:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## 📈 What's Being Tracked

### Automatic Tracking
- **Page Views** - All page visits
- **User Sessions** - User engagement metrics
- **Geographic Data** - User locations
- **Device Information** - Desktop/mobile usage
- **Traffic Sources** - How users find your site

### Custom Events
- **Stock Views** - When users view stock details
- **Stock Actions** - Buy/Sell button clicks
- **Form Submissions** - Contact forms, stock requests
- **Service Clicks** - Navigation menu interactions
- **Insurance Inquiries** - Insurance form submissions
- **Watchlist Actions** - Adding/removing stocks
- **Downloads** - File downloads
- **Search Actions** - Search functionality usage

### E-commerce Tracking
- **Purchase Events** - Stock buy transactions
- **Transaction Details** - Amount, stock name, ID
- **Revenue Tracking** - Total transaction values

## 📊 Available Reports

### Real-time Reports
- Current active users
- Page views in last 30 minutes
- Top pages being viewed
- User locations

### Audience Reports
- User demographics
- Technology (devices, browsers)
- Geographic locations
- User behavior flow

### Acquisition Reports
- Traffic sources (organic, direct, referral)
- Campaign performance
- Social media traffic

### Behavior Reports
- Most viewed pages
- User engagement
- Site search performance
- Event tracking

### Conversion Reports
- Goal completions
- E-commerce transactions
- Form submissions
- Custom conversions

## 🎯 Custom Goals Setup

### Goal 1: Stock Inquiry
- **Type**: Event
- **Event**: form_submit
- **Category**: Form
- **Action**: Stock Buy/Sell

### Goal 2: Insurance Lead
- **Type**: Event
- **Event**: insurance_inquiry
- **Category**: Insurance
- **Action**: Any

### Goal 3: Contact Form
- **Type**: Event
- **Event**: contact_action
- **Category**: Contact
- **Action**: Any

## 🔍 Enhanced E-commerce Setup

### Enable Enhanced E-commerce
1. Go to Admin → Property → E-commerce Settings
2. Enable "Enhanced E-commerce Reporting"
3. Enable "E-commerce"

### Custom Dimensions (Optional)
1. **Stock Category** - Unlisted/Pre IPO/Delisted
2. **User Type** - New/Returning
3. **Service Interest** - Insurance/Stocks/Mutual Funds

## 📱 Mobile App Tracking (Future)

If you plan to create a mobile app:
1. Create a new data stream for "iOS app" or "Android app"
2. Get the App ID
3. Implement Firebase Analytics SDK

## 🔒 Privacy & GDPR Compliance

### Data Retention
- Set appropriate data retention periods
- Configure user deletion requests

### Cookie Consent
- Implement cookie consent banner
- Respect user privacy choices
- Provide opt-out options

### IP Anonymization
- Already enabled by default in GA4
- Complies with privacy regulations

## 🛠️ Troubleshooting

### Analytics Not Working?
1. Check if `NEXT_PUBLIC_GA_ID` is set correctly
2. Verify the Measurement ID format (G-XXXXXXXXXX)
3. Check browser console for errors
4. Use GA4 DebugView for real-time testing

### Testing Analytics
1. Go to GA4 → Reports → Realtime
2. Visit your website
3. Check if your visit appears in real-time data
4. Test custom events by clicking buttons

### Debug Mode
Add to your `.env.local` for testing:
```
NEXT_PUBLIC_GA_DEBUG=true
```

## 📈 Key Metrics to Monitor

### Business Metrics
- **Lead Generation**: Form submissions per day
- **User Engagement**: Average session duration
- **Conversion Rate**: Visitors to inquiries ratio
- **Popular Services**: Most clicked services
- **Stock Interest**: Most viewed stocks

### Technical Metrics
- **Page Load Speed**: Core Web Vitals
- **Error Tracking**: JavaScript errors
- **Mobile Usage**: Mobile vs desktop traffic
- **Browser Compatibility**: Browser usage stats

## 🎯 Next Steps

1. **Set up Goals** for key business actions
2. **Create Custom Reports** for specific metrics
3. **Set up Alerts** for important events
4. **Connect Google Ads** for advertising tracking
5. **Implement Google Tag Manager** for advanced tracking

## 📞 Support

For Google Analytics support:
- [GA4 Help Center](https://support.google.com/analytics/)
- [GA4 Academy](https://analytics.google.com/analytics/academy/)
- [GA4 Community](https://www.en.advertisercommunity.com/t5/Google-Analytics/ct-p/google-analytics)

---

**Your PerfectTraders website now has comprehensive analytics tracking! 📊🚀**
