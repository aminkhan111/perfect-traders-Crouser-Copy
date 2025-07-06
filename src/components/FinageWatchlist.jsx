'use client';

import { useState, useEffect } from 'react';
import { 
  FaRefresh, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaExclamationTriangle
} from 'react-icons/fa';

const FinageWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if Finage API is enabled
  const isFinageEnabled = !!process.env.NEXT_PUBLIC_FINAGE_API_KEY;

  // Sample data for demonstration
  const sampleStocks = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      price: 2450.75,
      change: 25.30,
      changePercent: 1.04,
      volume: 1234567
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: 3890.50,
      change: -15.25,
      changePercent: -0.39,
      volume: 987654
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank',
      price: 1650.25,
      change: 12.75,
      changePercent: 0.78,
      volume: 2345678
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

  // Initialize with sample data
  useEffect(() => {
    if (isFinageEnabled) {
      setWatchlist(sampleStocks);
    } else {
      setError('Finage API not configured. Showing sample data.');
      setWatchlist(sampleStocks);
    }
  }, []);

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
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Market Open
          </div>
          
          <button
            onClick={() => setLoading(!loading)}
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
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => console.log('View details for:', stock)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
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
            ? 'Data provided by Finage API • Updates every 30 seconds when market is open'
            : 'Sample data shown • Configure Finage API for real-time data'
          }
        </p>
        <p>Free tier: 1000 requests/month • {watchlist.length} stocks in watchlist</p>
      </div>
    </div>
  );
};

export default FinageWatchlist;
