'use client';

import { 
  FaChartLine, 
  FaFileAlt, 
  FaWallet, 
  FaShieldAlt, 
  FaHandshake, 
  FaChartPie, 
  FaSearchDollar, 
  FaCalculator 
} from 'react-icons/fa';
import Link from 'next/link';

const ServiceCard = ({ icon, title, description, href, id }) => (
  <Link href={href} className="block" id={id}>
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center h-full cursor-pointer hover:transform hover:scale-105">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

const OurProductsAndServices = () => {
  const services = [
    {
      id: "knowledge",
      title: 'Stock Market Knowledge',
      description: 'Learn trading strategies, market analysis, and investment principles from our expert team.',
      icon: <FaChartLine className="text-blue-600 text-4xl" />,
      href: '/knowledge'
    },
    {
      id: "ipo-consult",
      title: 'IPO Consult',
      description: 'Get expert advice on Initial Public Offerings and maximize your investment opportunities.',
      icon: <FaFileAlt className="text-blue-600 text-4xl" />,
      href: '/ipo-consult'
    },
    {
      id: "free-demat",
      title: 'Free Demat Account',
      description: 'Open your free dematerialized account with our partner brokers and start your investment journey.',
      icon: <FaWallet className="text-blue-600 text-4xl" />,
      href: '/free-demat'
    },
    {
      id: "insurance",
      title: 'Various Insurance',
      description: 'Protect yourself and your assets with our comprehensive range of insurance services.',
      icon: <FaShieldAlt className="text-blue-600 text-4xl" />,
      href: '/insurance'
    },
    {
      id: "unlisted-shares",
      title: 'Unlisted Shares',
      description: 'Explore opportunities in unlisted equities and pre-IPO companies with high growth potential.',
      icon: <FaHandshake className="text-blue-600 text-4xl" />,
      href: '/unlisted-shares'
    },
    {
      id: "mutual-fund",
      title: 'Mutual Fund',
      description: 'Diversify your portfolio with our curated selection of high-performing mutual funds.',
      icon: <FaChartPie className="text-blue-600 text-4xl" />,
      href: '/mutual-fund'
    },
    {
      id: "research-report",
      title: 'Research Report',
      description: 'Access in-depth market research, company analysis, and investment recommendations.',
      icon: <FaSearchDollar className="text-blue-600 text-4xl" />,
      href: '/research-report'
    },
    {
      id: "gst-taxation",
      title: 'GST & Taxation',
      description: 'Navigate tax implications of investments and optimize your financial planning with our taxation experts.',
      icon: <FaCalculator className="text-blue-600 text-4xl" />,
      href: '/gst-taxation'
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Products & Services</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive financial solutions designed to help you achieve your investment goals and secure your financial future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              href={service.href}
              id={service.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProductsAndServices; 