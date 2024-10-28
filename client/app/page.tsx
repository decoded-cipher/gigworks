"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import gigworks from '../public/gigworks.svg';
import man from '../public/man.svg';
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-30 py-4 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-navbg'
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

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

      {/* Main Content with padding for fixed navbar */}
      <div className="pt-16">
        <div className="relative">
          {/* Animated Background */}
          <AnimatedGridPattern className="absolute inset-0 w-full max-h-screen z-10 opacity-80" />

          {/* Hero Section */}
          <section className="container mx-auto  py-16 flex h-screen flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Take Your Business <br></br>
                <div className='mt-2'>
                  <div className="text-container">
                    <span className="text-white md:text-6xl">Online</span>
                    <svg className="curved-line z-20 " viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,5 Q50,0 100,5" fill="none" stroke="#009A36" stroke-width="3" />
                    </svg>
                  </div>

                  <span className="text-green-500 md:text-7xl ">WhatsApp!</span>
                </div>
              </h1>
              <p className="text-gray-400 mb-6">
              Connect, communicate, and grow your business with WhatsApp—on a platform your customers already love.
              </p>
              <div className="flex space-x-4">
                
                <button className="bg-tertiary  hover:bg-green-600 text-white px-6 py-2 rounded-md hover:bg-white hover:text-gray-900 transition duration-30">
                  <span className="mr-2 md:text-2xl font-bold">Explore →</span>
                </button>
                <button className="border border-grn text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-md transition duration-300 flex items-center">
                  <span className="mr-2 md:text-2xl font-bold">WhatsApp</span>
                  <div className=' ' >
                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="2em" viewBox="0 0 256 258"><defs><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#1faf38" /><stop offset="100%" stop-color="#60d669" /></linearGradient><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#f9f9f9" /><stop offset="100%" stop-color="#fff" /></linearGradient></defs><path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004" /><path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z" /><path fill="#fff" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64" /></svg>
              </div>
                </button>
              </div>
            </div>
            <div className="-z-10">
              <div className="absolute top-1/2 md:right-20 -z-10 right-2/3 transform translate-x-1/2 -translate-y-1/2">
                <div className="bg-man rounded-full bg-gradient-to-b from-grn to-black mt-56  -z-10 " > </div>
              </div>
              <div className='absolute md:-right-10 md:mr-10 md:mt-36 z-10 ' >
                <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" viewBox="0 0 256 258"><defs><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#1faf38" /><stop offset="100%" stop-color="#60d669" /></linearGradient><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#f9f9f9" /><stop offset="100%" stop-color="#fff" /></linearGradient></defs><path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004" /><path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z" /><path fill="#fff" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64" /></svg>
              </div>
              <Image src={man} alt="" className="man   md:mt-24 z-10 " />
            </div>
          </section>
        </div>
      </div>
      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* Features */}
      <section className="bg-gray-800 z-20 py-8">
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