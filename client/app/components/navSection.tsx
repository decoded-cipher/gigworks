"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-white py-4 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">
            <Image
              src="/assets/media/gigworksblk.svg"
              alt="Logo"
              width={150}
              height={50}
              className="max-w-[206px] max-h-[216px]"
            />
          </Link>

          <div className="hidden sm:flex space-x-6">
            <Link href="/" className="text-black hover:animate-pulse">
              Home
            </Link>
            <Link href="/" className="text-black hover:animate-pulse">
              Partner
            </Link>
            <Link href="/" className="text-black hover:animate-pulse">
              About Us
            </Link>
            <Link href="/" className="text-black hover:animate-pulse">
              Contact
            </Link>
          </div>

          <button
            className="sm:hidden text-black hover:text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 6L6 18L18 6Z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM20 16H4V18H20V16Z"
                />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="sm:hidden mt-4 space-y-2 text-center">
            <Link href="/" className="block text-black hover:animate-pulse">
              Home
            </Link>
            <Link href="/" className="block text-black hover:animate-pulse">
              Partner
            </Link>
            <Link href="/" className="block text-black hover:animate-pulse">
              About Us
            </Link>
            <Link href="/" className="block text-black hover:animate-pulse">
              Contact
            </Link>
          </div>
        )}
      </nav>
      <hr className="border-gray-200" />
    </div>
  );
};

export default Navbar;
