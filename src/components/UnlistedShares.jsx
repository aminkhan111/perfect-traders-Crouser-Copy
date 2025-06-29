'use client';

import { useState, useEffect } from 'react';
import { FaChartLine, FaShieldAlt, FaHandHoldingUsd, FaSearchDollar, FaChevronDown, FaChevronUp, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SharesFormModal from './SharesFormModal';
import SuccessStories from './SuccessStories';

const UnlistedShares = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedShare, setSelectedShare] = useState(null);
  const [actionType, setActionType] = useState('buy'); // 'buy' or 'sell'
  const [sharesData, setSharesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Google Sheets configuration
  const SHEET_ID = '1BXYOY6k2m-TEQqAv7COwu9uQEj7DFjzIqgKquH4ooQ8';
  const SHEET_NAME = 'Sheet1'; // Change this if your sheet has a different name
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY; // You'll need to set this in your .env.local

  // Function to fetch data from Google Sheets
  const fetchSharesData = async () => {
    try {
      setLoading(true);
      setError(null);

      // If no API key is provided, use fallback data
      if (!API_KEY) {
        console.warn('Google Sheets API key not found. Using fallback data.');
        setSharesData(getFallbackData());
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

      // Skip the header row and process the data
      const rows = data.values.slice(1);

      const processedData = rows.map((row, index) => ({
        id: index + 1,
        logo: row[0] || '/default-logo.png', // Logo path
        name: row[1] || 'Unknown Company', // Company name
        category: row[2] || 'Unlisted', // Category
        lotSize: parseInt(row[3]) || 100, // Lot size
        sector: row[4] || 'Unknown Sector', // Sector
        price: parseFloat(row[5]) || 0, // Price
        marketCap: parseFloat(row[6]) || 0, // Market cap
        chartImage: row[7] || '/charts/default-chart.svg', // Chart image
      }));

      setSharesData(processedData);
    } catch (err) {
      console.error('Error fetching shares data:', err);
      setError(err.message);
      // Use fallback data in case of error
      setSharesData(getFallbackData());
    } finally {
      setLoading(false);
    }
  };

  // Fallback data in case Google Sheets is not accessible
  const getFallbackData = () => [
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
    },
    {
      id: 3,
      logo: '/hero-fincorp-logo.png',
      name: 'Hero Fincorp',
      category: 'Unlisted',
      lotSize: 100,
      sector: 'Financial Service',
      price: 1450.00,
      marketCap: 308474.847,
      chartImage: '/charts/hero-chart.svg',
    },
    {
      id: 4,
      logo: '/nayara-logo.png',
      name: 'Nayara Energy',
      category: 'Delisted',
      lotSize: 100,
      sector: 'Energy, Oil & Gas',
      price: 900.00,
      marketCap: 134150.504,
      chartImage: '/charts/nayara-chart.svg',
    },
    {
      id: 5,
      logo: '/sbi-amc-logo.png',
      name: 'SBI AMC',
      category: 'Unlisted',
      lotSize: 100,
      sector: 'Financial Service',
      price: 2650.00,
      marketCap: 134042.950,
      chartImage: '/charts/sbi-chart.svg',
    },
    {
      id: 6,
      logo: '/hdb-logo.png',
      name: 'HDB Financial',
      category: 'Pre IPO',
      lotSize: 100,
      sector: 'Financial Service',
      price: 1100.00,
      marketCap: 87535.398,
      chartImage: '/charts/hdb-chart.svg',
    },
    {
      id: 7,
      logo: '/capgemini-logo.png',
      name: 'Capgemini',
      category: 'Delisted',
      lotSize: 10,
      sector: 'IT, Software',
      price: 11500.00,
      marketCap: 68161.990,
      chartImage: '/charts/capgemini-chart.svg',
    },
  ];

  // Fetch data on component mount
  useEffect(() => {
    fetchSharesData();
  }, []);

  const benefits = [
    {
      icon: <FaChartLine className="w-8 h-8 text-blue-600" />,
      title: "High Growth Potential",
      description: "Access to pre-IPO companies with significant growth opportunities"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-blue-600" />,
      title: "Portfolio Diversification",
      description: "Add alternative investments to your portfolio for better risk management"
    },
    {
      icon: <FaHandHoldingUsd className="w-8 h-8 text-blue-600" />,
      title: "Early Investment Access",
      description: "Get early access to promising companies before they go public"
    },
    {
      icon: <FaSearchDollar className="w-8 h-8 text-blue-600" />,
      title: "Expert Research",
      description: "Comprehensive analysis and research on unlisted companies"
    }
  ];

  const faqs = [
    {
      question: "What are unlisted shares?",
      answer: "Unlisted shares are equity shares of companies that are not listed on stock exchanges like NSE or BSE. These shares are traded in the over-the-counter (OTC) market and not through the formal exchange mechanism."
    },
    {
      question: "What are the benefits of investing in unlisted shares?",
      answer: "Investing in unlisted shares offers several benefits including potential for high returns, early access to promising companies before IPO, lower volatility compared to listed markets, portfolio diversification, and opportunity to invest in unique business models."
    },
    {
      question: "What are the risks associated with unlisted shares?",
      answer: "The main risks include liquidity risk (difficulty in selling), valuation challenges, limited regulatory oversight, lack of transparency, and the possibility of company failure. It's important to conduct thorough research and seek professional advice."
    },
    {
      question: "How do I buy unlisted shares?",
      answer: "Unlisted shares can be purchased through authorized channels like PerfectTraders. The process typically involves KYC verification, selecting shares, transferring funds, and completing share transfer formalities. Our team guides you through each step."
    },
    {
      question: "What is the minimum investment amount?",
      answer: "The minimum investment amount varies based on the company and current market conditions. At PerfectTraders, we offer flexible investment options starting from as low as ₹50,000 for certain unlisted shares."
    },
    {
      question: "How is pricing determined for unlisted shares?",
      answer: "Pricing for unlisted shares is determined through factors like the company's financial performance, growth prospects, industry trends, recent transactions, and valuations of comparable listed companies. Our experts provide fair pricing based on comprehensive analysis."
    }
  ];

  // Function to handle buy request
  const handleBuy = (share) => {
    setSelectedShare(share);
    setActionType('buy');
    setModalOpen(true);
  };

  // Function to handle sell request
  const handleSell = (share) => {
    setSelectedShare(share);
    setActionType('sell');
    setModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Unlisted Shares Table */}
        <div className="mb-16">
          {/* Table Header with Refresh Button */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Unlisted Shares</h2>
              <p className="text-gray-600 text-sm mt-1">
                {loading ? 'Loading...' : `${sharesData.length} shares available`}
                {error && <span className="text-red-500 ml-2">• Data from fallback source</span>}
              </p>
            </div>
            <button
              onClick={fetchSharesData}
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{loading ? 'Refreshing...' : 'Refresh Data'}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scrip Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lot size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                  <div className="text-xs font-normal">in ₹ per share</div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Cap
                  <div className="text-xs font-normal">in ₹ crores</div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chart</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                      <p className="text-gray-500">Loading shares data...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-red-500 mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-red-600 mb-2">Error loading data: {error}</p>
                      <button
                        onClick={fetchSharesData}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : sharesData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center">
                    <p className="text-gray-500">No shares data available</p>
                  </td>
                </tr>
              ) : (
                sharesData.map((share) => (
                <tr key={share.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{share.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        {/* Fallback image if logo is not available */}
                        <div className="bg-gray-200 h-10 w-10 rounded flex items-center justify-center text-gray-500">
                          {share.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-blue-600">{share.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      share.category === 'Unlisted' ? 'bg-blue-100 text-blue-800' : 
                      share.category === 'Delisted' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {share.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{share.lotSize}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{share.sector}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹ {share.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {share.marketCap.toLocaleString('en-IN', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-24 bg-gray-100 rounded">
                      {/* Placeholder for chart */}
                      <div className="h-full w-full flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 100 50">
                          <path 
                            d="M0,50 L10,45 L20,48 L30,40 L40,42 L50,30 L60,25 L70,15 L80,20 L90,10 L100,5" 
                            fill="none" 
                            stroke={share.id % 2 === 0 ? "#16a34a" : "#dc2626"} 
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <div className="flex space-x-2 justify-center">
                      <button 
                        onClick={() => handleBuy(share)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        BUY
                      </button>
                      <button 
                        onClick={() => handleSell(share)}
                        className="bg-yellow-700 hover:bg-yellow-800 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        SELL
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

        {/* Form Modal */}
        <SharesFormModal 
          isOpen={modalOpen}
          onClose={closeModal}
          share={selectedShare}
          actionType={actionType}
        />

        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Invest in Unlisted Shares
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            Unlock the potential of pre-IPO investments with our expert guidance. 
            Access exclusive opportunities in unlisted companies and diversify your portfolio 
            with high-growth potential investments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories Section - Using Reusable Component */}
        <SuccessStories />

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto my-16"
        >
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full p-5 text-left focus:outline-none"
                >
                  <span className="font-semibold text-lg text-gray-800">{faq.question}</span>
                  {openFaq === index ? 
                    <FaChevronUp className="text-blue-600" /> : 
                    <FaChevronDown className="text-blue-600" />
                  }
                </button>
                
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                  style={{ height: openFaq === index ? 'auto' : 0 }}
                >
                  <div className="p-5 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Contact Us For More Information
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UnlistedShares; 