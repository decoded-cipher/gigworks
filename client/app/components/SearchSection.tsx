'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type LocationsType = {
  [key: string]: string[];
};

const jobs = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Gardener",
  "Mechanic",
  "Cleaner"
] as const;

const locations: LocationsType = {
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
  const [selectedLocation, setSelectedLocation] = useState<keyof LocationsType>("Kerala");
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
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full ">
      {/* Location Input */}
      <div className="relative w-full md:w-64 px-1 md:px-0">
        <div 
          className="flex items-center bg-navbg border border-green-700 text-white rounded-md px-4 py-2 h-14 cursor-pointer w-full"
          onClick={() => setShowLocations(!showLocations)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500 mr-2 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 2.05A7 7 0 0114 12.75l-3.25 4.75a1 1 0 01-1.5 0L5 12.75A7 7 0 015.05 2.05zm4.95 8.95a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="flex-1 truncate">{selectedCity || selectedLocation}</span>
          <ChevronDown className="h-4 w-4 text-green-500 shrink-0" />
        </div>

        {/* Location Dropdown */}
        {showLocations && (
          <div className="absolute top-full left-0 mt-2 w-full bg-navbg border border-green-700 rounded-md shadow-lg z-50">
            <div className="p-2">
              <div className="font-semibold text-green-500 mb-2">{selectedLocation}</div>
              {locations[selectedLocation]?.map((city) => (
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
      <div className="relative bg-navbg border border-green-700 text-white rounded-md md:w-96 mx-1 md:mx-0">
        <input
          type="text"
          className="w-full  px-6 py-4 bg-transparent outline-none"
          placeholder=""
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