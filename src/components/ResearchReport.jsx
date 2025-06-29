'use client';

import { useState } from 'react';
import { FaSearch, FaChevronDown, FaArrowRight, FaFilePdf, FaSort, FaSortUp, FaSortDown, FaChevronCircleDown, FaLink, FaFile } from 'react-icons/fa';
import Link from 'next/link';

const ResearchReport = () => {
  const [activeStockTab, setActiveStockTab] = useState('Upside');
  const [activeSentimentTab, setActiveSentimentTab] = useState('6M');
  const [activeResearchTab, setActiveResearchTab] = useState('Most Buys');
  const [sortColumn, setSortColumn] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const recentReports = [
    {
      date: "03 JUN 2025",
      stock: "Sharda Cropchem",
      author: "Khambatta Securities",
      recommendation: "Reco",
      target: true,
      ltp: 764.90,
      targetPrice: 793.00,
      priceAtReco: 764.90,
      upside: 3.67,
      type: "Hold",
      pdfUrl: "https://trendlyne-media-mumbai-new.s3.amazonaws.com/uploaded-documents/fundamental/1214/9b3f05545c4e4ca68401fd1814385a66-03062025.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUABWFMACZL6M6VIP%2F20250603%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250603T174353Z&X-Amz-Expires=7200&X-Amz-SignedHeaders=host&X-Amz-Signature=6c3e60e958e02a2644ac6bf1ad41d6180fdc957a155758e6b828a2025c596b08"
    },
    {
      date: "03 JUN 2025",
      stock: "Bank of India",
      author: "Geojit BNP Paribas",
      recommendation: "",
      target: true,
      ltp: 124.59,
      targetPrice: 139.00,
      priceAtReco: 124.59,
      upside: 11.57,
      type: "Accumulate",
      pdfUrl: "https://gcc.geojit.net/researchdesk/SP20250306130052660Bank%20of%20IndiaQ4.pdf"
    },
    {
      date: "03 JUN 2025",
      stock: "Bharat Electronics",
      author: "Geojit BNP Paribas",
      recommendation: "",
      target: true,
      ltp: 386.00,
      targetPrice: 441.00,
      priceAtReco: 386.00,
      upside: 14.25,
      type: "Buy",
      pdfUrl: "https://gcc.geojit.net/researchdesk/SP20250306130008067BEL.pdf"
    },
    {
      date: "03 JUN 2025",
      stock: "KEC International",
      author: "Geojit BNP Paribas",
      recommendation: "",
      target: true,
      ltp: 870.55,
      targetPrice: 998.00,
      priceAtReco: 870.55,
      upside: 14.64,
      type: "Accumulate",
      pdfUrl: "https://gcc.geojit.net/researchdesk/SP20250306115823773KEC.pdf"
    },
    {
      date: "03 JUN 2025",
      stock: "Century Plyboards",
      author: "IDBI Capital",
      recommendation: "",
      target: false,
      ltp: 782.95,
      targetPrice: 782.00,
      priceAtReco: 782.95,
      upside: "Target met",
      type: "Hold",
      pdfUrl: "https://www.idbidirect.in/IDBIAdmin/Pdf/CPBI_RR_03062025-03-June-2025-224972686.pdf"
    },
    {
      date: "03 JUN 2025",
      stock: "Commodities",
      author: "IDBI Capital",
      recommendation: "",
      target: false,
      ltp: null,
      targetPrice: null,
      priceAtReco: null,
      upside: null,
      type: "Sector Update",
      pdfUrl: "https://www.idbidirect.in/IDBIAdmin/Pdf/Commodity_Price_Update_SU_03062025-03-June-2025-2095900904.pdf"
    },
    {
      date: "03 JUN 2025",
      stock: "Automobiles & Auto Components",
      author: "Axis Direct",
      recommendation: "",
      target: false,
      ltp: null,
      targetPrice: null,
      priceAtReco: null,
      upside: null,
      type: "Sector Update",
      pdfUrl: ""
    }
  ];

  // Sort function for report data
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column) => {
    if (sortColumn !== column) return <FaSort className="text-gray-300 ml-1" />;
    return sortDirection === 'asc' ? 
      <FaSortUp className="text-gray-600 ml-1" /> : 
      <FaSortDown className="text-gray-600 ml-1" />;
  };

  // Apply sorting to reports
  const sortedReports = [...recentReports].sort((a, b) => {
    let valueA = a[sortColumn];
    let valueB = b[sortColumn];
    
    // Handle null values
    if (valueA === null) return 1;
    if (valueB === null) return -1;
    
    // For numeric comparison
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }
    
    // For string comparison
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    return 0;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Search input */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search by stock name, code" 
            className="w-full py-3 px-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-4 text-gray-400" />
        </div>
        
        {/* Filter dropdown */}
        <div className="relative">
          <div className="w-full py-3 px-4 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer bg-white">
            <span className="text-gray-600">Filter By Broker</span>
            <FaChevronDown className="text-gray-600" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {/* Filter Stocks By Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-4 pt-4 pb-2">
            <h3 className="text-gray-800 font-medium">FILTER STOCKS BY +</h3>
          </div>
          
          <div className="flex border-b mb-4">
            <button 
              onClick={() => setActiveStockTab('Upside')}
              className={`px-6 py-3 ${activeStockTab === 'Upside' ? 'bg-blue-50 text-blue-500' : 'text-gray-500'}`}
            >
              Upside
            </button>
            <button 
              onClick={() => setActiveStockTab('Upgrades')}
              className={`px-6 py-3 ${activeStockTab === 'Upgrades' ? 'bg-blue-50 text-blue-500' : 'text-gray-500'}`}
            >
              Upgrades
            </button>
            <button 
              onClick={() => setActiveStockTab('Downgrades')}
              className={`px-6 py-3 ${activeStockTab === 'Downgrades' ? 'bg-blue-50 text-blue-500' : 'text-gray-500'}`}
            >
              Downgrades
            </button>
          </div>
          
          <div className="px-4 pb-6">
            {/* Stock 1 */}
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded">BUY</span>
                  <Link href="/reports" className="text-blue-500 text-xs">SEE REPORTS &gt;</Link>
                </div>
                <Link href="/pdf" className="text-red-500">
                  <FaFilePdf />
                </Link>
              </div>
              <h4 className="text-base font-medium text-gray-900">Restaurant Brands As..</h4>
              <p className="text-xs text-gray-600">by Motilal Oswal | Target: <span className="font-medium">135</span> | Upside: <span className="text-green-600 font-medium">68.14%</span></p>
            </div>
            
            {/* Stock 2 */}
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded">BUY</span>
                  <Link href="/reports" className="text-blue-500 text-xs">SEE REPORTS &gt;</Link>
                </div>
                <Link href="/pdf" className="text-red-500">
                  <FaFilePdf />
                </Link>
              </div>
              <h4 className="text-base font-medium text-gray-900">Neogen Chemicals Ltd.</h4>
              <p className="text-xs text-gray-600">by IDBI Capital | Target: <span className="font-medium">2871</span> | Upside: <span className="text-green-600 font-medium">67.70%</span></p>
            </div>
            
            <div className="flex justify-center">
              <Link href="/reports" className="text-blue-500 text-sm font-medium flex items-center">
                All highest upside reports <FaArrowRight className="ml-1" size={12} />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Broker Research Report Sentiment */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-4 pt-4 pb-2">
            <h3 className="text-gray-800 font-medium">BROKER RESEARCH REPORT SENTIMENT +</h3>
          </div>
          
          <div className="flex justify-between px-4 border-b mb-4">
            <button 
              onClick={() => setActiveSentimentTab('1W')}
              className={`py-3 ${activeSentimentTab === '1W' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            >
              1W
            </button>
            <button 
              onClick={() => setActiveSentimentTab('1M')}
              className={`py-3 ${activeSentimentTab === '1M' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            >
              1M
            </button>
            <button 
              onClick={() => setActiveSentimentTab('3M')}
              className={`py-3 ${activeSentimentTab === '3M' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            >
              3M
            </button>
            <button 
              onClick={() => setActiveSentimentTab('6M')}
              className={`py-3 ${activeSentimentTab === '6M' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            >
              6M
            </button>
            <button 
              onClick={() => setActiveSentimentTab('1Y')}
              className={`py-3 ${activeSentimentTab === '1Y' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            >
              1Y
            </button>
          </div>
          
          <div className="px-4 pb-6">
            {/* Chart Visualization */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Value</span>
              </div>
              
              <div className="relative h-64 mt-4">
                {/* Y-axis labels */}
                <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-right pr-2 text-xs text-gray-500">
                  <span>2K</span>
                  <span>1.5K</span>
                  <span>1K</span>
                  <span>500</span>
                  <span>0</span>
                </div>
                
                {/* Chart bars */}
                <div className="ml-8 h-full flex items-end justify-between">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 w-12" style={{height: '150px'}}></div>
                    <div className="text-xs text-gray-500 mt-1">Buy</div>
                    <div className="text-xs text-gray-500 mt-1">1609</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 w-12" style={{height: '60px'}}></div>
                    <div className="text-xs text-gray-500 mt-1">Hold</div>
                    <div className="text-xs text-gray-500 mt-1">335</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 w-12" style={{height: '40px'}}></div>
                    <div className="text-xs text-gray-500 mt-1">Accumulate</div>
                    <div className="text-xs text-gray-500 mt-1">197</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 w-12" style={{height: '32px'}}></div>
                    <div className="text-xs text-gray-500 mt-1">Sell</div>
                    <div className="text-xs text-gray-500 mt-1">160</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 w-12" style={{height: '26px'}}></div>
                    <div className="text-xs text-gray-500 mt-1">Neutral</div>
                    <div className="text-xs text-gray-500 mt-1">131</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chart controls */}
            <div className="flex justify-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button className="p-2 text-blue-500 hover:text-blue-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="5" height="20" />
                  <rect x="9.5" y="6" width="5" height="16" />
                  <rect x="17" y="10" width="5" height="12" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Most Actively Researched Stocks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-4 pt-4 pb-2">
            <h3 className="text-gray-800 font-medium">MOST ACTIVELY RESEARCHED STOCKS +</h3>
          </div>
          
          <div className="flex justify-center border-b mb-4">
            <button 
              onClick={() => setActiveResearchTab('Most Buys')}
              className={`px-6 py-3 ${activeResearchTab === 'Most Buys' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            >
              Most Buys
            </button>
            <button 
              onClick={() => setActiveResearchTab('Most Sells')}
              className={`px-6 py-3 ${activeResearchTab === 'Most Sells' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            >
              Most Sells
            </button>
            <button 
              onClick={() => setActiveResearchTab('Most Reports')}
              className={`px-6 py-3 ${activeResearchTab === 'Most Reports' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            >
              Most Reports
            </button>
          </div>
          
          <div className="px-4 pb-6">
            <div className="relative">
              {/* Donut chart visualization */}
              <div className="flex justify-center">
                <div className="relative w-60 h-60">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* This is a simplified donut chart representation */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f1f1" strokeWidth="20" />
                    
                    {/* Segments would normally be calculated, this is just for visual representation */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#FFC857" 
                      strokeWidth="20" 
                      strokeDasharray="50 200"
                      strokeDashoffset="0"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#E9724C" 
                      strokeWidth="20" 
                      strokeDasharray="35 200"
                      strokeDashoffset="-50"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#C5283D" 
                      strokeWidth="20" 
                      strokeDasharray="20 200"
                      strokeDashoffset="-85"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#255F85" 
                      strokeWidth="20" 
                      strokeDasharray="25 200"
                      strokeDashoffset="-105"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#90A955" 
                      strokeWidth="20" 
                      strokeDasharray="15 200"
                      strokeDashoffset="-130"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#6B0F1A" 
                      strokeWidth="20" 
                      strokeDasharray="20 200"
                      strokeDashoffset="-145"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#7768AE" 
                      strokeWidth="20" 
                      strokeDasharray="30 200"
                      strokeDashoffset="-165"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#69D2E7" 
                      strokeWidth="20" 
                      strokeDasharray="20 200"
                      strokeDashoffset="-195"
                    />
                  </svg>
                  
                  {/* Center empty space */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white w-28 h-28 rounded-full"></div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-0 right-2 text-xs">SBILIFE: 13</div>
                  <div className="absolute top-6 right-0 text-xs">SBIN: 23</div>
                  <div className="absolute top-14 right-0 text-xs">FEDERALBNK: 22</div>
                  <div className="absolute bottom-12 right-0 text-xs">ULTRACEMCO: 21</div>
                  <div className="absolute bottom-2 right-8 text-xs">ICICIBANK: 21</div>
                  <div className="absolute bottom-2 left-8 text-xs">HDFCBANK: 18</div>
                  <div className="absolute bottom-12 left-0 text-xs">MARUTI: 15</div>
                  <div className="absolute top-14 left-0 text-xs">KOTAKBANK: 15</div>
                  <div className="absolute top-6 left-0 text-xs">BAJFINANCE: 14</div>
                  <div className="absolute top-0 left-2 text-xs">HINDALCO: 13</div>
                </div>
              </div>
              
              {/* Chart controls */}
              <div className="flex justify-center gap-4 mt-4">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="5" height="20" />
                    <rect x="9.5" y="6" width="5" height="16" />
                    <rect x="17" y="10" width="5" height="12" />
                  </svg>
                </button>
                <button className="p-2 text-blue-500 hover:text-blue-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Research Reports Table - New section from the image */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    DATE {getSortIcon('date')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('stock')}
                >
                  <div className="flex items-center">
                    STOCK {getSortIcon('stock')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('author')}
                >
                  <div className="flex items-center">
                    AUTHOR {getSortIcon('author')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('ltp')}
                >
                  <div className="flex items-center">
                    LTP {getSortIcon('ltp')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('targetPrice')}
                >
                  <div className="flex items-center">
                    TARGET {getSortIcon('targetPrice')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    PRICE AT RECO <br />(CHANGE SINCE RECO%)
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('upside')}
                >
                  <div className="flex items-center">
                    UPSIDE(%) {getSortIcon('upside')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center">
                    TYPE {getSortIcon('type')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  REPORT
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedReports.map((report, index) => (
                <tr 
                  key={index} 
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-gray-50"}
                >
                  <td className="px-4 py-3 text-sm text-gray-700">{report.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <button className="text-blue-600 font-medium text-sm hover:underline">
                        {report.stock}
                      </button>
                      {index < 1 && (
                        <button className="ml-2 text-gray-500">
                          <FaChevronDown />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-blue-600 text-sm">{report.author}</div>
                      <div className="flex items-center mt-1">
                        {report.recommendation && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mr-1">
                            <span className="mr-1">↓</span> Reco
                          </span>
                        )}
                        {report.target && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            <span className="mr-1">↑</span> Target
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {report.ltp !== null ? report.ltp.toFixed(2) : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {report.targetPrice !== null ? report.targetPrice.toFixed(2) : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {report.priceAtReco !== null ? report.priceAtReco.toFixed(2) : '-'}
                  </td>
                  <td className="px-4 py-3">
                    {typeof report.upside === 'number' ? (
                      <span className="text-green-600 font-medium text-sm">
                        {report.upside.toFixed(2)}
                      </span>
                    ) : report.upside ? (
                      <span className="text-gray-600 font-medium text-sm">
                        {report.upside}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-3">
                    {report.type === "Buy" ? (
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Buy</span>
                      </div>
                    ) : report.type === "Hold" ? (
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Hold</span>
                      </div>
                    ) : report.type === "Accumulate" ? (
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Accumulate</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">{report.type}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-3">
                      <a 
                        href={report.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaFilePdf />
                      </a>
                      <a 
                        href={report.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaLink />
                      </a>
                      <button className="text-gray-600 hover:text-gray-800">
                        <FaFile />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaChevronCircleDown />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResearchReport; 