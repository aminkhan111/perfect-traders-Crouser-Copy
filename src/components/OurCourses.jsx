'use client';

import Image from 'next/image';
import { FaGraduationCap, FaChartLine, FaUser, FaCalendarAlt } from 'react-icons/fa';

const CourseCard = ({ title, description, duration, level, instructor, price, imageSrc }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Course Image */}
      <div className="relative h-48 w-full">
        <Image 
          src={imageSrc} 
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="bg-blue-600 p-3">
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 mb-4 text-sm h-20 overflow-hidden">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-gray-600">
            <FaCalendarAlt className="text-blue-600 mr-2" />
            <span>Duration: {duration}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <FaChartLine className="text-blue-600 mr-2" />
            <span>Level: {level}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <FaUser className="text-blue-600 mr-2" />
            <span>Instructor: {instructor}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">{price}</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-md transition-colors duration-300 flex items-center text-sm">
            <FaGraduationCap className="mr-1" />
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

const OurCourses = () => {
  const courses = [
    {
      id: 1,
      title: 'Stock Market Fundamentals',
      description: 'Learn the basics of stock market investing, including how to read financial statements and understand market trends.',
      duration: '6 weeks',
      level: 'Beginner',
      instructor: 'Rahul Sharma',
      price: '₹4,999',
      imageSrc: 'https://images.unsplash.com/photo-1629339942248-45d4b10c8c2f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      title: 'Technical Analysis Masterclass',
      description: 'Master chart patterns, indicators, and technical analysis strategies to identify profitable trading opportunities.',
      duration: '8 weeks',
      level: 'Intermediate',
      instructor: 'Rahul prasaad',
      price: '₹7,999',
      imageSrc: 'https://images.unsplash.com/photo-1635236198091-33d5aa8466cc?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      title: 'Options Trading Strategies',
      description: 'Discover advanced options trading strategies to generate income, hedge your portfolio, and maximize returns.',
      duration: '10 weeks',
      level: 'Advanced',
      instructor: 'Rahul prasaad',
      price: '₹9,999',
      imageSrc: 'https://plus.unsplash.com/premium_photo-1664476845274-27c2dabdd7f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg'
    },
    {
      id: 4,
      title: 'Value Investing Workshop',
      description: 'Learn the principles of value investing following the strategies of Warren Buffett and other successful investors.',
      duration: '4 weeks',
      level: 'Intermediate',
      instructor: 'Amin Khan',
      price: '₹5,999',
      imageSrc: 'https://plus.unsplash.com/premium_photo-1661611263128-ffb51eca570f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 5,
      title: 'Intraday Trading Techniques',
      description: 'Learn the strategies, tools, and risk management techniques for successful day trading in volatile markets.',
      duration: '6 weeks',
      level: 'Advanced',
      instructor: 'Sraban Kumar',
      price: '₹8,499',
      imageSrc: 'https://plus.unsplash.com/premium_photo-1670249419932-a7027d9003f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 6,
      title: 'Financial Planning Essentials',
      description: 'Comprehensive course on personal finance, retirement planning, tax optimization, and wealth building strategies.',
      duration: '8 weeks',
      level: 'Beginner',
      instructor: 'Bikash Kumar',
      price: '₹6,499',
      imageSrc: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Courses</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enhance your financial knowledge and trading skills with our expert-led courses.
            From beginners to advanced traders, we have programs tailored to every level.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              duration={course.duration}
              level={course.level}
              instructor={course.instructor}
              price={course.price}
              imageSrc={course.imageSrc}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md transition-colors duration-300 inline-flex items-center">
            <FaGraduationCap className="mr-2" />
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurCourses; 