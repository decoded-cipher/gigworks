"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { fetchServices, searchBusinesses } from "../api/index";

// Keep the same interfaces from SearchSection
interface LocationResult {
  place_id: number;
  name: string;
  display_name: string;
  lat: string;
  lon: string;
  osm_type?: string;
  osm_id?: number;
  class?: string;
  type?: string;
  boundingbox?: string[];
}

interface ServiceResult {
  id?: number;
  name: string;
  slug?: string;
}

interface BusinessProfile {
  name: string;
  slug: string;
  city: string;
  user: {
    name: string;
    phone: string;
  };
}

interface SearchResults {
  message: string;
  profiles: BusinessProfile[];
}

const jobs = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Gardener",
  "Mechanic",
  "Cleaner",
] as const;

export const ServiceSearchSection = () => {
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchText, setSearchText] = useState("");
  const [locationSearchInput, setLocationSearchInput] = useState("");
  const [locationResults, setLocationResults] = useState<LocationResult[]>([]);
  const [serviceResults, setServiceResults] = useState<ServiceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    lat: string;
    lon: string;
  } | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [showModal, setShowModal] = useState(false);
  const ignoreNextServiceEffect = useRef(false);

  // Function to fetch locations from OpenStreetMap API (same as original)
  const fetchLocations = async (query: string): Promise<LocationResult[]> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
          query
        )}&countrycodes=in&accept-language=en&format=json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching locations:", error);
      return [];
    }
  };

  // Same effects for location search, service search, and job animation
  useEffect(() => {
    if (locationSearchInput.trim().length < 2) {
      setLocationResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchLocations(locationSearchInput).then(setLocationResults);
    }, 500);

    return () => clearTimeout(timer);
  }, [locationSearchInput]);

  useEffect(() => {
    if (ignoreNextServiceEffect.current) {
      ignoreNextServiceEffect.current = false;
      return; // Skip effect after manual selection
    }
    if (searchText.trim().length < 2) {
      setServiceResults([]);
      setShowServices(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await fetchServices(searchText);
        const results = response.data
          ? response.data.map((item: string) => ({ name: item }))
          : response.map((item: any) =>
              typeof item === "string" ? { name: item } : item
            );

        setServiceResults(results);
        setShowServices(true);
      } catch (error) {
        setServiceResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowLocations(false);
      setShowServices(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle the combined search
  const handleCombinedSearch = async () => {
    if (selectedLocation && searchText.trim()) {
      try {
        setIsLoading(true);
        setShowServices(false);
        
        const results = await searchBusinesses(searchText, {
          lat: selectedLocation.lat,
          lon: selectedLocation.lon,
        });
        
        console.log("Search results:", results);
        if (results?.data?.profiles) {
          setSearchResults(results.data);
          setShowModal(true);
        }
      } catch (error) {
        console.error("Error searching businesses:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleServiceDropdownSelect = async (serviceName: string) => {
    ignoreNextServiceEffect.current = true;
    setSearchText(serviceName);
    setShowServices(false);
    try {
      setIsLoading(true);
      if (selectedLocation) {
        const results = await searchBusinesses(serviceName, {
          lat: selectedLocation.lat,
          lon: selectedLocation.lon,
        });
        if (results?.data?.profiles) {
          setSearchResults(results.data);
          setShowModal(true);
        } else {
          setSearchResults({ message: "profile_not_found", profiles: [] });
          setShowModal(true);
        }
      }
    } catch (error: any) {
      setSearchResults({ message: "profile_not_found", profiles: [] });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-2xl">
        {/* Location Input - White theme */}
        <div className="relative w-full md:w-2/5 px-1 md:px-0">
          <div
            className="flex items-center bg-white border border-green-500 text-gray-800 rounded-full px-4 py-2 h-14 w-full shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600 mr-2 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 2.05A7 7 0 0114 12.75l-3.25 4.75a1 1 0 01-1.5 0L5 12.75A7 7 0 015.05 2.05zm4.95 8.95a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-gray-800"
              placeholder="Search location..."
              value={locationSearchInput}
              onChange={(e) => {
                setLocationSearchInput(e.target.value);
                setShowLocations(true);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowLocations(true);
              }}
            />
            <ChevronDown
              className="h-4 w-4 text-green-600 shrink-0 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowLocations(!showLocations);
              }}
            />
          </div>

          {/* Location Dropdown - White theme */}
          {showLocations && (
            <div
              className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2">
                {locationResults.length > 0 ? (
                  locationResults.map((location) => (
                    <div
                      key={location.place_id}
                      className="px-2 py-1 hover:bg-green-50 rounded cursor-pointer text-gray-800"
                      onClick={() => {
                        setSelectedCity(location.name);
                        setSelectedLocation({
                          name: location.name,
                          lat: location.lat,
                          lon: location.lon,
                        });
                        setLocationSearchInput(location.name);
                        setShowLocations(false);
                      }}
                    >
                      {location.display_name}
                    </div>
                  ))
                ) : locationSearchInput.trim().length > 0 ? (
                  <div className="px-2 py-1 text-gray-500">No results found</div>
                ) : (
                  <div className="px-2 py-1 text-gray-500">
                    Type to search locations
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Search Input - White theme */}
        <div className="relative bg-white border border-green-500 text-gray-800 rounded-full w-full md:w-3/5 shadow-sm">
          <input
            type="text"
            className="w-full px-6 py-4 bg-transparent outline-none"
            placeholder=""
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              if (e.target.value.trim().length >= 2) {
                setShowServices(true);
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (searchText.trim().length >= 2) {
                setShowServices(true);
              }
            }}
          />
          {!searchText && (
            <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <span>Search for </span>
              <span
                className={`inline-block transition-all duration-500 ${
                  isAnimating
                    ? "opacity-0 translate-y-2"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {jobs[currentJobIndex]}
              </span>
            </div>
          )}

          {/* Search Button - Fixed to always show when there's text */}
          {searchText.trim().length >= 2 && !isLoading ? (
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                if (selectedLocation) {
                  handleCombinedSearch();
                } else {
                  // Maybe show a tooltip that location is required
                  alert("Please select a location first");
                }
              }}
              aria-label="Search for businesses"
            >
              <Search className="w-5 h-5" />
            </button>
          ) : searchText.trim().length >= 2 && isLoading ? (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
          )}

          {/* Service Results Dropdown - White theme */}
          {showServices && searchText.trim().length >= 2 && (
            <div
              className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2">
                {serviceResults.length > 0 ? (
                  serviceResults.map((service, index) => (
                    <div
                      key={service.id || index}
                      className="px-2 py-1 hover:bg-green-50 rounded cursor-pointer text-gray-800"
                      onClick={() => {
                        handleServiceDropdownSelect(service.name);
                      }}
                    >
                      {service.name}
                    </div>
                  ))
                ) : isLoading ? (
                  <div className="px-2 py-1 text-gray-500">Searching...</div>
                ) : (
                  <div className="px-2 py-1 text-gray-500">No results found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Search Results Modal - White theme */}
      {showModal && searchResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white border border-gray-200 rounded-md max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-gray-800 text-lg font-semibold">Search Results</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              {searchResults.profiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.profiles.map((profile, index) => (
                    <div 
                      key={profile.slug} 
                      className="flex flex-col bg-gray-50 border border-gray-200 rounded-md p-4 hover:border-green-500 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-gray-800 font-bold text-xl">{profile.name}</h4>
                          <div className="text-gray-600 text-sm mt-1">📍 {profile.city}</div>
                        </div>
                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                          #{index + 1}
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-col space-y-1">
                        <div className="text-gray-600">👤 {profile.user.name}</div>
                        <div className="text-gray-600">📞 {profile.user.phone}</div>
                      </div>
                      
                      <a 
                        href={`https://gigwork.co.in/${profile.slug}`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="mt-4 text-center bg-green-600 hover:bg-green-500 text-white py-2 rounded-md transition-colors"
                      >
                        View Profile
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600 text-center py-8">
                  No profiles found matching your search criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSearchSection;