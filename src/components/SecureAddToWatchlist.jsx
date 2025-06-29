'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { fetchStockQuote } from '@/lib/twelvedata';
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa';

const SecureAddToWatchlist = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [stockData, setStockData] = useState(null);

  const handleAuthenticate = () => {
    const passcode = prompt('Please enter the passcode to add stocks:');
    if (passcode === '717273') {
      setIsAuthenticated(true);
      setMessage({ type: 'success', text: 'Authentication successful!' });
    } else {
      setMessage({ type: 'error', text: 'Invalid passcode!' });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!symbol.trim()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const data = await fetchStockQuote(symbol);
      if (!data) {
        throw new Error('Invalid stock symbol');
      }
      setStockData(data);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to fetch stock data' });
      setStockData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStock = async () => {
    if (!stockData) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await addDoc(collection(db, 'watchlist'), {
        symbol: stockData.symbol,
        name: stockData.name,
        price: stockData.price,
        change: stockData.change,
        changePercent: stockData.changePercent,
        volume: stockData.volume,
        marketCap: stockData.marketCap,
        addedAt: new Date().toISOString()
      });

      setMessage({ type: 'success', text: `${stockData.symbol} added successfully!` });
      setSymbol('');
      setStockData(null);
      setIsAuthenticated(false);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to add stock' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {!isAuthenticated ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleAuthenticate}
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg flex items-center justify-center transition-colors duration-300 shadow-lg text-lg font-semibold"
          >
            <FaPlus className="mr-3 text-xl" />
            Add to Watchlist
          </button>
          <p className="mt-2 text-sm text-gray-500">Click to add new stocks to your watchlist</p>
        </div>
      ) : (
        <div className="space-y-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="Enter stock symbol (e.g., AAPL)"
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  required
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center transition-colors duration-300 disabled:bg-blue-400 min-w-[100px]"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAuthenticated(false);
                    setSymbol('');
                    setMessage({ type: '', text: '' });
                    setStockData(null);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg transition-colors duration-300 min-w-[100px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>

          {/* Stock Data Display */}
          {stockData && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{stockData.symbol}</h4>
                    <p className="text-gray-600">{stockData.name}</p>
                  </div>
                  <button
                    onClick={handleAddStock}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-300 disabled:bg-green-400"
                  >
                    <FaPlus className="mr-2" />
                    Add to Watchlist
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-lg font-semibold">${stockData.price}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Change</p>
                    <p className={`text-lg font-semibold ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stockData.change >= 0 ? '+' : ''}{stockData.change} ({stockData.changePercent}%)
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Volume</p>
                    <p className="text-lg font-semibold">{stockData.volume?.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Market Cap</p>
                    <p className="text-lg font-semibold">${stockData.marketCap?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {message.text && (
            <div className={`p-4 rounded-lg text-center ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SecureAddToWatchlist; 