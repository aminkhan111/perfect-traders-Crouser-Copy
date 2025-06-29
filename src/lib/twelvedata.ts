const API_KEY = '75ce927339114b60809c1d00eb62c98a';
const BASE_URL = 'https://api.twelvedata.com';

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  change_percent: number;
}

export async function fetchStockQuote(symbol: string): Promise<StockQuote> {
  try {
    const response = await fetch(
      `${BASE_URL}/quote?symbol=${symbol}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stock data for ${symbol}`);
    }

    const data = await response.json();
    
    return {
      symbol: data.symbol,
      name: data.name,
      price: parseFloat(data.price),
      change: parseFloat(data.change),
      change_percent: parseFloat(data.percent_change)
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    throw error;
  }
} 