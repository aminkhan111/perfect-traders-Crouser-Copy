'use client';

import { 
  FaChalkboardTeacher, 
  FaHandHoldingUsd, 
  FaChartLine, 
  FaUserFriends,
  FaHeadset,
  FaShieldAlt,
  FaTrophy,
  FaGlobeAsia,
  FaCalendarAlt,
  FaUsers,
  FaUserTie,
  FaChartBar,
  FaQuoteLeft
} from 'react-icons/fa';

export default function WhyUs() {
  // Define the reasons with their icons and descriptions
  const reasons = [
    {
      icon: <FaChalkboardTeacher className="text-5xl text-blue-600 mb-4" />,
      title: "Expert Trainers",
      description: "Learn from seasoned stock market professionals with decades of combined experience in trading and investments."
    },
    {
      icon: <FaHandHoldingUsd className="text-5xl text-blue-600 mb-4" />,
      title: "Free Financial Services",
      description: "Access complimentary financial services including demat account setup, basic investment guidance, and portfolio reviews."
    },
    {
      icon: <FaChartLine className="text-5xl text-blue-600 mb-4" />,
      title: "Market Insights",
      description: "Receive regular market analysis, research reports, and actionable investment ideas from our expert research team."
    },
    {
      icon: <FaUserFriends className="text-5xl text-blue-600 mb-4" />,
      title: "User-Friendly Experience",
      description: "Enjoy simplified learning resources designed for investors of all levels, from beginners to advanced traders."
    },
    {
      icon: <FaHeadset className="text-5xl text-blue-600 mb-4" />,
      title: "Dedicated Support",
      description: "Get personalized attention and guidance with our responsive customer support team available to assist with your queries."
    },
    {
      icon: <FaShieldAlt className="text-5xl text-blue-600 mb-4" />,
      title: "Reliable & Transparent",
      description: "We pride ourselves on transparency in all our services, with no hidden fees and clear, actionable advice."
    },
    {
      icon: <FaTrophy className="text-5xl text-blue-600 mb-4" />,
      title: "Proven Results",
      description: "Join thousands of successful investors who have transformed their financial outcomes through our guidance."
    },
    {
      icon: <FaGlobeAsia className="text-5xl text-blue-600 mb-4" />,
      title: "Comprehensive Services",
      description: "From stock markets to IPOs, insurance to taxation - we provide holistic financial solutions under one roof."
    }
  ];

  // Stats with icons for visual appeal
  const stats = [
    {
      value: "10+",
      label: "Years Experience",
      icon: <FaCalendarAlt className="text-3xl text-blue-500 group-hover:text-white transition-colors duration-300" />
    },
    {
      value: "5,000+",
      label: "Happy Clients",
      icon: <FaUsers className="text-3xl text-blue-500 group-hover:text-white transition-colors duration-300" />
    },
    {
      value: "50+",
      label: "Expert Advisors",
      icon: <FaUserTie className="text-3xl text-blue-500 group-hover:text-white transition-colors duration-300" />
    },
    {
      value: "95%",
      label: "Success Rate",
      icon: <FaChartBar className="text-3xl text-blue-500 group-hover:text-white transition-colors duration-300" />
    }
  ];

  // Testimonials to add credibility - ENHANCED with profile images
  const testimonials = [
    {
      quote: "PerfectTraders completely transformed my understanding of the stock market. Their training helped me build a profitable portfolio from scratch.",
      author: "Sanjay Mehta",
      position: "Retail Investor",
      image: {
        url: "https://randomuser.me/api/portraits/men/32.jpg",
        alt: "Sanjay Mehta"
      }
    },
    {
      quote: "The research reports from PerfectTraders have been invaluable for my investment decisions. Their insights are consistently accurate and actionable.",
      author: "Priya Shah",
      position: "Business Owner",
      image: {
        url: "https://randomuser.me/api/portraits/women/44.jpg",
        alt: "Priya Shah"
      }
    },
    {
      quote: "What sets PerfectTraders apart is their personalized approach. They took time to understand my goals and tailored their advice accordingly.",
      author: "Rohit Kapoor",
      position: "IT Professional",
      image: {
        url: "https://randomuser.me/api/portraits/men/57.jpg",
        alt: "Rohit Kapoor"
      }
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Choose PerfectTraders?</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We empower investors with knowledge, tools, and personalized guidance for financial success in the stock market
          </p>
        </div>
      </section>

      {/* Key advantages section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Unique Advantages</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At PerfectTraders, we're committed to providing you with exceptional service and valuable insights to help you navigate the financial markets with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="flex justify-center">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section - ENHANCED */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Track Record</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The numbers speak for themselves. Here's what makes PerfectTraders a trusted name in financial education and services.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6 md:gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="group w-full md:w-64 bg-white p-8 md:p-10 rounded-2xl shadow-lg border-2 border-gray-100 
                             hover:border-blue-500 transition-all duration-300 ease-in-out 
                             hover:transform hover:-translate-y-2 text-center flex flex-col items-center justify-center
                             hover:bg-blue-600"
                >
                  <div className="mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-6xl font-bold text-blue-600 mb-3 group-hover:text-white transition-colors duration-300">
                    {stat.value}
                  </div>
                  <p className="text-xl text-gray-700 font-medium group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section - ENHANCED with profile pictures */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from investors who have transformed their financial journey with PerfectTraders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="p-8 relative">
                  <FaQuoteLeft className="text-4xl text-blue-100 absolute top-4 left-4" />
                  
                  <p className="text-gray-600 mb-8 relative z-10 italic">"{testimonial.quote}"</p>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url('${testimonial.image.url}')`,
                            backgroundPosition: "center"
                          }}
                          aria-label={testimonial.image.alt}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{testimonial.author}</p>
                      <p className="text-blue-600">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of successful investors who have transformed their financial future with PerfectTraders.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="#" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-semibold transition duration-300"
            >
              Contact Us
            </a>
            <a 
              href="#" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-md font-semibold transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 