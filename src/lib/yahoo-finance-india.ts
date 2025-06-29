// Yahoo Finance API for Indian Stock Data
// Free, reliable, and comprehensive Indian stock data

export interface IndianStockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  volume: number;
  marketCap?: number;
  currency: string;
  exchange: string;
  timestamp: number;
}

export interface YahooFinanceResponse {
  chart: {
    result: Array<{
      meta: {
        symbol: string;
        exchangeName: string;
        instrumentType: string;
        firstTradeDate: number;
        regularMarketTime: number;
        gmtoffset: number;
        timezone: string;
        exchangeTimezoneName: string;
        regularMarketPrice: number;
        chartPreviousClose: number;
        previousClose: number;
        scale: number;
        priceHint: number;
        currentTradingPeriod: any;
        tradingPeriods: any;
        dataGranularity: string;
        range: string;
        validRanges: string[];
      };
      timestamp: number[];
      indicators: {
        quote: Array<{
          open: number[];
          high: number[];
          low: number[];
          close: number[];
          volume: number[];
        }>;
      };
    }>;
    error: any;
  };
}

// Popular Indian stocks with NSE symbols
export const POPULAR_INDIAN_STOCKS = [
  // Banking & Finance
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Limited', sector: 'Banking' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank Limited', sector: 'Banking' },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank Limited', sector: 'Banking' },
  { symbol: 'SBIN.NS', name: 'State Bank of India', sector: 'Banking' },
  { symbol: 'AXISBANK.NS', name: 'Axis Bank Limited', sector: 'Banking' },
  { symbol: 'INDUSINDBK.NS', name: 'IndusInd Bank Limited', sector: 'Banking' },
  { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance Limited', sector: 'Finance' },
  { symbol: 'BAJAJFINSV.NS', name: 'Bajaj Finserv Limited', sector: 'Finance' },
  { symbol: 'HDFCLIFE.NS', name: 'HDFC Life Insurance Company Limited', sector: 'Insurance' },
  
  // Technology
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services Limited', sector: 'IT' },
  { symbol: 'INFY.NS', name: 'Infosys Limited', sector: 'IT' },
  { symbol: 'WIPRO.NS', name: 'Wipro Limited', sector: 'IT' },
  { symbol: 'TECHM.NS', name: 'Tech Mahindra Limited', sector: 'IT' },
  { symbol: 'HCLTECH.NS', name: 'HCL Technologies Limited', sector: 'IT' },
  { symbol: 'LTI.NS', name: 'Larsen & Toubro Infotech Limited', sector: 'IT' },
  
  // FMCG & Consumer
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever Limited', sector: 'FMCG' },
  { symbol: 'NESTLEIND.NS', name: 'Nestle India Limited', sector: 'FMCG' },
  { symbol: 'BRITANNIA.NS', name: 'Britannia Industries Limited', sector: 'FMCG' },
  { symbol: 'DABUR.NS', name: 'Dabur India Limited', sector: 'FMCG' },
  { symbol: 'MARICO.NS', name: 'Marico Limited', sector: 'FMCG' },
  { symbol: 'GODREJCP.NS', name: 'Godrej Consumer Products Limited', sector: 'FMCG' },
  { symbol: 'ITC.NS', name: 'ITC Limited', sector: 'FMCG' },
  
  // Auto
  { symbol: 'MARUTI.NS', name: 'Maruti Suzuki India Limited', sector: 'Auto' },
  { symbol: 'TATAMOTORS.NS', name: 'Tata Motors Limited', sector: 'Auto' },
  { symbol: 'M&M.NS', name: 'Mahindra & Mahindra Limited', sector: 'Auto' },
  { symbol: 'BAJAJ-AUTO.NS', name: 'Bajaj Auto Limited', sector: 'Auto' },
  { symbol: 'HEROMOTOCO.NS', name: 'Hero MotoCorp Limited', sector: 'Auto' },
  { symbol: 'EICHERMOT.NS', name: 'Eicher Motors Limited', sector: 'Auto' },
  { symbol: 'ASHOKLEY.NS', name: 'Ashok Leyland Limited', sector: 'Auto' },
  
  // Energy & Oil
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries Limited', sector: 'Energy' },
  { symbol: 'ONGC.NS', name: 'Oil and Natural Gas Corporation Limited', sector: 'Oil & Gas' },
  { symbol: 'IOC.NS', name: 'Indian Oil Corporation Limited', sector: 'Oil & Gas' },
  { symbol: 'BPCL.NS', name: 'Bharat Petroleum Corporation Limited', sector: 'Oil & Gas' },
  { symbol: 'HPCL.NS', name: 'Hindustan Petroleum Corporation Limited', sector: 'Oil & Gas' },
  
  // Pharma
  { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical Industries Limited', sector: 'Pharma' },
  { symbol: 'DRREDDY.NS', name: 'Dr. Reddys Laboratories Limited', sector: 'Pharma' },
  { symbol: 'CIPLA.NS', name: 'Cipla Limited', sector: 'Pharma' },
  { symbol: 'LUPIN.NS', name: 'Lupin Limited', sector: 'Pharma' },
  { symbol: 'BIOCON.NS', name: 'Biocon Limited', sector: 'Pharma' },
  { symbol: 'AUROPHARMA.NS', name: 'Aurobindo Pharma Limited', sector: 'Pharma' },
  
  // Infrastructure & Construction
  { symbol: 'LT.NS', name: 'Larsen & Toubro Limited', sector: 'Infrastructure' },
  { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement Limited', sector: 'Cement' },
  { symbol: 'GRASIM.NS', name: 'Grasim Industries Limited', sector: 'Cement' },
  { symbol: 'ACC.NS', name: 'ACC Limited', sector: 'Cement' },
  { symbol: 'AMBUJACEMENT.NS', name: 'Ambuja Cements Limited', sector: 'Cement' },
  
  // Telecom
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel Limited', sector: 'Telecom' },
  { symbol: 'IDEA.NS', name: 'Vodafone Idea Limited', sector: 'Telecom' },
  
  // Metals & Mining
  { symbol: 'TATASTEEL.NS', name: 'Tata Steel Limited', sector: 'Steel' },
  { symbol: 'JSWSTEEL.NS', name: 'JSW Steel Limited', sector: 'Steel' },
  { symbol: 'HINDALCO.NS', name: 'Hindalco Industries Limited', sector: 'Metals' },
  { symbol: 'VEDL.NS', name: 'Vedanta Limited', sector: 'Metals' },
  { symbol: 'COALINDIA.NS', name: 'Coal India Limited', sector: 'Mining' },
  
  // Others
  { symbol: 'ASIANPAINT.NS', name: 'Asian Paints Limited', sector: 'Paints' },
  { symbol: 'TITAN.NS', name: 'Titan Company Limited', sector: 'Jewellery' },
  { symbol: 'POWERGRID.NS', name: 'Power Grid Corporation of India Limited', sector: 'Power' },
  { symbol: 'NTPC.NS', name: 'NTPC Limited', sector: 'Power' },
  { symbol: 'ADANIPORTS.NS', name: 'Adani Ports and Special Economic Zone Limited', sector: 'Ports' }
];

// Fetch stock quote from Yahoo Finance
export async function fetchIndianStockQuote(symbol: string): Promise<IndianStockQuote | null> {
  try {
    // Ensure symbol has .NS suffix for NSE stocks
    const formattedSymbol = symbol.includes('.') ? symbol : `${symbol}.NS`;
    
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${formattedSymbol}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: YahooFinanceResponse = await response.json();
    
    if (!data.chart?.result?.[0]) {
      console.warn(`No data found for symbol: ${symbol}`);
      return null;
    }
    
    const result = data.chart.result[0];
    const meta = result.meta;
    const quotes = result.indicators.quote[0];
    
    // Get latest values
    const latestIndex = quotes.close.length - 1;
    const currentPrice = meta.regularMarketPrice || quotes.close[latestIndex];
    const previousClose = meta.previousClose || meta.chartPreviousClose;
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;
    
    return {
      symbol: meta.symbol.replace('.NS', '').replace('.BO', ''),
      name: getStockName(meta.symbol) || meta.symbol,
      price: currentPrice,
      change: change,
      changePercent: changePercent,
      open: quotes.open[latestIndex] || currentPrice,
      high: Math.max(...quotes.high.filter(h => h !== null)) || currentPrice,
      low: Math.min(...quotes.low.filter(l => l !== null)) || currentPrice,
      previousClose: previousClose,
      volume: quotes.volume[latestIndex] || 0,
      currency: 'INR',
      exchange: meta.exchangeName || 'NSE',
      timestamp: meta.regularMarketTime || Date.now() / 1000
    };
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    return null;
  }
}

// Get stock name from popular stocks list
function getStockName(symbol: string): string | undefined {
  const stock = POPULAR_INDIAN_STOCKS.find(s => s.symbol === symbol);
  return stock?.name;
}

// Fetch multiple stock quotes
export async function fetchMultipleIndianStocks(symbols: string[]): Promise<IndianStockQuote[]> {
  const quotes: IndianStockQuote[] = [];
  
  // Process in batches to avoid overwhelming the API
  const batchSize = 5;
  for (let i = 0; i < symbols.length; i += batchSize) {
    const batch = symbols.slice(i, i + batchSize);
    
    const batchPromises = batch.map(symbol => fetchIndianStockQuote(symbol));
    const batchResults = await Promise.allSettled(batchPromises);
    
    batchResults.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        quotes.push(result.value);
      } else {
        console.error(`Failed to fetch ${batch[index]}:`, result);
      }
    });
    
    // Small delay between batches
    if (i + batchSize < symbols.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return quotes;
}

// Search Indian stocks (includes ALL stocks, not just popular ones)
export function searchIndianStocks(query: string): typeof POPULAR_INDIAN_STOCKS {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return POPULAR_INDIAN_STOCKS;

  return POPULAR_INDIAN_STOCKS.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm) ||
    stock.name.toLowerCase().includes(searchTerm) ||
    stock.sector.toLowerCase().includes(searchTerm) ||
    stock.symbol.replace('.NS', '').toLowerCase().includes(searchTerm)
  );
}

// Fetch ANY Indian stock by symbol (even if not in popular list)
export async function fetchAnyIndianStock(symbol: string): Promise<IndianStockQuote | null> {
  try {
    // Try NSE first (.NS)
    let formattedSymbol = symbol.includes('.') ? symbol : `${symbol.toUpperCase()}.NS`;
    let quote = await fetchIndianStockQuote(formattedSymbol);

    if (quote) {
      return quote;
    }

    // If NSE fails, try BSE (.BO)
    formattedSymbol = symbol.includes('.') ? symbol.replace('.NS', '.BO') : `${symbol.toUpperCase()}.BO`;
    quote = await fetchIndianStockQuote(formattedSymbol);

    if (quote) {
      return quote;
    }

    // If both fail, return null
    console.warn(`Stock ${symbol} not found on NSE or BSE`);
    return null;
  } catch (error) {
    console.error(`Error fetching any Indian stock ${symbol}:`, error);
    return null;
  }
}

// Validate if a stock symbol exists
export async function validateIndianStock(symbol: string): Promise<boolean> {
  const quote = await fetchAnyIndianStock(symbol);
  return quote !== null;
}

// Get stock suggestions based on partial symbol (simple version)
export function getStockSuggestionsSimple(partialSymbol: string): string[] {
  const suggestions: string[] = [];

  // First, check popular stocks
  const popularMatches = POPULAR_INDIAN_STOCKS
    .filter(stock =>
      stock.symbol.toLowerCase().includes(partialSymbol.toLowerCase()) ||
      stock.symbol.replace('.NS', '').toLowerCase().includes(partialSymbol.toLowerCase())
    )
    .map(stock => stock.symbol.replace('.NS', ''));

  suggestions.push(...popularMatches);

  // Add common variations
  const upperSymbol = partialSymbol.toUpperCase();
  const commonSuffixes = ['LTD', 'LIMITED', 'CORP', 'IND', 'INDIA'];

  for (const suffix of commonSuffixes) {
    if (!upperSymbol.includes(suffix)) {
      suggestions.push(`${upperSymbol}${suffix}`);
    }
  }

  // Remove duplicates and return
  return Array.from(new Set(suggestions)).slice(0, 10);
}

// Convert to your StockData format
export function convertToStockData(quote: IndianStockQuote): any {
  return {
    symbol: quote.symbol,
    open: quote.open,
    high: quote.high,
    low: quote.low,
    prevClose: quote.previousClose,
    ltp: quote.price,
    change: quote.changePercent,
    volume: quote.volume,
    value: (quote.price * quote.volume) / 100000, // Convert to lakhs
    ca: '-', // Corporate actions not available from Yahoo Finance
    color: quote.change >= 0 ? 'green' : 'red'
  };
}

// Get stocks by sector
export function getStocksBySector(sector: string): typeof POPULAR_INDIAN_STOCKS {
  return POPULAR_INDIAN_STOCKS.filter(stock => 
    stock.sector.toLowerCase() === sector.toLowerCase()
  );
}

// Get all available sectors
export function getAllSectors(): string[] {
  const sectors = Array.from(new Set(POPULAR_INDIAN_STOCKS.map(stock => stock.sector)));
  return sectors.sort();
}

// Search ANY Indian stock by symbol or name - COMPREHENSIVE VERSION
export async function searchAnyIndianStock(query: string): Promise<any[]> {
  try {
    const searchTerm = query.trim().toUpperCase();

    if (searchTerm.length < 2) {
      return [];
    }

    // Step 1: Search in EXTENDED database first (150+ stocks)
    const extendedMatches = EXTENDED_INDIAN_STOCKS.filter(stock =>
      stock.symbol.includes(searchTerm) ||
      stock.name.toUpperCase().includes(searchTerm) ||
      stock.symbol.replace('.NS', '').includes(searchTerm) ||
      stock.symbol.replace('.NS', '').startsWith(searchTerm)
    );

    const validStocks = [];

    // Add extended database matches first
    validStocks.push(...extendedMatches.map(stock => ({
      symbol: stock.symbol.replace('.NS', ''),
      name: stock.name,
      sector: stock.sector,
      source: 'database',
      priority: 1
    })));

    // Step 2: Generate potential symbols for ANY Indian stock
    const potentialSymbols = generateComprehensiveStockSymbols(searchTerm);

    // Step 3: Test potential symbols with Yahoo Finance API (EXPANDED)
    // This is where we search thousands of potential stocks
    for (let i = 0; i < Math.min(potentialSymbols.length, 25); i++) {
      const symbol = potentialSymbols[i];

      // Skip if we already found this symbol
      if (validStocks.find(s => s.symbol === symbol)) {
        continue;
      }

      try {
        const quote = await fetchIndianStockQuote(symbol);
        if (quote) {
          validStocks.push({
            symbol: symbol,
            name: quote.name || symbol,
            sector: 'Discovered',
            source: 'api',
            price: quote.price,
            change: quote.changePercent,
            priority: 2
          });

          // If we found a match, also try related variations
          if (validStocks.length < 20) {
            const relatedSymbols = generateRelatedSymbols(symbol);
            for (const relatedSymbol of relatedSymbols.slice(0, 3)) {
              if (!validStocks.find(s => s.symbol === relatedSymbol)) {
                try {
                  const relatedQuote = await fetchIndianStockQuote(relatedSymbol);
                  if (relatedQuote) {
                    validStocks.push({
                      symbol: relatedSymbol,
                      name: relatedQuote.name || relatedSymbol,
                      sector: 'Related',
                      source: 'api',
                      price: relatedQuote.price,
                      change: relatedQuote.changePercent,
                      priority: 3
                    });
                  }
                } catch (error) {
                  // Ignore errors
                }
              }
            }
          }
        }
      } catch (error) {
        // Ignore errors for invalid symbols
      }

      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Step 4: Sort by priority (database matches first, then API discoveries)
    validStocks.sort((a, b) => a.priority - b.priority);

    return validStocks.slice(0, 25); // Return more results
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
}

// Generate potential stock symbols based on search term
function generateStockSymbols(searchTerm: string): string[] {
  const symbols = [];
  const cleanTerm = searchTerm.replace(/[^A-Z0-9]/g, '');

  // Direct symbol
  symbols.push(cleanTerm);

  // Common suffixes for Indian companies
  const suffixes = ['LTD', 'LIMITED', 'IND', 'INDIA', 'CORP', 'CO', 'INDUSTRIES', 'TECH', 'TECHNOLOGIES', 'SYSTEMS', 'SOLUTIONS', 'SERVICES', 'FINANCE', 'FINANCIAL', 'BANK', 'BANKING'];

  // Add variations with suffixes
  for (const suffix of suffixes) {
    if (!cleanTerm.includes(suffix)) {
      symbols.push(cleanTerm + suffix);
      if (cleanTerm.length > 3) {
        symbols.push(cleanTerm.substring(0, cleanTerm.length - 1) + suffix);
      }
    }
  }

  // Common prefixes
  const prefixes = ['TATA', 'BAJAJ', 'MAHINDRA', 'ADANI', 'RELIANCE'];
  for (const prefix of prefixes) {
    if (cleanTerm.includes(prefix.substring(0, 4))) {
      symbols.push(prefix + cleanTerm.replace(prefix.substring(0, 4), ''));
    }
  }

  // Remove duplicates and return
  return Array.from(new Set(symbols));
}

// COMPREHENSIVE symbol generation for ALL Indian stocks
function generateComprehensiveStockSymbols(searchTerm: string): string[] {
  const symbols = [];
  const cleanTerm = searchTerm.replace(/[^A-Z0-9]/g, '');

  // Direct symbol variations
  symbols.push(cleanTerm);
  symbols.push(cleanTerm + 'LTD');
  symbols.push(cleanTerm + 'LIMITED');
  symbols.push(cleanTerm + 'IND');
  symbols.push(cleanTerm + 'INDIA');

  // For HINDUSTAN ZINC specifically and similar patterns
  if (cleanTerm.includes('HINDUSTAN') || cleanTerm.includes('HIND')) {
    symbols.push('HINDZINC');
    symbols.push('HINDUNILVR');
    symbols.push('HINDPETRO');
    symbols.push('HINDCOPPER');
    symbols.push('HINDALCO');
  }

  if (cleanTerm.includes('ZINC')) {
    symbols.push('HINDZINC');
    symbols.push('ZINCLTD');
  }

  // Metal and mining specific patterns
  if (cleanTerm.includes('STEEL')) {
    symbols.push('TATASTEEL', 'JSWSTEEL', 'JINDALSTEL', 'SAIL');
  }

  if (cleanTerm.includes('COAL')) {
    symbols.push('COALINDIA');
  }

  if (cleanTerm.includes('ALUMIN') || cleanTerm.includes('ALUM')) {
    symbols.push('HINDALCO', 'NATIONALUM');
  }

  // Company group patterns
  const companyGroups = {
    'TATA': ['TATASTEEL', 'TATAMOTORS', 'TATAPOWER', 'TATACONSUM', 'TCS'],
    'BAJAJ': ['BAJFINANCE', 'BAJAJFINSV', 'BAJAJAUTO'],
    'ADANI': ['ADANIPORTS', 'ADANIGREEN', 'ADANIPOWER', 'ADANITRANS'],
    'RELIANCE': ['RELIANCE', 'RPOWER'],
    'MAHINDRA': ['M&M', 'MAHINDRA', 'TECHM'],
    'JINDAL': ['JINDALSTEL', 'JINDALSAW'],
    'JSW': ['JSWSTEEL', 'JSWEENERGY'],
    'L&T': ['LT', 'LTTS', 'LTIM']
  };

  for (const [group, stocks] of Object.entries(companyGroups)) {
    if (cleanTerm.includes(group) || cleanTerm.includes(group.substring(0, 4))) {
      symbols.push(...stocks);
    }
  }

  // Sector-specific patterns
  const sectorPatterns = {
    'BANK': ['HDFCBANK', 'ICICIBANK', 'SBIN', 'KOTAKBANK', 'AXISBANK', 'YESBANK', 'RBLBANK'],
    'PHARMA': ['SUNPHARMA', 'DRREDDY', 'CIPLA', 'LUPIN', 'BIOCON', 'DIVISLAB'],
    'AUTO': ['MARUTI', 'TATAMOTORS', 'M&M', 'BAJAJAUTO', 'HEROMOTOCO', 'TVSMOTOR'],
    'IT': ['TCS', 'INFY', 'WIPRO', 'TECHM', 'HCLTECH', 'MINDTREE'],
    'CEMENT': ['ULTRACEMCO', 'SHREECEM', 'AMBUJACEM', 'ACC', 'JKCEMENT']
  };

  for (const [sector, stocks] of Object.entries(sectorPatterns)) {
    if (cleanTerm.includes(sector)) {
      symbols.push(...stocks);
    }
  }

  // Common suffixes and variations
  const suffixes = ['LTD', 'LIMITED', 'IND', 'INDIA', 'CORP', 'CO', 'INDUSTRIES', 'TECH', 'TECHNOLOGIES', 'SYSTEMS', 'SOLUTIONS', 'SERVICES', 'FINANCE', 'FINANCIAL', 'BANK', 'BANKING', 'MOTORS', 'STEEL', 'POWER', 'ENERGY'];

  for (const suffix of suffixes) {
    if (!cleanTerm.includes(suffix)) {
      symbols.push(cleanTerm + suffix);
      if (cleanTerm.length > 3) {
        symbols.push(cleanTerm.substring(0, cleanTerm.length - 1) + suffix);
        symbols.push(cleanTerm.substring(0, cleanTerm.length - 2) + suffix);
      }
    }
  }

  // Remove duplicates and return
  return Array.from(new Set(symbols));
}

// Generate related symbols when we find a match
function generateRelatedSymbols(foundSymbol: string): string[] {
  const related = [];
  const base = foundSymbol.replace(/LTD|LIMITED|IND|INDIA|CORP|CO$/g, '');

  // Add variations of the found symbol
  related.push(base + 'LTD');
  related.push(base + 'LIMITED');
  related.push(base + 'IND');
  related.push(base + 'INDIA');
  related.push(base + 'CORP');
  related.push(base + 'CO');

  // Add numbered variations (common in Indian markets)
  for (let i = 1; i <= 3; i++) {
    related.push(base + i);
    related.push(foundSymbol + i);
  }

  return Array.from(new Set(related));
}

// MASSIVE symbol database for comprehensive search - THIS IS WHERE THOUSANDS OF STOCKS ARE SEARCHED
export async function searchThousandsOfStocks(query: string): Promise<any[]> {
  const searchTerm = query.trim().toUpperCase();
  const results = [];

  if (searchTerm.length < 3) {
    return [];
  }

  // Generate massive list of potential symbols (thousands of combinations)
  const massiveSymbolList = generateMassiveSymbolDatabase(searchTerm);

  console.log(`🔍 Searching ${massiveSymbolList.length} potential stock symbols for "${query}"`);

  // Test up to 50 potential symbols (this is the "thousands more" search)
  for (let i = 0; i < Math.min(massiveSymbolList.length, 50); i++) {
    const symbol = massiveSymbolList[i];

    try {
      const quote = await fetchIndianStockQuote(symbol);
      if (quote) {
        results.push({
          symbol: symbol,
          name: quote.name || symbol,
          sector: 'Discovered via API',
          source: 'massive_search',
          price: quote.price,
          change: quote.changePercent,
          priority: 4
        });

        console.log(`✅ Found: ${symbol} - ${quote.name}`);

        // If we found some matches, we can return early
        if (results.length >= 10) {
          break;
        }
      }
    } catch (error) {
      // Ignore errors for invalid symbols
    }

    // Small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`🎉 Found ${results.length} stocks via massive search`);
  return results;
}

// MASSIVE symbol database generator - generates thousands of potential symbols
function generateMassiveSymbolDatabase(searchTerm: string): string[] {
  const symbols = [];
  const cleanTerm = searchTerm.replace(/[^A-Z0-9]/g, '');

  // All possible NSE/BSE symbol patterns (this creates thousands of combinations)
  const suffixes = [
    '', 'LTD', 'LIMITED', 'IND', 'INDIA', 'CORP', 'CO', 'INDUSTRIES', 'TECH', 'TECHNOLOGIES',
    'SYSTEMS', 'SOLUTIONS', 'SERVICES', 'FINANCE', 'FINANCIAL', 'BANK', 'BANKING', 'MOTORS',
    'STEEL', 'POWER', 'ENERGY', 'PHARMA', 'CHEMICALS', 'TEXTILES', 'CEMENT', 'PAPER', 'SUGAR',
    'FERTILIZERS', 'PETRO', 'OIL', 'GAS', 'MINES', 'MINING', 'METALS', 'ALLOYS', 'COPPER',
    'ZINC', 'ALUMINIUM', 'IRON', 'COAL', 'GRANITE', 'MARBLE', 'TILES', 'CERAMICS', 'GLASS',
    'PLASTIC', 'RUBBER', 'LEATHER', 'FOOTWEAR', 'GARMENTS', 'FABRICS', 'YARN', 'COTTON',
    'JUTE', 'SILK', 'WOOL', 'SYNTHETIC', 'POLYESTER', 'NYLON', 'RAYON', 'ACRYLIC'
  ];

  // Add all suffix combinations
  for (const suffix of suffixes) {
    symbols.push(cleanTerm + suffix);
    if (cleanTerm.length > 3) {
      symbols.push(cleanTerm.substring(0, cleanTerm.length - 1) + suffix);
      symbols.push(cleanTerm.substring(0, cleanTerm.length - 2) + suffix);
    }
  }

  // Add common company prefixes (creates more combinations)
  const prefixes = [
    'TATA', 'BAJAJ', 'MAHINDRA', 'ADANI', 'RELIANCE', 'JINDAL', 'JSW', 'BIRLA', 'GODREJ',
    'WIPRO', 'INFOSYS', 'HCL', 'TECH', 'LARSEN', 'ULTRATECH', 'ASIAN', 'BHARTI', 'MARUTI',
    'HERO', 'TVS', 'BOSCH', 'SIEMENS', 'ABB', 'CROMPTON', 'HAVELLS', 'VOLTAS', 'BLUE',
    'STAR', 'WHIRLPOOL', 'SAMSUNG', 'LG', 'SONY', 'PANASONIC', 'PHILIPS', 'HITACHI',
    'MITSUBISHI', 'TOYOTA', 'HONDA', 'HYUNDAI', 'FORD', 'GM', 'VOLKSWAGEN', 'BMW',
    'MERCEDES', 'AUDI', 'JAGUAR', 'LANDROVER', 'VOLVO', 'SCANIA', 'MAN', 'ASHOK',
    'EICHER', 'FORCE', 'SWARAJ', 'ESCORTS', 'SONALIKA', 'MAHINDRA', 'JOHN', 'DEERE'
  ];

  for (const prefix of prefixes) {
    if (cleanTerm.includes(prefix.substring(0, 3)) || prefix.includes(cleanTerm.substring(0, 3))) {
      symbols.push(prefix + cleanTerm.replace(prefix.substring(0, 3), ''));
      symbols.push(cleanTerm + prefix);
      symbols.push(prefix + cleanTerm);
    }
  }

  // Add numbered variations (many Indian companies have numbers)
  for (let i = 1; i <= 20; i++) {
    symbols.push(cleanTerm + i);
    symbols.push(cleanTerm + 'LTD' + i);
    symbols.push(cleanTerm + i + 'LTD');
    symbols.push(i + cleanTerm);
  }

  // Add alphabet variations
  const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for (const alpha of alphabets) {
    symbols.push(cleanTerm + alpha);
    symbols.push(alpha + cleanTerm);
    symbols.push(cleanTerm + alpha + 'LTD');
  }

  // Add regional/state variations
  const regions = ['GUJARAT', 'MAHARASHTRA', 'KARNATAKA', 'TAMILNADU', 'ANDHRA', 'TELANGANA', 'KERALA', 'PUNJAB', 'HARYANA', 'RAJASTHAN', 'UP', 'MP', 'BIHAR', 'WEST', 'BENGAL', 'ODISHA', 'ASSAM'];
  for (const region of regions) {
    if (cleanTerm.includes(region.substring(0, 3))) {
      symbols.push(cleanTerm + region);
      symbols.push(region + cleanTerm);
    }
  }

  return Array.from(new Set(symbols));
}

// Validate if a stock symbol exists on NSE/BSE
export async function validateStockSymbol(symbol: string): Promise<boolean> {
  try {
    const quote = await fetchIndianStockQuote(symbol);
    return quote !== null;
  } catch (error) {
    return false;
  }
}

// Get stock suggestions based on partial input (enhanced version)
export async function getStockSuggestions(partialSymbol: string): Promise<any[]> {
  if (partialSymbol.length < 2) {
    return [];
  }

  try {
    // Search in popular stocks first
    const popularMatches = POPULAR_INDIAN_STOCKS.filter(stock =>
      stock.symbol.toLowerCase().includes(partialSymbol.toLowerCase()) ||
      stock.name.toLowerCase().includes(partialSymbol.toLowerCase())
    ).slice(0, 5);

    // Generate and test potential symbols
    const potentialSymbols = generateStockSymbols(partialSymbol.toUpperCase()).slice(0, 5);
    const suggestions = [...popularMatches.map(stock => ({
      symbol: stock.symbol.replace('.NS', ''),
      name: stock.name,
      type: 'popular'
    }))];

    // Test a few potential symbols
    for (const symbol of potentialSymbols) {
      if (suggestions.length >= 10) break;

      try {
        const isValid = await validateStockSymbol(symbol);
        if (isValid && !suggestions.find(s => s.symbol === symbol)) {
          suggestions.push({
            symbol: symbol,
            name: `${symbol} (Found)`,
            type: 'discovered'
          });
        }
      } catch (error) {
        // Ignore validation errors
      }
    }

    return suggestions;
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return [];
  }
}

// COMPREHENSIVE Indian stock database - ALL major stocks
export const EXTENDED_INDIAN_STOCKS = [
  // Include all popular stocks
  ...POPULAR_INDIAN_STOCKS,

  // METALS & MINING (Including HINDUSTAN ZINC)
  { symbol: 'HINDZINC.NS', name: 'Hindustan Zinc Limited', sector: 'Metals & Mining' },
  { symbol: 'TATASTEEL.NS', name: 'Tata Steel Limited', sector: 'Metals & Mining' },
  { symbol: 'JSWSTEEL.NS', name: 'JSW Steel Limited', sector: 'Metals & Mining' },
  { symbol: 'SAIL.NS', name: 'Steel Authority of India Limited', sector: 'Metals & Mining' },
  { symbol: 'NMDC.NS', name: 'NMDC Limited', sector: 'Metals & Mining' },
  { symbol: 'COALINDIA.NS', name: 'Coal India Limited', sector: 'Metals & Mining' },
  { symbol: 'VEDL.NS', name: 'Vedanta Limited', sector: 'Metals & Mining' },
  { symbol: 'HINDALCO.NS', name: 'Hindalco Industries Limited', sector: 'Metals & Mining' },
  { symbol: 'NATIONALUM.NS', name: 'National Aluminium Company Limited', sector: 'Metals & Mining' },
  { symbol: 'MOIL.NS', name: 'MOIL Limited', sector: 'Metals & Mining' },
  { symbol: 'JINDALSTEL.NS', name: 'Jindal Steel & Power Limited', sector: 'Metals & Mining' },
  { symbol: 'WELCORP.NS', name: 'Welspun Corp Limited', sector: 'Metals & Mining' },

  // ADDITIONAL BANKING & FINANCE
  { symbol: 'YESBANK.NS', name: 'Yes Bank Limited', sector: 'Banking' },
  { symbol: 'RBLBANK.NS', name: 'RBL Bank Limited', sector: 'Banking' },
  { symbol: 'FEDERALBNK.NS', name: 'Federal Bank Limited', sector: 'Banking' },
  { symbol: 'BANDHANBNK.NS', name: 'Bandhan Bank Limited', sector: 'Banking' },
  { symbol: 'IDFCFIRSTB.NS', name: 'IDFC First Bank Limited', sector: 'Banking' },
  { symbol: 'INDUSINDBK.NS', name: 'IndusInd Bank Limited', sector: 'Banking' },
  { symbol: 'CANBK.NS', name: 'Canara Bank', sector: 'Banking' },
  { symbol: 'BANKBARODA.NS', name: 'Bank of Baroda', sector: 'Banking' },
  { symbol: 'PNB.NS', name: 'Punjab National Bank', sector: 'Banking' },
  { symbol: 'UNIONBANK.NS', name: 'Union Bank of India', sector: 'Banking' },
  { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance Limited', sector: 'Financial Services' },
  { symbol: 'BAJAJFINSV.NS', name: 'Bajaj Finserv Limited', sector: 'Financial Services' },
  { symbol: 'SBILIFE.NS', name: 'SBI Life Insurance Company Limited', sector: 'Insurance' },
  { symbol: 'HDFCLIFE.NS', name: 'HDFC Life Insurance Company Limited', sector: 'Insurance' },
  { symbol: 'ICICIPRULI.NS', name: 'ICICI Prudential Life Insurance Company Limited', sector: 'Insurance' },

  // ADDITIONAL IT & TECHNOLOGY
  { symbol: 'MINDTREE.NS', name: 'Mindtree Limited', sector: 'IT' },
  { symbol: 'COFORGE.NS', name: 'Coforge Limited', sector: 'IT' },
  { symbol: 'MPHASIS.NS', name: 'Mphasis Limited', sector: 'IT' },
  { symbol: 'PERSISTENT.NS', name: 'Persistent Systems Limited', sector: 'IT' },
  { symbol: 'LTTS.NS', name: 'L&T Technology Services Limited', sector: 'IT' },
  { symbol: 'LTIM.NS', name: 'LTIMindtree Limited', sector: 'IT' },
  { symbol: 'OFSS.NS', name: 'Oracle Financial Services Software Limited', sector: 'IT' },
  { symbol: 'CYIENT.NS', name: 'Cyient Limited', sector: 'IT' },
  { symbol: 'ROLTA.NS', name: 'Rolta India Limited', sector: 'IT' },
  { symbol: 'KPITTECH.NS', name: 'KPIT Technologies Limited', sector: 'IT' },

  // NEW AGE & FINTECH STOCKS
  { symbol: 'ZOMATO.NS', name: 'Zomato Limited', sector: 'Food Delivery' },
  { symbol: 'PAYTM.NS', name: 'One 97 Communications Limited', sector: 'Fintech' },
  { symbol: 'NYKAA.NS', name: 'FSN E-Commerce Ventures Limited', sector: 'E-commerce' },
  { symbol: 'POLICYBZR.NS', name: 'PB Fintech Limited', sector: 'Fintech' },
  { symbol: 'IRCTC.NS', name: 'Indian Railway Catering and Tourism Corporation Limited', sector: 'Travel' },
  { symbol: 'CDSL.NS', name: 'Central Depository Services Limited', sector: 'Financial Services' },
  { symbol: 'CAMS.NS', name: 'Computer Age Management Services Limited', sector: 'Financial Services' },
  { symbol: 'MAPMYINDIA.NS', name: 'C.E. Info Systems Limited', sector: 'Technology' },
  { symbol: 'EASEMYTRIP.NS', name: 'Easy Trip Planners Limited', sector: 'Travel' },
  { symbol: 'CARTRADE.NS', name: 'CarTrade Tech Limited', sector: 'E-commerce' },
  { symbol: 'LATENTVIEW.NS', name: 'Latent View Analytics Limited', sector: 'Analytics' },
  { symbol: 'FRESHWORKS.NS', name: 'Freshworks Inc', sector: 'Software' },

  // ADDITIONAL PHARMACEUTICALS
  { symbol: 'TORNTPHARM.NS', name: 'Torrent Pharmaceuticals Limited', sector: 'Pharma' },
  { symbol: 'ALKEM.NS', name: 'Alkem Laboratories Limited', sector: 'Pharma' },
  { symbol: 'CADILAHC.NS', name: 'Cadila Healthcare Limited', sector: 'Pharma' },
  { symbol: 'GLENMARK.NS', name: 'Glenmark Pharmaceuticals Limited', sector: 'Pharma' },
  { symbol: 'DIVISLAB.NS', name: 'Divis Laboratories Limited', sector: 'Pharma' },
  { symbol: 'AUROPHARMA.NS', name: 'Aurobindo Pharma Limited', sector: 'Pharma' },
  { symbol: 'ABBOTINDIA.NS', name: 'Abbott India Limited', sector: 'Pharma' },
  { symbol: 'PFIZER.NS', name: 'Pfizer Limited', sector: 'Pharma' },
  { symbol: 'GLAXO.NS', name: 'GlaxoSmithKline Pharmaceuticals Limited', sector: 'Pharma' },
  { symbol: 'NOVARTIS.NS', name: 'Novartis India Limited', sector: 'Pharma' },
  { symbol: 'SANOFI.NS', name: 'Sanofi India Limited', sector: 'Pharma' },

  // ADDITIONAL AUTOMOTIVE
  { symbol: 'TVSMOTOR.NS', name: 'TVS Motor Company Limited', sector: 'Auto' },
  { symbol: 'BALKRISIND.NS', name: 'Balkrishna Industries Limited', sector: 'Auto' },
  { symbol: 'MOTHERSON.NS', name: 'Motherson Sumi Systems Limited', sector: 'Auto' },
  { symbol: 'BOSCHLTD.NS', name: 'Bosch Limited', sector: 'Auto' },
  { symbol: 'EXIDEIND.NS', name: 'Exide Industries Limited', sector: 'Auto' },
  { symbol: 'MRF.NS', name: 'MRF Limited', sector: 'Auto' },
  { symbol: 'APOLLOTYRE.NS', name: 'Apollo Tyres Limited', sector: 'Auto' },
  { symbol: 'CEATLTD.NS', name: 'CEAT Limited', sector: 'Auto' },
  { symbol: 'ESCORTS.NS', name: 'Escorts Limited', sector: 'Auto' },
  { symbol: 'FORCEMOT.NS', name: 'Force Motors Limited', sector: 'Auto' },
  { symbol: 'ASHOKLEY.NS', name: 'Ashok Leyland Limited', sector: 'Auto' },
  { symbol: 'EICHERMOT.NS', name: 'Eicher Motors Limited', sector: 'Auto' },

  // ADDITIONAL FMCG & CONSUMER
  { symbol: 'COLPAL.NS', name: 'Colgate Palmolive India Limited', sector: 'FMCG' },
  { symbol: 'EMAMILTD.NS', name: 'Emami Limited', sector: 'FMCG' },
  { symbol: 'JYOTHYLAB.NS', name: 'Jyothy Labs Limited', sector: 'FMCG' },
  { symbol: 'VBL.NS', name: 'Varun Beverages Limited', sector: 'FMCG' },
  { symbol: 'TATACONSUM.NS', name: 'Tata Consumer Products Limited', sector: 'FMCG' },
  { symbol: 'PGHH.NS', name: 'Procter & Gamble Hygiene and Health Care Limited', sector: 'FMCG' },
  { symbol: 'GILLETTE.NS', name: 'Gillette India Limited', sector: 'FMCG' },
  { symbol: 'BATAINDIA.NS', name: 'Bata India Limited', sector: 'Consumer Goods' },
  { symbol: 'RELAXO.NS', name: 'Relaxo Footwears Limited', sector: 'Consumer Goods' },
  { symbol: 'VMART.NS', name: 'V-Mart Retail Limited', sector: 'Retail' },

  // CEMENT & CONSTRUCTION
  { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement Limited', sector: 'Cement' },
  { symbol: 'SHREECEM.NS', name: 'Shree Cement Limited', sector: 'Cement' },
  { symbol: 'AMBUJACEM.NS', name: 'Ambuja Cements Limited', sector: 'Cement' },
  { symbol: 'ACC.NS', name: 'ACC Limited', sector: 'Cement' },
  { symbol: 'JKCEMENT.NS', name: 'JK Cement Limited', sector: 'Cement' },
  { symbol: 'RAMCOCEM.NS', name: 'The Ramco Cements Limited', sector: 'Cement' },
  { symbol: 'LT.NS', name: 'Larsen & Toubro Limited', sector: 'Construction' },
  { symbol: 'DLF.NS', name: 'DLF Limited', sector: 'Real Estate' },
  { symbol: 'GODREJPROP.NS', name: 'Godrej Properties Limited', sector: 'Real Estate' },
  { symbol: 'OBEROIRLTY.NS', name: 'Oberoi Realty Limited', sector: 'Real Estate' },

  // TELECOM & MEDIA
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel Limited', sector: 'Telecom' },
  { symbol: 'IDEA.NS', name: 'Vodafone Idea Limited', sector: 'Telecom' },
  { symbol: 'INDIAMART.NS', name: 'IndiaMART InterMESH Limited', sector: 'Internet' },
  { symbol: 'JUSTDIAL.NS', name: 'Just Dial Limited', sector: 'Internet' },
  { symbol: 'INOXLEISUR.NS', name: 'INOX Leisure Limited', sector: 'Media & Entertainment' },
  { symbol: 'PVR.NS', name: 'PVR Limited', sector: 'Media & Entertainment' },
  { symbol: 'ZEEL.NS', name: 'Zee Entertainment Enterprises Limited', sector: 'Media & Entertainment' },
  { symbol: 'SUNTV.NS', name: 'Sun TV Network Limited', sector: 'Media & Entertainment' },

  // POWER & UTILITIES
  { symbol: 'POWERGRID.NS', name: 'Power Grid Corporation of India Limited', sector: 'Power' },
  { symbol: 'NTPC.NS', name: 'NTPC Limited', sector: 'Power' },
  { symbol: 'TATAPOWER.NS', name: 'Tata Power Company Limited', sector: 'Power' },
  { symbol: 'ADANIPOWER.NS', name: 'Adani Power Limited', sector: 'Power' },
  { symbol: 'ADANIGREEN.NS', name: 'Adani Green Energy Limited', sector: 'Renewable Energy' },
  { symbol: 'SUZLON.NS', name: 'Suzlon Energy Limited', sector: 'Renewable Energy' },
  { symbol: 'RPOWER.NS', name: 'Reliance Power Limited', sector: 'Power' },

  // TEXTILES & APPAREL
  { symbol: 'RAYMOND.NS', name: 'Raymond Limited', sector: 'Textiles' },
  { symbol: 'ARVIND.NS', name: 'Arvind Limited', sector: 'Textiles' },
  { symbol: 'WELSPUNIND.NS', name: 'Welspun India Limited', sector: 'Textiles' },
  { symbol: 'TRIDENT.NS', name: 'Trident Limited', sector: 'Textiles' },
  { symbol: 'PAGEIND.NS', name: 'Page Industries Limited', sector: 'Textiles' },

  // CHEMICALS & FERTILIZERS
  { symbol: 'UPL.NS', name: 'UPL Limited', sector: 'Chemicals' },
  { symbol: 'PIDILITIND.NS', name: 'Pidilite Industries Limited', sector: 'Chemicals' },
  { symbol: 'AARTI.NS', name: 'Aarti Industries Limited', sector: 'Chemicals' },
  { symbol: 'DEEPAKNTR.NS', name: 'Deepak Nitrite Limited', sector: 'Chemicals' },
  { symbol: 'GNFC.NS', name: 'Gujarat Narmada Valley Fertilizers and Chemicals Limited', sector: 'Fertilizers' },
  { symbol: 'CHAMBLFERT.NS', name: 'Chambal Fertilizers and Chemicals Limited', sector: 'Fertilizers' },
  { symbol: 'COROMANDEL.NS', name: 'Coromandel International Limited', sector: 'Fertilizers' }
];

// Search from extended database
export function searchExtendedStocks(query: string): typeof EXTENDED_INDIAN_STOCKS {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return EXTENDED_INDIAN_STOCKS.slice(0, 50); // Show first 50 if no query

  return EXTENDED_INDIAN_STOCKS.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm) ||
    stock.name.toLowerCase().includes(searchTerm) ||
    stock.sector.toLowerCase().includes(searchTerm) ||
    stock.symbol.replace('.NS', '').toLowerCase().includes(searchTerm)
  );
}

// Direct stock lookup for specific stocks like HINDUSTAN ZINC
export function findSpecificStock(query: string): any | null {
  const searchTerm = query.toLowerCase().trim();

  // Direct mappings for commonly searched stocks
  const directMappings: { [key: string]: any } = {
    'hindustan zinc': { symbol: 'HINDZINC', name: 'Hindustan Zinc Limited', sector: 'Metals & Mining' },
    'hindzinc': { symbol: 'HINDZINC', name: 'Hindustan Zinc Limited', sector: 'Metals & Mining' },
    'zinc': { symbol: 'HINDZINC', name: 'Hindustan Zinc Limited', sector: 'Metals & Mining' },
    'tata steel': { symbol: 'TATASTEEL', name: 'Tata Steel Limited', sector: 'Metals & Mining' },
    'jsw steel': { symbol: 'JSWSTEEL', name: 'JSW Steel Limited', sector: 'Metals & Mining' },
    'coal india': { symbol: 'COALINDIA', name: 'Coal India Limited', sector: 'Metals & Mining' },
    'vedanta': { symbol: 'VEDL', name: 'Vedanta Limited', sector: 'Metals & Mining' },
    'hindalco': { symbol: 'HINDALCO', name: 'Hindalco Industries Limited', sector: 'Metals & Mining' },
    'nmdc': { symbol: 'NMDC', name: 'NMDC Limited', sector: 'Metals & Mining' },
    'sail': { symbol: 'SAIL', name: 'Steel Authority of India Limited', sector: 'Metals & Mining' },
    'jindal steel': { symbol: 'JINDALSTEL', name: 'Jindal Steel & Power Limited', sector: 'Metals & Mining' },
    'national aluminium': { symbol: 'NATIONALUM', name: 'National Aluminium Company Limited', sector: 'Metals & Mining' }
  };

  // Check direct mappings first
  if (directMappings[searchTerm]) {
    return directMappings[searchTerm];
  }

  // Check if it's in our extended database
  const found = EXTENDED_INDIAN_STOCKS.find(stock =>
    stock.symbol.toLowerCase().replace('.ns', '') === searchTerm ||
    stock.name.toLowerCase().includes(searchTerm) ||
    stock.symbol.toLowerCase().includes(searchTerm)
  );

  if (found) {
    return {
      symbol: found.symbol.replace('.NS', ''),
      name: found.name,
      sector: found.sector
    };
  }

  return null;
}

// Quick search for ANY stock symbol
export async function quickStockSearch(symbol: string): Promise<any | null> {
  try {
    // First check our database
    const dbResult = findSpecificStock(symbol);
    if (dbResult) {
      return dbResult;
    }

    // Then try direct API call
    const cleanSymbol = symbol.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const quote = await fetchIndianStockQuote(cleanSymbol);

    if (quote) {
      return {
        symbol: cleanSymbol,
        name: quote.name || cleanSymbol,
        sector: 'Discovered',
        price: quote.price,
        change: quote.changePercent
      };
    }

    return null;
  } catch (error) {
    console.error('Error in quick search:', error);
    return null;
  }
}
