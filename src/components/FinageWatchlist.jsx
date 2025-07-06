'use client';

import { useState, useEffect } from 'react';

const FinageWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAddStock, setShowAddStock] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Check if Finage API is enabled
  const isFinageEnabled = !!process.env.NEXT_PUBLIC_FINAGE_API_KEY;

  // Comprehensive Indian stocks database for searching
  const indianStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Limited', sector: 'Oil & Gas', exchange: 'NSE' },
    { symbol: 'TCS', name: 'Tata Consultancy Services Limited', sector: 'IT Services', exchange: 'NSE' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', sector: 'Banking', exchange: 'NSE' },
    { symbol: 'INFY', name: 'Infosys Limited', sector: 'IT Services', exchange: 'NSE' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Limited', sector: 'FMCG', exchange: 'NSE' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', sector: 'Banking', exchange: 'NSE' },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Limited', sector: 'Banking', exchange: 'NSE' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', sector: 'Telecom', exchange: 'NSE' },
    { symbol: 'ITC', name: 'ITC Limited', sector: 'FMCG', exchange: 'NSE' },
    { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', exchange: 'NSE' },
    { symbol: 'LT', name: 'Larsen & Toubro Limited', sector: 'Construction', exchange: 'NSE' },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Limited', sector: 'Paints', exchange: 'NSE' },
    { symbol: 'MARUTI', name: 'Maruti Suzuki India Limited', sector: 'Automobile', exchange: 'NSE' },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance Limited', sector: 'NBFC', exchange: 'NSE' },
    { symbol: 'HCLTECH', name: 'HCL Technologies Limited', sector: 'IT Services', exchange: 'NSE' },
    { symbol: 'WIPRO', name: 'Wipro Limited', sector: 'IT Services', exchange: 'NSE' },
    { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Limited', sector: 'Cement', exchange: 'NSE' },
    { symbol: 'TITAN', name: 'Titan Company Limited', sector: 'Jewellery', exchange: 'NSE' },
    { symbol: 'NESTLEIND', name: 'Nestle India Limited', sector: 'FMCG', exchange: 'NSE' },
    { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Limited', sector: 'Power', exchange: 'NSE' },
    { symbol: 'NTPC', name: 'NTPC Limited', sector: 'Power', exchange: 'NSE' },
    { symbol: 'AXISBANK', name: 'Axis Bank Limited', sector: 'Banking', exchange: 'NSE' },
    { symbol: 'ONGC', name: 'Oil and Natural Gas Corporation Limited', sector: 'Oil & Gas', exchange: 'NSE' },
    { symbol: 'TECHM', name: 'Tech Mahindra Limited', sector: 'IT Services', exchange: 'NSE' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Limited', sector: 'Pharma', exchange: 'NSE' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors Limited', sector: 'Automobile', exchange: 'NSE' },
    { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Limited', sector: 'Financial Services', exchange: 'NSE' },
    { symbol: 'JSWSTEEL', name: 'JSW Steel Limited', sector: 'Steel', exchange: 'NSE' },
    { symbol: 'TATASTEEL', name: 'Tata Steel Limited', sector: 'Steel', exchange: 'NSE' },
    { symbol: 'ADANIPORTS', name: 'Adani Ports and Special Economic Zone Limited', sector: 'Infrastructure', exchange: 'NSE' },
    { symbol: 'COALINDIA', name: 'Coal India Limited', sector: 'Mining', exchange: 'NSE' },
    { symbol: 'DRREDDY', name: 'Dr. Reddys Laboratories Limited', sector: 'Pharma', exchange: 'NSE' },
    { symbol: 'EICHERMOT', name: 'Eicher Motors Limited', sector: 'Automobile', exchange: 'NSE' },
    { symbol: 'GRASIM', name: 'Grasim Industries Limited', sector: 'Cement', exchange: 'NSE' },
    { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Limited', sector: 'Automobile', exchange: 'NSE' },
    { symbol: 'HINDALCO', name: 'Hindalco Industries Limited', sector: 'Metals', exchange: 'NSE' },
    { symbol: 'INDUSINDBK', name: 'IndusInd Bank Limited', sector: 'Banking', exchange: 'NSE' },
    { symbol: 'BRITANNIA', name: 'Britannia Industries Limited', sector: 'FMCG', exchange: 'NSE' },
    { symbol: 'CIPLA', name: 'Cipla Limited', sector: 'Pharma', exchange: 'NSE' },
    { symbol: 'DIVISLAB', name: 'Divis Laboratories Limited', sector: 'Pharma', exchange: 'NSE' }
  ];

  // Sample data for demonstration with realistic prices
  const sampleStocks = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Limited',
      price: 2450.75,
      change: 25.30,
      changePercent: 1.04,
      volume: 1234567,
      sector: 'Oil & Gas'
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services Limited',
      price: 3890.50,
      change: -15.25,
      changePercent: -0.39,
      volume: 987654,
      sector: 'IT Services'
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Limited',
      price: 1650.25,
      change: 12.75,
      changePercent: 0.78,
      volume: 2345678,
      sector: 'Banking'
    }
  ];

  // Check authentication
  const checkPasscode = () => {
    if (passcode === '717273') {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Invalid passcode');
    }
  };

  // Search for stocks
  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Simulate API delay
    setTimeout(() => {
      const results = indianStocks.filter(stock =>
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()) ||
        stock.sector.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10); // Limit to 10 results

      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  // Fetch real-time stock data from Finage API
  const fetchStockData = async (symbol) => {
    if (!isFinageEnabled) {
      throw new Error('Finage API not configured');
    }

    try {
      const response = await fetch(
        `https://api.finage.co.uk/last/stock/${symbol}.NSE?apikey=${process.env.NEXT_PUBLIC_FINAGE_API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait before making more requests.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your Finage API configuration.');
        } else if (response.status === 404) {
          throw new Error(`Stock ${symbol} not found on NSE.`);
        } else {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();

      // Handle different response formats from Finage API
      const price = data.price || data.c || data.close || 0;
      const previousClose = data.pc || data.previousClose || price;
      const change = data.change || (price - previousClose) || 0;
      const changePercent = data.changePercent || ((change / previousClose) * 100) || 0;

      return {
        symbol: data.symbol || symbol,
        price: parseFloat(price),
        change: parseFloat(change),
        changePercent: parseFloat(changePercent),
        volume: parseInt(data.volume || data.v || 0),
        timestamp: data.timestamp || Date.now()
      };
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      throw error;
    }
  };

  // Add stock to watchlist with real-time data
  const addToWatchlist = async (stock) => {
    if (!isAuthenticated) {
      setError('Please enter passcode to add stocks');
      return;
    }

    // Check if stock already exists
    const exists = watchlist.find(w => w.symbol === stock.symbol);
    if (exists) {
      setError(`${stock.symbol} is already in your watchlist`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch real-time data from Finage API
      const realTimeData = await fetchStockData(stock.symbol);

      const newStock = {
        symbol: stock.symbol,
        name: stock.name,
        price: realTimeData.price,
        change: realTimeData.change,
        changePercent: realTimeData.changePercent,
        volume: realTimeData.volume,
        sector: stock.sector,
        addedAt: Date.now(),
        lastUpdated: realTimeData.timestamp
      };

      const newWatchlist = [...watchlist, newStock];
      setWatchlist(newWatchlist);

      // Save to localStorage
      try {
        localStorage.setItem('finage-watchlist', JSON.stringify(newWatchlist));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }

      setSearchQuery('');
      setSearchResults([]);
      setShowAddStock(false);

    } catch (error) {
      console.error('Error adding stock:', error);
      setError(`Failed to fetch real-time data for ${stock.symbol}. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Refresh all stocks with real-time data
  const refreshAllStocks = async () => {
    if (!isFinageEnabled) {
      setError('Finage API not configured');
      return;
    }

    if (watchlist.length === 0) {
      setError('No stocks in watchlist to refresh');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedStocks = await Promise.all(
        watchlist.map(async (stock) => {
          try {
            const realTimeData = await fetchStockData(stock.symbol);
            return {
              ...stock,
              price: realTimeData.price,
              change: realTimeData.change,
              changePercent: realTimeData.changePercent,
              volume: realTimeData.volume,
              lastUpdated: realTimeData.timestamp
            };
          } catch (error) {
            console.error(`Error updating ${stock.symbol}:`, error);
            // Return original stock data if API call fails
            return stock;
          }
        })
      );

      setWatchlist(updatedStocks);

      // Save to localStorage
      try {
        localStorage.setItem('finage-watchlist', JSON.stringify(updatedStocks));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }

    } catch (error) {
      console.error('Error refreshing stocks:', error);
      setError('Failed to refresh stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Remove stock from watchlist
  const removeFromWatchlist = (symbol) => {
    if (!isAuthenticated) {
      setError('Please enter passcode to remove stocks');
      return;
    }

    const newWatchlist = watchlist.filter(stock => stock.symbol !== symbol);
    setWatchlist(newWatchlist);

    // Save to localStorage
    try {
      localStorage.setItem('finage-watchlist', JSON.stringify(newWatchlist));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Initialize with data from localStorage or sample data
  useEffect(() => {
    const initializeWatchlist = async () => {
      try {
        const saved = localStorage.getItem('finage-watchlist');
        if (saved) {
          const parsed = JSON.parse(saved);
          setWatchlist(parsed);

          // If API is enabled, refresh with real-time data
          if (isFinageEnabled && parsed.length > 0) {
            setTimeout(() => {
              refreshAllStocks();
            }, 1000); // Delay to avoid immediate loading
          }
        } else {
          // Initialize with sample data
          setWatchlist(sampleStocks);
          localStorage.setItem('finage-watchlist', JSON.stringify(sampleStocks));

          // If API is enabled, get real data for sample stocks
          if (isFinageEnabled) {
            setTimeout(() => {
              refreshAllStocks();
            }, 1000);
          }
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        setWatchlist(sampleStocks);
      }

      if (!isFinageEnabled) {
        setError('Finage API not configured. Add your API key to environment variables for real-time data.');
      }
    };

    initializeWatchlist();
  }, []);

  // Auto-refresh every 30 seconds when API is enabled
  useEffect(() => {
    if (!isFinageEnabled || watchlist.length === 0) return;

    const interval = setInterval(() => {
      refreshAllStocks();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [watchlist.length, isFinageEnabled]);

  // Search debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Format price change
  const formatChange = (change, changePercent) => {
    if (!change && !changePercent) return null;

    const isPositive = change >= 0;
    const changeValue = Math.abs(change || 0).toFixed(2);
    const percentValue = Math.abs(changePercent || 0).toFixed(2);

    return (
      <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <span>{isPositive ? '↗' : '↘'}</span>
        <span className="ml-1">₹{changeValue} ({percentValue}%)</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Stock Watchlist</h1>
          <p className="text-gray-600">
            {isFinageEnabled ? 'Real-time Indian stock prices powered by Finage API' : 'Sample stock data (API not configured)'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isFinageEnabled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {isFinageEnabled ? 'Live Data' : 'Demo Mode'}
          </div>

          {watchlist.length > 0 && watchlist[0].lastUpdated && (
            <div className="text-sm text-gray-500">
              Last updated: {new Date(watchlist[0].lastUpdated).toLocaleTimeString()}
            </div>
          )}

          <button
            onClick={refreshAllStocks}
            disabled={loading || watchlist.length === 0}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <span className={`mr-2 ${loading ? 'animate-spin' : ''}`}>🔄</span>
            {loading ? 'Refreshing...' : 'Refresh Live Data'}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <span className="text-red-500 mr-3">⚠️</span>
            <span className="text-red-700">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Authentication */}
      {!isAuthenticated && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Enter Passcode to Manage Watchlist</h3>
          <div className="flex space-x-4">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && checkPasscode()}
            />
            <button
              onClick={checkPasscode}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Authenticate
            </button>
          </div>
        </div>
      )}

      {/* Add Stock Section */}
      {isAuthenticated && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Add Stock to Watchlist</h2>
            <button
              onClick={() => setShowAddStock(!showAddStock)}
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <span className="mr-2">➕</span>
              Add Stock
            </button>
          </div>

          {showAddStock && (
            <div className="border-t pt-4">
              <div className="relative mb-4">
                <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Indian stocks (e.g., RELIANCE, TCS, HDFC, Banking, IT Services)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Search Results */}
              {isSearching && (
                <div className="text-center py-4">
                  <div className="animate-spin mx-auto mb-2 text-blue-600 text-xl">🔄</div>
                  <p className="text-gray-500 text-sm">Searching stocks...</p>
                </div>
              )}

              {searchResults.length > 0 && !isSearching && (
                <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-lg">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <p className="text-sm text-gray-600 font-medium">Found {searchResults.length} stocks</p>
                  </div>
                  {searchResults.map((stock, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-semibold text-gray-900">{stock.symbol}</div>
                            <div className="text-sm text-gray-600">{stock.name}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{stock.sector}</span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{stock.exchange}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => addToWatchlist(stock)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <span className="mr-1">➕</span>
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && !isSearching && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-2xl mb-2">🔍</div>
                  <p>No stocks found for "{searchQuery}"</p>
                  <p className="text-sm mt-1">Try searching by symbol, company name, or sector</p>
                </div>
              )}

              {!searchQuery && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-2xl mb-2">📈</div>
                  <p className="font-medium">Search for Indian Stocks</p>
                  <p className="text-sm mt-1">Type a stock symbol, company name, or sector to find stocks</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {['RELIANCE', 'TCS', 'HDFCBANK', 'Banking', 'IT Services'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchQuery(suggestion)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Watchlist Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading && watchlist.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="animate-spin mx-auto mb-4 text-blue-600 text-2xl">🔄</div>
                    <p className="text-gray-500">Loading watchlist...</p>
                  </td>
                </tr>
              ) : watchlist.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="mx-auto mb-4 text-gray-400 text-2xl">📈</div>
                    <p className="text-gray-500">No stocks in watchlist</p>
                    <p className="text-sm text-gray-400">{isAuthenticated ? 'Click "Add Stock" to search and add stocks' : 'Enter passcode to add stocks'}</p>
                  </td>
                </tr>
              ) : (
                watchlist.map((stock, index) => (
                  <tr key={stock.symbol || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                        <div className="text-sm text-gray-500">{stock.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {stock.price ? `₹${stock.price.toFixed(2)}` : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatChange(stock.change, stock.changePercent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stock.volume ? stock.volume.toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {stock.sector || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => console.log('View details for:', stock)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                          title="View Details"
                        >
                          👁️
                        </button>
                        {isAuthenticated && (
                          <button
                            onClick={() => removeFromWatchlist(stock.symbol)}
                            className="text-red-600 hover:text-red-800 transition-colors p-1"
                            title="Remove from Watchlist"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          {isFinageEnabled
            ? '📈 Real-time data from Finage API • Auto-refreshes every 30 seconds • NSE Indian stocks'
            : '⚠️ Demo mode - Add NEXT_PUBLIC_FINAGE_API_KEY to environment variables for live data'
          }
        </p>
        <p>
          {isFinageEnabled
            ? `Free tier: 1000 requests/month • ${watchlist.length} stocks tracked • API key configured ✅`
            : `${watchlist.length} sample stocks • Real-time data available with API key`
          }
        </p>
      </div>
    </div>
  );
};

export default FinageWatchlist;
