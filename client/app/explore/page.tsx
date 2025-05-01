"use client"

import React, { useState, useEffect } from "react"
import Navbar from "../components/navSection"
import { FooterSection } from "../components/FooterSection"
import Link from "next/link"
import { fetchBusinessData } from "../api"
import { CategorySkeleton } from "../components/categorySkelton"
import { Skeleton } from "../components/ui/skelton"
import {
  Home,
  Book,
  PenToolIcon as Tool,
  Briefcase,
  Calendar,
  Heart,
  Hammer,
  Users,
  Truck
} from "lucide-react";

// Define the type for the category
interface Category {
  id: string
  title: string
  src: string
}

function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleCategories, setVisibleCategories] = useState(15)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBusinessData({ hasBusiness: true })
        // Ensure categories are in the correct format
        const validCategories =
          // response.data.businessCount > 0 &&
          response.data.categories?.map((cat: any) => 
            cat.businessCount !== 0 ? {
              id: cat.id || "",
              title: cat.name || cat.title || "Untitled",
              src: cat.src || "/icons/default.svg",
            } : null
          ).filter((cat: any) => cat !== null) || []
        setCategories(validCategories)
      } catch (error) {
        console.error("Error:", error)
        setCategories([]) // Set empty array on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Add these functions inside your ExplorePage component
const renderCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "home":
      return <Home className="h-6 w-6 text-green-600" />;
    case "book":
      return <Book className="h-6 w-6 text-green-600" />;
    case "tool":
      return <Tool className="h-6 w-6 text-green-600" />;
    case "hammer":
      return <Hammer className="h-6 w-6 text-green-600" />;
    case "briefcase":
      return <Briefcase className="h-6 w-6 text-green-600" />;
    case "calendar":
      return <Calendar className="h-6 w-6 text-green-600" />;
    case "heart":
      return <Heart className="h-6 w-6 text-green-600" />;
    case "users":
      return <Users className="h-6 w-6 text-green-600" />;
    case "truck":
      return <Truck className="h-6 w-6 text-green-600" />;
    default:
      return <Home className="h-6 w-6 text-green-600" />;
  }
};

const getCategoryIcon = (categoryTitle: string) => {
  // Check for exact category matches first
  const exactMatchMap: Record<string, string> = {
    'Sales & Retail': 'briefcase',
    'Services': 'users',
    'Manufacturing & Production': 'hammer',
    'Education & Training': 'book',
    'Hospitality & Food Services': 'users',
    'Agriculture & Farming': 'home',
    'Health & Wellness': 'heart',
    'Automotive': 'truck',
    'Real Estate & Property': 'home',
    'Media & Entertainment': 'calendar',
    'Technology & Innovation': 'tool',
    'Financial & Legal': 'briefcase',
    'Non-Profit & NGOs': 'users',
    'Miscellaneous': 'home'
  };
  
  // Check for exact match
  if (exactMatchMap[categoryTitle]) {
    return exactMatchMap[categoryTitle];
  }
  
  // If no exact match, fallback to keyword-based matching
  const title = categoryTitle.toLowerCase();
  
  // Map common category names to icons
  if (title.includes('home') || title.includes('house') || title.includes('property') || title.includes('real estate')) return 'home';
  if (title.includes('edu') || title.includes('school') || title.includes('tutor') || title.includes('training')) return 'book';
  if (title.includes('repair') || title.includes('fix') || title.includes('manufactur') || title.includes('product')) return 'hammer';
  if (title.includes('professional') || title.includes('consult') || title.includes('sales') || title.includes('retail') || title.includes('financial')) return 'briefcase';
  if (title.includes('event') || title.includes('party') || title.includes('wedding') || title.includes('media') || title.includes('entertainment')) return 'calendar';
  if (title.includes('health') || title.includes('medical') || title.includes('care') || title.includes('wellness')) return 'heart';
  if (title.includes('beauty') || title.includes('salon') || title.includes('service') || title.includes('hosp') || title.includes('food') || title.includes('ngo')) return 'users';
  if (title.includes('delivery') || title.includes('transport') || title.includes('courier') || title.includes('auto')) return 'truck';
  
  // Default icon for categories that don't match any pattern
  return 'home';
};

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category?.title?.toLowerCase().includes(searchTerm.toLowerCase() || "")
  )

  // Function to load more categories
  const handleLoadMore = () => {
    setVisibleCategories((prev) => prev + 15)
  }

  return (
    <div>
      <Navbar />
      <div className="py-16 flex justify-center items-center flex-col px-4">
        <h1 className="text-center text-2xl font-bold mb-6">
          {isLoading ? <Skeleton className="h-8 w-32" /> : "Explore more"}
        </h1>

        {/* Search Input */}
        <div className="w-full max-w-md mb-8 px-4">
          <div className="relative">
            {isLoading ? (
              <Skeleton className="w-full h-10 rounded-full" />
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setVisibleCategories(15) // Reset visible categories when searching
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
              </>
            )}
          </div>
        </div>

        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1 w-full md:px-24">
  {filteredCategories.slice(0, visibleCategories).map((category, index) => (
    <Link
      href={`/category/${category.id}`}
      key={index}
      className="flex flex-col items-center justify-center p-8 py-16 md:py-16 border border-green-500 rounded-sm hover:shadow-md hover:bg-green-500/10 transition-all duration-300 ease-in-out"
    >
      <div className="bg-green-50 p-4 rounded-full mb-4">
        {renderCategoryIcon(getCategoryIcon(category.title))}
      </div>
      <span className="text-center text-sm font-medium">
        {category.title}
      </span>
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
          </>
        )}
      </div>
      <FooterSection />
    </div>
  )
}

export default ExplorePage

