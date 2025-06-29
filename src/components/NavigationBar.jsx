'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FaBars, 
  FaTimes, 
  FaChevronDown, 
  FaChevronUp,
  FaPlus
} from 'react-icons/fa';

const ServicesDropdown = ({ isOpen, toggleDropdown }) => {
  const servicesItems = [
    { name: 'Stock Market Knowledge', href: '/knowledge' },
    { name: 'IPO Consult', href: '/ipo-consult' },
    { name: 'Free Demat Account', href: '/free-demat' },
    { name: 'Various Insurance', href: '/insurance' },
    { name: 'Unlisted Shares', href: '/unlisted-shares' },
    { name: 'Mutual Fund', href: '/mutual-fund' },
    { name: 'Research Report', href: '/research-report' },
    { name: 'GST & Taxation', href: '/gst-taxation' }
  ];



  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        Our Services {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {servicesItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileServicesDropdown = ({ isOpen, toggleDropdown, closeMenu }) => {
  const servicesItems = [
    { name: 'Stock Market Knowledge', href: '/knowledge' },
    { name: 'IPO Consult', href: '/ipo-consult' },
    { name: 'Free Demat Account', href: '/free-demat' },
    { name: 'Various Insurance', href: '/insurance' },
    { name: 'Unlisted Shares', href: '/unlisted-shares' },
    { name: 'Mutual Fund', href: '/mutual-fund' },
    { name: 'Research Report', href: '/research-report' },
    { name: 'GST & Taxation', href: '/gst-taxation' }
  ];

  return (
    <div>
      <button 
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-700"
      >
        Our Services {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>
      
      {isOpen && (
        <div className="pl-4">
          {servicesItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className="block py-2 pl-3 pr-4 text-sm text-gray-500 hover:text-blue-600"
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

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

  const handleAddToWatchlist = () => {
    const passcode = prompt('Please enter the passcode to add stocks:');
    if (passcode === '717273') {
      // Use Next.js router for client-side navigation
      router.push('/watchlist?showAdd=true');
    } else {
      alert('Invalid passcode!');
    }
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Why Us', href: '/why-us' },
    { name: 'Watchlist', href: '/watchlist' },
    { name: 'Unlisted Shares', href: '/unlisted-shares' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-xl text-blue-600">
              PerfectTraders
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Desktop Services Dropdown */}
            <div ref={dropdownRef}>
              <ServicesDropdown 
                isOpen={isServicesOpen} 
                toggleDropdown={() => setIsServicesOpen(!isServicesOpen)} 
              />
            </div>

            {/* Add to Watchlist Button */}
            <button
              onClick={handleAddToWatchlist}
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-300"
            >
              <FaPlus className="mr-2" />
              Add Stock
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Services Dropdown */}
            <MobileServicesDropdown 
              isOpen={isMobileServicesOpen} 
              toggleDropdown={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              closeMenu={closeMenu}
            />

            {/* Mobile Add to Watchlist Button */}
            <button
              onClick={handleAddToWatchlist}
              className="w-full text-left py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600 flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Stock
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};



export default NavigationBar; 