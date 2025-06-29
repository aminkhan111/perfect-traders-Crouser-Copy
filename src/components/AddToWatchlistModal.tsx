 'use client';

import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaLock, FaUnlock, FaSearch, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { searchAnyIndianStock, EXTENDED_INDIAN_STOCKS, validateStockSymbol, findSpecificStock, quickStockSearch, searchThousandsOfStocks } from '@/lib/yahoo-finance-india';

interface AddToWatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (stockData: any) => void;
}

interface StockData {
  symbol: string;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  ltp: number;
  change: number;
  volume: number;
  value: number;
  ca: string;
  color: string;
}

// Use extended Indian stocks database (70+ stocks)
const popularStocks = EXTENDED_INDIAN_STOCKS.map(stock => ({
  symbol: stock.symbol.replace('.NS', ''), // Remove .NS for display
  name: stock.name,
  sector: stock.sector,
  price: Math.random() * 3000 + 500, // Mock price for demo
  change: (Math.random() - 0.5) * 6 // Mock change for demo
}));

// Enhanced search functionality using real API
const getStockSuggestionsLocal = async (query: string): Promise<string[]> => {
  if (query.length < 2) return [];

  // Search in extended database first
  const localMatches = popularStocks
    .filter(stock =>
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase())
    )
    .map(stock => stock.symbol)
    .slice(0, 5);

  return localMatches;
};

export default function AddToWatchlistModal({ isOpen, onClose, onAddStock }: AddToWatchlistModalProps) {
  const [step, setStep] = useState<'passcode' | 'addStock'>('passcode');
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockName, setStockName] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [stockChange, setStockChange] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [isValidatingStock, setIsValidatingStock] = useState(false);
  const [stockValidation, setStockValidation] = useState<'valid' | 'invalid' | null>(null);
  const [stockSuggestions, setStockSuggestions] = useState<string[]>([]);
  const [showCustomEntry, setShowCustomEntry] = useState(false);
  const [advancedSearchQuery, setAdvancedSearchQuery] = useState('');
  const [advancedSearchResults, setAdvancedSearchResults] = useState<any[]>([]);
  const [advancedSearchLoading, setAdvancedSearchLoading] = useState(false);
  const [massiveSearchLoading, setMassiveSearchLoading] = useState(false);
  const [showMassiveSearch, setShowMassiveSearch] = useState(false);

  const CORRECT_PASSCODE = '717273';

  // Use the extended Indian stocks database (70+ stocks) - already defined above

  // Enhanced search with sector filtering
  const filteredStocks = popularStocks.filter(stock => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true; // Show all if no search query

    return (
      stock.symbol.toLowerCase().includes(query) ||
      stock.name.toLowerCase().includes(query) ||
      stock.sector.toLowerCase().includes(query) ||
      // Also search by partial matches
      stock.symbol.toLowerCase().startsWith(query) ||
      stock.name.toLowerCase().split(' ').some(word => word.startsWith(query))
    );
  });

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      setStep('addStock');
      setError('');
    } else {
      setError('Invalid passcode. Please try again.');
      setPasscode('');
    }
  };

  const handleStockSelect = async (stock: any) => {
    // Create stock data object
    const stockData: StockData = {
      symbol: stock.symbol,
      open: stock.price * 0.995, // Approximate open price
      high: stock.price * 1.02, // Approximate high
      low: stock.price * 0.98, // Approximate low
      prevClose: stock.price - stock.change,
      ltp: stock.price,
      change: stock.change,
      volume: Math.floor(Math.random() * 1000000) + 100000, // Random volume
      value: (stock.price * (Math.floor(Math.random() * 1000000) + 100000)) / 100000,
      ca: '-',
      color: stock.change >= 0 ? 'green' : 'red'
    };

    // Add stock directly to watchlist via API
    console.log(`🎯 Adding stock from popular selection: ${stock.symbol}`, stockData);
    await addStockViaAPI(stockData);
  };

  // Function to add stock via API
  const addStockViaAPI = async (stockData: StockData) => {
    try {
      const response = await fetch('/api/watchlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockData: stockData,
          passcode: '717273', // Verified passcode from modal
          userAgent: navigator.userAgent
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        onAddStock(result.data); // Update parent component
        handleClose();
      } else {
        alert(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding stock via API:', error);
      alert('❌ Failed to add stock. Please try again.');
    }
  };

  // Validate custom stock symbol
  const handleStockSymbolChange = async (symbol: string) => {
    setStockSymbol(symbol.toUpperCase());
    setStockValidation(null);

    if (symbol.length >= 3) {
      setIsValidatingStock(true);

      // Get suggestions from local database first
      const suggestions = await getStockSuggestionsLocal(symbol);
      setStockSuggestions(suggestions);

      // Validate if exact symbol exists
      const isValid = await validateStockSymbol(symbol);
      setStockValidation(isValid ? 'valid' : 'invalid');
      setIsValidatingStock(false);

      // If valid, try to get more info from search
      if (isValid) {
        try {
          const searchResults = await searchAnyIndianStock(symbol);
          if (searchResults.length > 0) {
            const result = searchResults[0];
            setStockName(result.name);
            if (result.price) {
              setStockPrice(result.price.toString());
              setStockChange(result.change?.toString() || '0');
            }
          }
        } catch (error) {
          console.error('Error fetching stock details:', error);
        }
      }
    } else {
      setStockSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = async (suggestion: string) => {
    await handleStockSymbolChange(suggestion);
    setStockSuggestions([]);
  };

  // Enhanced advanced search functionality
  const handleAdvancedSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setAdvancedSearchQuery(query);

    if (query.length < 2) {
      setAdvancedSearchResults([]);
      return;
    }

    setAdvancedSearchLoading(true);

    try {
      // Step 1: Try quick specific stock lookup first
      const specificResult = findSpecificStock(query);
      if (specificResult) {
        setAdvancedSearchResults([{
          ...specificResult,
          source: 'specific',
          priority: 0
        }]);
        setAdvancedSearchLoading(false);
        return;
      }

      // Step 2: Search from ALL Indian stocks (comprehensive)
      const results = await searchAnyIndianStock(query);

      // Step 3: If no results, try quick API search
      if (results.length === 0) {
        const quickResult = await quickStockSearch(query);
        if (quickResult) {
          setAdvancedSearchResults([{
            ...quickResult,
            source: 'api',
            priority: 3
          }]);
        } else {
          setAdvancedSearchResults([]);
        }
      } else {
        setAdvancedSearchResults(results);
      }
    } catch (error) {
      console.error('Error searching stocks:', error);
      setAdvancedSearchResults([]);
    } finally {
      setAdvancedSearchLoading(false);
    }
  };

  // Handle advanced search stock selection
  const handleAdvancedStockSelect = async (result: any) => {
    // Create stock data object
    const price = result.price || 100; // Default price if not available
    const change = result.change || 0; // Default change if not available

    const stockData: StockData = {
      symbol: result.symbol,
      open: price * 0.995, // Approximate open price
      high: price * 1.02, // Approximate high
      low: price * 0.98, // Approximate low
      prevClose: price - change,
      ltp: price,
      change: change,
      volume: Math.floor(Math.random() * 1000000) + 100000, // Random volume
      value: (price * (Math.floor(Math.random() * 1000000) + 100000)) / 100000,
      ca: '-',
      color: change >= 0 ? 'green' : 'red'
    };

    // Add stock directly to watchlist via API
    console.log(`🎯 Adding stock from advanced search: ${result.symbol}`, stockData);
    await addStockViaAPI(stockData);
  };

  // MASSIVE search for thousands of stocks
  const handleMassiveSearch = async () => {
    if (!advancedSearchQuery || advancedSearchQuery.length < 3) {
      alert('Please enter at least 3 characters to search thousands of stocks');
      return;
    }

    setMassiveSearchLoading(true);
    setShowMassiveSearch(true);

    try {
      console.log(`🚀 Starting massive search for "${advancedSearchQuery}" across thousands of potential stocks...`);
      const massiveResults = await searchThousandsOfStocks(advancedSearchQuery);

      // Combine with existing results
      const combinedResults = [...advancedSearchResults, ...massiveResults];

      // Remove duplicates and sort
      const uniqueResults = combinedResults.filter((result, index, self) =>
        index === self.findIndex(r => r.symbol === result.symbol)
      ).sort((a, b) => (a.priority || 5) - (b.priority || 5));

      setAdvancedSearchResults(uniqueResults);

      console.log(`✅ Massive search complete! Found ${massiveResults.length} additional stocks`);

      if (massiveResults.length === 0) {
        alert(`No additional stocks found for "${advancedSearchQuery}" in the massive search. The symbol might not exist on NSE/BSE.`);
      } else {
        alert(`🎉 Found ${massiveResults.length} additional stocks via massive search! Check the results below.`);
      }
    } catch (error) {
      console.error('Error in massive search:', error);
      alert('Error occurred during massive search. Please try again.');
    } finally {
      setMassiveSearchLoading(false);
    }
  };

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stockSymbol || !stockPrice) {
      setError('Please fill in all required fields.');
      return;
    }

    const newStock: StockData = {
      symbol: stockSymbol.toUpperCase(),
      open: parseFloat(stockPrice) * 0.995, // Approximate open price
      high: parseFloat(stockPrice) * 1.02, // Approximate high
      low: parseFloat(stockPrice) * 0.98, // Approximate low
      prevClose: parseFloat(stockPrice) - parseFloat(stockChange || '0'),
      ltp: parseFloat(stockPrice),
      change: parseFloat(stockChange || '0'),
      volume: Math.floor(Math.random() * 1000000) + 100000, // Random volume
      value: (parseFloat(stockPrice) * (Math.floor(Math.random() * 1000000) + 100000)) / 100000,
      ca: '-',
      color: parseFloat(stockChange || '0') >= 0 ? 'green' : 'red'
    };

    console.log(`🎯 Adding stock from manual entry: ${stockSymbol}`, newStock);
    await addStockViaAPI(newStock);
  };

  const handleClose = () => {
    setStep('passcode');
    setPasscode('');
    setIsAuthenticated(false);
    setStockSymbol('');
    setStockName('');
    setStockPrice('');
    setStockChange('');
    setSearchQuery('');
    setError('');
    setStockValidation(null);
    setStockSuggestions([]);
    setShowCustomEntry(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {step === 'passcode' ? <FaLock className="text-xl" /> : <FaUnlock className="text-xl" />}
            <h2 className="text-xl font-bold">
              {step === 'passcode' ? 'Access Required' : 'Add to Watchlist'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {step === 'passcode' ? (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLock className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Enter Passcode</h3>
                <p className="text-gray-600">Please enter the passcode to add stocks to your watchlist</p>
              </div>

              <form onSubmit={handlePasscodeSubmit} className="max-w-sm mx-auto">
                <div className="mb-4">
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter 6-digit passcode"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={6}
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Verify Passcode
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Add New Stock</h3>
                <p className="text-gray-600">Select from popular stocks or add manually</p>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stocks..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Popular Stocks Grid */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Popular Stocks</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {filteredStocks.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => handleStockSelect(stock)}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-gray-800">{stock.symbol}</div>
                          <div className="text-sm text-gray-600 truncate">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{stock.price.toFixed(2)}</div>
                          <div className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Search Section */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    🔍 Search ALL Indian Stocks
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Can't find your stock above? Search from thousands of NSE/BSE listed companies including HINDUSTAN ZINC, TATA STEEL, JSW STEEL, COAL INDIA, VEDANTA, and many more!
                  </p>

                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={advancedSearchQuery}
                      onChange={handleAdvancedSearch}
                      placeholder="Type any stock name or symbol (e.g., HINDUSTAN ZINC, ZOMATO, TATA STEEL, PAYTM)..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {advancedSearchLoading && (
                      <FaSpinner className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
                    )}
                  </div>

                  {/* Advanced Search Results */}
                  {advancedSearchResults.length > 0 && (
                    <div className="mt-3 bg-white rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
                      {advancedSearchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleAdvancedStockSelect(result)}
                          className="w-full p-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-gray-800">{result.symbol}</div>
                              <div className="text-sm text-gray-600 truncate">{result.name}</div>
                              <div className="text-xs text-blue-600">{result.sector}</div>
                            </div>
                            <div className="text-right">
                              {result.price && (
                                <>
                                  <div className="font-semibold">₹{result.price.toFixed(2)}</div>
                                  <div className={`text-sm ${result.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {result.change >= 0 ? '+' : ''}{result.change?.toFixed(2)}%
                                  </div>
                                </>
                              )}
                              <div className="text-xs text-gray-500 mt-1">
                                {result.source === 'specific' ? '🎯 Direct Match' :
                                 result.source === 'database' ? '📊 Database' :
                                 result.source === 'popular' ? '⭐ Popular' :
                                 result.source === 'api' ? '🔍 Discovered' : '✅ Found'}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {advancedSearchQuery.length >= 2 && advancedSearchResults.length === 0 && !advancedSearchLoading && (
                    <div className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800 mb-3">
                        No stocks found for "{advancedSearchQuery}" in our database. Want to search thousands more potential stocks?
                      </p>
                      <button
                        onClick={handleMassiveSearch}
                        disabled={massiveSearchLoading}
                        className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors duration-300 disabled:bg-gray-400"
                      >
                        {massiveSearchLoading ? (
                          <>
                            <FaSpinner className="mr-2 animate-spin" />
                            Searching Thousands...
                          </>
                        ) : (
                          <>
                            🔍 Search Thousands More Stocks
                          </>
                        )}
                      </button>
                      <p className="text-xs text-gray-600 mt-2">
                        This will search thousands of potential NSE/BSE stock symbols via real-time API calls
                      </p>
                    </div>
                  )}

                  {massiveSearchLoading && (
                    <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center">
                        <FaSpinner className="mr-3 animate-spin text-blue-600" />
                        <div>
                          <p className="text-sm font-semibold text-blue-800">
                            Searching thousands of potential stocks...
                          </p>
                          <p className="text-xs text-blue-600">
                            Testing up to 50 potential symbol combinations via Yahoo Finance API
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Toggle for Custom Entry */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setShowCustomEntry(!showCustomEntry)}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-gray-600 hover:text-blue-600"
                >
                  <FaPlus className="inline mr-2" />
                  {showCustomEntry ? 'Hide Manual Entry' : 'Manual Entry (Enter Symbol Directly)'}
                </button>
              </div>

              {/* Custom Entry Form */}
              {showCustomEntry && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Add Any Indian Stock
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter any NSE/BSE stock symbol. We'll validate it and fetch real-time data.
                  </p>

                  <form onSubmit={handleAddStock}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stock Symbol *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={stockSymbol}
                            onChange={(e) => handleStockSymbolChange(e.target.value)}
                            placeholder="e.g., RELIANCE, TCS, HDFCBANK"
                            className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              stockValidation === 'valid' ? 'border-green-500' :
                              stockValidation === 'invalid' ? 'border-red-500' :
                              'border-gray-300'
                            }`}
                            required
                          />
                          {isValidatingStock && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            </div>
                          )}
                          {stockValidation === 'valid' && (
                            <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                          )}
                          {stockValidation === 'invalid' && (
                            <FaExclamationTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                          )}
                        </div>

                        {/* Stock Suggestions */}
                        {stockSuggestions.length > 0 && (
                          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                            {stockSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => handleSuggestionSelect(suggestion)}
                                className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}

                        {stockValidation === 'invalid' && (
                          <p className="mt-1 text-sm text-red-600">
                            Stock not found. Try a different symbol or check suggestions above.
                          </p>
                        )}
                        {stockValidation === 'valid' && (
                          <p className="mt-1 text-sm text-green-600">
                            ✓ Valid stock found! Real-time data loaded.
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Price *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={stockPrice}
                          onChange={(e) => setStockPrice(e.target.value)}
                          placeholder="e.g., 2825.50"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={stockName}
                          onChange={(e) => setStockName(e.target.value)}
                          placeholder="e.g., Reliance Industries"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Change %
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={stockChange}
                          onChange={(e) => setStockChange(e.target.value)}
                          placeholder="e.g., 1.25"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <FaPlus />
                        Add to Watchlist
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}