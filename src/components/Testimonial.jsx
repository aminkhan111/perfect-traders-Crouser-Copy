'use client';

import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaUser } from 'react-icons/fa';

const TestimonialCard = ({ name, profession, rating, text }) => {
  // Generate a consistent color based on the name
  const getInitialBgColor = (name) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-emerald-500 to-emerald-600',
      'from-rose-500 to-rose-600',
      'from-amber-500 to-amber-600',
      'from-cyan-500 to-cyan-600'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative">
        {/* Decorative Pattern */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getInitialBgColor(name)} opacity-10 pattern-dots pattern-gray-500 pattern-bg-white pattern-size-2 pattern-opacity-20`} />
        
        {/* Profile section */}
        <div className="relative p-6 flex flex-col items-center">
          <div className={`w-20 h-20 rounded-full overflow-hidden mb-4 flex items-center justify-center text-white font-bold text-2xl bg-gradient-to-br ${getInitialBgColor(name)} shadow-lg transform hover:scale-105 transition-transform duration-300 border-4 border-white`}>
            {name.split(' ').map(part => part[0]).join('')}
          </div>
          
          <h4 className="text-xl font-bold text-gray-800 mb-1">{name}</h4>
          <p className="text-sm text-gray-500 font-medium">{profession}</p>
          
          {/* Rating Stars with Animation */}
          <div className="flex items-center space-x-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <FaStar 
                  className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} w-5 h-5`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="relative">
          <FaQuoteLeft className="absolute -top-4 -left-2 text-gray-200 opacity-50 w-8 h-8" />
          <p className="text-gray-600 text-center pt-4 px-4 leading-relaxed">
            "{text}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      profession: 'Software Engineer',
      rating: 5,
      text: 'Perfect Traders changed my approach to investing completely. Their stock market fundamentals course gave me the confidence to make informed investment decisions. I\'ve seen a consistent 15% growth in my portfolio since!'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      profession: 'Doctor',
      rating: 5,
      text: 'Despite my busy schedule, I wanted to learn about investing. The technical analysis course was perfectly paced and incredibly insightful. Now I can analyze stocks myself instead of relying on others for advice.'
    },
    {
      id: 3,
      name: 'Amit Patel',
      profession: 'Business Owner',
      rating: 4,
      text: 'The research reports provided by Perfect Traders have been invaluable for my investment strategy. Their analysis is thorough and their recommendations have been spot on. Highly recommend their services!'
    },
    {
      id: 4,
      name: 'Meera Desai',
      profession: 'Financial Analyst',
      rating: 5,
      text: 'As someone already in the finance industry, I was skeptical about what more I could learn. The options trading course exceeded my expectations and introduced strategies I hadn\'t considered before.'
    },
    {
      id: 5,
      name: 'Vikram Malhotra',
      profession: 'Retired Government Officer',
      rating: 5,
      text: 'After retirement, I was looking for ways to grow my savings. Perfect Traders not only educated me about the stock market but also helped me set up a diversified portfolio that generates regular income.'
    },
    {
      id: 6,
      name: 'Sunita Joshi',
      profession: 'Teacher',
      rating: 4,
      text: 'I was always intimidated by the stock market, but Perfect Traders made it accessible and understandable. Their step-by-step guidance and responsive support team made all the difference.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied traders who have transformed their trading journey with PerfectTraders.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              profession={testimonial.profession}
              rating={testimonial.rating}
              text={testimonial.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial; 