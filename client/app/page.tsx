"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import gigworks from '../public/gigworks.png';
import man from '../public/man.png';
import whatsapp from '../public/whatsapp.png';
import { ContactForm } from './components/ContactForm';
import { SearchSection } from './components/SearchSection';
import AnimatedGridPattern from "./components/ui/AnimatedGridPattern";

export default function GigWorkLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 200;
      setIsScrolled(window.scrollY > headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-navbg'
      }`}>
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Image src={gigworks} alt="GigWork Logo" width={40} height={40} className="w-28 md:w-40" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {isScrolled ? (
                // Scrolled menu items
                <div className="flex items-center space-x-8">
                  <Link href="#" className="text-white hover:text-green-500 transition">Home</Link>
                  <Link href="#" className="text-white hover:text-green-500 transition">Partner</Link>
                  <Link href="#" className="text-white hover:text-green-500 transition">About Us</Link>
                  <Link href="#" className="text-white hover:text-green-500 transition">Contact</Link>
                </div>
              ) : (
                // Initial menu items
                <div className="flex items-center space-x-8">
                  <SearchSection />
                  <button className="border border-green-500 hover:text-green-500 text-lg font-bold bg-tertiary text-white px-4 py-2 rounded-md transition duration-300">
                    Login / Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-green-500 transition"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              {isScrolled ? (
                // Scrolled mobile menu items
                <div className="flex flex-col space-y-4">
                  <Link href="#" className="text-white hover:text-green-500 transition">Home</Link>
                  <Link href="#" className="text-white hover:text-green-500 transition">Partner</Link>
                  <Link href="#" className="text-white hover:text-green-500 transition">About Us</Link>
                  <Link href="#" className="text-white hover:text-green-500 transition">Contact</Link>
                </div>
              ) : (
                // Initial mobile menu items
                <div className="flex flex-col space-y-4">
                  <div className="w-full">
                    <SearchSection />
                  </div>
                  <button className="w-full border border-green-500 hover:text-green-500 text-lg font-bold bg-tertiary text-white px-4 py-2 rounded-md transition duration-300">
                    Login / Sign Up
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Add blur gradient effect */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-transparent to-black/80 backdrop-blur-sm"></div>
      </nav>

      {/* Main Content with padding for fixed navbar */}
      <div className="pt-16">
        <div className="relative">
          {/* Animated Background */}
          <AnimatedGridPattern className="absolute inset-0 w-full max-h-screen z-10 opacity-80" />

          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16 flex h-screen flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Take Your Business to the Next Level with <span className="text-green-500">WhatsApp!</span>
              </h1>
              <p className="text-gray-400 mb-6">
                Connect, communicate, and grow your business with WhatsApp—on a platform your customers already love.
              </p>
              <div className="flex space-x-4">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition duration-300">
                  Explore →
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-6 py-2 rounded-md transition duration-300 flex items-center">
                  <span className="mr-2">WhatsApp</span>
                </button>
              </div>
            </div>
            <div className="">

              <Image src={man } alt="" width={400} height={400} className="w-full h-auto md:mt-48 md:bottom-5" />
            </div>
          </section>
        </div>
      </div>

      {/* Features */}
      <section className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 flex justify-between">
          <div className="text-center">
            <span className="text-green-500">•</span> Customer engagement
          </div>
          <div className="text-center">
            <span className="text-green-500">•</span> Elevate business
          </div>
          <div className="text-center">
            <span className="text-green-500">•</span> Boost business
          </div>
        </div>
      </section>

      {/* About GigWork */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Get to Know GigWork</h2>
        <p className="text-gray-400 mb-8">
          Welcome to GigWork, the ultimate online business directory accessible through WhatsApp. We are dedicated to connecting local businesses with customers in the most efficient way possible. Our platform is designed to make discovering services, products, and businesses in your area easier than ever.
        </p>
        <div className="bg-green-500 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Our Mission</h3>
          <p>
            Our mission is to empower local businesses by providing them with a robust platform to showcase their offerings to a broader audience. We strive to bridge the gap between businesses and customers by making the search for goods and services seamless, quick, and accessible right from your smartphone.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {["Ease of Access", "Local Focus", "Comprehensive Listings", "Reliable Information"].map((feature, index) => (
            <div key={index} className="bg-green-500 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{feature}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Community */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Join Our <span className="text-green-500">Community</span></h2>
          <p className="text-gray-400 mb-8">
            Are you a business owner? Join our growing directory to reach new customers and expand your presence in the local market. Whether you're a small business just starting out or a well-established enterprise, Gig Work offers the tools you need to succeed.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition duration-300">Join with us</button>
            <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-6 py-2 rounded-md transition duration-300">Partner with us</button>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
        <p className="text-gray-400 mb-8">
          We're here to help! If you have any questions, concerns, or need assistance, please feel free to reach out to us using any of the methods below.
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-green-500 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <p>Say something to start a live chat!</p>
              <p className="flex items-center">+1234 5678 910</p>
              <p className="flex items-center">hello@gigwork.co.in</p>
              <p>102 Street 2714 Don</p>
              <p>Our business hours are 9 to 5 on weekdays. We're happy to respond to all inquiries within 24 hours.</p>
              <button className="bg-white text-green-500 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-300">Find Us</button>
            </div>
          </div>
          <div className="md:w-1/2">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Image src="/logo.svg" alt="GigWork Logo" width={40} height={40} className="mr-2" />
              <span className="text-2xl font-bold text-green-500">Gigwork</span>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                Instagram
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                Twitter
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                Facebook
              </Link>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <div className="space-x-4">
              <Link href="#">Home</Link>
              <Link href="#">About us</Link>
              <Link href="#">Join with us</Link>
              <Link href="#">Contact</Link>
            </div>
            <div className="space-x-4">
              <Link href="#">Terms & Conditions</Link>
              <Link href="#">Privacy and Policy</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-400">
            © 2023 Gigwork. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}