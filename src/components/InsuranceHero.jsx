'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaShieldAlt, FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';

const InsuranceHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <FaShieldAlt className="text-4xl text-blue-300 mr-4" />
              <span className="text-blue-300 font-semibold text-lg">Insurance Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Protect What
              <span className="text-blue-300"> Matters Most</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Comprehensive insurance coverage for your life, health, vehicle, and property. 
              Get instant quotes and seamless claim settlements with India's trusted insurance partner.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "Instant Policy Issuance",
                "24/7 Claim Support",
                "Cashless Settlements",
                "Expert Advisory"
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center"
                >
                  <FaCheckCircle className="text-green-400 mr-3" />
                  <span className="text-blue-100">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#insurance-products"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Insurance Plans
              </Link>
              <Link
                href="/contact"
                className="border-2 border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-blue-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-center flex items-center justify-center"
              >
                <FaPhoneAlt className="mr-2" />
                Get Expert Advice
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Stats/Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Why Choose PerfectTraders Insurance?</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">50+</div>
                  <div className="text-sm text-blue-100">Insurance Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">10L+</div>
                  <div className="text-sm text-blue-100">Policies Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">98%</div>
                  <div className="text-sm text-blue-100">Claim Settlement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">24/7</div>
                  <div className="text-sm text-blue-100">Customer Support</div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Get Instant Quote</div>
                    <div className="text-sm text-blue-200">Compare plans in seconds</div>
                  </div>
                  <Link
                    href="#quote"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default InsuranceHero;
