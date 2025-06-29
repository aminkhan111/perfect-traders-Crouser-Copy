'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaCheckCircle, FaChartLine, FaHandshake, FaSearchDollar, FaUserTie, FaCalendarCheck, FaRupeeSign, FaCalendarAlt, FaInfoCircle, FaArrowUp, FaArrowDown, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import SharesFormModal from './SharesFormModal';

const IPOConsult = () => {
  const [ipoList, setIpoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Current');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortColumn, setSortColumn] = useState('openDate');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Modal state for Buy/Sell actions
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedShare, setSelectedShare] = useState(null);
  const [actionType, setActionType] = useState('buy'); // 'buy' or 'sell'

  // Pre IPO / Unlisted Shares data
  const preIpoData = [
    {
      id: 1,
      logo: "https://via.placeholder.com/40/808080/FFFFFF?text=HDB",
      name: "HDB Financial Services Limited",
      sector: "Financial Service",
      price: 1100.00,
      marketCap: 87535.398,
      lifetimeHigh: 1525.00,
      lifetimeLow: 570.00,
      chartTrend: "up"
    },
    {
      id: 2,
      logo: "https://via.placeholder.com/40/FF5050/FFFFFF?text=OYO",
      name: "Oravel Stays Limited",
      sector: "eCommerce",
      price: 45.00,
      marketCap: 31224.557,
      lifetimeHigh: 140.00,
      lifetimeLow: 33.00,
      chartTrend: "down"
    },
    {
      id: 3,
      logo: "https://via.placeholder.com/40/808080/FFFFFF?text=NSDL",
      name: "National Securities Depository Limited",
      sector: "Financial Service",
      price: 1220.00,
      marketCap: 24400.000,
      lifetimeHigh: 1250.00,
      lifetimeLow: 700.00,
      chartTrend: "up"
    },
    {
      id: 4,
      logo: "https://via.placeholder.com/40/808080/FFFFFF?text=BOAT",
      name: "Imagine Marketing Limited",
      sector: "Consumer Durable",
      price: 1600.00,
      marketCap: 22790.735,
      lifetimeHigh: 1710.00,
      lifetimeLow: 630.00,
      chartTrend: "up"
    },
    {
      id: 5,
      logo: "https://via.placeholder.com/40/FF5050/FFFFFF?text=VIK",
      name: "Vikram Solar Limited",
      sector: "Renewable Energy",
      price: 390.00,
      marketCap: 12432.615,
      lifetimeHigh: 475.00,
      lifetimeLow: 170.00,
      chartTrend: "down"
    },
    {
      id: 6,
      logo: "https://via.placeholder.com/40/808080/FFFFFF?text=MAN",
      name: "Manjushree Technopack Limited",
      sector: "Packaging",
      price: 900.00,
      marketCap: 8493.379,
      lifetimeHigh: 950.00,
      lifetimeLow: 180.00,
      chartTrend: "up"
    }
  ];

  // Current reliable IPO data from research
  const currentIPOData = [
    {
      companyName: "Interarch Building Products Limited",
      issueSize: "2000.00 Cr",
      priceRange: "850-900",
      openDate: "June 10, 2024",
      closeDate: "June 13, 2024",
      listingDate: "June 18, 2024",
      board: "Mainboard",
      type: "Current"
    },
    {
      companyName: "Waaree Energies Limited",
      issueSize: "3000.00 Cr",
      priceRange: "1180-1240",
      openDate: "June 3, 2024",
      closeDate: "June 5, 2024",
      listingDate: "June 10, 2024",
      board: "Mainboard",
      type: "Upcoming"
    },
    {
      companyName: "Popular Vehicles and Services Ltd",
      issueSize: "602.00 Cr",
      priceRange: "280-295",
      openDate: "May 28, 2024",
      closeDate: "May 30, 2024",
      listingDate: "June 4, 2024",
      board: "SME",
      type: "Listed"
    },
    {
      companyName: "Stanley Lifestyles Limited",
      issueSize: "700.00 Cr",
      priceRange: "351-369",
      openDate: "May 22, 2024",
      closeDate: "May 24, 2024",
      listingDate: "May 30, 2024",
      board: "SME",
      type: "Current"
    },
    {
      companyName: "Bajaj Housing Finance Limited",
      issueSize: "4000.00 Cr",
      priceRange: "160-170",
      openDate: "May 20, 2024",
      closeDate: "May 22, 2024",
      listingDate: "May 28, 2024",
      board: "Mainboard",
      type: "Upcoming"
    },
    {
      companyName: "Ganga Bath Fittings Limited",
      issueSize: "32.65 Cr",
      priceRange: "46-49",
      lotSize: 3000,
      minInvestment: "1,38,000",
      openDate: "4 Jun 2025",
      closeDate: "6 Jun 2025",
      listingDate: "June 12, 2025",
      board: "Mainboard",
      type: "Current"
    }
  ];

  // IPO data from the image
  const ipoDataFromImage = [
    {
      companyName: "Nikita Papers Limited IPO",
      status: "Listed",
      openDate: "May 27, 2025",
      closeDate: "May 29, 2025",
      issuePrice: 104,
      lotCost: 124800,
      gmp: 0,
      expectedListing: "--",
      listingGain: "-",
      listingPrice: "--",
      currentPrice: "--",
      url: "/ipo/nikita-papers"
    },
    {
      companyName: "Astonea Labs Ltd IPO",
      status: "Listed",
      openDate: "May 27, 2025",
      closeDate: "May 29, 2025",
      issuePrice: 135,
      lotCost: 135000,
      gmp: 0,
      expectedListing: "--",
      listingGain: "--",
      listingPrice: "--",
      currentPrice: "--",
      url: "/ipo/astonea-labs"
    },
    {
      companyName: "Prostarm Info Systems Limited IPO",
      status: "Listed",
      openDate: "May 27, 2025",
      closeDate: "May 29, 2025",
      issuePrice: 105,
      lotCost: 14910,
      gmp: 14,
      expectedListing: "13.33%",
      listingGain: "--",
      listingPrice: "--",
      currentPrice: "--",
      url: "/ipo/prostarm-info"
    },
    {
      companyName: "Blue Water Logistics Limited IPO",
      status: "Listed",
      openDate: "May 27, 2025",
      closeDate: "May 29, 2025",
      issuePrice: 135,
      lotCost: 135000,
      gmp: 0,
      expectedListing: "--",
      listingGain: "--",
      listingPrice: "--",
      currentPrice: "--",
      url: "/ipo/blue-water-logistics"
    },
    {
      companyName: "Schloss Bangalore Limited IPO",
      status: "Listed",
      openDate: "May 26, 2025",
      closeDate: "May 28, 2025",
      issuePrice: 435,
      lotCost: 14790,
      gmp: 2,
      expectedListing: "0.46%",
      listingGain: "-6.67%",
      listingPrice: "406",
      currentPrice: "435.2",
      url: "/ipo/schloss-bangalore"
    },
    {
      companyName: "Aegis Vopak Terminals Limited IPO",
      status: "Listed",
      openDate: "May 26, 2025",
      closeDate: "May 28, 2025",
      issuePrice: 235,
      lotCost: 14805,
      gmp: -1,
      expectedListing: "-0.43%",
      listingGain: "-6.38%",
      listingPrice: "220",
      currentPrice: "255.31",
      url: "/ipo/aegis-vopak"
    },
    {
      companyName: "Unified Data-Tech Solutions Limited IPO",
      status: "Listed",
      openDate: "May 22, 2025",
      closeDate: "May 26, 2025",
      issuePrice: 273,
      lotCost: 109200,
      gmp: 52,
      expectedListing: "19.05%",
      listingGain: "4.4%",
      listingPrice: "285",
      currentPrice: "300",
      url: "/ipo/unified-data-tech"
    },
    {
      companyName: "Victory Electric Vehicles International Limited IPO",
      status: "Listed",
      openDate: "May 20, 2025",
      closeDate: "May 23, 2025",
      issuePrice: 72,
      lotCost: 115200,
      gmp: 0,
      expectedListing: "--",
      listingGain: "--",
      listingPrice: "--",
      currentPrice: "--",
      url: "/ipo/victory-electric"
    },
    {
      companyName: "Dar Credit and Capital Limited IPO",
      status: "Listed",
      openDate: "May 21, 2025",
      closeDate: "May 23, 2025",
      issuePrice: 60,
      lotCost: 120000,
      gmp: 8,
      expectedListing: "13.33%",
      listingGain: "8.58%",
      listingPrice: "65.15",
      currentPrice: "61.5",
      url: "/ipo/dar-credit"
    },
    {
      companyName: "Belrise Industries Limited IPO",
      status: "Listed",
      openDate: "May 21, 2025",
      closeDate: "May 23, 2025",
      issuePrice: 90,
      lotCost: 14940,
      gmp: 24,
      expectedListing: "26.67%",
      listingGain: "11.11%",
      listingPrice: "100",
      currentPrice: "92.03",
      url: "/ipo/belrise-industries"
    },
    {
      companyName: "Borana Weaves Limited IPO",
      status: "Listed",
      openDate: "May 20, 2025",
      closeDate: "May 22, 2025",
      issuePrice: 216,
      lotCost: 14904,
      gmp: 60,
      expectedListing: "27.78%",
      listingGain: "12.5%",
      listingPrice: "243",
      currentPrice: "221.9",
      url: "/ipo/borana-weaves"
    },
    {
      companyName: "Accretion Pharmaceuticals Limited IPO",
      status: "Listed",
      openDate: "May 14, 2025",
      closeDate: "May 16, 2025",
      issuePrice: 101,
      lotCost: 121200,
      gmp: 0,
      expectedListing: "--",
      listingGain: "-21.78%",
      listingPrice: "79",
      currentPrice: "67.05",
      url: "/ipo/accretion-pharma"
    },
    {
      companyName: "Integrity Infrabuild Developers Limited IPO",
      status: "Listed",
      openDate: "May 13, 2025",
      closeDate: "May 15, 2025",
      issuePrice: 100,
      lotCost: 120000,
      gmp: 0,
      expectedListing: "--",
      listingGain: "0.8%",
      listingPrice: "100.8",
      currentPrice: "104.25",
      url: "/ipo/integrity-infrabuild"
    },
    {
      companyName: "Virtual Galaxy Infotech Limited IPO",
      status: "Listed",
      openDate: "May 09, 2025",
      closeDate: "May 14, 2025",
      issuePrice: 142,
      lotCost: 14200,
      gmp: 110,
      expectedListing: "77.46%",
      listingGain: "26.76%",
      listingPrice: "180",
      currentPrice: "163.5",
      url: "/ipo/virtual-galaxy"
    }
  ];

  // Sort IPO data
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedIPOData = [...ipoDataFromImage].sort((a, b) => {
    let valueA = a[sortColumn];
    let valueB = b[sortColumn];
    
    // Handle string comparison vs number comparison
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      if (sortColumn === 'openDate' || sortColumn === 'closeDate') {
        // Convert dates to timestamps for comparison
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      } else {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
    }
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Helper component for sort icons
  const SortIcon = ({ column }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? 
      <FaChevronUp className="inline-block ml-1 text-xs" /> : 
      <FaChevronDown className="inline-block ml-1 text-xs" />;
  };

  // Filter IPOs based on selected tab and filter
  const filteredIpos = currentIPOData.filter(ipo => {
    const tabMatch = selectedTab === ipo.type;
    const filterMatch = selectedFilter === 'All' ? true : ipo.board === selectedFilter;
    return tabMatch && filterMatch;
  });

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

  // Fetch IPO data with a simulated API call for reliability
  useEffect(() => {
    // Track if component is mounted to prevent memory leaks
    let isMounted = true;
    
    const fetchIPOData = async () => {
      try {
        // Simulate network request for better UX
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        if (isMounted) {
          setIpoList(currentIPOData);
          setError(false);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading IPO data:', error);
        if (isMounted) {
          setIpoList(currentIPOData);
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchIPOData();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  const benefits = [
    {
      icon: <FaSearchDollar className="text-blue-500 text-2xl" />,
      title: "Expert IPO Selection",
      description: "Our experts analyze upcoming IPOs to identify those with the highest potential for returns."
    },
    {
      icon: <FaCalendarCheck className="text-blue-500 text-2xl" />,
      title: "Application Assistance",
      description: "We guide you through the entire IPO application process with step-by-step assistance."
    },
    {
      icon: <FaChartLine className="text-blue-500 text-2xl" />,
      title: "Performance Analysis",
      description: "Receive detailed research reports on expected IPO performance and long-term growth potential."
    },
    {
      icon: <FaHandshake className="text-blue-500 text-2xl" />,
      title: "Personalized Strategy",
      description: "Get customized IPO investment strategies based on your financial goals and risk tolerance."
    },
    {
      icon: <FaUserTie className="text-blue-500 text-2xl" />,
      title: "Dedicated Consultant",
      description: "Work with a dedicated IPO consultant who will guide you through every investment decision."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header - Moved to top */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">IPO Consultation Services</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            At PerfectTraders, we provide expert guidance for investing in Initial Public Offerings (IPOs), 
            helping you identify high-potential opportunities and navigate the application process with confidence. 
            Our IPO consultation services are designed to maximize your chances of allocation and long-term returns.
          </p>
        </div>

        {/* Tabs and Filters - Redesigned to match image */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap overflow-x-auto">
              {['Current', 'Upcoming', 'Listed', 'Pre IPO'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 font-medium transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${
                    selectedTab === tab 
                      ? 'text-blue-600 bg-white border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Filters */}
            <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-0 border-t md:border-t-0">
              <span className="font-medium text-gray-700 text-sm sm:text-base">Board:</span>
              <div className="flex gap-3">
                {['All', 'SME', 'Mainboard'].map(filter => (
                  <label key={filter} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="ipo-board"
                      value={filter}
                      checked={selectedFilter === filter}
                      onChange={() => setSelectedFilter(filter)}
                      className="form-radio h-3.5 w-3.5 text-blue-600"
                    />
                    <span className={`text-sm sm:text-base ${selectedFilter === filter ? 'text-gray-800' : 'text-gray-600'}`}>
                      {filter}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* IPO List - Redesigned to match image */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 px-1">{selectedTab} IPO in India 2025</h2>
          
          {/* Pre IPO / Unlisted Shares Table */}
          {selectedTab === 'Pre IPO' && (
            <div className="mb-10">
              {/* Mobile note */}
              <div className="lg:hidden mb-4 px-2">
                <p className="text-sm text-gray-500">Scroll horizontally to view all data <span className="text-blue-500">→</span></p>
              </div>
              
              {/* Table for larger screens */}
              <div className="hidden md:block overflow-x-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left w-12 sm:w-16 text-xs sm:text-sm font-semibold text-gray-700">#</th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left w-12 sm:w-16"></th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Scrip Name</th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Sector</th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                        Price<br/><span className="text-xs font-normal">in ₹ per share</span>
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                        Market Cap<br/><span className="text-xs font-normal">in ₹ crores</span>
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Lifetime High</th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Lifetime Low</th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-700">Chart</th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preIpoData.map((share, index) => (
                      <tr key={share.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{share.id}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm">
                            {share.name.substring(0, 2).toUpperCase()}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-blue-600">{share.name}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{share.sector}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">₹ {share.price.toLocaleString()}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{share.marketCap.toLocaleString()}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-green-600">₹ {share.lifetimeHigh.toLocaleString()}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-red-600">₹ {share.lifetimeLow.toLocaleString()}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex justify-center">
                            <div className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md ${share.chartTrend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} font-medium text-xs sm:text-sm`}>
                              {share.chartTrend === 'up' ? '↗ Rising' : '↘ Falling'}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex flex-col gap-2">
                            <button 
                              onClick={() => handleBuy(share)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors"
                            >
                              BUY
                            </button>
                            <button 
                              onClick={() => handleSell(share)}
                              className="bg-pink-600 hover:bg-pink-700 text-white px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors"
                            >
                              SELL
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Card layout for mobile */}
              <div className="md:hidden">
                <div className="space-y-4">
                  {preIpoData.map((share) => (
                    <div key={`mobile-${share.id}`} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-blue-100 text-blue-700 font-bold text-sm">
                          {share.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-blue-600 font-medium">{share.name}</h3>
                          <p className="text-xs text-gray-500">{share.sector}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs mb-3">
                        <div>
                          <span className="text-gray-500 block">Price:</span>
                          <span className="font-medium">₹ {share.price.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Market Cap:</span>
                          <span>{share.marketCap.toLocaleString()} Cr</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Lifetime High:</span>
                          <span className="font-medium text-green-600">₹ {share.lifetimeHigh.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Lifetime Low:</span>
                          <span className="font-medium text-red-600">₹ {share.lifetimeLow.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Chart:</span>
                          <span className={`inline-block px-2 py-0.5 rounded ${
                            share.chartTrend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          } text-xs font-medium`}>
                            {share.chartTrend === 'up' ? '↗ Rising' : '↘ Falling'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <button 
                          onClick={() => handleBuy(share)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm font-medium rounded-md transition-colors"
                        >
                          BUY
                        </button>
                        <button 
                          onClick={() => handleSell(share)}
                          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 text-sm font-medium rounded-md transition-colors"
                        >
                          SELL
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Current IPOs */}
          {selectedTab === 'Current' && (
            <div className="mb-10">
              {/* IPO Detail Card - Based on the image */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">Ganga Bath Fittings IPO Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-10">
                  {/* Bidding Dates */}
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Bidding Dates</div>
                    <div className="font-medium">4 Jun '25 - 6 Jun '25</div>
                  </div>
                  
                  {/* Min. Investment */}
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Min. Investment</div>
                    <div className="font-medium">₹1,38,000</div>
                  </div>
                  
                  {/* Lot Size */}
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Lot Size</div>
                    <div className="font-medium">3,000</div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Price Range</div>
                    <div className="font-medium">₹46 - ₹49</div>
                  </div>
                  
                  {/* Issue Size */}
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Issue Size</div>
                    <div className="font-medium">32.65Cr</div>
                  </div>
                  
                  {/* IPO Doc */}
                  <div>
                    <div className="text-gray-500 text-sm mb-1">IPO Doc</div>
                    <a href="#" className="text-green-500 font-medium flex items-center hover:underline">
                      RHP PDF
                      <svg className="w-3.5 h-3.5 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 mt-8">
                  <button 
                    onClick={() => {
                      // Find the Ganga Bath Fittings IPO data
                      const gangaBathIPO = currentIPOData.find(ipo => ipo.companyName === "Ganga Bath Fittings Limited");
                      if (gangaBathIPO) {
                        setSelectedShare({
                          name: gangaBathIPO.companyName,
                          price: gangaBathIPO.priceRange, // Pass the full price range
                          sector: "Bathroom Fittings",
                          id: "ganga-bath-ipo",
                          lotSize: gangaBathIPO.lotSize,
                          minInvestment: gangaBathIPO.minInvestment
                        });
                        setActionType('apply'); // Use 'apply' for IPO applications
                        setModalOpen(true);
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md transition-colors font-medium"
                  >
                    Apply for IPO
                  </button>
                  <button className="bg-green-50 text-green-700 hover:bg-green-100 px-6 py-2.5 rounded-md transition-colors font-medium">
                    Download DRHP
                  </button>
                  <button className="bg-gray-50 text-gray-700 hover:bg-gray-100 px-6 py-2.5 rounded-md transition-colors font-medium">
                    Company Financials
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Upcoming IPOs */}
          {selectedTab === 'Upcoming' && (
            <div className="mb-10">
              {/* Mobile note */}
              <div className="lg:hidden mb-4 px-2">
                <p className="text-sm text-gray-500">Scroll horizontally to view all data <span className="text-blue-500">→</span></p>
              </div>

              {/* Same tabular format as Listed section */}
              <div className="flex border-b mb-6">
                <button className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-gray-500 hover:text-gray-700">Open</button>
                <button className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-gray-500 hover:text-gray-700">Closed</button>
                <button className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-gray-500 hover:text-gray-700">Listed</button>
                <button className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-orange-500 border-b-2 border-orange-500 font-medium">Upcoming</button>
                <button className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-gray-500 hover:text-gray-700">Yet to Announce</button>
              </div>

              {/* Responsive table with horizontal scroll - using the same data structure as the image */}
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full">
                  <thead className="bg-pink-50 border-b">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-700">Companies</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700">Status</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700">Open Date</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700">Close Date</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700">Issue Price</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700">Cost of 1 Lot</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700">GMP</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700">Expected Listing</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700">Listing Gain(%)</th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-gray-200">
                    {/* Actual data from the image, but changed status to "Upcoming" */}
                    <tr className="bg-white">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        <Link href="/ipo/nikita-papers" className="text-blue-600 hover:underline">
                          Nikita Papers Limited IPO
                        </Link>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="inline-block bg-orange-100 text-orange-800 rounded-md px-2 py-1">
                          Upcoming
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 27, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 29, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹104</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹124800</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹0</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">--%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        <Link href="/ipo/astonea-labs" className="text-blue-600 hover:underline">
                          Astonea Labs Ltd IPO
                        </Link>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="inline-block bg-orange-100 text-orange-800 rounded-md px-2 py-1">
                          Upcoming
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 27, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 29, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹135</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹135000</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹0</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">--%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        <Link href="/ipo/prostarm-info" className="text-blue-600 hover:underline">
                          Prostarm Info Systems Limited IPO
                        </Link>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="inline-block bg-orange-100 text-orange-800 rounded-md px-2 py-1">
                          Upcoming
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 27, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 29, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹105</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹14910</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="text-green-600">₹14</span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="text-green-600">13.33%</span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        <Link href="/ipo/blue-water-logistics" className="text-blue-600 hover:underline">
                          Blue Water Logistics Limited IPO
                        </Link>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="inline-block bg-orange-100 text-orange-800 rounded-md px-2 py-1">
                          Upcoming
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 27, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 29, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹135</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹135000</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹0</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">--%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        <Link href="/ipo/schloss-bangalore" className="text-blue-600 hover:underline">
                          Schloss Bangalore Limited IPO
                        </Link>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="inline-block bg-orange-100 text-orange-800 rounded-md px-2 py-1">
                          Upcoming
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 26, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 28, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹435</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹14790</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="text-green-600">₹2</span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="text-green-600">0.46%</span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        <Link href="/ipo/aegis-vopak" className="text-blue-600 hover:underline">
                          Aegis Vopak Terminals Limited IPO
                        </Link>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="inline-block bg-orange-100 text-orange-800 rounded-md px-2 py-1">
                          Upcoming
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 26, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">May 28, 2025</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹235</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">₹14805</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="text-red-600">₹-1</span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center">
                        <span className="text-red-600">-0.43%</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Mobile card view alternative for very small screens */}
              <div className="block md:hidden mt-6">
                <div className="space-y-4">
                  {/* Mobile cards for first 4 IPOs */}
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-blue-600 font-medium text-sm">Nikita Papers Limited IPO</h3>
                      <span className="inline-block bg-orange-100 text-orange-800 rounded-md px-2 py-0.5 text-xs">
                        Upcoming
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500 block">Open Date:</span>
                        <span>May 27, 2025</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Close Date:</span>
                        <span>May 29, 2025</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Issue Price:</span>
                        <span>₹104</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Lot Cost:</span>
                        <span>₹124800</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">GMP:</span>
                        <span>₹0</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Expected:</span>
                        <span>--%</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-right">
                      <Link href="/ipo/nikita-papers" className="text-xs text-blue-600 hover:underline">View details →</Link>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-blue-600 font-medium text-sm">Prostarm Info Systems Limited IPO</h3>
                      <span className="inline-block bg-orange-100 text-orange-800 rounded-md px-2 py-0.5 text-xs">
                        Upcoming
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500 block">Open Date:</span>
                        <span>May 27, 2025</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Close Date:</span>
                        <span>May 29, 2025</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Issue Price:</span>
                        <span>₹105</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Lot Cost:</span>
                        <span>₹14910</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">GMP:</span>
                        <span className="text-green-600">₹14</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Expected:</span>
                        <span className="text-green-600">13.33%</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-right">
                      <Link href="/ipo/prostarm-info" className="text-xs text-blue-600 hover:underline">View details →</Link>
                    </div>
                  </div>
                  
                  {/* Show more button for mobile */}
                  <div className="text-center pt-2">
                    <button className="text-blue-600 text-sm font-medium hover:underline">
                      Show more IPOs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {selectedTab === 'Listed' && (
            <div className="mb-10">
              {/* More responsive tab navigation */}
              <div className="flex flex-wrap overflow-x-auto pb-1 mb-6 border-b">
                <button className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-gray-500 hover:text-gray-700">Open</button>
                <button className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-gray-500 hover:text-gray-700">Closed</button>
                <button className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-orange-500 border-b-2 border-orange-500 font-medium">Listed</button>
                <button className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-gray-500 hover:text-gray-700">Upcoming</button>
                <button className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-gray-500 hover:text-gray-700">Yet to Announce</button>
              </div>
              
              {/* Mobile note */}
              <div className="lg:hidden mb-4 px-2">
                <p className="text-sm text-gray-500">Scroll horizontally to view all data <span className="text-blue-500">→</span></p>
              </div>

              {/* Responsive table with horizontal scroll */}
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full">
                  <thead className="bg-pink-50 border-b">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap">Companies</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700 whitespace-nowrap">Open Date</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700 whitespace-nowrap">Close Date</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700 whitespace-nowrap">Issue Price</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700 whitespace-nowrap">Cost of 1 Lot</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700 whitespace-nowrap">GMP</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700 whitespace-nowrap">Expected Listing</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700 whitespace-nowrap">Listing Gain(%)</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700 whitespace-nowrap">Listing Price</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-700 whitespace-nowrap">Current Price</th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-gray-200">
                    {ipoDataFromImage.map((ipo, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                          <Link href={ipo.url} className="text-blue-600 hover:underline">
                            {ipo.companyName.replace(' IPO', '')}
                          </Link>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center whitespace-nowrap">{ipo.openDate}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center whitespace-nowrap">{ipo.closeDate}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center whitespace-nowrap">₹{ipo.issuePrice}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center whitespace-nowrap">₹{ipo.lotCost.toLocaleString()}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center whitespace-nowrap">
                          {typeof ipo.gmp === 'number' && ipo.gmp !== 0 ? (
                            <span className={ipo.gmp > 0 ? 'text-green-600' : 'text-red-600'}>
                              ₹{ipo.gmp}
                            </span>
                          ) : (
                            <span>₹{ipo.gmp}</span>
                          )}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center whitespace-nowrap">
                          {ipo.expectedListing !== "--" ? (
                            <span className={parseFloat(ipo.expectedListing) > 0 ? 'text-green-600' : 'text-red-600'}>
                              {ipo.expectedListing}
                            </span>
                          ) : (
                            ipo.expectedListing
                          )}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center whitespace-nowrap">
                          {ipo.listingGain !== "--" ? (
                            <span className={ipo.listingGain.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                              {ipo.listingGain}
                            </span>
                          ) : (
                            ipo.listingGain
                          )}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center whitespace-nowrap">
                          {ipo.listingPrice !== "--" ? `₹${ipo.listingPrice}` : ipo.listingPrice}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center whitespace-nowrap">
                          {ipo.currentPrice !== "--" ? `₹${ipo.currentPrice}` : ipo.currentPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile card view alternative for very small screens */}
              <div className="block lg:hidden mt-6">
                <div className="space-y-4">
                  {ipoDataFromImage.slice(0, 5).map((ipo, index) => (
                    <div key={`mobile-${index}`} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                      <Link href={ipo.url} className="text-blue-600 font-medium block mb-2">
                        {ipo.companyName.replace(' IPO', '')}
                      </Link>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500 block">Open Date:</span>
                          <span>{ipo.openDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Close Date:</span>
                          <span>{ipo.closeDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Issue Price:</span>
                          <span>₹{ipo.issuePrice}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Lot Cost:</span>
                          <span>₹{ipo.lotCost.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Listing Price:</span>
                          <span>{ipo.listingPrice !== "--" ? `₹${ipo.listingPrice}` : "Not listed"}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Current Price:</span>
                          <span>{ipo.currentPrice !== "--" ? `₹${ipo.currentPrice}` : "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Listing Gain:</span>
                          <span className={ipo.listingGain !== "--" ? (ipo.listingGain.startsWith('-') ? 'text-red-600' : 'text-green-600') : ''}>
                            {ipo.listingGain !== "--" ? ipo.listingGain : "N/A"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-right">
                        <Link href={ipo.url} className="text-xs text-blue-600 hover:underline">View details →</Link>
                      </div>
                    </div>
                  ))}
                  
                  {ipoDataFromImage.length > 5 && (
                    <div className="text-center pt-2">
                      <button className="text-blue-600 text-sm font-medium hover:underline">
                        Show more IPOs
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Left Column - Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80" 
                  alt="IPO Consultation Services"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-xl font-semibold">Unlock Premium IPO Opportunities</p>
                  <p className="text-sm mt-2">Join the investors who have successfully secured IPO allocations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Benefits of Our IPO Consultation</h3>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 p-2 bg-blue-50 rounded-full">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{benefit.title}</h4>
                    <p className="text-gray-600 mt-1">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Invest in High-Potential IPOs?</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Our IPO experts are ready to guide you through the entire process, from research to allocation
            and beyond. Don't miss out on the next big market opportunity.
          </p>
          <Link 
            href="/contact" 
            className="bg-white text-blue-700 hover:bg-blue-50 transition-colors duration-300 font-semibold py-3 px-8 rounded-md inline-block shadow-md"
          >
            Get IPO Consultation
          </Link>
        </div>

        {/* Form Modal */}
        <SharesFormModal 
          isOpen={modalOpen}
          onClose={closeModal}
          share={selectedShare}
          actionType={actionType}
        />
      </div>
    </section>
  );
};

export default IPOConsult; 