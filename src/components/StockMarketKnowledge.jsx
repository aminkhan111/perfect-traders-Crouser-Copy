'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  FaChartLine, 
  FaChartPie, 
  FaRegNewspaper, 
  FaBriefcase,
  FaArrowsAltH,
  FaRegLightbulb,
  FaRegClock,
  FaUsers
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const StockMarketKnowledge = () => {
  // Knowledge topics with icons and descriptions
  const topics = [
    {
      icon: <FaChartLine className="text-blue-500 text-3xl" />,
      title: 'Technical Analysis',
      description: 'Learn chart patterns, indicators, and price action techniques for effective trading decisions.'
    },
    {
      icon: <FaChartPie className="text-blue-500 text-3xl" />,
      title: 'Fundamental Analysis',
      description: 'Understand financial statements, valuation metrics, and economic factors that drive stock prices.'
    },
    {
      icon: <FaRegNewspaper className="text-blue-500 text-3xl" />,
      title: 'Market News Interpretation',
      description: 'Discover how to analyze market news and events to anticipate market movements.'
    },
    {
      icon: <FaBriefcase className="text-blue-500 text-3xl" />,
      title: 'Portfolio Management',
      description: 'Master diversification strategies and risk management techniques for long-term wealth creation.'
    },
    {
      icon: <FaArrowsAltH className="text-blue-500 text-3xl" />,
      title: 'Options Trading',
      description: 'Explore options strategies for income generation, hedging, and leveraged returns.'
    },
    {
      icon: <FaRegLightbulb className="text-blue-500 text-3xl" />,
      title: 'Trading Psychology',
      description: 'Develop mental discipline and emotional control for consistent trading performance.'
    },
    {
      icon: <FaRegClock className="text-blue-500 text-3xl" />,
      title: 'Market Timing',
      description: 'Learn to identify optimal entry and exit points for maximizing investment returns.'
    },
    {
      icon: <FaUsers className="text-blue-500 text-3xl" />,
      title: 'Community Trading',
      description: 'Join our community of traders to share insights, strategies, and market perspectives.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Stock Market Knowledge</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            At PerfectTraders, we believe that education is the foundation of successful investing. Through our interactive 
            seminars, webinars, and comprehensive courses, we equip investors with the knowledge and skills needed to 
            navigate the complex world of stock markets with confidence.
          </p>
        </div>

        {/* Knowledge Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topics.map((topic, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{topic.title}</h3>
                <p className="text-gray-600">{topic.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Ready to expand your market knowledge?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Join our upcoming webinars and seminars to learn directly from industry experts.
          </p>
          <a 
            href="#" 
            className="bg-blue-600 text-white font-medium py-3 px-8 rounded-md hover:bg-blue-700 transition-colors duration-300 inline-block"
          >
            View Schedule
          </a>
        </div>
      </div>
    </section>
  );
};

export default StockMarketKnowledge; 