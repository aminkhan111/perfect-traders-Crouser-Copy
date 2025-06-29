'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const OurPartners = () => {
  // Partner logos - updated with online image URLs
  const partners = [
    { 
      id: 1, 
      name: 'ICICI Prudential', 
      logo: 'https://images.seeklogo.com/logo-png/30/1/icici-prudential-life-insurance-logo-png_seeklogo-307031.png' 
    },
    { 
      id: 2, 
      name: 'HDFC Life', 
      logo: 'https://images.seeklogo.com/logo-png/30/1/hdfc-life-logo-png_seeklogo-304905.png' 
    },
    { 
      id: 3, 
      name: 'TATA AIA', 
      logo: 'https://images.seeklogo.com/logo-png/30/1/tata-aia-life-logo-png_seeklogo-304926.png' 
    },
    { 
      id: 4, 
      name: 'Manipal Cigna', 
      logo: 'https://images.seeklogo.com/logo-png/45/1/cigna-logo-png_seeklogo-458455.png' 
    },
    { 
      id: 5, 
      name: 'Niva Bupa', 
      logo: 'https://images.seeklogo.com/logo-png/30/1/max-bupa-logo-png_seeklogo-304916.png' 
    },
    { 
      id: 6, 
      name: 'HDFC ERGO', 
      logo: 'https://images.seeklogo.com/logo-png/21/1/ergo-logo-png_seeklogo-218453.png' 
    },
    { 
      id: 7, 
      name: 'ICICI Lombard', 
      logo: 'https://images.seeklogo.com/logo-png/22/1/icici-lombard-logo-png_seeklogo-225683.png' 
    },
    { 
      id: 8, 
      name: 'Bajaj Allianz', 
      logo: 'https://images.seeklogo.com/logo-png/30/1/bajaj-allianz-life-insurance-logo-png_seeklogo-307030.png' 
    },
    { 
      id: 9, 
      name: 'GoDigit', 
      logo: 'https://images.seeklogo.com/logo-png/46/1/digit-insurance-logo-png_seeklogo-465810.png' 
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Insurance Partners</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We collaborate with leading insurance providers to offer you the best coverage options for life, health, and motor insurance.
          </p>
        </div>

        {/* Logo Slider */}
        <div className="relative overflow-hidden">
          <div className="logo-slider">
            <div className="logo-slide-track">
              {/* First set of logos */}
              {partners.map((partner) => (
                <div key={partner.id} className="logo-slide">
                  <div className="flex items-center justify-center bg-white shadow-md rounded-lg h-32 w-48 mx-4 p-4">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name} 
                      width={150} 
                      height={100} 
                      unoptimized={true}
                    />
                  </div>
                </div>
              ))}
              
              {/* Duplicate set of logos for seamless looping */}
              {partners.map((partner) => (
                <div key={`dup-${partner.id}`} className="logo-slide">
                  <div className="flex items-center justify-center bg-white shadow-md rounded-lg h-32 w-48 mx-4 p-4">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name} 
                      width={150} 
                      height={100}
                      unoptimized={true} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .logo-slider {
            width: 100%;
            height: auto;
            margin: auto;
            overflow: hidden;
            position: relative;
            padding: 20px 0;
          }

          .logo-slide-track {
            display: flex;
            animation: scroll 40s linear infinite;
            width: calc(250px * ${partners.length * 2});
          }

          .logo-slide {
            flex: 0 0 auto;
          }

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-250px * ${partners.length}));
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default OurPartners; 