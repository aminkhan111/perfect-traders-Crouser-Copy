'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeService, setActiveService] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Stock Market Knowledge",
      description: "Expert insights and education for informed trading decisions",
      href: "/knowledge"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "IPO Consult",
      description: "Strategic guidance on initial public offerings",
      href: "/ipo-consult"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Free Demat Account",
      description: "Zero-cost account setup with premium features",
      href: "/free-demat"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Various Insurance",
      description: "Comprehensive coverage for all your protection needs",
      href: "/insurance"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Unlisted Shares",
      description: "Access to exclusive pre-IPO and unlisted equity opportunities",
      href: "/unlisted-shares"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: "Mutual Fund",
      description: "0% commission investments with expert portfolio management",
      href: "/mutual-fund"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "Research Report",
      description: "Data-driven analysis and insights for strategic investing",
      href: "/research-report"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
        </svg>
      ),
      title: "GST & Taxation",
      description: "Expert tax planning and GST compliance services",
      href: "/gst-taxation"
    }
  ];

  const scrollToService = (serviceId) => {
    const element = document.getElementById(serviceId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [services.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Phone number submitted:', phoneNumber);
  };

  return (
    <section className="relative w-full overflow-hidden bg-blue-950">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-full">
          <svg className="w-full h-full opacity-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 relative z-10">
        {/* Top Logo */}
        <div className="flex justify-between items-center mb-4 sm:mb-1 px-0 sm:px-10 max-w-7xl mx-auto">
          <div className="flex items-center">
            <div className="bg-yellow-400 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md transform rotate-12 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white text-xl sm:text-2xl font-bold">PerfectTraders</span>
          </div>
        </div>
        
        {/* Main Hero Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-4 sm:py-8 md:py-1 max-w-7xl mx-auto">
          {/* Left Column - Text and Form */}
          <div className="w-full lg:w-1/2 text-white mb-12 lg:mb-0 z-10 px-1 sm:px-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
              Your Complete <br className="hidden sm:block"/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                Financial Partner
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100 max-w-lg opacity-90">
              From trading to taxation, PerfectTraders offers the complete suite of financial services to help you achieve your wealth goals.
            </p>
            
            {/* Service Pills - horizontal scrollable on mobile */}
            <div className="flex flex-nowrap gap-2 mb-6 sm:mb-10 pb-2 sm:pb-0 overflow-x-auto scrollbar-hide sm:flex-wrap">
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  onClick={() => setActiveService(index)}
                  className={`px-3 py-1.5 min-w-max rounded-full flex items-center text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeService === index 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-800/40 text-blue-200 hover:bg-blue-700'
                  }`}
                  aria-pressed={activeService === index ? "true" : "false"}
                >
                  <span className="mr-1.5">{service.icon}</span>
                  <span className="whitespace-nowrap">{service.title}</span>
                </Link>
              ))}
            </div>
            
            {/* Service Info Card */}
            <div className="bg-gradient-to-br from-blue-800/70 to-indigo-800/70 p-4 sm:p-5 rounded-xl border border-blue-700/50 mb-6 sm:mb-10 min-h-[100px] transition-all duration-500 backdrop-blur-sm shadow-lg">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl mr-4 shadow-md">
                  <div className="text-white">
                    {services[activeService].icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{services[activeService].title}</h3>
                  <p className="text-sm sm:text-base text-blue-100 leading-relaxed">{services[activeService].description}</p>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-5 sm:p-6 rounded-xl backdrop-blur-sm border border-blue-600/50 shadow-xl relative overflow-hidden">
              {/* Background decorative element */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
              
              <div className="relative mb-5">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Ready to transform your financial journey?</h3>
                <p className="text-sm sm:text-base text-blue-100">Join 1 million+ traders who trust PerfectTraders</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={isMobile ? "https://angel-one.onelink.me/Wjgr/n3t57bdf" : "https://a.aonelink.in/ANGOne/AUONBZP"}
                  className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 transition-all duration-300 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg font-bold text-center text-sm sm:text-base flex-1 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Free Account
                </Link>
        <Link 
                  href="/contact"
                  className="bg-transparent border-2 border-blue-400 text-white hover:bg-blue-700/50 transition-all duration-300 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg font-medium text-center text-sm sm:text-base hover:border-blue-300 flex-1"
        >
                  Talk to Expert
        </Link>
      </div>
    </div>
          </div>
          
          {/* Right Column - Image and Stats */}
          <div className="w-full lg:w-1/2 relative py-1 flex justify-center">
            <div className="relative py-1">
              {/* Loading State */}
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Phone Frame Mockup */}
              <div className="mx-auto w-[250px] xs:w-[280px] sm:w-[320px] h-[450px] xs:h-[480px] sm:h-[550px] relative">
                <div className="absolute inset-0 rounded-[40px] overflow-hidden border-[12px] border-gray-900 bg-white">
                  <div className="w-full h-7 bg-gray-900"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-lg z-10 flex justify-center items-center">
                    <div className="w-10 h-1.5 rounded-full bg-gray-800"></div>
                  </div>
                  <div className="h-full w-full relative">
                    {/* Trading app UI */}
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-90">
                      {/* Header */}
                      <div className="px-4 py-3 flex items-center justify-between bg-blue-950">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-white text-sm font-semibold">PerfectTraders</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Main Content - Stock Chart */}
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="text-white text-base font-bold">NIFTY 50</h3>
                            <div className="flex items-center">
                              <span className="text-green-400 font-semibold text-sm">21,854.55</span>
                              <span className="text-green-400 text-xs ml-2">+1.2%</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="bg-blue-800 text-xs text-white px-2 py-1 rounded">1D</button>
                            <button className="bg-blue-700 text-xs text-white px-2 py-1 rounded">1W</button>
                            <button className="bg-blue-800 text-xs text-white px-2 py-1 rounded">1M</button>
                          </div>
                        </div>
                        
                        {/* Chart Image */}
                        <div className="h-40 xs:h-44 sm:h-48 w-full mb-4 overflow-hidden rounded-lg relative">
                          <Image 
                            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop" 
                            alt="Stock market chart showing performance trends"
                            width={500} 
                            height={300}
                            className="object-cover w-full h-full"
                            onLoad={() => setIsImageLoaded(true)}
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                        </div>
                        
                        {/* Portfolio Section */}
                        <div className="bg-blue-800/50 rounded-lg p-3 mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-white font-semibold text-sm">Your Portfolio</h3>
                            <span className="text-green-400 text-xs font-bold">+8.3%</span>
                          </div>
                          <div className="text-white text-base sm:text-lg font-bold">₹3,26,840.75</div>
                          <div className="w-full bg-blue-900/50 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-400 to-green-500 h-full w-2/3"></div>
                          </div>
                        </div>
                        
                        {/* Watchlist */}
                        <h3 className="text-white font-semibold text-sm mb-2">Watchlist</h3>
                        <div className="space-y-2">
                          <div className="bg-blue-800/30 p-2 rounded-lg flex justify-between">
                            <div>
                              <div className="text-white font-medium text-xs">RELIANCE</div>
                              <div className="text-xs text-blue-300">NSE</div>
                            </div>
                            <div className="text-right">
                              <div className="text-white text-xs font-medium">₹2,945.05</div>
                              <div className="text-green-400 text-xs">+1.5%</div>
                            </div>
                          </div>
                          <div className="bg-blue-800/30 p-2 rounded-lg flex justify-between">
                            <div>
                              <div className="text-white font-medium text-xs">HDFCBANK</div>
                              <div className="text-xs text-blue-300">NSE</div>
                            </div>
                            <div className="text-right">
                              <div className="text-white text-xs font-medium">₹1,678.20</div>
                              <div className="text-red-400 text-xs">-0.7%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Navigation */}
                      <div className="absolute bottom-0 left-0 right-0 bg-blue-950 px-2 py-2 sm:py-3 flex justify-around">
                        <button className="flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span className="text-white text-[10px] sm:text-xs">Home</span>
                        </button>
                        <button className="flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                          </svg>
                          <span className="text-blue-400 text-[10px] sm:text-xs">Markets</span>
                        </button>
                        <button className="flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-white text-[10px] sm:text-xs">Invest</span>
                        </button>
                        <button className="flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-white text-[10px] sm:text-xs">Reports</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements - Make them conditionally appear only on larger screens */}
              <div className="absolute top-10 -left-10 bg-white rounded-lg p-3 shadow-lg z-20 max-w-[180px] animate-float hidden sm:block">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium text-gray-900">Investment Up 12%</span>
                </div>
                <div className="w-full bg-gray-100 h-10 rounded flex items-end overflow-hidden">
                  <div className="h-6 w-1/3 bg-blue-600"></div>
                  <div className="h-8 w-1/4 bg-indigo-500"></div>
                  <div className="h-10 w-1/4 bg-purple-500"></div>
                  <div className="h-5 w-1/6 bg-red-500"></div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-3 shadow-lg z-20 max-w-[180px] animate-float animation-delay-1000 hidden sm:block">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">IPO Allocated</span>
                </div>
                <div className="text-xs text-gray-600">Your application for ABC Inc. IPO has been successfully allocated 150 shares at ₹900 per share.</div>
              </div>
              
              {/* Stats Row */}
              <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg sm:text-xl md:text-3xl mb-1">1M+</div>
                  <div className="text-blue-200 text-[10px] xs:text-xs sm:text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg sm:text-xl md:text-3xl mb-1">₹200Cr+</div>
                  <div className="text-blue-200 text-[10px] xs:text-xs sm:text-sm">Assets Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg sm:text-xl md:text-3xl mb-1">4.9<span className="text-xs sm:text-sm md:text-xl">★</span></div>
                  <div className="text-blue-200 text-[10px] xs:text-xs sm:text-sm">App Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Feature Teasers - for desktop */}
      {/* <div className="hidden lg:block relative z-10 pb-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {services.slice(0, 4).map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/70 to-indigo-900/70 p-5 rounded-lg backdrop-blur-md border border-blue-700/50 hover:shadow-lg hover:border-blue-600/50 transition-all duration-300 cursor-pointer group">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-blue-900">{service.icon}</div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-blue-200 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Add required CSS for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default HeroSection; 