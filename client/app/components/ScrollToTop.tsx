"use client";

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  targetElementId?: string;
  bottomOffset?: number;
  rightOffset?: number;
  isProfilePage?: boolean; // New prop to change background
}

const ScrollToTopButton = ({ 
  targetElementId,
  bottomOffset = 20, 
  rightOffset = 20,
  isProfilePage = false // Default to false
}: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const element = targetElementId 
        ? document.getElementById(targetElementId) 
        : document.documentElement;
      
      if (!element) return;

      const shouldBeVisible = targetElementId 
        ? element.scrollHeight > element.clientHeight
        : element.scrollHeight > window.innerHeight;

      const scrollPosition = targetElementId
        ? element.scrollTop
        : window.scrollY;

      setIsVisible(shouldBeVisible && scrollPosition > 300);
    };

    const scrollableElement = targetElementId 
      ? document.getElementById(targetElementId) 
      : window;
    
    scrollableElement?.addEventListener('scroll', toggleVisibility);
    toggleVisibility();

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
        element.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
      } else {
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
        fixed z-50 text-white 
        rounded-full shadow-lg hover:bg-opacity-80 
        transition-all duration-300 ease-in-out
        flex items-center justify-center border-2 border-white
        ${isProfilePage ? 'bg-black' : 'bg-green-500'}
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