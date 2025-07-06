// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Check if GA_TRACKING_ID is available
export const isGAEnabled = !!GA_TRACKING_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (!isGAEnabled) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (!isGAEnabled) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Custom events for PerfectTraders
export const trackStockView = (stockName, stockId) => {
  event({
    action: 'view_stock',
    category: 'Stock',
    label: `${stockName} (ID: ${stockId})`,
  });
};

export const trackStockAction = (action, stockName, stockId) => {
  event({
    action: `stock_${action}`,
    category: 'Stock Action',
    label: `${stockName} (ID: ${stockId})`,
  });
};

export const trackFormSubmission = (formType, stockName = null) => {
  event({
    action: 'form_submit',
    category: 'Form',
    label: stockName ? `${formType} - ${stockName}` : formType,
  });
};

export const trackPageView = (pageName) => {
  event({
    action: 'page_view',
    category: 'Navigation',
    label: pageName,
  });
};

export const trackServiceClick = (serviceName) => {
  event({
    action: 'service_click',
    category: 'Services',
    label: serviceName,
  });
};

export const trackContactAction = (actionType) => {
  event({
    action: 'contact_action',
    category: 'Contact',
    label: actionType,
  });
};

export const trackWatchlistAction = (action, stockName = null) => {
  event({
    action: `watchlist_${action}`,
    category: 'Watchlist',
    label: stockName || 'General',
  });
};

export const trackInsuranceInquiry = (insuranceType) => {
  event({
    action: 'insurance_inquiry',
    category: 'Insurance',
    label: insuranceType,
  });
};

export const trackDownload = (fileName) => {
  event({
    action: 'download',
    category: 'Downloads',
    label: fileName,
  });
};

export const trackSearch = (searchTerm) => {
  event({
    action: 'search',
    category: 'Search',
    label: searchTerm,
  });
};

export const trackError = (errorType, errorMessage) => {
  event({
    action: 'error',
    category: 'Errors',
    label: `${errorType}: ${errorMessage}`,
  });
};

// E-commerce tracking for stock transactions
export const trackPurchase = (stockName, stockId, amount) => {
  if (!isGAEnabled) return;
  
  window.gtag('event', 'purchase', {
    transaction_id: `${stockId}_${Date.now()}`,
    value: amount,
    currency: 'INR',
    items: [{
      item_id: stockId,
      item_name: stockName,
      category: 'Unlisted Shares',
      quantity: 1,
      price: amount
    }]
  });
};

// Track user engagement
export const trackEngagement = (engagementType, details = null) => {
  event({
    action: 'engagement',
    category: 'User Engagement',
    label: details ? `${engagementType} - ${details}` : engagementType,
  });
};
