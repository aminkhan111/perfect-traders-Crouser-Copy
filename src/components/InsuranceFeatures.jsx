'use client';

import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaShieldAlt, 
  FaHeadset, 
  FaFileAlt,
  FaMobile,
  FaUserTie,
  FaClock,
  FaAward
} from 'react-icons/fa';

const InsuranceFeatures = ({ openModal }) => {
  const features = [
    {
      icon: <FaRocket className="text-4xl text-blue-500" />,
      title: "Instant Policy Issuance",
      description: "Get your insurance policy issued instantly online. No paperwork, no delays.",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100"
    },
    {
      icon: <FaShieldAlt className="text-4xl text-green-500" />,
      title: "Comprehensive Coverage",
      description: "Wide range of coverage options to protect you against all risks and uncertainties.",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100"
    },
    {
      icon: <FaHeadset className="text-4xl text-purple-500" />,
      title: "24/7 Customer Support",
      description: "Round-the-clock customer support for all your insurance queries and claims.",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100"
    },
    {
      icon: <FaFileAlt className="text-4xl text-orange-500" />,
      title: "Easy Claim Process",
      description: "Simplified and hassle-free claim settlement process with quick approvals.",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100"
    },
    {
      icon: <FaMobile className="text-4xl text-indigo-500" />,
      title: "Mobile App Support",
      description: "Manage your policies, file claims, and track status through our mobile app.",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-100"
    },
    {
      icon: <FaUserTie className="text-4xl text-teal-500" />,
      title: "Expert Advisory",
      description: "Get personalized advice from our certified insurance experts.",
      bgColor: "bg-teal-50",
      iconBg: "bg-teal-100"
    },
    {
      icon: <FaClock className="text-4xl text-red-500" />,
      title: "Quick Renewals",
      description: "Renew your policies in seconds with our automated renewal system.",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100"
    },
    {
      icon: <FaAward className="text-4xl text-yellow-500" />,
      title: "Award Winning Service",
      description: "Recognized for excellence in customer service and claim settlement.",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100"
    }
  ];

  const stats = [
    { number: "50+", label: "Insurance Partners", icon: "🤝" },
    { number: "10L+", label: "Happy Customers", icon: "😊" },
    { number: "98%", label: "Claim Settlement Ratio", icon: "✅" },
    { number: "24/7", label: "Customer Support", icon: "📞" }
  ];

  return (
    <section className="py-20 bg-white">
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
            Why Choose PerfectTraders Insurance?
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Experience the difference with our customer-centric approach, cutting-edge technology, 
            and commitment to providing the best insurance solutions.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${feature.bgColor} rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group`}
            >
              <div className={`${feature.iconBg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Millions Across India
            </h3>
            <p className="text-blue-100 text-lg">
              Our numbers speak for our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Simple 3-Step Process
            </h3>
            <p className="text-gray-600 text-lg">
              Get insured in minutes with our streamlined process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Compare Plans",
                description: "Browse and compare insurance plans from top providers",
                icon: "🔍"
              },
              {
                step: "02", 
                title: "Get Quote",
                description: "Get instant quotes tailored to your specific needs",
                icon: "💰"
              },
              {
                step: "03",
                title: "Buy Online",
                description: "Complete your purchase securely online in minutes",
                icon: "✅"
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <div className="text-4xl mb-4">{process.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{process.title}</h4>
                <p className="text-gray-600">{process.description}</p>
                
                {/* Connector Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200 transform -translate-y-1/2 z-0"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsuranceFeatures;
