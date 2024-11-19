import React, { useState, useEffect, useCallback } from 'react';

interface Slide {
  title: string;
  content: string;
}

const MissionSwiper = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const slides: Slide[] = [
    {
      title: "Our Mission",
      content: "Our mission is to empower local businesses by providing them with a robust platform to showcase their offerings to a broader audience. We strive to bridge the gap between businesses and customers by making the search for goods and services seamless, quick, and accessible right from your smartphone."
    },
    {
      title: "Our Vision",
      content: "To create a thriving ecosystem where local businesses flourish and customers have easy access to all the products and services they need, fostering economic growth and community development through digital innovation."
    },
    {
      title: "Our Objective",
      content: "To build the most comprehensive and user-friendly platform that connects local businesses with customers, while providing tools and support that enable businesses to grow and succeed in an increasingly digital marketplace."
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Auto-swipe functionality
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (!isPaused) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos(e.touches[0].clientX);
    setIsPaused(true); // Pause auto-swipe on touch
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentPosition = e.touches[0].clientX;
    const diff = currentPosition - startPos;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (diff < 0 && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsPaused(false); // Resume auto-swipe after touch
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos(e.clientX);
    setIsPaused(true); // Pause auto-swipe on mouse down
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    const diff = currentPosition - startPos;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (diff < 0 && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false); // Resume auto-swipe after mouse up
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false); // Resume auto-swipe when mouse leaves
  };

  const handleMouseEnter = () => {
    setIsPaused(true); // Pause auto-swipe when mouse enters
  };

  return (
    <div className="relative mx-auto select-none">
      {/* Main content area */}
      <div 
        className="relative bg-green-600 p-6 rounded-lg lg:mx-44 mx-4 cursor-grab active:cursor-grabbing md:text-start text-center "
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Slide container */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div 
                key={index}
                className="w-full flex-shrink-0"
              >
                <div className="text-white ">
                  <h3 className="text-xl font-bold mb-4">{slide.title}</h3>
                  <p className="leading-relaxed mb-4">{slide.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => {
            setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : slides.length - 1);
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 3000); // Resume auto-swipe after 3 seconds
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white opacity-70 hover:opacity-100"
          aria-label="Previous slide"
        >
          
        </button>
        <button
          onClick={() => {
            setCurrentSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 3000); // Resume auto-swipe after 3 seconds
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white opacity-70 hover:opacity-100"
          aria-label="Next slide"
        >
          
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3000); // Resume auto-swipe after 3 seconds
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-green-600 w-6' : 'bg-green-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MissionSwiper;