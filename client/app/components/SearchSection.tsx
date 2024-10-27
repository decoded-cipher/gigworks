'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const jobs = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Chef",
  "Gardener",
  "Mechanic",
  "Cleaner"
];

const locations = {
  "Kerala": [
    "Trivandrum",
    "Kochi",
    "Kozhikode",
    "Thrissur",
    "Kollam",
    "Palakkad"
  ]
};

export const SearchSection = () => {
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Kerala");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentJobIndex((prev) => (prev + 1) % jobs.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-4">
      {/* Location Input */}
      <div className="relative">
        <div 
          className="flex items-center bg-navbg border border-green-700 text-white rounded-md px-4 py-2 w-64 h-14 cursor-pointer"
          onClick={() => setShowLocations(!showLocations)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 2.05A7 7 0 0114 12.75l-3.25 4.75a1 1 0 01-1.5 0L5 12.75A7 7 0 015.05 2.05zm4.95 8.95a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="flex-1">{selectedCity || selectedLocation}</span>
          <ChevronDown className="h-4 w-4 text-green-500" />
        </div>

        {/* Location Dropdown */}
        {showLocations && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-navbg border border-green-700 rounded-md shadow-lg z-50">
            <div className="p-2">
              <div className="font-semibold text-green-500 mb-2">{selectedLocation}</div>
              {locations[selectedLocation].map((city) => (
                <div
                  key={city}
                  className="px-2 py-1 hover:bg-green-500/20 rounded cursor-pointer text-white"
                  onClick={() => {
                    setSelectedCity(city);
                    setShowLocations(false);
                  }}
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="relative bg-navbg border border-green-700 text-white rounded-md w-96">
        <input
          type="text"
          className="w-full px-6 py-4 bg-transparent outline-none"
        />
        <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <span>Search for </span>
          <span 
            className={`inline-block transition-all duration-500 ${
              isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            {jobs[currentJobIndex]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;