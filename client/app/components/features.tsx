import React from 'react';
import Image from 'next/image';

const FeatureCardsWithImage = () => {
  const features = [
    {
      title: "Ease of Access",
      description: "With our WhatsApp-based service, you can find what you need anytime, anywhere, without the hassle of downloading additional apps"
    },
    {
      title: "Local Focus",
      description: "We are committed to supporting local businesses, giving them a platform to grow and succeed within their communities."
    },
    {
      title: "Comprehensive Listings",
      description: "Our directory includes businesses across a wide range of categories, ensuring that you can find everything you're looking for in one place."
    },
    {
      title: "Reliable Information",
      description: "Our team works diligently to verify the details of every business listed, providing you with accurate and up-to-date information."
    }
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Why Choose Us */}
        <h2 className="text-3xl font-bold mb-20 text-center text-black">
          Why <span className="text-green-600">Choose Us?</span>
        </h2>

        {/* Mobile Layout - Stack cards vertically */}
        <div className="md:hidden flex flex-col gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border-2 border-green-600 p-6 rounded-lg w-full bg-white"
            >
              <h3 className="text-xl text-black text-center font-bold mb-2 break-words">
                {feature.title}
              </h3>
              <p className="text-black text-center break-words">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop Layout - Cards around center image */}
        <div className="hidden md:flex justify-center items-center relative h-[800px]">
          {/* Center image container */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-full flex items-end">
            <Image 
              src="/assets/media/women.svg"
              alt="Women illustration"
              fill
              style={{ objectFit: 'contain' }}
              priority
              onError={(e) => {
                console.error('Image failed to load:', e);
              }}
            />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-3 gap-4 mx-auto max-w-6xl">
            {/* Left column */}
            <div className="space-y-8 mt-0 z-0 pr-8">
              <div className="border-2 bg-white border-green-600 p-6 rounded-lg shadow-lg hover:translate-x-4 transition-transform duration-300 ease-in-out">
                <h3 className="text-xl text-black text-center font-bold mb-2 break-words">
                  {features[0].title}
                </h3>
                <p className="text-black text-center break-words">
                  {features[0].description}
                </p>
              </div>
              <div className="border-2 bg-white border-green-600 p-6 rounded-lg shadow-lg hover:translate-x-4 transition-transform duration-300 ease-in-out">
                <h3 className="text-xl text-black text-center font-bold mb-2 break-words">
                  {features[1].title}
                </h3>
                <p className="text-black text-center break-words">
                  {features[1].description}
                </p>
              </div>
            </div>

            {/* Center column - empty for image */}
            <div className="w-full"></div>

            {/* Right column */}
            <div className="space-y-8 mt-32 z-10 pl-8">
              <div className="border-2 bg-white border-green-600 p-6 rounded-lg shadow-lg hover:-translate-x-4 transition-transform duration-300 ease-in-out">
                <h3 className="text-xl text-black text-center font-bold mb-2 break-words">
                  {features[2].title}
                </h3>
                <p className="text-black text-center break-words">
                  {features[2].description}
                </p>
              </div>
              <div className="border-2 bg-white border-green-600 p-6 rounded-lg shadow-lg hover:-translate-x-4 transition-transform duration-300 ease-in-out">
                <h3 className="text-xl text-black text-center font-bold mb-2 break-words">
                  {features[3].title}
                </h3>
                <p className="text-black text-center break-words">
                  {features[3].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCardsWithImage;