"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navSection";
import { FooterSection } from "../components/FooterSection";
import Link from "next/link";
import { fetchBusinessData } from "../api";

// Define the type for the category
interface Category {
  id: string;
  title: string;
  src: string;
}

function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCategories, setVisibleCategories] = useState(15);
  //to get category form api
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBusinessData();
        // Ensure categories are in the correct format
        const validCategories = response.data.categories?.map((cat: any) => ({
          id: cat.id || '',
          title: cat.name || cat.title || 'Untitled',
          src: cat.src || '/icons/default.svg'
        })) || [];
        setCategories(validCategories);
      } catch (error) {
        console.error('Error:', error);
        setCategories([]); // Set empty array on error
      }
    };
    
    fetchData();
  }, []);

  // const categories: Category[] = [
  //   { title: "Plumber", src: "/icons/plumber.svg" },
  //   { title: "Electrician", src: "/icons/electrician.svg" },
  //   { title: "Carpenter", src: "/icons/carpenter.svg" },
  //   { title: "Painter", src: "/icons/painter.svg" },
  //   { title: "Auto Mechanic", src: "/icons/mechanic.svg" },
  //   { title: "Landscape Gardener", src: "/icons/gardener.svg" },
  //   { title: "House Cleaner", src: "/icons/cleaner.svg" },
  //   { title: "Chef", src: "/icons/cook.svg" },
  //   { title: "Chauffeur", src: "/icons/driver.svg" },
  //   { title: "Private Tutor", src: "/icons/tutor.svg" },
  //   { title: "Childcare Provider", src: "/icons/babysitter.svg" },
  //   { title: "Wellness Therapist", src: "/icons/massage.svg" },
  //   { title: "Personal Trainer", src: "/icons/fitness.svg" },
  //   { title: "Event Photographer", src: "/icons/photographer.svg" },
  //   { title: "Repair Specialist", src: "/icons/handyman.svg" },
  //   { title: "Frontend Developer", src: "/icons/developer.svg" },
  //   { title: "Pipe Fitter", src: "/icons/plumber.svg" },
  //   { title: "Residential Electrician", src: "/icons/electrician.svg" },
  //   { title: "Furniture Carpenter", src: "/icons/carpenter.svg" },
  //   { title: "Interior Painter", src: "/icons/painter.svg" },
  //   { title: "Bicycle Mechanic", src: "/icons/mechanic.svg" },
  //   { title: "Urban Gardener", src: "/icons/gardener.svg" },
  //   { title: "Office Cleaner", src: "/icons/cleaner.svg" },
  //   { title: "Pastry Chef", src: "/icons/cook.svg" },
  //   { title: "Delivery Driver", src: "/icons/driver.svg" },
  //   { title: "Language Tutor", src: "/icons/tutor.svg" },
  //   { title: "Nanny", src: "/icons/babysitter.svg" },
  //   { title: "Massage Expert", src: "/icons/massage.svg" },
  //   { title: "Gym Instructor", src: "/icons/fitness.svg" },
  //   { title: "Nature Photographer", src: "/icons/photographer.svg" },
  //   { title: "DIY Specialist", src: "/icons/handyman.svg" },
  //   { title: "Backend Developer", src: "/icons/developer.svg" },
  //   { title: "Boiler Technician", src: "/icons/plumber.svg" },
  //   { title: "Commercial Electrician", src: "/icons/electrician.svg" },
  //   { title: "Construction Carpenter", src: "/icons/carpenter.svg" },
  //   { title: "Exterior Painter", src: "/icons/painter.svg" },
  //   { title: "Engine Mechanic", src: "/icons/mechanic.svg" },
  //   { title: "Botanical Gardener", src: "/icons/gardener.svg" },
  //   { title: "Window Cleaner", src: "/icons/cleaner.svg" },
  //   { title: "Sushi Chef", src: "/icons/cook.svg" },
  //   { title: "Truck Driver", src: "/icons/driver.svg" },
  //   { title: "Math Tutor", src: "/icons/tutor.svg" },
  //   { title: "Daycare Worker", src: "/icons/babysitter.svg" },
  //   { title: "Spa Therapist", src: "/icons/massage.svg" },
  //   { title: "Athletic Coach", src: "/icons/fitness.svg" },
  //   { title: "Wedding Photographer", src: "/icons/photographer.svg" },
  //   { title: "Home Improvement Pro", src: "/icons/handyman.svg" },
  //   { title: "Full Stack Developer", src: "/icons/developer.svg" }
  // ];

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category?.title?.toLowerCase().includes(searchTerm.toLowerCase() || '')
  );

  // Function to load more categories
  const handleLoadMore = () => {
    setVisibleCategories(prev => prev + 15);
  };

  return (
    <div>
      <Navbar />
      <div className="py-16 flex justify-center items-center flex-col px-4">
        <h1 className="text-center text-2xl font-bold mb-6">Explore more</h1>
        
        {/* Search Input */}
        <div className="w-full max-w-md mb-8 px-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCategories(15); // Reset visible categories when searching
              }}
              className="w-full px-4 py-2 border border-green-500 rounded-full focus:outline-none focus:ring-transparent"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1 w-full md:px-24">
          {filteredCategories.slice(0, visibleCategories).map((category, index) => (
            <Link 
              href={`/category/${category.id}`}  // Changed to use category.id directly
              key={index}
              className="flex flex-col items-center justify-center p-8 py-16 md:py-16 border border-green-500 rounded-sm hover:shadow-md hover:bg-green-500/10 transition-all duration-300 ease-in-out"
            >
              <span className="text-center text-sm font-medium">{category.title}</span>
            </Link>
          ))}
        </div>

        {/* See More Button */}
        {filteredCategories.length > visibleCategories && (
          <div className="mt-8">
            <button 
              onClick={handleLoadMore}
              className="px-6 py-2 border border-green-500 text-black rounded-full hover:bg-green-500/10 transition-colors duration-300"
            >
              See More
            </button>
          </div>
        )}

        {/* No Results Message */}
        {filteredCategories.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No categories found matching &quot;{searchTerm}&quot;
          </div>
        )}
      </div>
      <FooterSection />
    </div>
  );
}

export default ExplorePage;