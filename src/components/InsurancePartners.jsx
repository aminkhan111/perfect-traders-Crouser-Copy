'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const InsurancePartners = () => {
  const partners = [
    {
      name: "HDFC ERGO",
      logo: "/images/insurance-logos/hdfc-ergo.svg",
      category: "General Insurance"
    },
    {
      name: "ICICI Lombard",
      logo: "/images/insurance-logos/icici-lombard.svg",
      category: "General Insurance"
    },
    {
      name: "Bajaj Allianz",
      logo: "/images/insurance-logos/bajaj-allianz.svg",
      category: "Life & General"
    },
    {
      name: "SBI Life",
      logo: "/images/insurance-logos/sbi-life.svg",
      category: "Life Insurance"
    },
    {
      name: "Max Life",
      logo: "/images/insurance-logos/max-life.svg",
      category: "Life Insurance"
    },
    {
      name: "Tata AIG",
      logo: "/images/insurance-logos/tata-aig.svg",
      category: "General Insurance"
    },
    {
      name: "Reliance General",
      logo: "/images/insurance-logos/reliance-general.svg",
      category: "General Insurance"
    },
    {
      name: "LIC",
      logo: "/images/insurance-logos/lic.svg",
      category: "Life Insurance"
    },
    {
      name: "Star Health",
      logo: "/images/insurance-logos/star-health.svg",
      category: "Health Insurance"
    },
    {
      name: "Care Health",
      logo: "/images/insurance-logos/care-health.svg",
      category: "Health Insurance"
    },
    {
      name: "Niva Bupa",
      logo: "/images/insurance-logos/niva-bupa.svg",
      category: "Health Insurance"
    },
    {
      name: "Digit Insurance",
      logo: "/images/insurance-logos/digit-insurance.svg",
      category: "General Insurance"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      rating: 5,
      comment: "Excellent service! Got my car insurance renewed in just 5 minutes. The claim process was also very smooth.",
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      comment: "PerfectTraders helped me find the best health insurance for my family. Their expert advice was invaluable.",
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Amit Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Quick claim settlement and 24/7 support. Highly recommend PerfectTraders for all insurance needs.",
      avatar: "/api/placeholder/60/60"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Insurance Partners
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            We partner with India's leading insurance companies to bring you the best coverage options 
            at competitive prices. Choose from 50+ trusted insurers.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-20">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-4 mb-3 group-hover:bg-blue-50 transition-colors duration-300 h-20 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="mx-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden text-center">
                    <div className="text-sm font-bold text-gray-700 leading-tight">
                      {partner.name}
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{partner.name}</h3>
                <p className="text-xs text-gray-500">{partner.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h3>
            <p className="text-gray-600 text-lg">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-bold text-gray-800 mb-2">Award Winning</h4>
              <p className="text-sm text-gray-600">Best Insurance Broker 2023</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-bold text-gray-800 mb-2">Secure & Safe</h4>
              <p className="text-sm text-gray-600">256-bit SSL Encryption</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-bold text-gray-800 mb-2">Mobile App</h4>
              <p className="text-sm text-gray-600">Manage policies on the go</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-bold text-gray-800 mb-2">Instant Service</h4>
              <p className="text-sm text-gray-600">Quick quotes & claims</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsurancePartners;
