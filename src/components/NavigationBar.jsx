'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { trackServiceClick } from '@/lib/gtag';
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaGraduationCap,
  FaUniversity,
  FaShieldAlt,
  FaChartLine,
  FaPiggyBank,
  FaFileAlt,
  FaCalculator,
  FaRocket
} from 'react-icons/fa';

const ServicesDropdown = ({ isOpen, toggleDropdown }) => {
  const servicesItems = [
    {
      name: 'Stock Market Knowledge',
      href: '/knowledge',
      icon: <FaGraduationCap className="text-blue-500" />,
      description: 'Learn trading fundamentals'
    },
    {
      name: 'Free Demat Account',
      href: '/free-demat',
      icon: <FaUniversity className="text-green-500" />,
      description: 'Open account instantly'
    },
    {
      name: 'Various Insurance',
      href: '/insurance',
      icon: <FaShieldAlt className="text-purple-500" />,
      description: 'Comprehensive coverage'
    },
    {
      name: 'Unlisted Shares',
      href: '/unlisted-shares',
      icon: <FaChartLine className="text-orange-500" />,
      description: 'Pre-IPO investments'
    },
    {
      name: 'IPO Services',
      href: '/ipo-consult',
      icon: <FaRocket className="text-red-500" />,
      description: 'IPO consultation & applications'
    },
    {
      name: 'Mutual Fund',
      href: '/mutual-fund',
      icon: <FaPiggyBank className="text-indigo-500" />,
      description: 'Diversified investments'
    },
    {
      name: 'Research Report',
      href: '/research-report',
      icon: <FaFileAlt className="text-teal-500" />,
      description: 'Expert market analysis'
    },
    {
      name: 'GST & Taxation',
      href: '/gst-taxation',
      icon: <FaCalculator className="text-gray-500" />,
      description: 'Tax planning services'
    }
  ];

  return (
    <div className="relative">
      <motion.button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-200 rounded-lg hover:bg-blue-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Our Services
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown size={12} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-80 rounded-2xl shadow-2xl bg-white border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h3 className="text-white font-semibold text-lg">Our Services</h3>
              <p className="text-blue-100 text-sm">Comprehensive financial solutions</p>
            </div>
            <div className="py-2 max-h-96 overflow-y-auto">
              {servicesItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-200 group"
                    onClick={() => trackServiceClick(item.name)}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-blue-700">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500 group-hover:text-blue-600">
                        {item.description}
                      </div>
                    </div>
                    <FaChevronDown className="text-gray-400 transform -rotate-90 group-hover:text-blue-500 transition-colors duration-200" size={12} />
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Need help choosing? <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact our experts</Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileServicesDropdown = ({ isOpen, toggleDropdown, closeMenu }) => {
  const servicesItems = [
    {
      name: 'Stock Market Knowledge',
      href: '/knowledge',
      icon: <FaGraduationCap className="text-blue-500" />
    },
    {
      name: 'Free Demat Account',
      href: '/free-demat',
      icon: <FaUniversity className="text-green-500" />
    },
    {
      name: 'Various Insurance',
      href: '/insurance',
      icon: <FaShieldAlt className="text-purple-500" />
    },
    {
      name: 'Unlisted Shares',
      href: '/unlisted-shares',
      icon: <FaChartLine className="text-orange-500" />
    },
    {
      name: 'IPO Services',
      href: '/ipo-consult',
      icon: <FaRocket className="text-red-500" />
    },
    {
      name: 'Mutual Fund',
      href: '/mutual-fund',
      icon: <FaPiggyBank className="text-indigo-500" />
    },
    {
      name: 'Research Report',
      href: '/research-report',
      icon: <FaFileAlt className="text-teal-500" />
    },
    {
      name: 'GST & Taxation',
      href: '/gst-taxation',
      icon: <FaCalculator className="text-gray-500" />
    }
  ];

  return (
    <div className="border-t border-gray-100">
      <motion.button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full py-3 pl-3 pr-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
        whileTap={{ scale: 0.98 }}
      >
        <span className="font-medium">Our Services</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown size={12} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 border-t border-gray-100"
          >
            {servicesItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center py-3 pl-6 pr-4 text-gray-600 hover:text-blue-600 hover:bg-white transition-all duration-200 group"
                  onClick={() => {
                    closeMenu();
                    trackServiceClick(item.name);
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'About Us', href: '/about', icon: '👥' },
    { name: 'Why Us', href: '/why-us', icon: '⭐' },
    { name: 'Live Stocks', href: '/live-stocks', icon: '📈' },
    { name: 'Watchlist', href: '/watchlist', icon: '📊' },
    { name: 'Unlisted Shares', href: '/unlisted-shares', icon: '📋' },
    { name: 'Contact Us', href: '/contact', icon: '📞' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18">
          {/* Enhanced Brand/Logo */}
          <motion.div
            className="flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">PT</span>
              </div>
              <div>
                <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PerfectTraders
                </div>
                <div className="text-xs text-gray-500 -mt-1">Financial Excellence</div>
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}

            {/* Enhanced Desktop Services Dropdown */}
            <div ref={dropdownRef}>
              <ServicesDropdown
                isOpen={isServicesOpen}
                toggleDropdown={() => setIsServicesOpen(!isServicesOpen)}
              />
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                    onClick={closeMenu}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}

              {/* Enhanced Mobile Services Dropdown */}
              <MobileServicesDropdown
                isOpen={isMobileServicesOpen}
                toggleDropdown={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                closeMenu={closeMenu}
              />

              {/* Mobile CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-4 mt-4 border-t border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Ready to Start Trading?</h4>
                  <p className="text-sm text-gray-600 mb-3">Join thousands of successful investors</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    onClick={closeMenu}
                  >
                    Get Started Today
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};



export default NavigationBar; 