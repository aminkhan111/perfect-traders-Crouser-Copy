'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Why Us', href: '/why-us' },
    { name: 'Watchlist', href: '#' },
    { name: 'Our Services', href: '#' },
    { name: 'Contact Us', href: '/contact' }
  ];

  const serviceLinks = [
    { name: 'Stock Market Knowledge', href: '/knowledge' },
    { name: 'IPO Consult', href: '/ipo-consult' },
    { name: 'Free Demat Account', href: '/free-demat' },
    { name: 'Mutual Fund', href: '/mutual-fund' }
  ];
  
  const socialLinks = [
    { icon: <FaFacebookF />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaLinkedinIn />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gradient-to-r from-[#00093c] to-[#2d0b00] text-white rounded-tl-[90px] overflow-hidden mt-15">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-2">PerfectTraders</h3>
            <motion.div 
              className="w-12 h-1 bg-gradient-to-r from-white to-transparent mb-4"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                width: ["30px", "50px", "30px"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <p className="text-gray-300 mb-4">
              Empowering investors with knowledge and tools for financial success in the stock market
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                  aria-label={social.label}
                >
                  <span className="sr-only">{social.label}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <motion.div 
              className="w-12 h-1 bg-gradient-to-r from-white to-transparent mb-4"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                width: ["30px", "50px", "30px"]
              }}
              
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-2">Our Services</h3>
            <motion.div 
              className="w-12 h-1 bg-gradient-to-r from-white to-transparent mb-4"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                width: ["30px", "50px", "30px"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
            />
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <motion.div 
              className="w-12 h-1 bg-gradient-to-r from-white to-transparent mb-4"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                width: ["30px", "50px", "30px"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9
              }}
            />
            <address className="not-italic text-gray-300 space-y-2">
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-white" />
                <span>Unit-3, Routarapur, Near Town Sweets<br />Jajpur Town, Odisha, 755001</span>
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-3 text-white" />
                <a href="mailto:info@perfecttraders.com" className="hover:text-white transition-colors">
                  info@perfecttraders.com
                </a>
              </p>
              <p className="flex items-center">
                <FaPhoneAlt className="mr-3 text-white" />
                <a href="tel:+919748329526" className="hover:text-white transition-colors">
                  +91 9748 329 526
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700/30">
          <p className="text-center text-gray-300">
            &copy; {currentYear} PerfectTraders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 