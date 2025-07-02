'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaHeartbeat, 
  FaCarAlt, 
  FaHome, 
  FaUmbrella,
  FaBriefcase,
  FaPlaneDeparture,
  FaMotorcycle,
  FaUserMd
} from 'react-icons/fa';

const InsuranceProducts = ({ openModal }) => {
  const insuranceProducts = [
    {
      icon: <FaHeartbeat className="text-4xl text-red-500" />,
      title: "Health Insurance",
      description: "Comprehensive health coverage for you and your family",
      features: ["Cashless Treatment", "Pre & Post Hospitalization", "Day Care Procedures"],
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: <FaUmbrella className="text-4xl text-blue-500" />,
      title: "Life Insurance",
      description: "Secure your family's financial future with term & savings plans",
      features: ["High Coverage", "Tax Benefits", "Flexible Premiums"],
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <FaCarAlt className="text-4xl text-green-500" />,
      title: "Car Insurance",
      description: "Comprehensive protection for your vehicle",
      features: ["Zero Depreciation", "Roadside Assistance", "Quick Claims"],
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: <FaMotorcycle className="text-4xl text-orange-500" />,
      title: "Bike Insurance",
      description: "Complete coverage for your two-wheeler",
      features: ["Third Party Cover", "Own Damage", "Personal Accident"],
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: <FaHome className="text-4xl text-purple-500" />,
      title: "Home Insurance",
      description: "Protect your home and belongings",
      features: ["Structure Cover", "Contents Protection", "Liability Cover"],
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: <FaPlaneDeparture className="text-4xl text-indigo-500" />,
      title: "Travel Insurance",
      description: "Stay protected during your travels",
      features: ["Medical Emergency", "Trip Cancellation", "Baggage Loss"],
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      icon: <FaBriefcase className="text-4xl text-teal-500" />,
      title: "Business Insurance",
      description: "Comprehensive coverage for your business",
      features: ["Property Protection", "Liability Cover", "Business Interruption"],
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
    },
    {
      icon: <FaUserMd className="text-4xl text-pink-500" />,
      title: "Critical Illness",
      description: "Financial protection against major illnesses",
      features: ["Lump Sum Payout", "Multiple Conditions", "No Medical Tests"],
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    }
  ];

  return (
    <section id="insurance-products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Insurance Products
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Choose from our wide range of insurance products designed to protect you and your loved ones. 
            Get instant quotes and buy online in minutes.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {insuranceProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${product.bgColor} ${product.borderColor} border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group`}
            >
              {/* Icon and Title */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
                  {product.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>


            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6">
              Our insurance experts can help you find the perfect policy for your specific needs.
            </p>
            <Link
              href="/contact"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-block shadow-lg hover:shadow-xl"
            >
              Speak to an Expert
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsuranceProducts;
