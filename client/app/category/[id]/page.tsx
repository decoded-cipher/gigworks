"use client"
import { FooterSection } from '@/app/components/FooterSection'
import Navbar from '@/app/components/navSection'
import React, { useState, useEffect } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { fetchBusinessesByCategory, fetchBusinessData,ASSET_BASE_URL } from '../../api/index'
import { Skeleton } from "../../components/ui/skelton"
import { BusinessCardSkeleton } from "../../components/businessCardSkeleton"

interface CategoryPageProps {
  params: {
    id: string
  }
}

interface employ {
  title: string
  src?: string
  location?: string
  type?: string
  slug: string
}
export const runtime = "edge";

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleEmploys, setVisibleEmploys] = useState(16)
  const [employs, setEmploys] = useState<employ[]>([])
  const [categoryName, setCategoryName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetchBusinessData()
        const category = categoriesResponse.data.categories.find(
          (cat: any) => cat.id === id
        )
        
        if (category?.id) {
          setCategoryName(category.name)
          const response = await fetchBusinessesByCategory(category.id)      
          const validBusinesses = response.data?.profiles?.map((business: any) => ({
            title: business.title || business.name || 'Untitled',
            slug: business.slug || business.title?.toLowerCase().replace(/\s+/g, '-') || 'untitled',
            src: `${ASSET_BASE_URL}/${business.avatar}` || "/assets/media/defaultbusiness.png",
            location: business.location,
            type: business.type
          })) || []
          setEmploys(validBusinesses)
        }
      } catch (error) {
        console.error('Error:', error)
        setEmploys([])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [id])

  const filteredEmploys = employs.filter(employs => 
    employs.title.toLowerCase().includes(searchTerm.toLowerCase())
  )  

  const handleLoadMore = () => {
    setVisibleEmploys(prev => prev + 16)
  }

 
  

  return (
    <div>
      <Navbar />
      <div className="py-16 flex justify-center items-center flex-col px-4">
        {isLoading ? (
          <Skeleton className="h-8 w-48 mb-6" />
        ) : (
          <h1 className="text-center text-2xl font-bold mb-6 uppercase">{categoryName}</h1>
        )}
        
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
                    setVisibleEmploys(15)
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
          <BusinessCardSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full md:px-24">
              {filteredEmploys.slice(0, visibleEmploys).map((s, index) => (
                <Link 
                  href={`/${s.slug}`}
                  key={index}
                  className="flex flex-col items-center justify-center py-16 border border-green-500 rounded-xl hover:shadow-md hover:bg-green-500/10 transition-all duration-300 ease-in-out"
                >
                  <div className="w-16 h-16 mb-2">
                    <Image 
                     src={s.src && s.src.includes('/avatar') ? s.src :"../assets/media/defaultbusiness.png"} 
                      alt={s.title} 
                      width={64} 
                      height={64} 
                      className="w-full h-full object-contain rounded-full object-cover"
                    />
                  </div>
                  <span className="text-center font-bold">{s.title}</span>
                  <div className='text-gray-600'>
                    <span>Mode: {s.type === "both" ? "offline/online" : s.type}</span>
                  </div>
                  <span className="text-center">Location: {s.location || 'Not Specified'}</span>
                </Link>
              ))}
            </div>

            {filteredEmploys.length > visibleEmploys && (
              <div className="mt-8">
                <button 
                  onClick={handleLoadMore}
                  className="px-6 py-2 border border-green-500 text-black rounded-full hover:bg-green-500/10 transition-colors duration-300"
                >
                  See More
                </button>
              </div>
            )}

            {filteredEmploys.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                No bussiness or freelancers found matching &quot;{searchTerm}&quot;
              </div>
            )}
          </>
        )}
      </div>
      <FooterSection />
    </div>
  )
}

