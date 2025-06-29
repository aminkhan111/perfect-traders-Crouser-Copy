'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaHeartbeat, 
  FaCarAlt, 
  FaHome, 
  FaUmbrella,
  FaBriefcase,
  FaChild,
  FaPlaneDeparture,
  FaBaby
} from 'react-icons/fa';

const VariousInsurance = () => {
  const insuranceTypes = [
    {
      icon: <FaHeartbeat className="text-blue-500 text-3xl" />,
      title: "Health Insurance",
      description: "Comprehensive health insurance plans for individuals and families, covering hospitalization, critical illness, and medical expenses.",
      features: ["Cashless Hospitalization", "Critical Illness Cover", "No Claim Bonus"]
    },
    {
      icon: <FaCarAlt className="text-blue-500 text-3xl" />,
      title: "Vehicle Insurance",
      description: "Protect your vehicles with our comprehensive or third-party insurance policies for cars, bikes, and commercial vehicles.",
      features: ["Accident Cover", "Third-party Liability", "Quick Claim Settlement"]
    },
    {
      icon: <FaUmbrella className="text-blue-500 text-3xl" />,
      title: "Life Insurance",
      description: "Secure your family's financial future with our range of life insurance policies including term, endowment, and ULIPs.",
      features: ["Term Plans", "Retirement Plans", "Tax Benefits"]
    },
    {
      icon: <FaHome className="text-blue-500 text-3xl" />,
      title: "Home Insurance",
      description: "Safeguard your home and belongings against natural disasters, theft, and other unforeseen events.",
      features: ["Structure Coverage", "Content Protection", "Liability Coverage"]
    },
    {
      icon: <FaBriefcase className="text-blue-500 text-3xl" />,
      title: "Business Insurance",
      description: "Comprehensive coverage for your business assets, liability protection, and business interruption insurance.",
      features: ["Property Protection", "Liability Coverage", "Employee Safety"]
    },
    {
      icon: <FaChild className="text-blue-500 text-3xl" />,
      title: "Child Plans",
      description: "Secure your child's future with education and savings plans designed for long-term financial security.",
      features: ["Education Funding", "Future Security", "Flexible Payouts"]
    },
    {
      icon: <FaPlaneDeparture className="text-blue-500 text-3xl" />,
      title: "Travel Insurance",
      description: "Stay protected during your travels with coverage for medical emergencies, trip cancellations, and baggage loss.",
      features: ["Medical Coverage", "Trip Cancellation", "Baggage Protection"]
    },
    {
      icon: <FaBaby className="text-blue-500 text-3xl" />,
      title: "Senior Citizen Plans",
      description: "Specialized insurance plans for seniors with comprehensive health coverage and minimal waiting periods.",
      features: ["No Medical Tests", "Pre-existing Coverage", "Lifetime Renewability"]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Insurance Services</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            At PerfectTraders, we offer a wide range of insurance solutions to protect what matters most to you.
            Our partnerships with leading insurance providers ensure you get the best coverage at competitive premiums.
            From health to wealth, we've got you covered.
          </p>
        </div>

        {/* Insurance Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {insuranceTypes.map((insurance, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    {insurance.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{insurance.title}</h3>
                </div>
                <p className="text-gray-600 text-center mb-6">{insurance.description}</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                  <ul className="space-y-1">
                    {insurance.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center">
                        <span className="text-blue-500 mr-2">•</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-4 text-center">
                <Link 
                  href="/contact" 
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-blue-600 text-white rounded-lg p-8 md:p-12 text-center shadow-md">
          <h3 className="text-2xl font-bold mb-4">Need help choosing the right insurance?</h3>
          <p className="max-w-2xl mx-auto mb-8">
            Our insurance experts can help you navigate through various policies and find the one that best suits your needs and budget.
            Get personalized insurance advice today.
          </p>
          <Link 
            href="/contact" 
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-md hover:bg-blue-50 transition-colors duration-300 inline-block shadow-sm"
          >
            Speak to an Insurance Advisor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VariousInsurance; 