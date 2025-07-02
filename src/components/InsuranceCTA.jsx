'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const InsuranceCTA = () => {
  const contactMethods = [
    {
      icon: <FaPhoneAlt className="text-2xl" />,
      title: "Call Us",
      description: "Speak to our insurance experts",
      contact: "+91 98765 43210",
      action: "Call Now",
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      title: "WhatsApp",
      description: "Get instant support on WhatsApp",
      contact: "+91 98765 43210",
      action: "Chat Now",
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Us",
      description: "Send us your queries",
      contact: "insurance@perfecttraders.com",
      action: "Send Email",
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    }
  ];

  const quickLinks = [
    "Health Insurance Calculator",
    "Car Insurance Renewal",
    "Life Insurance Premium Calculator",
    "Travel Insurance Quote",
    "Home Insurance Coverage",
    "Business Insurance Plans"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 border border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Get
            <span className="text-blue-300"> Protected?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join millions of Indians who trust PerfectTraders for their insurance needs. 
            Get instant quotes, compare plans, and buy online in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              Get Free Quote Now
            </Link>
            <Link
              href="#contact-methods"
              className="border-2 border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-blue-900 font-bold py-4 px-8 rounded-lg transition-all duration-300"
            >
              Talk to Expert
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "2 Min", label: "Policy Issuance" },
              { number: "50+", label: "Insurance Partners" },
              { number: "98%", label: "Claim Settlement" },
              { number: "24/7", label: "Customer Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-blue-300 mb-1">{stat.number}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          id="contact-methods"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Get in Touch</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className={`${method.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {method.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{method.title}</h4>
                <p className="text-blue-100 mb-3">{method.description}</p>
                <p className="text-blue-300 font-semibold mb-4">{method.contact}</p>
                <Link
                  href="/contact"
                  className={`${method.bgColor} ${method.hoverColor} text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 inline-block`}
                >
                  {method.action}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links & Office Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="text-2xl font-bold mb-6">Quick Links</h4>
            <div className="grid grid-cols-1 gap-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href="/contact"
                  className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-white transition-colors duration-300"></span>
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Office Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="text-2xl font-bold mb-6">Visit Our Office</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-300 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-blue-100">
                    123 Business District, Financial Center<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FaClock className="text-blue-300 mr-3" />
                <p className="text-blue-100">
                  Mon - Sat: 9:00 AM - 7:00 PM<br />
                  Sun: 10:00 AM - 5:00 PM
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <p className="text-sm text-blue-100">
                <strong>Emergency Claims:</strong> Available 24/7<br />
                Call our emergency helpline for urgent assistance
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h5 className="text-2xl font-bold mb-4">🎉 Special Offer</h5>
            <p className="text-blue-100 mb-4">
              Get up to 20% discount on your first insurance policy. Limited time offer!
            </p>
            <Link
              href="/contact"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 inline-block shadow-lg hover:shadow-xl"
            >
              Claim Your Discount
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsuranceCTA;
