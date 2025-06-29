"use client"; 

import { useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { 
  FaWhatsapp, 
  FaInstagram, 
  FaFacebookMessenger, 
  FaTimes, 
  FaCommentDots, 
  FaLinkedin 
} from 'react-icons/fa'; 

const WhatsAppButton = () => { 
  const [isExpanded, setIsExpanded] = useState(false); 
  const [showButton, setShowButton] = useState(true); 
 
  const socialLinks = [ 
    { 
      Icon: FaWhatsapp, 
      href: 'https://wa.me/8260144311', 
      bgColor: 'bg-green-500', 
      hoverBgColor: 'hover:bg-green-600', 
      ariaLabel: 'Chat on WhatsApp', 
    }, 
    { 
      Icon: FaInstagram, 
      href: 'https://www.instagram.com/lear.n1797?igsh=MXkxcnQwdnAwb2tyMA==', 
      bgColor: 'bg-pink-500', 
      hoverBgColor: 'hover:bg-pink-600', 
      ariaLabel: 'Follow on Instagram', 
    }, 
    { 
      Icon: FaLinkedin, 
      href: 'https://www.linkedin.com/in/skill-curve-619841366/?originalSubdomain=in', 
      bgColor: 'bg-blue-700', 
      hoverBgColor: 'hover:bg-blue-800', 
      ariaLabel: 'Connect on LinkedIn', 
    }, 
    { 
      Icon: FaFacebookMessenger, 
      href: 'https://www.facebook.com/share/1AmbB7LrKD/', 
      bgColor: 'bg-blue-600', 
      hoverBgColor: 'hover:bg-blue-700', 
      ariaLabel: 'Message on Facebook Messenger', 
    }, 
  ]; 

  const toggleExpansion = () => { 
    setIsExpanded(!isExpanded); 
  }; 

  return ( 
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end"> 
      <AnimatePresence> 
        {isExpanded && ( 
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }} 
            transition={{ duration: 0.3 }} 
            className="flex flex-col items-end space-y-3 mb-3" 
          > 
            {socialLinks.map((social, index) => ( 
              <motion.a 
                key={index} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={social.ariaLabel} 
                className={`p-3 rounded-full text-white shadow-lg transition-transform transform hover:scale-110 ${social.bgColor} ${social.hoverBgColor}`} 
                whileHover={{ scale: 1.15 }} 
                whileTap={{ scale: 0.95 }} 
              > 
                <social.Icon size={24} /> 
              </motion.a> 
            ))} 
          </motion.div> 
        )} 
      </AnimatePresence> 

      <motion.button 
        onClick={toggleExpansion} 
        className={`p-4 rounded-full text-white shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isExpanded ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' : 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-400'}`} 
        aria-expanded={isExpanded} 
        aria-label={isExpanded ? 'Close social media links' : 'Open social media links'} 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
      > 
        {isExpanded ? <FaTimes size={28} /> : <FaCommentDots size={28} />} 
      </motion.button> 
    </div> 
  ); 
}; 

export default WhatsAppButton;