'use client';

import { useState } from 'react';
import { FaChartPie, FaLandmark, FaBalanceScale, FaTrophy, FaShieldAlt, FaUserClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MutualFund = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const fundCategories = [
    {
      icon: <FaChartPie className="w-10 h-10 text-blue-600" />,
      title: "Equity Funds",
      description: "Invest primarily in stocks with potential for high returns over longer time horizons. Ideal for investors with higher risk tolerance seeking capital appreciation.",
      features: ["Large Cap", "Mid Cap", "Small Cap", "Multi Cap", "Sectoral/Thematic"]
    },
    {
      icon: <FaLandmark className="w-10 h-10 text-blue-600" />,
      title: "Debt Funds",
      description: "Focus on fixed-income securities like government bonds and corporate debentures. Suited for conservative investors seeking stable returns and regular income.",
      features: ["Liquid Funds", "Corporate Bond Funds", "Government Securities", "Ultra Short Duration", "Credit Risk Funds"]
    },
    {
      icon: <FaBalanceScale className="w-10 h-10 text-blue-600" />,
      title: "Hybrid Funds",
      description: "Balanced investment approach with exposure to both equity and debt instruments. Perfect for moderate risk profiles seeking growth with stability.",
      features: ["Balanced Funds", "Aggressive Hybrid", "Conservative Hybrid", "Dynamic Asset Allocation", "Multi Asset Allocation"]
    }
  ];

  const benefits = [
    {
      icon: <FaTrophy className="w-8 h-8 text-blue-600" />,
      title: "Professional Management",
      description: "Expert fund managers make investment decisions based on research and market analysis"
    },
    {
      icon: <FaChartPie className="w-8 h-8 text-blue-600" />,
      title: "Diversification",
      description: "Spread your investment across multiple securities to reduce risk"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-blue-600" />,
      title: "Regulatory Protection",
      description: "SEBI regulated investments with transparent processes and disclosures"
    },
    {
      icon: <FaUserClock className="w-8 h-8 text-blue-600" />,
      title: "Flexibility",
      description: "Invest through SIPs or lump sum with options to withdraw when needed"
    }
  ];

  const faqs = [
    {
      question: "What is a mutual fund?",
      answer: "A mutual fund is a professionally managed investment vehicle that pools money from multiple investors to invest in various securities like stocks, bonds, and other assets. It offers diversification, professional management, and is regulated by SEBI."
    },
    {
      question: "How do I start investing in mutual funds?",
      answer: "You can start investing in mutual funds through PerfectTraders with these simple steps: 1) Complete KYC verification, 2) Choose funds based on your goals and risk appetite, 3) Decide between SIP (regular investments) or lump sum, 4) Complete the investment process online or with our assistance."
    },
    {
      question: "What is the difference between direct and regular plans?",
      answer: "Direct plans are purchased directly from the fund house without any intermediary, resulting in lower expense ratios and potentially higher returns. Regular plans are bought through distributors like banks or advisors who charge a commission, which is reflected in a higher expense ratio."
    },
    {
      question: "What is NAV in mutual funds?",
      answer: "NAV (Net Asset Value) represents the per-unit market value of a mutual fund. It is calculated by dividing the total value of all the securities in the portfolio, minus liabilities, by the total number of units outstanding. NAV changes daily based on the market value of the underlying assets."
    },
    {
      question: "What are the tax implications of mutual fund investments?",
      answer: "Taxation depends on the fund type and holding period. Equity funds held for more than 1 year are subject to 10% LTCG tax on gains above ₹1 lakh. For debt funds, gains are taxed at 20% with indexation if held for over 3 years, otherwise at your income tax slab rate. Dividends are taxable at your income tax rate."
    },
    {
      question: "What is the minimum investment amount?",
      answer: "The minimum investment amount varies by fund and investment mode. For most funds, SIPs can be started with as little as ₹500 per month, while lump sum investments typically start from ₹1,000 to ₹5,000 depending on the fund house and scheme."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Mutual Fund Investment
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            Start your wealth creation journey with professionally managed mutual funds. 
            Benefit from diversified portfolios, expert management, and investments tailored 
            to your financial goals and risk appetite.
          </motion.p>
        </div>

        {/* Fund Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {fundCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="mb-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
              </div>
              
              <div className="mt-auto">
                <h4 className="font-medium text-gray-800 mb-2">Popular Types:</h4>
                <ul className="space-y-1">
                  {category.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-center mb-10"
          >
            Benefits of Mutual Fund Investments
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-blue-50 p-5 rounded-lg"
              >
                <div className="flex items-center mb-3">
                  {benefit.icon}
                  <h4 className="ml-3 font-semibold text-gray-900">{benefit.title}</h4>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

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

        {/* SIP Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-600 text-white rounded-xl p-8 md:p-12 mb-16 text-center md:text-left"
        >
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Start with SIP Investment</h3>
              <p className="opacity-90">
                Invest regularly with Systematic Investment Plans starting from just ₹500 per month.
                Build wealth gradually with the power of compounding.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/mutual-fund"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Calculate SIP Returns
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link 
              href="/mutual-fund"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Start Investing
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MutualFund; 