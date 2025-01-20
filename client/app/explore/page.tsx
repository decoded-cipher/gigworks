"use client"

import React, { useState, useEffect } from "react"
import Navbar from "../components/navSection"
import { FooterSection } from "../components/FooterSection"
import Link from "next/link"
import { fetchBusinessData } from "../api"
import { CategorySkeleton } from "../components/categorySkelton"
import { Skeleton } from "../components/ui/skelton"

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

