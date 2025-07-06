// Finage API configuration for Indian stocks
const FINAGE_API_KEY = process.env.NEXT_PUBLIC_FINAGE_API_KEY;
const FINAGE_BASE_URL = 'https://api.finage.co.uk';

// Check if API key is available
export const isFinageEnabled = !!FINAGE_API_KEY;

// Helper function to make API requests
const makeFinageRequest = async (endpoint, params = {}) => {
  if (!isFinageEnabled) {
    throw new Error('Finage API key not configured');
  }

  const url = new URL(`${FINAGE_BASE_URL}${endpoint}`);
  url.searchParams.append('apikey', FINAGE_API_KEY);
  
  // Add additional parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Finage API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Finage API request failed:', error);
    throw error;
  }
};

// Get real-time stock quote
export const getStockQuote = async (symbol) => {
  try {
    const data = await makeFinageRequest('/last/stock', { symbol });
    return {
      symbol: data.symbol,
      price: data.price,
      change: data.change,
      changePercent: data.changePercent,
      volume: data.volume,
      timestamp: data.timestamp,
      currency: 'INR'
    };
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    return null;
  }
};

// Get multiple stock quotes
export const getMultipleQuotes = async (symbols) => {
  try {
    const symbolsString = Array.isArray(symbols) ? symbols.join(',') : symbols;
    const data = await makeFinageRequest('/last/stock', { symbols: symbolsString });
    
    if (Array.isArray(data)) {
      return data.map(item => ({
        symbol: item.symbol,
        price: item.price,
        change: item.change,
        changePercent: item.changePercent,
        volume: item.volume,
        timestamp: item.timestamp,
        currency: 'INR'
      }));
    }
    
    return [data];
  } catch (error) {
    console.error('Error fetching multiple quotes:', error);
    return [];
  }
};

// Get historical data
export const getHistoricalData = async (symbol, period = '1D') => {
  try {
    const data = await makeFinageRequest('/agg/stock/prev-close', { 
      symbol,
      period 
    });
    
    return {
      symbol: data.symbol,
      results: data.results?.map(item => ({
        date: item.t,
        open: item.o,
        high: item.h,
        low: item.l,
        close: item.c,
        volume: item.v
      })) || []
    };
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error);
    return null;
  }
};

// Get company profile
export const getCompanyProfile = async (symbol) => {
  try {
    const data = await makeFinageRequest('/detail/stock', { symbol });
    return {
      symbol: data.symbol,
      name: data.name,
      description: data.description,
      sector: data.sector,
      industry: data.industry,
      marketCap: data.marketCap,
      employees: data.employees,
      website: data.website,
      headquarters: data.headquarters,
      founded: data.founded
    };
  } catch (error) {
    console.error(`Error fetching company profile for ${symbol}:`, error);
    return null;
  }
};

// Search for stocks
export const searchStocks = async (query) => {
  try {
    const data = await makeFinageRequest('/search/stock', { search: query });
    return data.results?.map(item => ({
      symbol: item.symbol,
      name: item.name,
      exchange: item.exchange,
      type: item.type
    })) || [];
  } catch (error) {
    console.error(`Error searching stocks for "${query}":`, error);
    return [];
  }
};

// Get market status
export const getMarketStatus = async () => {
  try {
    const data = await makeFinageRequest('/market/status');
    return {
      isOpen: data.isOpen,
      nextOpen: data.nextOpen,
      nextClose: data.nextClose,
      timezone: data.timezone
    };
  } catch (error) {
    console.error('Error fetching market status:', error);
    return null;
  }
};

// Popular Indian stocks symbols
export const POPULAR_INDIAN_STOCKS = [
  'RELIANCE.NSE',
  'TCS.NSE', 
  'HDFCBANK.NSE',
  'INFY.NSE',
  'HINDUNILVR.NSE',
  'ICICIBANK.NSE',
  'KOTAKBANK.NSE',
  'BHARTIARTL.NSE',
  'ITC.NSE',
  'SBIN.NSE',
  'LT.NSE',
  'ASIANPAINT.NSE',
  'MARUTI.NSE',
  'BAJFINANCE.NSE',
  'HCLTECH.NSE',
  'WIPRO.NSE',
  'ULTRACEMCO.NSE',
  'TITAN.NSE',
  'NESTLEIND.NSE',
  'POWERGRID.NSE'
];

// Get popular stocks data
export const getPopularStocks = async () => {
  try {
    return await getMultipleQuotes(POPULAR_INDIAN_STOCKS);
  } catch (error) {
    console.error('Error fetching popular stocks:', error);
    return [];
  }
};

// Format Indian stock symbol for Finage API
export const formatSymbolForFinage = (symbol) => {
  // If symbol already has exchange suffix, return as is
  if (symbol.includes('.NSE') || symbol.includes('.BSE')) {
    return symbol;
  }
  
  // Default to NSE for Indian stocks
  return `${symbol}.NSE`;
};

// Parse symbol from Finage format
export const parseSymbolFromFinage = (finageSymbol) => {
  return finageSymbol.replace(/\.(NSE|BSE)$/, '');
};

// Rate limiting helper
let requestCount = 0;
let lastResetTime = Date.now();

export const checkRateLimit = () => {
  const now = Date.now();
  const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  
  // Reset counter if a month has passed
  if (now - lastResetTime > oneMonth) {
    requestCount = 0;
    lastResetTime = now;
  }
  
  // Check if we're approaching the limit (1000 requests/month)
  if (requestCount >= 950) {
    console.warn('Approaching Finage API rate limit');
    return false;
  }
  
  requestCount++;
  return true;
};

// Error handling helper
export const handleFinageError = (error) => {
  if (error.message.includes('401')) {
    return 'Invalid API key. Please check your Finage API configuration.';
  } else if (error.message.includes('429')) {
    return 'Rate limit exceeded. Please try again later.';
  } else if (error.message.includes('404')) {
    return 'Stock symbol not found.';
  } else {
    return 'Unable to fetch stock data. Please try again later.';
  }
};
