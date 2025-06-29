'use client';

import React, { useEffect, useState } from 'react';

const LoadingSpinner = () => {
  // Only show the full-screen overlay for longer loads
  const [showFullOverlay, setShowFullOverlay] = useState(false);
  
  useEffect(() => {
    // Only show the full overlay if loading takes more than 500ms
    const timer = setTimeout(() => {
      setShowFullOverlay(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Top progress bar - always visible */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100]">
        <div className="h-1 bg-blue-600 animate-[loading_1.5s_ease-in-out_infinite]"></div>
      </div>
      
      {/* Full overlay - only for longer loads */}
      {showFullOverlay && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[99]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white p-4 rounded-lg shadow-md inline-flex flex-col items-center">
              <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="flex mt-2 space-x-1">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner; 