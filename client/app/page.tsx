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
import MissionSwiper from "./components/swiperMission";
import { NumberTicker } from "./components/ui/AnimatedNumberTicket";
import { div } from "framer-motion/client";

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
      description:
        "Access all the information you need quickly and efficiently through our user-friendly interface, designed with simplicity in mind.",
    },
    {
      title: "Local Focus",
      description:
        "Get detailed insights and information specific to your local area, helping you make better-informed decisions for your community.",
    },
    {
      title: "Comprehensive Listings",
      description:
        "Browse through our extensive database of listings, covering everything you need with detailed and up-to-date information.",
    },
    {
      title: "Reliable Information",
      description:
        "Trust in our verified and regularly updated information, ensuring you always have access to accurate and dependable data.",
    },
  ];

  return (
    <div className=" min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-30 py-2 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-navbg"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 ">
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
            <div className="hidden lg:flex items-center space-x-8">
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
                    About Us
                  </Link>
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    Blog
                  </Link>
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    Partner
                  </Link>
                  <Link
                    href="#contact"
                    className="text-white hover:text-green-500 transition"
                  >
                    Contact
                  </Link>
                </div>
              ) : (
                // Initial menu items
                <div className="flex items-center space-x-8">
                  <SearchSection />
                  <button className="border border-green-500 hover:text-green-500 text-xl font-bold bg-tertiary text-white px-4 py-2 rounded-md transition duration-300 whitespace-nowrap">
                    Login / Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              {isScrolled ? (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white hover:text-green-500 transition"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4">
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
                    About Us
                  </Link>
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    Blog
                  </Link>
                  <Link
                    href="#"
                    className="text-white hover:text-green-500 transition"
                  >
                    Partner
                  </Link>
                  <Link
                    href="#contact"
                    className="text-white hover:text-green-500 transition"
                  >
                    Contact
                  </Link>
                </div>
              ) : (
                // Initial mobile menu items
                <div className="hidden md:block flex flex-col space-y-4">
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
      </nav>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

      {/* Main Content with padding for fixed navbar */}
      <div className="pt-20">
        <div className="relative">
          {/* Animated Background */}
          <AnimatedGridPattern className="absolute inset-0 w-full max-h-screen z-10 opacity-80" />

          {/* Hero Section */}
          <section className="container mx-auto md:px-16 py-16 flex h-screen flex-col md:flex-row items-center relative z-10 px-4">
            <div className="lg:w-1/2 mb-8 lg:mb-0 xl:pl-16">      
              <div className="lg:hidden block mb-[67px]">
                <SearchSection />
              </div>
              <h1 className="text-3xl lg:text-7xl font-bold mb-4">
                Take Your Business to the Next Level with <br></br>
                <div className="mt-2">
                  <span className="text-green-500 md:text-7xl ">WhatsApp!</span>
                </div>
              </h1>
              <p className="text-gray-400 mb-6 font-light text-justify">
                Connect, communicate, and grow your business with WhatsApp—on a
                platform your customers already love.
              </p>
              <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 pt-8">
                <button className="hidden lg:block w-full lg:w-[204px] bg-tertiary hover:bg-green-500 text-white px-8 py-3 lg:py-2 rounded-md  transition duration-300">
                  <span className="text-base lg:text-2xl font-bold flex items-center justify-center">
                    Explore <span className="ml-4">→</span>
                  </span>
                </button>

                <button className="lg:hidden h-[60px] w-full md:w-auto bg-tertiary hover:bg-green-600 text-white px-6 py-3 md:py-2 rounded-md hover:bg-white hover:text-gray-900 transition duration-300">
                  <span className="text-base md:text-2xl font-bold flex items-center justify-center">
                    Login / Sign Up
                  </span>
                </button>

                <button className="w-full lg:w-[204px] h-[60px] border border-grn text-white hover:bg-tertiary  px-4 py-3 md:px-8 md:py-4 rounded-md transition duration-300">
                  <div className="flex items-center justify-center">
                    <span className="text-base md:text-2xl font-bold">
                      WhatsApp
                    </span>
                    <div className="ml-2 scale-75 md:scale-100">
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
                            <stop offset="0%" stopColor="#1faf38" />
                            <stop offset="100%" stopColor="#60d669" />
                          </linearGradient>
                          <linearGradient
                            id="logosWhatsappIcon1"
                            x1="50%"
                            x2="50%"
                            y1="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#f9f9f9" />
                            <stop offset="100%" stopColor="#fff" />
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
                  </div>
                </button>
              </div>
            </div>
            <div className="-z-10 hidden lg:block">
              <div className="hidden lg:block absolute top-1/2 md:right-20 -z-10 right-2/3 transform translate-x-1/2 -translate-y-1/3">
                <div className="bg-man rounded-full bg-gradient-to-b from-grn to-black mt-56  -z-10 ">
                  {" "}
                </div>
              </div>
              {/* happy div */}
              <div className="relative">
                <div className="hidden xl:block  absolute -top-3/4 right-[31%] translate-y-full mt-96">
                  <div className="flex flex-row justify-start h-full bg-white rounded-md shadow-lg w-[350px] h-[100px] mt-20 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="m-3"
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_218_79)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M29.9443 6.42864C28.1527 6.39629 26.3723 6.71755 24.7051 7.37405C23.0378 8.03054 21.5163 9.00938 20.2278 10.2545C18.9392 11.4997 17.9089 12.9868 17.1957 14.6306C16.4825 16.2744 16.1004 18.0427 16.0714 19.8344V38.5715C16.0714 39.7081 15.6199 40.7982 14.8162 41.602C14.0124 42.4057 12.9224 42.8572 11.7857 42.8572H6.42857C4.72361 42.8572 3.08848 42.1799 1.88288 40.9743C0.677294 39.7687 0 38.1336 0 36.4286L0 27.8572C0 26.1523 0.677294 24.5171 1.88288 23.3115C3.08848 22.1059 4.72361 21.4286 6.42857 21.4286H9.64286V19.7572C9.68196 17.1232 10.2396 14.5227 11.2838 12.1042C12.3281 9.68565 13.8385 7.49655 15.7289 5.66187C17.6193 3.8272 19.8526 2.38288 22.3013 1.41142C24.7499 0.439959 27.366 -0.0396203 30 7.2164e-05C32.634 -0.0396203 35.2501 0.439959 37.6987 1.41142C40.1474 2.38288 42.3807 3.8272 44.2711 5.66187C46.1614 7.49655 47.6719 9.68565 48.7162 12.1042C49.7604 14.5227 50.318 17.1232 50.3571 19.7572V21.4286H53.5714C55.2764 21.4286 56.9115 22.1059 58.1171 23.3115C59.3227 24.5171 60 26.1523 60 27.8572V36.4286C60 38.1336 59.3227 39.7687 58.1171 40.9743C56.9115 42.1799 55.2764 42.8572 53.5714 42.8572H50.3571V45.0001C50.3577 47.8962 49.2919 50.6911 47.3631 52.8515C45.4343 55.0119 42.7776 56.3865 39.9 56.7129C39.3412 57.7107 38.5263 58.5413 37.5394 59.1191C36.5525 59.697 35.4293 60.0011 34.2857 60.0001H27.8571C26.1522 60.0001 24.517 59.3228 23.3115 58.1172C22.1059 56.9116 21.4286 55.2765 21.4286 53.5715C21.4286 51.8665 22.1059 50.2314 23.3115 49.0258C24.517 47.8202 26.1522 47.1429 27.8571 47.1429H34.2857C36.6086 47.1429 38.6443 48.3729 39.7714 50.2201C40.9527 49.9486 42.007 49.2845 42.762 48.3364C43.5171 47.3883 43.9283 46.2121 43.9286 45.0001V19.8301C43.8992 18.0292 43.5131 16.252 42.7927 14.6013C42.0723 12.9506 41.0318 11.459 39.7314 10.2128C38.431 8.96661 36.8966 7.99055 35.2167 7.34102C33.5368 6.69149 31.7448 6.38139 29.9443 6.42864Z"
                          fill="#1E1E1E"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_218_79">
                          <rect width="60" height="60" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <h2 className="text-2xl font-bold mt-2 ml-3">
                      <span className="text-4xl  text-black">1000+</span>
                      <br />
                      <span className="font-light text-gray-500">
                        Happy Customers
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block absolute lg:right-px xl:right-5 xl:mr-10 md:mt-48 z-10 ">
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
                      <stop offset="0%" stopColor="#1faf38" />
                      <stop offset="100%" stopColor="#60d669" />
                    </linearGradient>
                    <linearGradient
                      id="logosWhatsappIcon1"
                      x1="50%"
                      x2="50%"
                      y1="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#f9f9f9" />
                      <stop offset="100%" stopColor="#fff" />
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
              <Image src={man} alt="" className="man md:mt-24 z-10" />
            </div>
          </section>
        </div>
      </div>
      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* Features */}
      <section className="hidden md:block bg-green-600 bg-opacity-80 md:relative z-20">
        <section className="bg-green-600 py-8 relative z-50 -skew-y-[2deg]">
          <div className="container mx-auto px-40 flex justify-between md:space-x-4">
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
        <section className=" container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <h2 className="text-4xl text-center text-black font-bold mb-2 ">
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
          <h2 className="text-4xl text-black font-bold mb-2 text-center ">
            Clients{" "}
            <span className="text-white bg-green-600 pr-3">Onboarded</span>
          </h2>
          <NumberTicker value={1005} />
          <div className="flex justify-center">
            <MissionSwiper />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="container bg-white mx-auto px-4 relative z-0">
          <h2 className="text-3xl font-bold mb-20 text-center text-black">
            Why <span className="text-green-600">Choose Us?</span>
          </h2>
          {/* Features Card Section */}
          <div className="flex justify-center">
            <FeatureCardsWithImage />
          </div>
        </section>
      </section>

      {/* Join Community */}
      <section className="bg-black py-16 relative z-10">
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
            <button className="border border-green-600 text-white hover:bg-green-600 px-6 py-2 rounded-md transition duration-300">
              Partner with us
            </button>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section
        id="contact"
        className="container bg-cbg mx-auto px-3 md:px-[42px] py-16 flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold mb-8 ">
          Contact <span className="text-green-600">Us</span>
        </h2>
        <hr className="w-1/4 mb-4 h-1 border-0 opacity-100 bg-gradient-to-l from-transparent to-green-600 rounded-lg" />
        <p className="text-gray-100 mb-8 text-center">
          We&apos;re here to help! If you have any questions, concerns, or need
          assistance, please feel free to reach <br /> out to us using any of
          the methods below.
        </p>
        <div className="bg-white p-3 pb-12 md:p-5 flex flex-col md:flex-row gap-8 rounded-lg">
          <div className="md:w-1/2 bg-green-600 p-6 rounded-lg relative overflow-hidden">
            <h3 className="text-4xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-7">
              <p className="text-1Xl">Say something to start a live chat!</p>
              <p className="flex text-xl items-center">
                <svg
                  className="mb-2 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="18"
                  viewBox="0 0 21 18"
                  fill="none"
                >
                  <path
                    d="M11.7501 4.99999C14.0284 4.99999 15.0001 5.89699 15.0001 7.99999H17.1668C17.1668 4.77499 15.2439 2.99999 11.7501 2.99999V4.99999ZM15.4573 10.443C15.2491 10.2683 14.9756 10.1752 14.6944 10.1832C14.4133 10.1912 14.1465 10.2998 13.9504 10.486L11.358 12.947C10.734 12.837 9.47948 12.476 8.18814 11.287C6.89681 10.094 6.50573 8.93299 6.38981 8.361L9.05373 5.96699C9.25567 5.78612 9.37346 5.53982 9.38215 5.2802C9.39085 5.02059 9.28977 4.76804 9.10031 4.57599L5.09739 0.512995C4.90786 0.320352 4.64443 0.203499 4.36306 0.187255C4.08169 0.17101 3.80454 0.256653 3.59048 0.425995L1.23964 2.28699C1.05235 2.46051 0.940556 2.69145 0.925476 2.93599C0.909226 3.18599 0.599393 9.108 5.57406 13.702C9.91389 17.707 15.3501 18 16.8472 18C17.0661 18 17.2004 17.994 17.2361 17.992C17.501 17.9783 17.7511 17.8747 17.9381 17.701L19.9531 15.53C20.1367 15.3325 20.2297 15.0768 20.2123 14.817C20.1949 14.5573 20.0685 14.3141 19.86 14.139L15.4573 10.443Z"
                    fill="white"
                  />
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
              <section className="hidden md:block">
                <h1 className="text-center font-bold text-xl">
                  Business Hours
                </h1>
                <p className="text-center font-light text-xl">
                  Our business hours are 9 to 5 on weekdays. We&apos;re happy to
                  respond to all inquiries within 24 hours.
                </p>
                <h1 className="text-center font-bold text-xl">Visit Us</h1>
                <p className="text-center font-light text-xl">
                  If you prefer face-to-face communication, feel free to visit
                  us at our office during business hours. We’d love to meet you
                  and discuss how we can help your business grow.
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
              </section>
              <div className="absolute -bottom-16 -right-16 w-44 h-44  bg-white/20 rounded-full"></div>
              <div className="absolute bottom-14 right-14 w-16 h-16 bg-white/10 rounded-full"></div>
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
            <div className="mb-6 mr-6 md:mb-0 ">
              <a
                href="https://gigwork.co.in"
                className="flex md:items-center justify-center"
              >
                <Image
                  src={gigworks}
                  alt="GigWork Logo"
                  width={40}
                  height={40}
                  className="w-28 md:w-40"
                />
              </a>
              <hr className="md:hidden block my-4" />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-bold uppercase text-white">
                  Quick Links
                </h2>
                <ul className="text-white">
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
              <div className="hidden md:block">
                <h2 className=" mb-6 text-sm font-bold uppercase text-white">
                  Follow us
                </h2>
                <ul className="text-white">
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline flex "
                    >
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z"
                          fill="white"
                        />
                      </svg>
                      Facebook
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline  flex"
                    >
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M13.028 2C14.153 2.003 14.724 2.009 15.217 2.023L15.411 2.03C15.635 2.038 15.856 2.048 16.123 2.06C17.187 2.11 17.913 2.278 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8307 4.17773 21.2241 4.78247 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.952 8.144 21.962 8.365 21.97 8.59L21.976 8.784C21.991 9.276 21.997 9.847 21.999 10.972L22 11.718V13.028C22.0024 13.7574 21.9947 14.4868 21.977 15.216L21.971 15.41C21.963 15.635 21.953 15.856 21.941 16.122C21.891 17.187 21.721 17.912 21.475 18.55C21.2241 19.2175 20.8307 19.8223 20.322 20.322C19.8222 20.8307 19.2175 21.2242 18.55 21.475C17.913 21.722 17.187 21.89 16.123 21.94L15.411 21.97L15.217 21.976C14.724 21.99 14.153 21.997 13.028 21.999L12.282 22H10.973C10.2432 22.0026 9.51348 21.9949 8.78396 21.977L8.58996 21.971C8.35257 21.962 8.11523 21.9517 7.87796 21.94C6.81396 21.89 6.08796 21.722 5.44996 21.475C4.78279 21.2241 4.1784 20.8306 3.67896 20.322C3.1699 19.8224 2.77607 19.2176 2.52496 18.55C2.27796 17.913 2.10996 17.187 2.05996 16.122L2.02996 15.41L2.02496 15.216C2.00652 14.4868 1.99819 13.7574 1.99996 13.028V10.972C1.99719 10.2426 2.00452 9.5132 2.02196 8.784L2.02896 8.59C2.03696 8.365 2.04696 8.144 2.05896 7.878C2.10896 6.813 2.27696 6.088 2.52396 5.45C2.77565 4.7822 3.17018 4.17744 3.67996 3.678C4.17911 3.16955 4.78315 2.77607 5.44996 2.525C6.08796 2.278 6.81296 2.11 7.87796 2.06C8.14396 2.048 8.36596 2.038 8.58996 2.03L8.78396 2.024C9.51315 2.00623 10.2426 1.99857 10.972 2.001L13.028 2ZM12 7C10.6739 7 9.40211 7.52678 8.46442 8.46447C7.52674 9.40215 6.99996 10.6739 6.99996 12C6.99996 13.3261 7.52674 14.5979 8.46442 15.5355C9.40211 16.4732 10.6739 17 12 17C13.326 17 14.5978 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5978 7.52678 13.326 7 12 7ZM12 9C12.3939 8.99993 12.784 9.07747 13.148 9.22817C13.512 9.37887 13.8428 9.5998 14.1214 9.87833C14.4 10.1569 14.6211 10.4875 14.7719 10.8515C14.9227 11.2154 15.0004 11.6055 15.0005 11.9995C15.0005 12.3935 14.923 12.7836 14.7723 13.1476C14.6216 13.5116 14.4007 13.8423 14.1221 14.121C13.8436 14.3996 13.5129 14.6206 13.149 14.7714C12.785 14.9223 12.3949 14.9999 12.001 15C11.2053 15 10.4422 14.6839 9.87964 14.1213C9.31703 13.5587 9.00096 12.7956 9.00096 12C9.00096 11.2044 9.31703 10.4413 9.87964 9.87868C10.4422 9.31607 11.2053 9 12.001 9M17.251 5.5C16.9194 5.5 16.6015 5.6317 16.3671 5.86612C16.1327 6.10054 16.001 6.41848 16.001 6.75C16.001 7.08152 16.1327 7.39946 16.3671 7.63388C16.6015 7.8683 16.9194 8 17.251 8C17.5825 8 17.9004 7.8683 18.1348 7.63388C18.3693 7.39946 18.501 7.08152 18.501 6.75C18.501 6.41848 18.3693 6.10054 18.1348 5.86612C17.9004 5.6317 17.5825 5.5 17.251 5.5Z"
                          fill="white"
                        />
                      </svg>
                      Instagram
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline flex"
                    >
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="22"
                        viewBox="0 0 24 22"
                        fill="none"
                      >
                        <path
                          d="M18.9 0.124512H22.5806L14.5406 9.33708L24 21.8754H16.5943L10.7897 14.2725L4.15543 21.8754H0.471429L9.07029 12.0182L0 0.126226H7.59429L12.8331 7.07423L18.9 0.124512ZM17.6057 19.6674H19.6457L6.48 2.21765H4.29257L17.6057 19.6674Z"
                          fill="white"
                        />
                      </svg>
                      Twitter (X)
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline flex"
                    >
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"
                          fill="white"
                        />
                      </svg>
                      Linkedin
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline flex"
                    >
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 4C12.855 4 13.732 4.022 14.582 4.058L15.586 4.106L16.547 4.163L17.447 4.224L18.269 4.288C19.1612 4.35589 20.0008 4.73643 20.64 5.3626C21.2791 5.98877 21.6768 6.8204 21.763 7.711L21.803 8.136L21.878 9.046C21.948 9.989 22 11.017 22 12C22 12.983 21.948 14.011 21.878 14.954L21.803 15.864L21.763 16.289C21.6768 17.1798 21.2789 18.0115 20.6396 18.6377C20.0002 19.2639 19.1604 19.6443 18.268 19.712L17.448 19.775L16.548 19.837L15.586 19.894L14.582 19.942C13.7218 19.9793 12.861 19.9986 12 20C11.139 19.9986 10.2782 19.9793 9.418 19.942L8.414 19.894L7.453 19.837L6.553 19.775L5.731 19.712C4.83881 19.6441 3.9992 19.2636 3.36004 18.6374C2.72089 18.0112 2.32319 17.1796 2.237 16.289L2.197 15.864L2.122 14.954C2.04583 13.9711 2.00514 12.9858 2 12C2 11.017 2.052 9.989 2.122 9.046L2.197 8.136L2.237 7.711C2.32316 6.82055 2.72071 5.98905 3.35966 5.36291C3.99861 4.73676 4.83799 4.35612 5.73 4.288L6.551 4.224L7.451 4.163L8.413 4.106L9.417 4.058C10.2775 4.02073 11.1387 4.00139 12 4ZM10 9.575V14.425C10 14.887 10.5 15.175 10.9 14.945L15.1 12.52C15.1914 12.4674 15.2673 12.3916 15.3201 12.3003C15.3729 12.209 15.4007 12.1055 15.4007 12C15.4007 11.8945 15.3729 11.791 15.3201 11.6997C15.2673 11.6084 15.1914 11.5326 15.1 11.48L10.9 9.056C10.8088 9.00332 10.7053 8.9756 10.5999 8.97562C10.4945 8.97563 10.3911 9.00339 10.2998 9.0561C10.2086 9.1088 10.1329 9.1846 10.0802 9.27587C10.0276 9.36713 9.99993 9.47065 10 9.576V9.575Z"
                          fill="white"
                        />
                      </svg>
                      YouTube
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline flex"
                    >
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.08601 4.28C6.73601 2.52 9.11701 1.5 12.016 1.5C16.808 1.5 20.033 4.284 21.049 8.15C21.1501 8.53483 21.0941 8.94404 20.8934 9.2876C20.6928 9.63117 20.3638 9.88095 19.979 9.982C19.5942 10.083 19.185 10.0271 18.8414 9.82642C18.4978 9.62576 18.2481 9.29683 18.147 8.912C17.48 6.37 15.45 4.5 12.017 4.5C9.85301 4.5 8.29701 5.242 7.27501 6.332C6.23901 7.438 5.64001 9.02 5.64001 10.875V13.125C5.64001 14.98 6.23801 16.562 7.27401 17.668C8.29601 18.758 9.85201 19.5 12.015 19.5C13.591 19.5 14.81 19.135 15.729 18.57C16.649 18.002 17.149 17.285 17.289 16.502C17.462 15.53 17.245 14.923 16.925 14.501C16.8885 14.4526 16.8498 14.4059 16.809 14.361C16.6686 14.8491 16.4588 15.3146 16.186 15.743C14.672 18.043 11.817 18.203 9.98301 17.471C8.89201 17.036 8.01101 15.888 7.73601 14.683C7.56497 13.9675 7.62376 13.2162 7.90401 12.536C8.21601 11.786 8.78801 11.166 9.56601 10.708C10.366 10.236 11.493 10.043 12.545 10.014C12.9634 10.0035 13.3821 10.0168 13.799 10.054C13.709 9.854 13.612 9.711 13.525 9.629C13.141 9.272 12.465 8.997 11.779 9.001C11.132 9.006 10.653 9.248 10.369 9.701C10.2646 9.86804 10.1283 10.0129 9.96796 10.1273C9.80758 10.2416 9.62624 10.3233 9.4343 10.3676C9.24237 10.4119 9.04358 10.4179 8.8493 10.3854C8.65502 10.3529 8.46906 10.2824 8.30201 10.178C8.13497 10.0736 7.99013 9.93732 7.87576 9.77694C7.76138 9.61656 7.67972 9.43523 7.63542 9.24329C7.59113 9.05135 7.58508 8.85257 7.61761 8.65829C7.65014 8.46401 7.72061 8.27804 7.82501 8.111C8.77301 6.596 10.332 6.011 11.758 6.001C13.146 5.991 14.579 6.513 15.568 7.433C16.522 8.321 16.941 9.687 17.081 10.918C17.917 11.321 18.711 11.892 19.315 12.688C20.189 13.838 20.548 15.312 20.242 17.028C19.922 18.821 18.792 20.206 17.302 21.124C15.845 22.022 14.063 22.5 12.015 22.5C9.11601 22.5 6.73501 21.48 5.08501 19.72C3.44901 17.974 2.64001 15.62 2.64001 13.125V10.875C2.64001 8.381 3.45001 6.025 5.08501 4.281L5.08601 4.28ZM14.033 13.103C13.5682 13.0318 13.0981 13.0017 12.628 13.013C11.768 13.037 11.244 13.201 11.091 13.292C10.786 13.472 10.701 13.625 10.674 13.69C10.636 13.7951 10.6321 13.9096 10.663 14.017C10.699 14.177 10.784 14.35 10.901 14.497C10.9547 14.5695 11.0203 14.6324 11.095 14.683C11.1003 14.687 11.1003 14.6877 11.095 14.685C12.08 15.078 13.2 14.825 13.681 14.093C13.818 13.886 13.946 13.54 14.033 13.103Z"
                          fill="white"
                        />
                      </svg>
                      Thread
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                  Contact US
                </h2>
                <ul className="text-white">
                  <li className="mb-2 md:flex">
                    <svg
                      className="mb-2 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="18"
                      viewBox="0 0 21 18"
                      fill="none"
                    >
                      <path
                        d="M11.7501 4.99999C14.0284 4.99999 15.0001 5.89699 15.0001 7.99999H17.1668C17.1668 4.77499 15.2439 2.99999 11.7501 2.99999V4.99999ZM15.4573 10.443C15.2491 10.2683 14.9756 10.1752 14.6944 10.1832C14.4133 10.1912 14.1465 10.2998 13.9504 10.486L11.358 12.947C10.734 12.837 9.47948 12.476 8.18814 11.287C6.89681 10.094 6.50573 8.93299 6.38981 8.361L9.05373 5.96699C9.25567 5.78612 9.37346 5.53982 9.38215 5.2802C9.39085 5.02059 9.28977 4.76804 9.10031 4.57599L5.09739 0.512995C4.90786 0.320352 4.64443 0.203499 4.36306 0.187255C4.08169 0.17101 3.80454 0.256653 3.59048 0.425995L1.23964 2.28699C1.05235 2.46051 0.940556 2.69145 0.925476 2.93599C0.909226 3.18599 0.599393 9.108 5.57406 13.702C9.91389 17.707 15.3501 18 16.8472 18C17.0661 18 17.2004 17.994 17.2361 17.992C17.501 17.9783 17.7511 17.8747 17.9381 17.701L19.9531 15.53C20.1367 15.3325 20.2297 15.0768 20.2123 14.817C20.1949 14.5573 20.0685 14.3141 19.86 14.139L15.4573 10.443Z"
                        fill="white"
                      />
                    </svg>
                    <a href="#" className="hover:underline">
                      +91 96565 19636
                    </a>
                  </li>
                  <li className="mb-2 md:flex">
                    <svg
                      className="w-6 h-6 text-white mr-2 mb-2"
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
                    <a href="#" className="hover:underline">
                      hello@gigwork.co.in
                    </a>
                  </li>
                  <li className="md:flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 mb-2"
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
                    <a href="#" className="hover:underline">
                      Kurusumood , Chethipuzha P.O, Chanaganassery
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* mobile view icons */}
            <div className="md:hidden flex justify-center my-3">
              <ul className="text-white flex gap-4">
                <li className="rounded-full p-1">
                  {/* facebook */}
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                {/* insta */}
                <li className="rounded-full p-1">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline  flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13.028 2C14.153 2.003 14.724 2.009 15.217 2.023L15.411 2.03C15.635 2.038 15.856 2.048 16.123 2.06C17.187 2.11 17.913 2.278 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8307 4.17773 21.2241 4.78247 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.952 8.144 21.962 8.365 21.97 8.59L21.976 8.784C21.991 9.276 21.997 9.847 21.999 10.972L22 11.718V13.028C22.0024 13.7574 21.9947 14.4868 21.977 15.216L21.971 15.41C21.963 15.635 21.953 15.856 21.941 16.122C21.891 17.187 21.721 17.912 21.475 18.55C21.2241 19.2175 20.8307 19.8223 20.322 20.322C19.8222 20.8307 19.2175 21.2242 18.55 21.475C17.913 21.722 17.187 21.89 16.123 21.94L15.411 21.97L15.217 21.976C14.724 21.99 14.153 21.997 13.028 21.999L12.282 22H10.973C10.2432 22.0026 9.51348 21.9949 8.78396 21.977L8.58996 21.971C8.35257 21.962 8.11523 21.9517 7.87796 21.94C6.81396 21.89 6.08796 21.722 5.44996 21.475C4.78279 21.2241 4.1784 20.8306 3.67896 20.322C3.1699 19.8224 2.77607 19.2176 2.52496 18.55C2.27796 17.913 2.10996 17.187 2.05996 16.122L2.02996 15.41L2.02496 15.216C2.00652 14.4868 1.99819 13.7574 1.99996 13.028V10.972C1.99719 10.2426 2.00452 9.5132 2.02196 8.784L2.02896 8.59C2.03696 8.365 2.04696 8.144 2.05896 7.878C2.10896 6.813 2.27696 6.088 2.52396 5.45C2.77565 4.7822 3.17018 4.17744 3.67996 3.678C4.17911 3.16955 4.78315 2.77607 5.44996 2.525C6.08796 2.278 6.81296 2.11 7.87796 2.06C8.14396 2.048 8.36596 2.038 8.58996 2.03L8.78396 2.024C9.51315 2.00623 10.2426 1.99857 10.972 2.001L13.028 2ZM12 7C10.6739 7 9.40211 7.52678 8.46442 8.46447C7.52674 9.40215 6.99996 10.6739 6.99996 12C6.99996 13.3261 7.52674 14.5979 8.46442 15.5355C9.40211 16.4732 10.6739 17 12 17C13.326 17 14.5978 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5978 7.52678 13.326 7 12 7ZM12 9C12.3939 8.99993 12.784 9.07747 13.148 9.22817C13.512 9.37887 13.8428 9.5998 14.1214 9.87833C14.4 10.1569 14.6211 10.4875 14.7719 10.8515C14.9227 11.2154 15.0004 11.6055 15.0005 11.9995C15.0005 12.3935 14.923 12.7836 14.7723 13.1476C14.6216 13.5116 14.4007 13.8423 14.1221 14.121C13.8436 14.3996 13.5129 14.6206 13.149 14.7714C12.785 14.9223 12.3949 14.9999 12.001 15C11.2053 15 10.4422 14.6839 9.87964 14.1213C9.31703 13.5587 9.00096 12.7956 9.00096 12C9.00096 11.2044 9.31703 10.4413 9.87964 9.87868C10.4422 9.31607 11.2053 9 12.001 9M17.251 5.5C16.9194 5.5 16.6015 5.6317 16.3671 5.86612C16.1327 6.10054 16.001 6.41848 16.001 6.75C16.001 7.08152 16.1327 7.39946 16.3671 7.63388C16.6015 7.8683 16.9194 8 17.251 8C17.5825 8 17.9004 7.8683 18.1348 7.63388C18.3693 7.39946 18.501 7.08152 18.501 6.75C18.501 6.41848 18.3693 6.10054 18.1348 5.86612C17.9004 5.6317 17.5825 5.5 17.251 5.5Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                {/* twitter */}
                <li className="rounded-full p-1">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="22"
                      viewBox="0 0 24 22"
                      fill="none"
                    >
                      <path
                        d="M18.9 0.124512H22.5806L14.5406 9.33708L24 21.8754H16.5943L10.7897 14.2725L4.15543 21.8754H0.471429L9.07029 12.0182L0 0.126226H7.59429L12.8331 7.07423L18.9 0.124512ZM17.6057 19.6674H19.6457L6.48 2.21765H4.29257L17.6057 19.6674Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                {/* linkedin */}
                <li className="rounded-full p-1">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                {/* youtube */}
                <li className="rounded-full p-1">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 4C12.855 4 13.732 4.022 14.582 4.058L15.586 4.106L16.547 4.163L17.447 4.224L18.269 4.288C19.1612 4.35589 20.0008 4.73643 20.64 5.3626C21.2791 5.98877 21.6768 6.8204 21.763 7.711L21.803 8.136L21.878 9.046C21.948 9.989 22 11.017 22 12C22 12.983 21.948 14.011 21.878 14.954L21.803 15.864L21.763 16.289C21.6768 17.1798 21.2789 18.0115 20.6396 18.6377C20.0002 19.2639 19.1604 19.6443 18.268 19.712L17.448 19.775L16.548 19.837L15.586 19.894L14.582 19.942C13.7218 19.9793 12.861 19.9986 12 20C11.139 19.9986 10.2782 19.9793 9.418 19.942L8.414 19.894L7.453 19.837L6.553 19.775L5.731 19.712C4.83881 19.6441 3.9992 19.2636 3.36004 18.6374C2.72089 18.0112 2.32319 17.1796 2.237 16.289L2.197 15.864L2.122 14.954C2.04583 13.9711 2.00514 12.9858 2 12C2 11.017 2.052 9.989 2.122 9.046L2.197 8.136L2.237 7.711C2.32316 6.82055 2.72071 5.98905 3.35966 5.36291C3.99861 4.73676 4.83799 4.35612 5.73 4.288L6.551 4.224L7.451 4.163L8.413 4.106L9.417 4.058C10.2775 4.02073 11.1387 4.00139 12 4ZM10 9.575V14.425C10 14.887 10.5 15.175 10.9 14.945L15.1 12.52C15.1914 12.4674 15.2673 12.3916 15.3201 12.3003C15.3729 12.209 15.4007 12.1055 15.4007 12C15.4007 11.8945 15.3729 11.791 15.3201 11.6997C15.2673 11.6084 15.1914 11.5326 15.1 11.48L10.9 9.056C10.8088 9.00332 10.7053 8.9756 10.5999 8.97562C10.4945 8.97563 10.3911 9.00339 10.2998 9.0561C10.2086 9.1088 10.1329 9.1846 10.0802 9.27587C10.0276 9.36713 9.99993 9.47065 10 9.576V9.575Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                {/* thread */}
                <li className="rounded-full p-1">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.08601 4.28C6.73601 2.52 9.11701 1.5 12.016 1.5C16.808 1.5 20.033 4.284 21.049 8.15C21.1501 8.53483 21.0941 8.94404 20.8934 9.2876C20.6928 9.63117 20.3638 9.88095 19.979 9.982C19.5942 10.083 19.185 10.0271 18.8414 9.82642C18.4978 9.62576 18.2481 9.29683 18.147 8.912C17.48 6.37 15.45 4.5 12.017 4.5C9.85301 4.5 8.29701 5.242 7.27501 6.332C6.23901 7.438 5.64001 9.02 5.64001 10.875V13.125C5.64001 14.98 6.23801 16.562 7.27401 17.668C8.29601 18.758 9.85201 19.5 12.015 19.5C13.591 19.5 14.81 19.135 15.729 18.57C16.649 18.002 17.149 17.285 17.289 16.502C17.462 15.53 17.245 14.923 16.925 14.501C16.8885 14.4526 16.8498 14.4059 16.809 14.361C16.6686 14.8491 16.4588 15.3146 16.186 15.743C14.672 18.043 11.817 18.203 9.98301 17.471C8.89201 17.036 8.01101 15.888 7.73601 14.683C7.56497 13.9675 7.62376 13.2162 7.90401 12.536C8.21601 11.786 8.78801 11.166 9.56601 10.708C10.366 10.236 11.493 10.043 12.545 10.014C12.9634 10.0035 13.3821 10.0168 13.799 10.054C13.709 9.854 13.612 9.711 13.525 9.629C13.141 9.272 12.465 8.997 11.779 9.001C11.132 9.006 10.653 9.248 10.369 9.701C10.2646 9.86804 10.1283 10.0129 9.96796 10.1273C9.80758 10.2416 9.62624 10.3233 9.4343 10.3676C9.24237 10.4119 9.04358 10.4179 8.8493 10.3854C8.65502 10.3529 8.46906 10.2824 8.30201 10.178C8.13497 10.0736 7.99013 9.93732 7.87576 9.77694C7.76138 9.61656 7.67972 9.43523 7.63542 9.24329C7.59113 9.05135 7.58508 8.85257 7.61761 8.65829C7.65014 8.46401 7.72061 8.27804 7.82501 8.111C8.77301 6.596 10.332 6.011 11.758 6.001C13.146 5.991 14.579 6.513 15.568 7.433C16.522 8.321 16.941 9.687 17.081 10.918C17.917 11.321 18.711 11.892 19.315 12.688C20.189 13.838 20.548 15.312 20.242 17.028C19.922 18.821 18.792 20.206 17.302 21.124C15.845 22.022 14.063 22.5 12.015 22.5C9.11601 22.5 6.73501 21.48 5.08501 19.72C3.44901 17.974 2.64001 15.62 2.64001 13.125V10.875C2.64001 8.381 3.45001 6.025 5.08501 4.281L5.08601 4.28ZM14.033 13.103C13.5682 13.0318 13.0981 13.0017 12.628 13.013C11.768 13.037 11.244 13.201 11.091 13.292C10.786 13.472 10.701 13.625 10.674 13.69C10.636 13.7951 10.6321 13.9096 10.663 14.017C10.699 14.177 10.784 14.35 10.901 14.497C10.9547 14.5695 11.0203 14.6324 11.095 14.683C11.1003 14.687 11.1003 14.6877 11.095 14.685C12.08 15.078 13.2 14.825 13.681 14.093C13.818 13.886 13.946 13.54 14.033 13.103Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-center text-center">
            <span className="text-sm text-gray-500 ">
              © 2024{" "}
              <a href="https://gigworks.co.in" className="hover:underline">
                Gigworks
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
