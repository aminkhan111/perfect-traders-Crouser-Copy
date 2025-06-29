'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FaLaptop, 
  FaMoneyBillWave, 
  FaShieldAlt, 
  FaChartLine,
  FaFileInvoiceDollar,
  FaRegClock
} from 'react-icons/fa';

const FreeDematAccount = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  const benefits = [
    {
      icon: <FaLaptop className="text-blue-500 text-2xl" />,
      title: "Easy Online Trading",
      description: "Access markets instantly with our user-friendly online trading platform."
    },
    {
      icon: <FaMoneyBillWave className="text-blue-500 text-2xl" />,
      title: "Zero Opening Fee",
      description: "Open your Demat account absolutely free with no hidden charges."
    },
    {
      icon: <FaShieldAlt className="text-blue-500 text-2xl" />,
      title: "Enhanced Security",
      description: "Keep your investments secure with electronic holding instead of physical certificates."
    },
    {
      icon: <FaChartLine className="text-blue-500 text-2xl" />,
      title: "Portfolio Tracking",
      description: "Monitor all your investments in real-time from a single dashboard."
    },
    {
      icon: <FaFileInvoiceDollar className="text-blue-500 text-2xl" />,
      title: "Simplified Tax Reporting",
      description: "Automatic transaction records make tax filing easier and more accurate."
    },
    {
      icon: <FaRegClock className="text-blue-500 text-2xl" />,
      title: "Instant Settlements",
      description: "Experience faster transaction settlements compared to physical certificates."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Open a Free Demat Account</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            A Demat account is your gateway to the world of investing. It lets you hold shares and securities in electronic form,
            making your investment journey seamless, secure, and efficient. Get started today with our zero-cost account opening process.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          {/* Left Column - Content */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Why Open a Demat Account with Us?</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 p-2 bg-blue-50 rounded-full">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-800 mb-3">Documents Required:</h4>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>PAN Card</li>
                <li>Aadhaar Card</li>
                <li>Canceled Cheque or Bank Statement</li>
                <li>Passport-sized Photograph</li>
                <li>Mobile Number linked to Aadhaar</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-64 sm:h-80">
                <Image 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1404&q=80" 
                  alt="Online Trading Platform"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Start Your Investment Journey Today</h3>
                <p className="text-gray-600 mb-6">
                  Our seamless account opening process takes less than 10 minutes. Get started right away and 
                  enjoy the benefits of digital investing with our cutting-edge platform and dedicated support.
                </p>
                <Link 
                  href={isMobile ? "https://angel-one.onelink.me/Wjgr/n3t57bdf" : "https://a.aonelink.in/ANGOne/AUONBZP"}
                  className="bg-blue-600 text-white font-medium py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 inline-block w-full text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Your Account
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-8 text-center text-gray-800">Simple 3-Step Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold mb-2">Fill the Form</h4>
              <p className="text-gray-600 text-sm">Complete our simple online application form with your basic details</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold mb-2">KYC Verification</h4>
              <p className="text-gray-600 text-sm">Complete the KYC process with digital verification - no paperwork needed</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold mb-2">Start Trading</h4>
              <p className="text-gray-600 text-sm">Your account is activated within 24 hours - begin investing immediately</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-500 to-blue-700 p-8 rounded-xl text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-3">Ready to simplify your investment journey?</h3>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of investors who have already opened their free Demat account with PerfectTraders
            and experience the ease of digital investing.
          </p>
          <Link 
            href={isMobile ? "https://angel-one.onelink.me/Wjgr/n3t57bdf" : "https://a.aonelink.in/ANGOne/AUONBZP"}
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-md inline-block transition-colors duration-300 shadow-md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Your Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreeDematAccount; 