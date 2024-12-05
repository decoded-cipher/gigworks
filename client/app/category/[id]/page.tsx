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

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params;
  const [visibleEmploys, setVisibleEmploys] = useState(16);
  const employs: employ[] = [
    { title: "Plumber", src: "/img/defaultbusiness.png" ,location:"Changanassery", type:"online" },
    { title: "Electrician", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Carpenter", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Painter", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Mechanic", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Gardener", src: "/img/1.jpg" ,location:"Changanassery", type:"both" },
    { title: "Plumber", src: "/img/defaultbusiness.png" ,location:"Changanassery", type:"online" },
    { title: "Electrician", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Carpenter", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Painter", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Mechanic", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Gardener", src: "/img/1.jpg" ,location:"Changanassery", type:"both" },
    { title: "Plumber", src: "/img/defaultbusiness.png" ,location:"Changanassery", type:"online" },
    { title: "Electrician", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Carpenter", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Painter", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Mechanic", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Gardener", src: "/img/1.jpg" ,location:"Changanassery", type:"both" },
    { title: "Plumber", src: "/img/defaultbusiness.png" ,location:"Changanassery", type:"online" },
    { title: "Electrician", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Carpenter", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Painter", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Mechanic", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Gardener", src: "/img/1.jpg" ,location:"Changanassery", type:"both" },
    { title: "Plumber", src: "/img/defaultbusiness.png" ,location:"Changanassery", type:"online" },
    { title: "Electrician", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Carpenter", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Painter", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Mechanic", src: "/img/1.jpg" ,location:"Changanassery", type:"online" },
    { title: "Gardener", src: "/img/1.jpg" ,location:"Changanassery", type:"both" },
    { title: "Gardener", src: "/img/1.jpg" ,location:"Changanassery", type:"both" },
    { title: "Gardener", src: "/img/1.jpg" ,location:"Changanassery", type:"both" },
];

  
const filteredEmploys = employs;

  // Function to load more employs
  const handleLoadMore = () => {
    setVisibleEmploys(prev => prev + 16);
  };

  return (
    <div>
      <Navbar/>
      <div className="py-16 flex justify-center items-center flex-col px-4">
        <h1 className="text-center text-2xl font-bold mb-6 uppercase">{id}</h1>
        
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
      </div>
      <FooterSection/>
    </div>
  );
}