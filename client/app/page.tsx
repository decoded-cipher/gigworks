"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gigworks from "../public/assets/media/gigworks.svg";
import LoginPopup from "./components/loginpopup";
import man from "../public/assets/media/man.svg";
import whatsapp from "../public/assets/media/whatsapp.png";
import { ContactForm } from "./components/ContactForm";
import { SearchSection } from "./components/SearchSection";
import AnimatedGridPattern from "./components/ui/AnimatedGridPattern";
import FeatureCardsWithImage from "./components/features";
import MissionSwiper from "./components/swiperMission";
import { NumberTicker } from "./components/ui/AnimatedNumberTicket";
import { FooterSection } from "./components/FooterSection";
import ScrollToTopButton from "./components/ScrollToTop";
import { fetchBusinessCount } from "./api";
import { useRouter } from 'next/navigation';
import { GetPartner } from "./api";

export default function GigWorkLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [count, setCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetchBusinessCount();
        const count = response.data;
        setCount(count);
        
      } catch (error) {
        console.error('Error fetching business count:', error);
      }
    };

    fetchCount();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 300;
      setIsScrolled(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLoggedIn = () => {
    return document.cookie.includes('token=');
  };

  const handleJoinClick = () => {
    if (!isLoggedIn()) {
      setIsLoginPopupOpen(true);
      setRedirectPath('/signup');
    } else {
      // check if the profile in local storage is empty or not
      const profile = localStorage.getItem('profile');
      if (profile) {
        // fetch slug from profile and redirect to profile page
        const { slug } = JSON.parse(profile);
        router.push(`/${slug}`);
      } else {
        // redirect to the signup page
        router.push('/signup');
      }
    }
  };

  const handlePartnerClick = async () => {
    if (!isLoggedIn()) {
      setIsLoginPopupOpen(true);
      setRedirectPath('/partnerSignup/1');
      return;
    }

    try {
      const response = await GetPartner();
      if (response.data) {
        router.push('/partnerProfile');
      } else {
        // If no partner profile, redirect to partner signup
        router.push('/partnerSignup/1');
      }
    } catch (error) {
      console.error('Error checking partner status:', error);
      // If error occurs, redirect to partner signup
      router.push('/partnerSignup/1');
    }
  };

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
      {/* Single LoginPopup instance at the root level */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => {
          setIsLoginPopupOpen(false);
          setRedirectPath(undefined);
        }}
        // redirectAfterLogin={redirectPath}
      />

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-30 py-2 transition-all duration-300 ${
          isScrolled ? "bg-black backdrop-blur-sm" : "bg-navbg"
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
                    href="#about"
                    className="text-white hover:text-green-500 transition"
                  >
                    About Us
                  </Link>
                  <Link
                    href="#partner"
                    className="text-white hover:text-green-500 transition"
                  >
                    Partner
                  </Link>
                  <Link
                    href="https://www.gigwork.co.in/"
                    className="text-white hover:text-green-500 transition"
                  >
                    Blog
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
                  <button
                    className="border border-green-500 hover:bg-green-500 text-xl font-medium bg-tertiary text-white px-10 py-2 h-14 rounded-md transition duration-300 whitespace-nowrap"
                    onClick={() => {
                      if (!isLoggedIn()) {
                        setRedirectPath('/profile');
                        setIsLoginPopupOpen(true);
                      } else {
                        router.push('/profile');
                      }
                    }}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
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
            <div className="lg:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="#"
                  className="text-white hover:text-green-500 transition"
                >
                  Home
                </Link>
                <Link
                  href="#about"
                  className="text-white hover:text-green-500 transition"
                >
                  About Us
                </Link>
                <Link
                  href="https://www.gigwork.co.in/"
                  className="text-white hover:text-green-500 transition"
                >
                  Blog
                </Link>
                <Link
                  href="#partner"
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
            </div>
          )}
        </div>
      </nav>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
      <ScrollToTopButton />
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
              <h1 className="text-3xl lg:text-6xl font-bold mb-4">
                Take Your Business to the Next Level with <br></br>
                <div className="mt-2">
                  <span className="text-green-500 md:text-7xl ">WhatsApp!</span>
                </div>
              </h1>
              <p className="text-gray-400 mb-2 font-light text-justify">
                Connect, communicate, and grow your business with WhatsApp—on a
                platform your customers already love.
              </p>
              <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 pt-8 ">
                <Link
                  href="/explore"
                  className="hidden lg:block w-full lg:w-[204px]"
                >
                  <button className="w-full h-[60px] bg-tertiary hover:bg-green-500 text-white px-8 py-3 lg:py-2 rounded-md transition duration-300">
                    <span className="text-base lg:text-2xl font-bold flex items-center justify-center">
                      Explore <span className="ml-4">→</span>
                    </span>
                  </button>
                </Link>
                <Link href="" className="lg:hidden w-full">
                  <button
                    className="w-full h-[60px] bg-tertiary hover:bg-green-600 text-white px-6 py-3 md:py-2 rounded-md transition duration-300"
                    onClick={() => setIsLoginPopupOpen(true)}
                  >
                    <span className="text-base md:text-2xl font-bold flex items-center justify-center">
                      Sign up
                    </span>
                  </button>
                </Link>
                <Link href="" className="w-full lg:w-[204px]">
                  <button className="w-full h-[60px] border border-grn text-white hover:bg-tertiary px-4 py-3 md:px-8 md:py-4 rounded-md transition duration-300">
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
                </Link>
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
                <div className="hidden xl:block  absolute -top-3/4 right-[31%] translate-y-full mt-[23rem]">
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
              <Image src={man} alt="" className="man md:mt-24  z-10 w-full" />
            </div>
          </section>
        </div>
      </div>
      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* Features */}
      <section className="hidden md:block bg-[#31C668] md:relative z-20">
        <section className="bg-green-600 lg:py-8 md:py-5 relative z-50 -skew-y-[2deg]">
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
      <section className="bg-white  relative z-10">
        {/* About GigWork */}
        <section className=" container mx-auto px-4 py-16 flex flex-col items-center justify-center" id="about" style={{ scrollMarginTop: '100px' }}>
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
          <NumberTicker value={count} />
          <div className="flex justify-center">
            <MissionSwiper />
          </div>
        </section>

        {/* Why Choose Us */}
        {/* <section className="container bg-white mx-auto px-4 relative z-0">
          <h2 className="text-3xl font-bold mb-20 text-center text-black">
            Why <span className="text-green-600">Choose Us?</span>
          </h2>
          Features Card Section
          <div className="flex justify-center bottom-0">
            <FeatureCardsWithImage />
          </div>
        </section> */}
        <div className="container bg-white mx-auto px-4 py-4 md:py-0 relative z-0 bottom-0 flex justify-center items-end">
          <FeatureCardsWithImage />
        </div>
      </section>

      {/* Join Community */}
      <section className="bg-black py-16 relative z-10"id="partner" style={{ scrollMarginTop: '80px' }}>
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
            <button 
              onClick={handleJoinClick}
              className="bg-tertiary hover:bg-green-500 text-white px-6 py-2 rounded-md transition duration-300"
            >
              Join with us
            </button>
            <button 
              onClick={handlePartnerClick}
              className="border border-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-md transition duration-300"
            >
              Partner with us
            </button>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="bg-cbg w-full">
        <section
          id="contact"
          className="container bg-cbg mx-auto px-3 md:px-[42px] py-16 flex flex-col items-center" style={{ scrollMarginTop: '100px' }}
        >
          <h2 className="text-3xl font-bold mb-8 ">
            Contact <span className="text-green-600">Us</span>
          </h2>
          <hr className="w-1/4 mb-4 h-1 border-0 opacity-100 bg-gradient-to-l from-transparent to-green-600 rounded-lg" />
          <p className="text-gray-100 mb-8 text-center">
            We&apos;re here to help! If you have any questions, concerns, or
            need assistance, please feel free to reach <br /> out to us using
            any of the methods below.
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
                  +91 73061 04563
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
                  mail@gigwork.co.in
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
                  Kottayam, Kerala
                </p>
                <section className="hidden md:block space-y-8">
                  <h1 className="text-center font-medium text-xl">
                    Business Hours
                  </h1>
                  <p className="text-center font-light text-sm">
                    Our business hours are 9 to 5 on weekdays. We&apos;re happy
                    to respond to all inquiries within 24 hours.
                  </p>
                  <h1 className="text-center font-medium text-xl">Visit Us</h1>
                  <p className="text-center font-light text-sm">
                    If you prefer face-to-face communication, feel free to visit
                    us at our office during business hours. We&apos;d love to
                    meet you and discuss how we can help your business grow.
                  </p>
                  <div className="flex justify-center">
                    <button className="text-white text-xl font-medium underline text-center px-4 py-2 flex justify-center rounded-md transition duration-300">
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
      </section>
      {/* Footer */}
      <section>
        <FooterSection />
      </section>
    </div>
  );
}

