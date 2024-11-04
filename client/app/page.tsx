"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gigworks from "../public/gigworks.svg";
import man from "../public/man.svg";
import whatsapp from "../public/whatsapp.png";
import { ContactForm } from "./components/ContactForm";
import { SearchSection } from "./components/SearchSection";
import AnimatedGridPattern from "./components/ui/AnimatedGridPattern";
import FeatureCardsWithImage from "./components/features";
import MissionSwiper from "./components/swiperMission"
import  {NumberTicker}  from "./components/ui/AnimatedNumberTicket"

export default function GigWorkLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 200;
      setIsScrolled(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      title: "Ease of Access",
      description: "Access all the information you need quickly and efficiently through our user-friendly interface, designed with simplicity in mind."
    },
    {
      title: "Local Focus",
      description: "Get detailed insights and information specific to your local area, helping you make better-informed decisions for your community."
    },
    {
      title: "Comprehensive Listings",
      description: "Browse through our extensive database of listings, covering everything you need with detailed and up-to-date information."
    },
    {
      title: "Reliable Information",
      description: "Trust in our verified and regularly updated information, ensuring you always have access to accurate and dependable data."
    }
  ];

  return (
    <div className=" min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-30 py-4 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-navbg"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src={gigworks}
                alt="GigWork Logo"
                width={40}
                height={40}
                className="w-28 md:w-40"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {isScrolled ? (
                // Scrolled menu items
                <div className="flex items-center space-x-8">
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    Partner
                  </Link>
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    About Us
                  </Link>
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    Contact
                  </Link>
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
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    Partner
                  </Link>
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    About Us
                  </Link>
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    Contact
                  </Link>
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
          <section className="container mx-auto py-16 flex h-screen flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Take Your Business to the Next Level with <br></br>
                <div className="mt-2">
                  

                  <span className="text-green-500 md:text-7xl ">WhatsApp!</span>
                </div>
              </h1>
              <p className="text-gray-400 mb-6">
                Connect, communicate, and grow your business with WhatsApp—on a
                platform your customers already love.
              </p>
              <div className="flex space-x-4">
                <button className="bg-tertiary  hover:bg-green-600 text-white px-6 py-2 rounded-md hover:bg-white hover:text-gray-900 transition duration-30">
                  <span className="mr-2 md:text-2xl font-bold">Explore →</span>
                </button>
                <button className="border border-grn text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-md transition duration-300 flex items-center">
                  <span className="mr-2 md:text-2xl font-bold">WhatsApp</span>
                  <div className=" ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="3em"
                      height="2em"
                      viewBox="0 0 256 258"
                    >
                      <defs>
                        <linearGradient
                          id="logosWhatsappIcon0"
                          x1="50%"
                          x2="50%"
                          y1="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stop-color="#1faf38" />
                          <stop offset="100%" stop-color="#60d669" />
                        </linearGradient>
                        <linearGradient
                          id="logosWhatsappIcon1"
                          x1="50%"
                          x2="50%"
                          y1="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stop-color="#f9f9f9" />
                          <stop offset="100%" stop-color="#fff" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#logosWhatsappIcon0)"
                        d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
                      />
                      <path
                        fill="url(#logosWhatsappIcon1)"
                        d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"
                      />
                      <path
                        fill="#fff"
                        d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <div className="-z-10">
              <div className="absolute top-1/2 md:right-20 -z-10 right-2/3 transform translate-x-1/2 -translate-y-1/2">
                <div className="bg-man rounded-full bg-gradient-to-b from-grn to-black mt-56  -z-10 ">
                  {" "}
                </div>
              </div>
              <div className="absolute md:-right-10 md:mr-10 md:mt-36 z-10 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10em"
                  height="10em"
                  viewBox="0 0 256 258"
                >
                  <defs>
                    <linearGradient
                      id="logosWhatsappIcon0"
                      x1="50%"
                      x2="50%"
                      y1="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stop-color="#1faf38" />
                      <stop offset="100%" stop-color="#60d669" />
                    </linearGradient>
                    <linearGradient
                      id="logosWhatsappIcon1"
                      x1="50%"
                      x2="50%"
                      y1="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stop-color="#f9f9f9" />
                      <stop offset="100%" stop-color="#fff" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#logosWhatsappIcon0)"
                    d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
                  />
                  <path
                    fill="url(#logosWhatsappIcon1)"
                    d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"
                  />
                  <path
                    fill="#fff"
                    d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
                  />
                </svg>
              </div>
              <Image src={man} alt="" className="man  md:mt-24 z-10 " />
            </div>
          </section>
        </div>
      </div>
      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* Features */}
      <section className="bg-green-600 bg-opacity-80  relative z-50 ">
        <section className="bg-green-600 py-8 relative z-50 -skew-y-[2deg] ">
          <div className="container mx-auto px-4 flex justify-between">
            <div className="text-center text-2xl font-bold text-white flex items-center">
              <span className="mr-2">•</span> Customer engagement
            </div>
            <div className="text-center text-2xl font-bold text-white flex items-center">
              <span className="mr-2">•</span> Elevate business
            </div>
            <div className="text-center text-2xl font-bold text-white flex items-center">
              <span className="mr-2">•</span> Boost business
            </div>
          </div>
        </section>
      </section>
      <section className="bg-white relative z-10">
        {/* About GigWork */}
        <section className=" container mx-auto px-4 py-16 flex flex-col items-center ">
          <h2 className="text-4xl text-black font-bold mb-2 ">
            Get to Know<span className="text-green-600"> GigWork</span>
          </h2>
          <hr className="w-1/4 mb-4 h-1 border-0 opacity-100 bg-gradient-to-l from-transparent to-green-500 rounded-lg" />
          <p className="text-black mb-8 lg:px-52 text-center text-xl ">
            Welcome to <span className="text-green-600 font-bold">GigWork</span>
            , the ultimate online business directory accessible through
            WhatsApp. We are dedicated to connecting local businesses with
            customers in the most efficient way possible. Our platform is
            designed to make discovering services, products, and businesses in
            your area easier than ever.
          </p>
          <h2 className="text-4xl text-black font-bold mb-2 ">
            Clients{" "}
            <span className="text-white bg-green-600 pr-3">Onboarded</span>
          </h2>
          <NumberTicker value={1005} />
          


          <MissionSwiper/>
          
        </section>

        {/* Why Choose Us */}
        <section className="container  mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-black">
            Why <span className="text-green-600">Choose Us?</span>
          </h2>
          <div className="flex justify-center">
            <FeatureCardsWithImage />
          </div>    
        </section>
      </section>



      {/* Join Community */}
      <section className="bg-black py-16 z-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Join Our <span className="text-green-600">Community</span>
          </h2>
          <p className="text-white text-xl mb-8 lg:px-52">
            Are you a business owner? Join our growing directory to reach new
            customers and expand your presence in the local market. Whether
            you&apos;re a small business just starting out or a well-established
            enterprise, Gig Work offers the tools you need to succeed.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-600 hover:bg-green-600 text-white px-6 py-2 rounded-md transition duration-300">
              Join with us
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-6 py-2 rounded-md transition duration-300">
              Partner with us
            </button>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="container bg-cbg mx-auto px-[42px] py-16 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 ">
          Contact <span className="text-green-600">Us</span>
        </h2>
        <hr className="w-1/4 mb-4 h-1 border-0 opacity-100 bg-gradient-to-l from-transparent to-green-600 rounded-lg" />
        <p className="text-gray-100 mb-8 text-center">
          We&apos;re here to help! If you have any questions, concerns, or need
          assistance, please feel free to reach <br/> out to us using any of the
          methods below.
        </p>
        <div className="bg-white p-5 flex flex-col md:flex-row gap-8 rounded-lg">
          <div className="md:w-1/2 bg-green-600 p-6 rounded-lg">
            <h3 className="text-4xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-7">
              <p className="text-1Xl">Say something to start a live chat!</p>
              <p className="flex text-xl items-center">
                <svg
                  className="w-6 h-6 text-white mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                </svg>
                +1234 5678 910
              </p>
              <p className="flex items-center text-xl">
                <svg
                  className="w-6 h-6 text-white mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                  <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                </svg>
                hello@gigwork.co.in
              </p>
              <p className="flex items-center text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2  "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 1.5C9.81276 1.50258 7.71584 2.3726 6.16923 3.91922C4.62261 5.46584 3.75259 7.56276 3.75001 9.75C3.74739 11.5374 4.33124 13.2763 5.41201 14.7C5.41201 14.7 5.63701 14.9963 5.67376 15.039L12 22.5L18.3293 15.0353C18.3623 14.9955 18.588 14.7 18.588 14.7L18.5888 14.6978C19.669 13.2747 20.2526 11.5366 20.25 9.75C20.2474 7.56276 19.3774 5.46584 17.8308 3.91922C16.2842 2.3726 14.1873 1.50258 12 1.5ZM12 12.75C11.4067 12.75 10.8266 12.5741 10.3333 12.2444C9.83995 11.9148 9.45543 11.4462 9.22837 10.8981C9.00131 10.3499 8.9419 9.74667 9.05765 9.16473C9.17341 8.58279 9.45913 8.04824 9.87869 7.62868C10.2982 7.20912 10.8328 6.9234 11.4147 6.80764C11.9967 6.69189 12.5999 6.7513 13.1481 6.97836C13.6962 7.20542 14.1648 7.58994 14.4944 8.08329C14.8241 8.57664 15 9.15666 15 9.75C14.999 10.5453 14.6826 11.3078 14.1202 11.8702C13.5578 12.4326 12.7954 12.749 12 12.75Z"
                    fill="white"
                  />
                </svg>
                102 Street 2714 Don
              </p>
              <h1 className="text-center font-bold text-xl">Business Hours</h1>
              <p className="text-center font-light text-xl">
                Our business hours are 9 to 5 on weekdays. We&apos;re happy to
                respond to all inquiries within 24 hours.
              </p>
              <h1 className="text-center font-bold text-xl">Visit Us</h1>
              <p className="text-center font-light text-xl">
                If you prefer face-to-face communication, feel free to visit us
                at our office during business hours. We’d love to meet you and
                discuss how we can help your business grow.
              </p>
              <div className="flex justify-center">
                <button className="text-white text-2xl font-medium underline text-center px-4 py-2 flex justify-center rounded-md transition duration-300">
                  Find Us{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m16.289 7.208l-9.766 9.746q-.14.14-.344.13q-.204-.009-.345-.15t-.14-.334t.14-.334L15.582 6.5H6.789q-.213 0-.357-.144t-.143-.357t.143-.356t.357-.143h9.692q.343 0 .575.232t.233.576V16q0 .213-.145.356t-.356.144t-.356-.144t-.144-.356z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-4 bg-black sm:p-6 dark:bg-gray-800">
        <div className="mx-auto max-w-screen-xl">
          <div className="md:flex md:justify-between">
            <div className="mb-6 mr-6 md:mb-0">
              <a href="https://gigwork.co.in" className="flex items-center">
              <Image
                src={gigworks}
                alt="GigWork Logo"
                width={40}
                height={40}
                className="w-28 md:w-40"
              />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-bold uppercase text-white">
                  Quick Links
                </h2>
                <ul className="text-gray-400">
                  <li className="mb-4">
                    <a href="" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                     About us
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                     Join with us
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                     Contact us
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                     Privacy and Policy
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                     Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-bold uppercase text-white">
                  Follow us
                </h2>
                <ul className="text-gray-400">
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      Facebook
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      Instagram
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      Twitter (X)
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      Linkedin
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      YouTube
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      Thread
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                  Contact US
                </h2>
                <ul className="text-gray-400">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      +91 96565 19636
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      hello@gigwork.co.in
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Kurusumood , Chethipuzha P.O, Chanaganassery
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2022{" "}
              <a href="https://flowbite.com" className="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
