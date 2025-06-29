'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

const NavigationLoading = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  // Use a simpler approach focused on click detection and auto-timeout
  useEffect(() => {
    // Set a safety timeout to ensure the loader eventually disappears
    let safetyTimeout;
    
    // Handle click on navigation links
    const handleClick = (e) => {
      // Find if the click was on or inside a link
      let target = e.target;
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }
      
      // Only handle clicks on internal links
      if (target && target.href && !target.target && !e.ctrlKey && !e.metaKey) {
        try {
          const url = new URL(target.href);
          // Only show loader for navigation to different pages (not anchors on same page)
          if (url.origin === window.location.origin && url.pathname !== pathname) {
            setLoading(true);
            
            // Set a safety timeout to ensure loader doesn't stay forever
            clearTimeout(safetyTimeout);
            safetyTimeout = setTimeout(() => {
              setLoading(false);
            }, 3000); // Maximum loading time of 3 seconds
          }
        } catch (e) {
          // In case URL parsing fails
          console.error("Error parsing URL", e);
        }
      }
    };

    // Add click event listener
    document.addEventListener('click', handleClick);

    // Listen for page load events to hide the loader
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 100);
    };

    window.addEventListener('load', handleLoad);

    // Use visibility change to detect back/forward navigation
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setTimeout(() => setLoading(false), 300);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(safetyTimeout);
    };
  }, [pathname]);

  // When pathname changes, hide the loader
  useEffect(() => {
    // Small delay to ensure page has rendered
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? <LoadingSpinner /> : null;
};

export default NavigationLoading; 