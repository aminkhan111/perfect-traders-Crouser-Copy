'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaTrash, 
  FaRefresh, 
  FaSearch, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';
import { 
  getStockQuote, 
  getMultipleQuotes, 
  searchStocks, 
  getMarketStatus,
  POPULAR_INDIAN_STOCKS,
  formatSymbolForFinage,
  parseSymbolFromFinage,
  isFinageEnabled,
  handleFinageError,
  checkRateLimit
} from '@/lib/finageApi';
import { trackWatchlistAction, trackStockView } from '@/lib/gtag';

const FinageWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAddStock, setShowAddStock] = useState(false);
  const [marketStatus, setMarketStatus] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication
  const checkPasscode = () => {
    if (passcode === '717273') {
      setIsAuthenticated(true);
      setError(null);
      trackWatchlistAction('authenticate');
    } else {
      setError('Invalid passcode');
    }
  };

  // Load watchlist from localStorage
  const loadWatchlist = () => {
    try {
      const saved = localStorage.getItem('finage-watchlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        setWatchlist(parsed);
      } else {
        // Initialize with popular stocks
        const initialStocks = POPULAR_INDIAN_STOCKS.slice(0, 5).map(symbol => ({
          symbol: parseSymbolFromFinage(symbol),
          finageSymbol: symbol,
          name: parseSymbolFromFinage(symbol),
          addedAt: Date.now()
        }));
        setWatchlist(initialStocks);
        localStorage.setItem('finage-watchlist', JSON.stringify(initialStocks));
      }
    } catch (error) {
      console.error('Error loading watchlist:', error);
      setError('Failed to load watchlist');
    }
  };

  // Save watchlist to localStorage
  const saveWatchlist = (newWatchlist) => {
    try {
      localStorage.setItem('finage-watchlist', JSON.stringify(newWatchlist));
    } catch (error) {
      console.error('Error saving watchlist:', error);
    }
  };

  // Fetch market status
  const fetchMarketStatus = async () => {
    try {
      const status = await getMarketStatus();
      setMarketStatus(status);
    } catch (error) {
      console.error('Error fetching market status:', error);
    }
  };

  // Fetch stock prices for watchlist
  const fetchWatchlistPrices = async () => {
    if (!isFinageEnabled) {
      setError('Finage API not configured');
      return;
    }

    if (!checkRateLimit()) {
      setError('API rate limit approaching. Please try again later.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const symbols = watchlist.map(stock => stock.finageSymbol);
      if (symbols.length === 0) {
        setLoading(false);
        return;
      }

      const quotes = await getMultipleQuotes(symbols);
      
      const updatedWatchlist = watchlist.map(stock => {
        const quote = quotes.find(q => q.symbol === stock.finageSymbol);
        return {
          ...stock,
          ...quote,
          lastUpdated: Date.now()
        };
      });

      setWatchlist(updatedWatchlist);
      saveWatchlist(updatedWatchlist);
      setLastUpdated(Date.now());
      
      trackWatchlistAction('refresh', `${symbols.length} stocks`);
    } catch (error) {
      console.error('Error fetching watchlist prices:', error);
      setError(handleFinageError(error));
    } finally {
      setLoading(false);
    }
  };

  // Search for stocks
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchStocks(query);
      // Filter for Indian stocks (NSE/BSE)
      const indianStocks = results.filter(stock => 
        stock.exchange === 'NSE' || stock.exchange === 'BSE'
      );
      setSearchResults(indianStocks);
    } catch (error) {
      console.error('Error searching stocks:', error);
      setError(handleFinageError(error));
    } finally {
      setIsSearching(false);
    }
  };

  // Add stock to watchlist
  const addToWatchlist = (stock) => {
    if (!isAuthenticated) {
      setError('Please enter passcode to add stocks');
      return;
    }

    const finageSymbol = formatSymbolForFinage(stock.symbol);
    const exists = watchlist.find(w => w.finageSymbol === finageSymbol);
    
    if (exists) {
      setError('Stock already in watchlist');
      return;
    }

    const newStock = {
      symbol: stock.symbol,
      finageSymbol: finageSymbol,
      name: stock.name || stock.symbol,
      addedAt: Date.now()
    };

    const newWatchlist = [...watchlist, newStock];
    setWatchlist(newWatchlist);
    saveWatchlist(newWatchlist);
    setSearchQuery('');
    setSearchResults([]);
    setShowAddStock(false);
    setError(null);
    
    trackWatchlistAction('add', stock.symbol);
  };

  // Remove stock from watchlist
  const removeFromWatchlist = (symbol) => {
    if (!isAuthenticated) {
      setError('Please enter passcode to remove stocks');
      return;
    }

    const newWatchlist = watchlist.filter(stock => stock.finageSymbol !== symbol);
    setWatchlist(newWatchlist);
    saveWatchlist(newWatchlist);
    
    trackWatchlistAction('remove', parseSymbolFromFinage(symbol));
  };

  // View stock details
  const viewStockDetails = (stock) => {
    trackStockView(stock.name, stock.symbol);
    // You can implement navigation to stock detail page here
    console.log('View details for:', stock);
  };

  // Format price change
  const formatChange = (change, changePercent) => {
    if (!change && !changePercent) return null;
    
    const isPositive = change >= 0;
    const changeValue = Math.abs(change || 0).toFixed(2);
    const percentValue = Math.abs(changePercent || 0).toFixed(2);
    
    return (
      <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <FaArrowUp className="mr-1" size={12} /> : <FaArrowDown className="mr-1" size={12} />}
        <span>₹{changeValue} ({percentValue}%)</span>
      </div>
    );
  };

  // Initialize component
  useEffect(() => {
    if (!isFinageEnabled) {
      setError('Finage API not configured. Please add your API key to environment variables.');
      return;
    }

    loadWatchlist();
    fetchMarketStatus();
  }, []);

  // Auto-refresh every 30 seconds when market is open
  useEffect(() => {
    if (!isFinageEnabled || !marketStatus?.isOpen) return;

    const interval = setInterval(() => {
      fetchWatchlistPrices();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [marketStatus, watchlist]);

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isFinageEnabled) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-3" />
            <div>
              <h3 className="text-red-800 font-semibold">Finage API Not Configured</h3>
              <p className="text-red-600">Please add your Finage API key to environment variables to use this feature.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Stock Watchlist</h1>
          <p className="text-gray-600">Real-time Indian stock prices powered by Finage API</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Market Status */}
          {marketStatus && (
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              marketStatus.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              Market {marketStatus.isOpen ? 'Open' : 'Closed'}
            </div>
          )}
          
          {/* Last Updated */}
          {lastUpdated && (
            <div className="flex items-center text-sm text-gray-500">
              <FaClock className="mr-1" />
              {new Date(lastUpdated).toLocaleTimeString()}
            </div>
          )}
          
          {/* Refresh Button */}
          <button
            onClick={fetchWatchlistPrices}
            disabled={loading}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <FaRefresh className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-3" />
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
            <h2 className="text-xl font-semibold">Add Stock to Watchlist</h2>
            <button
              onClick={() => setShowAddStock(!showAddStock)}
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Stock
            </button>
          </div>

          <AnimatePresence>
            {showAddStock && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t pt-4"
              >
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Indian stocks (e.g., RELIANCE, TCS, HDFC)"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-4 max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                    {searchResults.map((stock, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-gray-600">{stock.name}</div>
                          <div className="text-xs text-gray-500">{stock.exchange}</div>
                        </div>
                        <button
                          onClick={() => addToWatchlist(stock)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {isSearching && (
                  <div className="mt-4 text-center text-gray-500">
                    <FaRefresh className="animate-spin inline mr-2" />
                    Searching...
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading && watchlist.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <FaRefresh className="animate-spin mx-auto mb-4 text-blue-600" size={24} />
                    <p className="text-gray-500">Loading watchlist...</p>
                  </td>
                </tr>
              ) : watchlist.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <FaChartLine className="mx-auto mb-4 text-gray-400" size={24} />
                    <p className="text-gray-500">No stocks in watchlist</p>
                    <p className="text-sm text-gray-400">Add some stocks to get started</p>
                  </td>
                </tr>
              ) : (
                watchlist.map((stock, index) => (
                  <motion.tr
                    key={stock.finageSymbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
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
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => viewStockDetails(stock)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {isAuthenticated && (
                          <button
                            onClick={() => removeFromWatchlist(stock.finageSymbol)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Remove from Watchlist"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Data provided by Finage API • Updates every 30 seconds when market is open</p>
        <p>Free tier: 1000 requests/month • {watchlist.length} stocks in watchlist</p>
      </div>
    </div>
  );
};

export default FinageWatchlist;
