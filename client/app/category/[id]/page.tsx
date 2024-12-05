"use client";

import { FooterSection } from '@/app/components/FooterSection';
import Navbar from '@/app/components/navSection';
import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';

// Define the params type for TypeScript
interface CategoryPageProps {
  params: {
    id: string;
  };
}

interface employ {
  title: string;
  src?: string;
  location?: string;
  type?: string;
}

export const runtime = 'edge';

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params;
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleEmploys, setVisibleEmploys] = useState(16);
  const employs: employ[] = [
    { title: "John's Plumbing Services", src: "/img/defaultbusiness.png", location: "Kottayam", type: "online" },
    { title: "ElectroFix Hub", src: "/img/1.jpg", location: "Alappuzha", type: "offline" },
    { title: "WoodCraft Designs", src: "/img/1.jpg", location: "Ernakulam", type: "both" },
    { title: "ColorSplash Painters", src: "/img/1.jpg", location: "Thrissur", type: "online" },
    { title: "AutoCare Mechanics", src: "/img/1.jpg", location: "Kollam", type: "offline" },
    { title: "GreenLeaf Gardening", src: "/img/1.jpg", location: "Kannur", type: "both" },
    { title: "Aqua Plumbing Co.", src: "/img/defaultbusiness.png", location: "Thiruvananthapuram", type: "offline" },
    { title: "BrightSpark Electricians", src: "/img/1.jpg", location: "Pathanamthitta", type: "online" },
    { title: "Timberline Creations", src: "/img/1.jpg", location: "Kochi", type: "offline" },
    { title: "Elite Decor Painters", src: "/img/1.jpg", location: "Malappuram", type: "both" },
    { title: "MotoFix Garage", src: "/img/1.jpg", location: "Palakkad", type: "online" },
    { title: "Garden Bliss Services", src: "/img/1.jpg", location: "Kasargod", type: "both" },
    { title: "FlowMaster Plumbing", src: "/img/defaultbusiness.png", location: "Idukki", type: "online" },
    { title: "WireWizard Electricians", src: "/img/1.jpg", location: "Chalakudy", type: "offline" },
    { title: "HandyWood Workers", src: "/img/1.jpg", location: "Pala", type: "both" },
    { title: "Perfect Strokes Painters", src: "/img/1.jpg", location: "Aluva", type: "online" },
    { title: "GearUp Mechanics", src: "/img/1.jpg", location: "Attingal", type: "offline" },
    { title: "LushScape Gardening", src: "/img/1.jpg", location: "Nedumangad", type: "both" },
    { title: "Precision Plumbing", src: "/img/defaultbusiness.png", location: "Mavelikkara", type: "offline" },
    { title: "PowerLink Electricians", src: "/img/1.jpg", location: "Vaikom", type: "online" },
    { title: "CarveIt Carpentry", src: "/img/1.jpg", location: "Cherthala", type: "offline" },
    { title: "PaintPros Solutions", src: "/img/1.jpg", location: "Kanjirappally", type: "both" },
    { title: "DriveSafe Mechanics", src: "/img/1.jpg", location: "Thodupuzha", type: "online" },
    { title: "NatureScape Gardeners", src: "/img/1.jpg", location: "Mananthavady", type: "both" },
    { title: "PlumbLine Services", src: "/img/defaultbusiness.png", location: "Adoor", type: "offline" },
    { title: "Sparky Solutions", src: "/img/1.jpg", location: "Perumbavoor", type: "online" },
    { title: "Crafted Comfort", src: "/img/1.jpg", location: "Kodungallur", type: "offline" },
    { title: "FreshCoat Painters", src: "/img/1.jpg", location: "Puthuppally", type: "both" },
    { title: "FixIt Mechanics", src: "/img/1.jpg", location: "Kozhikode", type: "online" },
    { title: "Garden Elite Services", src: "/img/1.jpg", location: "Wayanad", type: "both" },
    { title: "PureFlow Plumbing", src: "/img/defaultbusiness.png", location: "Kumbakonam", type: "online" },
    { title: "VoltagePro Electricians", src: "/img/1.jpg", location: "Chengannur", type: "offline" },
    { title: "WoodArt Masters",  location: "Poonjar", type: "both" }
];


  

  // Filter categories based on search term
  const filteredEmploys = employs.filter(employs => 
    employs.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Function to load more employs
  const handleLoadMore = () => {
    setVisibleEmploys(prev => prev + 16);
  };

  return (
    <div>
      <Navbar/>
      <div className="py-16 flex justify-center items-center flex-col px-4">
        <h1 className="text-center text-2xl font-bold mb-6 uppercase">{id}</h1>
        
         {/* Search Input */}
         <div className="w-full max-w-md mb-8 px-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleEmploys(15); // Reset visible categories when searching
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full md:px-24">
          {filteredEmploys.slice(0, visibleEmploys).map((s, index) => (
            <Link 
              href={`/profile/${s.title.toLowerCase().replace(/\s+/g, '-')}`} 
              key={index}
              className="flex flex-col items-center justify-center py-16 border border-green-500 rounded-xl hover:shadow-md hover:bg-green-500/10 transition-all duration-300 ease-in-out"
            >
              <div className="w-16 h-16 mb-2">
                <Image 
                  src={s.src || "/img/defaultbusiness.png"} 
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

        {/* See More Button */}
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

         {/* No Results Message */}
         {filteredEmploys.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No bussiness or freelancers found matching &quot;{searchTerm}&quot;
          </div>
        )}

      </div>
      <FooterSection/>
    </div>
  );
}