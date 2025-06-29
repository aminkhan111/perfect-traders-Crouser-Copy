'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const successStories = [
    {
      id: 1,
      companyName: "ICICI Prudential",
      logo: "ICICI",
      logoColor: "from-red-500 to-red-700",
      preIpoPrice: 130,
      ipoPrice: 334,
      listingPrice: 310,
      absoluteReturn: "138%",
      returnColor: "text-green-600",
      bgGradient: "from-pink-50 via-rose-50 to-pink-100",
      description: "1 lac invested in ICICI Prudential pre ipo turned into 2.3 Lac after listing.",
      investmentMultiplier: "2.3x",
      timeframe: "6 months"
    },
    {
      id: 2,
      companyName: "ICICI Lombard",
      logo: "ICICI",
      logoColor: "from-blue-500 to-blue-700",
      preIpoPrice: 400,
      ipoPrice: 661,
      listingPrice: 680,
      absoluteReturn: "70%",
      returnColor: "text-blue-600",
      bgGradient: "from-blue-50 via-indigo-50 to-blue-100",
      description: "1 lac invested in ICICI Lombard pre ipo turned into 1.7 Lac after listing.",
      investmentMultiplier: "1.7x",
      timeframe: "8 months"
    },
    {
      id: 3,
      companyName: "HDFC Life",
      logo: "HDFC",
      logoColor: "from-purple-500 to-purple-700",
      preIpoPrice: 210,
      ipoPrice: 290,
      listingPrice: 344,
      absoluteReturn: "64%",
      returnColor: "text-purple-600",
      bgGradient: "from-purple-50 via-violet-50 to-purple-100",
      description: "1 lac invested in HDFC Life pre ipo turned into 1.6 Lac after listing.",
      investmentMultiplier: "1.6x",
      timeframe: "4 months"
    },
    {
      id: 4,
      companyName: "RBL Bank",
      logo: "RBL",
      logoColor: "from-blue-600 to-blue-800",
      preIpoPrice: 60,
      ipoPrice: 225,
      listingPrice: 301,
      absoluteReturn: "402%",
      returnColor: "text-green-600",
      bgGradient: "from-blue-50 via-sky-50 to-blue-100",
      description: "1 lac invested in RBL Bank pre ipo turned into 5.02 Lac after listing.",
      investmentMultiplier: "5.02x",
      timeframe: "12 months"
    },
    {
      id: 5,
      companyName: "BSE",
      logo: "BSE",
      logoColor: "from-indigo-500 to-indigo-700",
      preIpoPrice: 200,
      ipoPrice: 806,
      listingPrice: 1069,
      absoluteReturn: "435%",
      returnColor: "text-green-600",
      bgGradient: "from-indigo-50 via-blue-50 to-indigo-100",
      description: "1 lac invested in BSE pre ipo turned into 5.35 Lac after listing.",
      investmentMultiplier: "5.35x",
      timeframe: "10 months"
    },
    {
      id: 6,
      companyName: "CDSL",
      logo: "CDSL",
      logoColor: "from-teal-500 to-teal-700",
      preIpoPrice: 60,
      ipoPrice: 150,
      listingPrice: 261,
      absoluteReturn: "335%",
      returnColor: "text-green-600",
      bgGradient: "from-teal-50 via-cyan-50 to-teal-100",
      description: "1 lac invested in CDSL pre ipo turned into 4.35 Lac after listing.",
      investmentMultiplier: "4.35x",
      timeframe: "9 months"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        const container = document.getElementById('success-stories-container');
        if (container) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft >= maxScroll) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: 400, behavior: 'smooth' });
          }
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const scrollLeft = () => {
    const container = document.getElementById('success-stories-container');
    container.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.getElementById('success-stories-container');
    container.scrollBy({ left: 400, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-red-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20"
        >
          {/* Enhanced Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              How Your Money Can Grow With Us - Real Returns from Real Investors
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="flex items-center text-green-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Verified Returns</span>
              </div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="flex items-center text-blue-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Trusted Platform</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Navigation and Scrollable Cards Container */}
          <div className="relative">
            {/* Enhanced Left Arrow */}
            <motion.button
              onClick={scrollLeft}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-3 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Enhanced Right Arrow */}
            <motion.button
              onClick={scrollRight}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full p-3 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Enhanced Scrollable Success Stories Cards */}
            <div className="px-16">
              <div
                id="success-stories-container"
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {successStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className={`bg-gradient-to-br ${story.bgGradient} rounded-2xl p-6 text-center border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group min-w-[320px] flex-shrink-0`}
                  >
                    {/* Animated background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Floating particles effect */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>

                    {/* Company Logo and Name */}
                    <div className="mb-6 relative z-10">
                      <motion.div
                        className={`w-20 h-16 bg-gradient-to-br ${story.logoColor} rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg relative overflow-hidden`}
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                        <span className="text-white font-bold text-sm relative z-10">{story.logo}</span>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                      </motion.div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1">{story.companyName}</h3>
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{story.timeframe}</span>
                      </div>
                    </div>

                    {/* Compact Price Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-4 relative z-10">
                      <motion.div
                        className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-2 border border-white/40"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-gray-600 text-xs mb-1 font-medium">Pre IPO Price:</div>
                        <div className="font-bold text-gray-800 text-lg">{story.preIpoPrice}</div>
                      </motion.div>
                      <motion.div
                        className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-2 border border-white/40"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-gray-600 text-xs mb-1 font-medium">IPO Price:</div>
                        <div className="font-bold text-gray-800 text-lg">{story.ipoPrice}</div>
                      </motion.div>
                      <motion.div
                        className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-2 border border-white/40"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-gray-600 text-xs mb-1 font-medium">Listing Price:</div>
                        <div className="font-bold text-gray-800 text-lg">{story.listingPrice}</div>
                      </motion.div>
                    </div>

                    {/* Compact Return Badge */}
                    <motion.div
                      className="bg-gradient-to-r from-green-400/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-3 mb-4 border border-green-200/50 relative z-10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-center text-green-700 font-bold text-sm mb-1">
                        <motion.svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </motion.svg>
                        Absolute return {story.absoluteReturn}
                      </div>
                    </motion.div>

                    {/* Compact Description */}
                    <div className="relative z-10">
                      <p className="text-xs text-gray-700 leading-relaxed bg-white/40 backdrop-blur-sm rounded-lg p-2 border border-white/30">
                        {story.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Progress Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {successStories.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
              />
            ))}
          </div>

          {/* Auto-scroll indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <motion.div
                animate={{ rotate: isAutoPlaying ? 360 : 0 }}
                transition={{ duration: 2, repeat: isAutoPlaying ? Infinity : 0, ease: "linear" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>
              <span>{isAutoPlaying ? 'Auto-scrolling' : 'Hover to pause'}</span>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold text-base shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border border-white/20"
            >
              Start Your Success Story Today
              <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;
