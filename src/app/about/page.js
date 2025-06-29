"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutUs() {
  const [yearsExperience, setYearsExperience] = useState(0);
  const [successfulStudents, setSuccessfulStudents] = useState(0);
  const [successRate, setSuccessRate] = useState(0);

  useEffect(() => {
    const incrementCounter = (setCounter, target, duration) => {
      let start = 0;
      const increment = target / (duration / 10);
      const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
          clearInterval(interval);
          setCounter(target);
        } else {
          setCounter(Math.ceil(start));
        }
      }, 10);
    };

    incrementCounter(setYearsExperience, 10, 7000);
    incrementCounter(setSuccessfulStudents, 5000, 7000);
    incrementCounter(setSuccessRate, 95, 6000);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 relative">
          <div className="absolute inset-0">
            <Image 
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
              alt="Stock Market"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About PerfectTraders</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Empowering investors with knowledge and tools to navigate the financial markets successfully
            </p>
          </div>
        </section>

        {/* Mission section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 relative h-96 w-full">
                <div 
                  className="h-full w-full bg-cover bg-center rounded-lg shadow-xl"
                  style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')",
                    backgroundPosition: "center"
                  }}
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <div className="w-20 h-1 bg-blue-600 mb-6"></div>
                <p className="text-gray-600 mb-6 text-lg">
                  At PerfectTraders, we believe that financial education is a right, not a privilege. Our mission is to democratize stock market knowledge and empower individuals from all walks of life to make informed investment decisions.
                </p>
                <p className="text-gray-600 mb-6 text-lg">
                  We are committed to breaking down complex financial concepts into easy-to-understand lessons, providing practical tools and research, and creating a supportive community where both beginners and experienced traders can thrive.
                </p>
                <p className="text-gray-600 text-lg">
                  Through our educational programs, expert-led webinars, and personalized advisory services, we aim to transform financial futures and help our clients build lasting wealth through smart investing strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Achievements section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Experience & Achievements</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-2 mb-4"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                With over a decade of experience in the financial markets, PerfectTraders has established itself as a trusted name in stock market education and advisory services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-blue-600 text-4xl font-bold mb-2">{yearsExperience}+</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Years of Experience</h3>
                <p className="text-gray-600">
                  A decade of hands-on experience navigating through various market cycles and economic conditions.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-blue-600 text-4xl font-bold mb-2">{successfulStudents}+</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Successful Students</h3>
                <p className="text-gray-600">
                  Thousands of students have transformed their financial futures through our educational programs.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-blue-600 text-4xl font-bold mb-2">{successRate}%</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Success Rate</h3>
                <p className="text-gray-600">
                  Our research reports and investment strategies have a proven track record of success in the market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Our Expert Team</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-2 mb-4"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Meet our team of experienced financial analysts, educators, and market strategists who are dedicated to your success.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-gray-300 relative">
                  <div 
                    className="h-full w-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')",
                      backgroundPosition: "center top"
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Rajiv Sharma</h3>
                  <p className="text-blue-600 font-medium mb-4">Founder & Chief Strategist</p>
                  <p className="text-gray-600">
                    With 15+ years of experience in equity markets, Rajiv has helped countless investors achieve their financial goals through strategic market analysis.
                  </p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-gray-300 relative">
                  <div 
                    className="h-full w-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: "url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')",
                      backgroundPosition: "center top"
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Priya Malhotra</h3>
                  <p className="text-blue-600 font-medium mb-4">Head of Research</p>
                  <p className="text-gray-600">
                    Priya leads our research team with a focus on fundamental analysis and long-term investment strategies for wealth creation.
                  </p>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-gray-300 relative">
                  <div 
                    className="h-full w-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: "url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')",
                      backgroundPosition: "center top"
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Amit Patel</h3>
                  <p className="text-blue-600 font-medium mb-4">Technical Analysis Expert</p>
                  <p className="text-gray-600">
                    Amit specializes in technical chart patterns and market timing strategies that help traders maximize their returns in various market conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-80"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl font-extrabold mb-6 animate-fade-in">Ready to Start Your Investment Journey?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 animate-fade-in">
              Join thousands of successful investors who have transformed their financial future with PerfectTraders.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-yellow-500 text-blue-900 font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105 animate-bounce"
            >
              Contact Us Today
            </Link>
          </div>
          <style jsx>{`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fade-in 1s ease-out forwards;
            }
            .animate-bounce {
              animation: bounce 2s infinite;
            }
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-10px); }
              60% { transform: translateY(-5px); }
            }
          `}</style>
        </section>
      </main>
    </div>
  );
} 