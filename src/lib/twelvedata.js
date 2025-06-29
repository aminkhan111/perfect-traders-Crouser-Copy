const API_KEY = '75ce927339114b60809c1d00eb62c98a';
const BASE_URL = 'https://api.twelvedata.com';

export async function fetchStockQuote(symbol) {
  try {
    const response = await fetch(
      `${BASE_URL}/quote?symbol=${symbol}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stock data for ${symbol}`);
    }

    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message || `Failed to fetch stock data for ${symbol}`);
    }
    
    return {
      symbol: data.symbol,
      name: data.name,
      price: parseFloat(data.price),
      change: parseFloat(data.change),
      changePercent: parseFloat(data.percent_change),
      volume: parseInt(data.volume),
      marketCap: parseFloat(data.market_cap) || 0
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    throw error;
  }
} 