'use client';

import Image from 'next/image';

const OurMission = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Mission Text */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Empowering Financial Independence Through Knowledge
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At PerfectTraders, our mission is to democratize financial literacy and empower individuals 
              to take control of their financial future. We believe that access to quality financial education 
              and market knowledge should be available to everyone, regardless of their background or experience.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We are committed to providing accurate, transparent, and actionable information that helps our 
              clients make informed investment decisions. Through our comprehensive services, expert guidance, 
              and educational resources, we aim to transform novice traders into confident investors.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our ultimate goal is to create a community of financially independent individuals who can build 
              wealth, secure their futures, and achieve their financial dreams through smart, strategic 
              investing in the stock market and beyond.
            </p>
          </div>
          
          {/* Image */}
          <div className="w-full lg:w-1/2 relative mb-8 lg:mb-0 order-1 lg:order-2">
            <div className="rounded-lg overflow-hidden shadow-xl mx-auto max-w-md lg:max-w-none">
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image 
                  src="https://res.cloudinary.com/aminkhan111/image/upload/v1741915146/aap2tbb2xcbmosk3k0do.jpg" 
                  alt="Financial education"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 md:w-72 h-48 md:h-72 bg-blue-100 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 md:w-48 h-32 md:h-48 bg-gray-100 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission; 