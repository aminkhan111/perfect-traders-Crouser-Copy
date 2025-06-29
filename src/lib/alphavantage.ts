// Alpha Vantage API integration for real-time stock data
const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || '3HTNOZ91ING4CIY8';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface AlphaVantageQuote {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latestTradingDay: string;
  previousClose: string;
  change: string;
  changePercent: string;
}

export interface AlphaVantageResponse {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
}

export interface AlphaVantageSearchResult {
  'bestMatches': Array<{
    '1. symbol': string;
    '2. name': string;
    '3. type': string;
    '4. region': string;
    '5. marketOpen': string;
    '6. marketClose': string;
    '7. timezone': string;
    '8. currency': string;
    '9. matchScore': string;
  }>;
}

// Fetch real-time quote for a single stock
export async function fetchStockQuote(symbol: string): Promise<AlphaVantageQuote | null> {
  try {
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: AlphaVantageResponse = await response.json();
    
    // Check if we have valid data
    if (!data['Global Quote'] || !data['Global Quote']['01. symbol']) {
      console.warn(`No data found for symbol: ${symbol}`);
      return null;
    }
    
    const quote = data['Global Quote'];
    
    return {
      symbol: quote['01. symbol'],
      open: quote['02. open'],
      high: quote['03. high'],
      low: quote['04. low'],
      price: quote['05. price'],
      volume: quote['06. volume'],
      latestTradingDay: quote['07. latest trading day'],
      previousClose: quote['08. previous close'],
      change: quote['09. change'],
      changePercent: quote['10. change percent'].replace('%', '')
    };
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    return null;
  }
}

// Fetch quotes for multiple stocks (with rate limiting)
export async function fetchMultipleStockQuotes(symbols: string[]): Promise<AlphaVantageQuote[]> {
  const quotes: AlphaVantageQuote[] = [];
  
  // Alpha Vantage free tier allows 5 API requests per minute
  // We'll add a delay between requests to avoid rate limiting
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    
    try {
      const quote = await fetchStockQuote(symbol);
      if (quote) {
        quotes.push(quote);
      }
      
      // Add delay between requests (12 seconds = 5 requests per minute)
      if (i < symbols.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 12000));
      }
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
    }
  }
  
  return quotes;
}

// Search for stocks by keyword
export async function searchStocks(keyword: string): Promise<AlphaVantageSearchResult['bestMatches'] | null> {
  try {
    const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(keyword)}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: AlphaVantageSearchResult = await response.json();
    
    return data.bestMatches || null;
  } catch (error) {
    console.error('Error searching stocks:', error);
    return null;
  }
}

// Get intraday data for a stock (1min, 5min, 15min, 30min, 60min)
export async function fetchIntradayData(symbol: string, interval: '1min' | '5min' | '15min' | '30min' | '60min' = '5min') {
  try {
    const url = `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error(`Error fetching intraday data for ${symbol}:`, error);
    return null;
  }
}

// Convert Alpha Vantage quote to our StockData format
export function convertToStockData(quote: AlphaVantageQuote): any {
  const change = parseFloat(quote.change);
  const changePercent = parseFloat(quote.changePercent);
  
  return {
    symbol: quote.symbol,
    open: parseFloat(quote.open),
    high: parseFloat(quote.high),
    low: parseFloat(quote.low),
    prevClose: parseFloat(quote.previousClose),
    ltp: parseFloat(quote.price),
    change: changePercent,
    volume: parseInt(quote.volume),
    value: (parseFloat(quote.price) * parseInt(quote.volume)) / 100000, // Convert to lakhs
    ca: '-', // Corporate actions not available from Alpha Vantage
    color: change >= 0 ? 'green' : 'red'
  };
}

// Rate limiting helper
export class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private timeWindow: number;

  constructor(maxRequests: number = 5, timeWindowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    
    // Remove old requests outside the time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    // If we've hit the limit, wait
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = this.timeWindow - (now - oldestRequest) + 1000; // Add 1 second buffer
      
      if (waitTime > 0) {
        console.log(`Rate limit reached. Waiting ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    // Record this request
    this.requests.push(now);
  }
}
