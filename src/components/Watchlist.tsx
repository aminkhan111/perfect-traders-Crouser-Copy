'use client';

import { useState, useEffect } from 'react';
import { fetchIndianStockQuote, convertToStockData } from '@/lib/yahoo-finance-india';
import { FaSync, FaTimes, FaChevronUp, FaChevronDown, FaUsers, FaLock } from 'react-icons/fa';
import AddToWatchlistModal from './AddToWatchlistModal';

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

export default function Watchlist() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof StockData>('symbol');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Load shared watchlist on component mount and set up periodic checks
  useEffect(() => {
    loadSharedWatchlist();

    // Check for updates every 30 seconds
    const interval = setInterval(() => {
      checkForWatchlistUpdates();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Load shared watchlist from API
  const loadSharedWatchlist = async () => {
    try {
      console.log('📡 Loading shared watchlist from API...');
      const response = await fetch('/api/watchlist');
      const result = await response.json();

      if (result.success) {
        setStocks(result.data.stocks || []);
        setLastUpdated(new Date(result.data.lastUpdated));
        console.log(`📊 Loaded ${result.data.stocks?.length || 0} stocks from shared watchlist API`);
      } else {
        console.error('Failed to load watchlist:', result.message);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error loading shared watchlist from API:', error);
      setLastUpdated(new Date());
    }
  };

  // Check for updates to the shared watchlist via API
  const checkForWatchlistUpdates = async () => {
    try {
      const response = await fetch('/api/watchlist');
      const result = await response.json();

      if (result.success) {
        const savedStocks = result.data.stocks || [];

        // Check if there are new stocks
        if (savedStocks.length > stocks.length) {
          const newStocks = savedStocks.filter((savedStock: StockData) =>
            !stocks.find(currentStock => currentStock.symbol === savedStock.symbol)
          );

          if (newStocks.length > 0) {
            setStocks(savedStocks);
            setLastUpdated(new Date(result.data.lastUpdated));

            // Show notification for new stocks
            const newStockSymbols = newStocks.map((stock: StockData) => stock.symbol).join(', ');
            console.log(`🔔 New stocks added to shared watchlist: ${newStockSymbols}`);

            if (newStocks.length === 1) {
              alert(`🔔 New stock added to community watchlist: ${newStockSymbols}`);
            } else {
              alert(`🔔 ${newStocks.length} new stocks added to community watchlist: ${newStockSymbols}`);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error checking for watchlist updates:', error);
    }
  };

  // Function to add a new stock to the SHARED watchlist via API
  const handleAddStock = async (stockData: any) => {
    // This function is called from the modal after passcode verification
    // The API will handle duplicate checking and real-time data fetching

    setLoading(true);
    try {
      console.log(`🎯 Adding ${stockData.symbol} to shared watchlist via API...`);

      const response = await fetch('/api/watchlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockData: stockData,
          passcode: '717273', // This should come from the modal
          userAgent: navigator.userAgent
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Reload the watchlist to get the updated data
        await loadSharedWatchlist();
        alert(result.message);
        console.log(`✅ Successfully added ${stockData.symbol} to shared watchlist`);
      } else {
        alert(`❌ ${result.message}`);
        console.error(`Failed to add ${stockData.symbol}:`, result.message);
      }
    } catch (error) {
      console.error('Error adding stock via API:', error);
      alert('❌ Failed to add stock. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to remove a stock from the SHARED watchlist via API (requires passcode)
  const handleRemoveStock = async (symbol: string) => {
    const passcode = prompt(`To remove ${symbol} from the SHARED watchlist, enter the passcode:`);

    if (passcode === '717273') {
      if (confirm(`Are you sure you want to remove ${symbol} from the SHARED watchlist? This will affect all users.`)) {
        try {
          console.log(`🗑️ Removing ${symbol} from shared watchlist via API...`);

          const response = await fetch('/api/watchlist/remove', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              symbol: symbol,
              passcode: passcode
            }),
          });

          const result = await response.json();

          if (result.success) {
            // Reload the watchlist to get the updated data
            await loadSharedWatchlist();
            alert(result.message);
            console.log(`✅ Successfully removed ${symbol} from shared watchlist`);
          } else {
            alert(`❌ ${result.message}`);
            console.error(`Failed to remove ${symbol}:`, result.message);
          }
        } catch (error) {
          console.error('Error removing stock via API:', error);
          alert('❌ Failed to remove stock. Please try again.');
        }
      }
    } else if (passcode !== null) {
      alert('❌ Incorrect passcode. Only authorized users can remove stocks from the shared watchlist.');
    }
  };

  // Function to refresh all stocks with real-time data
  const handleRefreshAll = async () => {
    if (stocks.length === 0) {
      alert('No stocks in watchlist to refresh. Add some stocks first!');
      return;
    }

    setRefreshing(true);
    console.log('🔄 Refreshing all stocks with real-time data...');

    try {
      const updatedStocks: StockData[] = [];

      for (const stock of stocks) {
        try {
          const quote = await fetchIndianStockQuote(stock.symbol);
          if (quote) {
            const updatedStock = convertToStockData(quote);
            updatedStocks.push(updatedStock);
            console.log(`✅ Updated ${stock.symbol}`);
          } else {
            // Keep existing data if API fails
            updatedStocks.push(stock);
            console.log(`⚠️ Kept existing data for ${stock.symbol}`);
          }

          // Small delay between requests
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`Error updating ${stock.symbol}:`, error);
          updatedStocks.push(stock);
        }
      }

      setStocks(updatedStocks);
      setLastUpdated(new Date());
      console.log(`🎉 Refreshed ${updatedStocks.length} stocks in SHARED watchlist`);

      // Note: For now, refresh only updates local state with real-time data
      // In a full implementation, you might want to update the API as well
    } catch (error) {
      console.error('Error refreshing stocks:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Sorting function
  const handleSort = (column: keyof StockData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Sort stocks based on current sort settings
  const sortedStocks = [...stocks].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  // Sort icon component
  const SortIcon = ({ column }: { column: keyof StockData }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <FaUsers className="mr-3 text-blue-600" />
                Shared Community Watchlist
              </h1>
              <p className="text-gray-600">
                Community-driven Indian stock watchlist with real-time data. Stocks added by authorized users are visible to everyone!
              </p>
            </div>

            <div className="flex gap-3">
              {/* Add Stock Button */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
              >
                <FaLock className="mr-2" />
                Add Stock (Passcode Required)
              </button>

              {/* Refresh Button */}
              <button
                onClick={handleRefreshAll}
                disabled={refreshing || stocks.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors duration-300 disabled:bg-gray-400"
              >
                <FaSync className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh All'}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>👥 Community Stocks: {stocks.length}</span>
            {lastUpdated && (
              <span>🕒 Last Updated: {lastUpdated.toLocaleTimeString()}</span>
            )}
            <span>💡 Real-time data from Yahoo Finance</span>
            <span>🔒 Add stocks with passcode 717273</span>
          </div>
        </div>

        {/* Watchlist Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {stocks.length === 0 ? (
            /* Empty State */
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">👥📈</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Community Watchlist is Empty</h3>
              <p className="text-gray-600 mb-6">
                Be the first to add stocks to the shared community watchlist! Stocks you add will be visible to everyone.
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg flex items-center mx-auto transition-colors duration-300"
              >
                <FaLock className="mr-2" />
                Add First Community Stock
              </button>
              <div className="mt-8 text-sm text-gray-500">
                <p>🔒 Requires passcode 717273 to add stocks</p>
                <p>👥 Added stocks are visible to all users</p>
                <p>🔄 Real-time NSE/BSE data for all</p>
                <p>📊 Community-driven stock analysis</p>
              </div>
            </div>
          ) : (
            /* Stocks Table */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('symbol')}
                    >
                      Symbol <SortIcon column="symbol" />
                    </th>
                    <th
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('ltp')}
                    >
                      LTP <SortIcon column="ltp" />
                    </th>
                    <th
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('change')}
                    >
                      Change % <SortIcon column="change" />
                    </th>
                    <th
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('volume')}
                    >
                      Volume <SortIcon column="volume" />
                    </th>
                    <th
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('open')}
                    >
                      Open <SortIcon column="open" />
                    </th>
                    <th
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('high')}
                    >
                      High <SortIcon column="high" />
                    </th>
                    <th
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('low')}
                    >
                      Low <SortIcon column="low" />
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedStocks.map((stock) => (
                    <tr key={stock.symbol} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-semibold text-gray-900">{stock.symbol}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <div className="font-bold text-gray-900">₹{stock.ltp.toFixed(2)}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <div className={`font-semibold ${stock.color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-gray-900">
                        {stock.volume.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-gray-900">
                        ₹{stock.open.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-gray-900">
                        ₹{stock.high.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-gray-900">
                        ₹{stock.low.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleRemoveStock(stock.symbol)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors duration-200"
                          title={`Remove ${stock.symbol} from shared watchlist (requires passcode)`}
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Stock Modal */}
        <AddToWatchlistModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddStock={handleAddStock}
        />
      </div>
    </div>
  );
}