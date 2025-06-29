'use client';

import { 
  FaCalculator, 
  FaFileInvoiceDollar, 
  FaClipboardCheck, 
  FaChartLine, 
  FaBuilding, 
  FaUserTie,
  FaRegHandshake,
  FaShieldAlt,
  FaComments,
  FaFileAlt,
  FaUserCog
} from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

const GSTTaxation = () => {
  const services = [
    {
      icon: <FaCalculator className="w-10 h-10 text-blue-600" />,
      title: "Income Tax Filing",
      description: "Comprehensive income tax return preparation and filing for individuals and businesses, ensuring maximum tax benefits and deductions."
    },
    {
      icon: <FaFileInvoiceDollar className="w-10 h-10 text-blue-600" />,
      title: "GST Registration & Returns",
      description: "Complete assistance with GST registration, timely filing of returns, and compliance with GST regulations."
    },
    {
      icon: <FaClipboardCheck className="w-10 h-10 text-blue-600" />,
      title: "Tax Compliance",
      description: "Stay compliant with ever-changing tax laws and regulations with our proactive tax compliance services."
    },
    {
      icon: <FaChartLine className="w-10 h-10 text-blue-600" />,
      title: "Tax Planning",
      description: "Strategic tax planning to minimize your tax liability while maximizing your wealth creation potential."
    },
    {
      icon: <FaBuilding className="w-10 h-10 text-blue-600" />,
      title: "Business Registrations",
      description: "Assistance with company formation, LLP registration, and other business entity registrations with seamless documentation."
    },
    {
      icon: <FaUserTie className="w-10 h-10 text-blue-600" />,
      title: "Personal Tax Advisory",
      description: "Personalized tax advisory services for individuals with complex tax situations including capital gains and investments."
    }
  ];

  const benefits = [
    {
      icon: <FaShieldAlt className="w-8 h-8 text-blue-600" />,
      title: "Minimize Tax Risks",
      description: "Avoid penalties and interest by ensuring complete compliance with tax laws"
    },
    {
      icon: <FaRegHandshake className="w-8 h-8 text-blue-600" />,
      title: "Personalized Solutions",
      description: "Tax strategies tailored to your specific business needs and financial goals"
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
            GST & Taxation Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            Navigate the complexities of taxation with PerfectTraders' comprehensive GST and taxation services. 
            Our team of experienced tax professionals ensures compliance, minimizes tax liability, 
            and helps you achieve your financial goals through strategic tax planning.
          </motion.p>
        </div>

        {/* Key Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-50 p-4 rounded-full mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-600 text-white rounded-xl p-8 md:p-12 mb-16"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Why Choose Our Tax Services</h3>
            <p className="opacity-90 max-w-3xl mx-auto">
              At PerfectTraders, we combine expertise with a personalized approach to ensure your tax 
              matters are handled efficiently and professionally.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (0.1 * index) }}
                className="bg-white bg-opacity-20 p-6 rounded-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-white p-3 rounded-full mr-4">
                    {benefit.icon}
                  </div>
                  <h4 className="text-xl font-semibold">{benefit.title}</h4>
                </div>
                <p className="text-black font-medium">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-center mb-10"
          >
            Our Tax Service Process
          </motion.h3>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-100 transform -translate-x-1/2 z-0"></div>
            
            {/* Steps */}
            <div className="space-y-12">







{/* ////++++++++++++-------------+++++++++ */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:flex items-center"
              >


<div className="md:w-1/2 pr-8 hidden md:block"></div>
 <div className="md:w-12 md:flex md:justify-center relative z-10">
                  <div className="hidden md:flex w-10 h-10 rounded-full border-4 border-blue-100 bg-blue-600 text-white shadow-md items-center justify-center">
                    <div className="flex items-center justify-center">
                      <FaComments size={20} />
                    </div>
                  </div>
                </div>


                <div className="md:w-1/2 md:pl-8">
                  <div className="md:hidden flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full border-4 border-blue-100 bg-blue-600 text-white shadow-md flex items-center justify-center mr-4">
                      <div className="flex items-center justify-center">
                        <FaComments size={20} />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 md:hidden">Consultation</h4>
                    </div>
                  </div>

 
                  <h4 className="text-xl font-semibold text-gray-900 hidden md:block">Consultation</h4>
                 
                  <p className="text-gray-600 mt-2">We begin with a thorough consultation to understand your tax situation and requirements.</p>

                </div>




                 
              </motion.div>




              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:flex items-center"
              >
                <div className="md:w-1/2 pr-8 hidden md:block"></div>
                <div className="md:w-12 md:flex md:justify-center relative z-10">
                  <div className="hidden md:flex w-10 h-10 rounded-full border-4 border-blue-100 bg-blue-600 text-white shadow-md items-center justify-center">
                    <div className="flex items-center justify-center">
                      <FaFileAlt size={20} />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <div className="md:hidden flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full border-4 border-blue-100 bg-blue-600 text-white shadow-md flex items-center justify-center mr-4">
                      <div className="flex items-center justify-center">
                        <FaFileAlt size={20} />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">Documentation</h4>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-900 hidden md:block">Documentation</h4>
                  <p className="text-gray-600 mt-2">We collect and organize all necessary documents, ensuring nothing is missed.</p>
                </div>
              </motion.div>






              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:flex items-center"
              >
                <div className="md:w-1/2 pr-8 md:text-right mb-4 md:mb-0">
                </div>
                <div className="md:w-12 md:flex md:justify-center relative z-10">
                  <div className="hidden md:flex w-10 h-10 rounded-full border-4 border-blue-100 bg-blue-600 text-white shadow-md items-center justify-center">
                    <div className="flex items-center justify-center">
                      <FaClipboardCheck size={20} />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <div className="md:hidden flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full border-4 border-blue-100 bg-blue-600 text-white shadow-md flex items-center justify-center mr-4">
                      <div className="flex items-center justify-center">
                        <FaClipboardCheck size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 md:hidden">Filing & Compliance</h4>
                    </div>
                  </div>
                   <h4 className="text-xl font-semibold text-gray-900 hidden md:block">Filing & Compliance</h4>
                  <p className="text-gray-600 mt-2">We handle all filing requirements with precision and ensure complete compliance.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="md:flex items-center"
              >
                <div className="md:w-1/2 pr-8 hidden md:block"></div>
                <div className="md:w-12 md:flex md:justify-center relative z-10">
                  <div className="hidden md:flex w-10 h-10 rounded-full border-4 border-blue-100 bg-blue-600 text-white shadow-md items-center justify-center">
                    <div className="flex items-center justify-center">
                      <FaUserCog size={20} />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <div className="md:hidden flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full border-4 border-blue-100 bg-blue-600 text-white shadow-md flex items-center justify-center mr-4">
                      <div className="flex items-center justify-center">
                        <FaUserCog size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">Follow-up & Advisory</h4>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 hidden md:block">Follow-up & Advisory</h4>
                  <p className="text-gray-600 mt-2">We provide ongoing support and strategic advice for future tax planning.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/gst-taxation"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Get Tax Assistance
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-gray-600"
          >
            Have questions? Contact our tax experts for a free consultation.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default GSTTaxation; 