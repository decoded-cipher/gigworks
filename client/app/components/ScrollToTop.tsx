"use client";

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  targetElementId?: string; // Optional ID of the scrollable container
  bottomOffset?: number; // Distance from bottom of screen
  rightOffset?: number; // Distance from right of screen
}

const ScrollToTopButton = ({ 
  targetElementId,
  bottomOffset = 20, 
  rightOffset = 20 
}: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Get the target element (either the specific container or the whole document)
      const element = targetElementId 
        ? document.getElementById(targetElementId) 
        : document.documentElement;
      
      if (!element) return;

      // Check if there's enough content to scroll
      const shouldBeVisible = targetElementId 
        ? element.scrollHeight > element.clientHeight
        : element.scrollHeight > window.innerHeight;

      // Check scroll position
      const scrollPosition = targetElementId
        ? element.scrollTop
        : window.scrollY;

      setIsVisible(shouldBeVisible && scrollPosition > 300);
    };

    // Add event listener
    const scrollableElement = targetElementId 
      ? document.getElementById(targetElementId) 
      : window;
    
    scrollableElement?.addEventListener('scroll', toggleVisibility);

    // Initial check
    toggleVisibility();

    // Cleanup
    return () => {
      scrollableElement?.removeEventListener('scroll', toggleVisibility);
    };
  }, [targetElementId]);

  const scrollToTop = () => {
    const element = targetElementId 
      ? document.getElementById(targetElementId) 
      : document.documentElement;
    
    if (element) {
      if (targetElementId) {
        // Scroll within a specific container
        element.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
      } else {
        // Scroll entire window
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
      }
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed z-50 bg-green-500 text-white 
        rounded-full shadow-lg hover:bg-green-600 
        transition-all duration-300 ease-in-out
        flex items-center justify-center
      `}
      style={{
        bottom: `${bottomOffset}px`,
        right: `${rightOffset}px`,
        width: '50px',
        height: '50px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateY(0)' 
          : 'translateY(20px)'
      }}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;