'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { trackStockView, trackStockAction } from '@/lib/gtag';
import {
  FaArrowLeft,
  FaChartLine,
  FaBuilding,
  FaIndustry,
  FaCalendarAlt,
  FaUsers,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTrendingUp,
  FaTrendingDown,
  FaInfoCircle,
  FaExternalLinkAlt
} from 'react-icons/fa';
import SharesFormModal from '@/components/SharesFormModal';

export default function StockDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState('buy');

  // Google Sheets configuration (same as UnlistedShares component)
  const SHEET_ID = '1BXYOY6k2m-TEQqAv7COwu9uQEj7DFjzIqgKquH4ooQ8';
  const SHEET_NAME = 'Sheet1';
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

  // Fetch stock data from Google Sheets
  const fetchStockData = async () => {
    try {
      setLoading(true);
      
      if (!API_KEY) {
        console.warn('Google Sheets API key not found. Using fallback data.');
        setStockData(getFallbackStockData());
        setLoading(false);
        return;
      }

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.values || data.values.length === 0) {
        throw new Error('No data found in the sheet');
      }

      // Skip the header row and find the specific stock
      const rows = data.values.slice(1);
      const stockId = parseInt(params.id);
      
      if (stockId <= 0 || stockId > rows.length) {
        router.push('/unlisted-shares');
        return;
      }

      const row = rows[stockId - 1];
      const processedData = {
        id: stockId,
        logo: row[0] || '/default-logo.png',
        name: row[1] || 'Unknown Company',
        category: row[2] || 'Unlisted',
        lotSize: parseInt(row[3]) || 100,
        sector: row[4] || 'Unknown Sector',
        price: parseFloat(row[5]) || 0,
        marketCap: parseFloat(row[6]) || 0,
        chartImage: row[7] || '/charts/default-chart.svg',
        // Additional details for the detail page
        description: row[8] || 'No description available',
        foundedYear: row[9] || 'N/A',
        employees: row[10] || 'N/A',
        website: row[11] || 'N/A',
        headquarters: row[12] || 'N/A',
        ceo: row[13] || 'N/A',
        revenue: row[14] || 'N/A',
        netIncome: row[15] || 'N/A',
        totalAssets: row[16] || 'N/A'
      };

      setStockData(processedData);

      // Track stock view
      trackStockView(processedData.name, processedData.id);
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setStockData(getFallbackStockData());
    } finally {
      setLoading(false);
    }
  };

  // Fallback data for when API is not available
  const getFallbackStockData = () => {
    const fallbackStocks = [
      {
        id: 1,
        logo: '/nse-logo.png',
        name: 'NSE India',
        category: 'Unlisted',
        lotSize: 100,
        sector: 'Financial Service',
        price: 2400.00,
        marketCap: 574200.000,
        chartImage: '/charts/nse-chart.svg',
        description: 'National Stock Exchange of India Limited (NSE) is the leading stock exchange of India, located in Mumbai. NSE was established in 1992 as the first demutualized electronic exchange in the country.',
        foundedYear: '1992',
        employees: '1,500+',
        website: 'www.nseindia.com',
        headquarters: 'Mumbai, Maharashtra',
        ceo: 'Vikram Limaye',
        revenue: '₹6,500 Cr',
        netIncome: '₹2,100 Cr',
        totalAssets: '₹15,000 Cr'
      },
      {
        id: 2,
        logo: '/tata-capital-logo.png',
        name: 'Tata Capital',
        category: 'Unlisted',
        lotSize: 100,
        sector: 'Investment & Holding',
        price: 1040.00,
        marketCap: 385117.660,
        chartImage: '/charts/tata-chart.svg',
        description: 'Tata Capital Limited is the flagship financial services company of the Tata group. It provides a wide range of financial solutions including consumer finance, commercial finance, and investment banking.',
        foundedYear: '2007',
        employees: '8,000+',
        website: 'www.tatacapital.com',
        headquarters: 'Mumbai, Maharashtra',
        ceo: 'Rajesh Sharma',
        revenue: '₹12,500 Cr',
        netIncome: '₹1,800 Cr',
        totalAssets: '₹85,000 Cr'
      }
      // Add more fallback data as needed
    ];

    const stockId = parseInt(params.id);
    return fallbackStocks.find(stock => stock.id === stockId) || fallbackStocks[0];
  };

  useEffect(() => {
    if (params.id) {
      fetchStockData();
    }
  }, [params.id]);

  const handleBuy = () => {
    setActionType('buy');
    setModalOpen(true);

    // Track buy action
    if (stockData) {
      trackStockAction('buy', stockData.name, stockData.id);
    }
  };

  const handleSell = () => {
    setActionType('sell');
    setModalOpen(true);

    // Track sell action
    if (stockData) {
      trackStockAction('sell', stockData.name, stockData.id);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stock details...</p>
        </div>
      </div>
    );
  }

  if (!stockData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Stock not found</p>
          <button
            onClick={() => router.push('/unlisted-shares')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Unlisted Shares
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/unlisted-shares')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Unlisted Shares
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-gray-600">
                  {stockData.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{stockData.name}</h1>
                <div className="flex items-center mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    stockData.category === 'Unlisted' ? 'bg-blue-100 text-blue-800' : 
                    stockData.category === 'Delisted' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {stockData.category}
                  </span>
                  <span className="ml-3 text-gray-600">{stockData.sector}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                ₹{stockData.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-600">per share</div>
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={handleBuy}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  BUY
                </button>
                <button
                  onClick={handleSell}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  SELL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaInfoCircle className="mr-3 text-blue-600" />
                Company Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {stockData.description}
              </p>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaChartLine className="mr-3 text-blue-600" />
                Key Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Market Cap</div>
                  <div className="text-xl font-bold text-gray-900">
                    ₹{stockData.marketCap.toLocaleString('en-IN')} Cr
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Lot Size</div>
                  <div className="text-xl font-bold text-gray-900">
                    {stockData.lotSize} shares
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Revenue</div>
                  <div className="text-xl font-bold text-gray-900">
                    {stockData.revenue}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Net Income</div>
                  <div className="text-xl font-bold text-gray-900">
                    {stockData.netIncome}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FaBuilding className="mr-3 text-blue-600" />
                Company Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">Founded</div>
                    <div className="font-medium">{stockData.foundedYear}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">Employees</div>
                    <div className="font-medium">{stockData.employees}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">Headquarters</div>
                    <div className="font-medium">{stockData.headquarters}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaGlobe className="text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">Website</div>
                    <a
                      href={stockData.website.startsWith('http') ? stockData.website : `https://${stockData.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-all duration-200 flex items-center group"
                      title={`Visit ${stockData.website}`}
                    >
                      <span className="group-hover:text-blue-800">{stockData.website}</span>
                      <FaExternalLinkAlt className="ml-2 text-xs opacity-70 group-hover:opacity-100 group-hover:transform group-hover:translate-x-1 transition-all duration-200" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Investment Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Price</span>
                  <span className="font-bold">₹{stockData.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum Investment</span>
                  <span className="font-bold">₹{(stockData.price * stockData.lotSize).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-bold">{stockData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sector</span>
                  <span className="font-bold">{stockData.sector}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button
                    onClick={handleBuy}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    BUY NOW
                  </button>
                  <button
                    onClick={handleSell}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    SELL
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <SharesFormModal 
        isOpen={modalOpen}
        onClose={closeModal}
        share={stockData}
        actionType={actionType}
      />
    </div>
  );
}
