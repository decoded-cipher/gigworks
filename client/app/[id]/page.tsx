"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Clock, Phone, Briefcase, Dribbble, Facebook, Instagram, Twitter, Linkedin, Youtube, Globe } from "lucide-react";
import ImageGrid from "@/app/components/imgsec";
import { FooterSection } from "@/app/components/FooterSection";
import { div } from "framer-motion/client";
import DynamicQRCode from "@/app/components/QrSection";
import ScrollToTopButton from "@/app/components/ScrollToTop";
import { fetchBusinessesByslug, ASSET_BASE_URL,GetURL} from "@/app/api";
import { useParams, useRouter } from "next/navigation";

interface License {
  name: string;
  number: string;
  url: string;
  description: string;
}

interface MediaItem {
  _id: string;
  url: string;
  type: string;
}

interface BusinessProfile {
  _id: string;
  name: string;
  description: string;
  email: string;
  phone: string | null;
  address: string;
  city: string;
  state: string;
  country: string;
  operating_hours: {
    [key: string]: string;
  };
  socials: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  avatar: string;
  banner: string;
  type: string;
  additional_services: string;
  gstin: string;
}

interface BusinessData {
  profile: BusinessProfile;
  user: {
    name: string;
    phone: string;
  };
  category: string;
  subCategory: string;
  subCategoryOption: string;
  licenses: License[];
  media: MediaItem[];
  tags: any[];
}

export const runtime = "edge";

const DevMorphixWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  interface ApiError {
    status?: number;
    message?: string;
  }
  const ServicesSection = () => {
    // Only get services from businessData, no fallback values
    const services = businessData?.profile?.additional_services
      ? businessData.profile.additional_services.split(',').map(service => 
          service.trim().replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim()
        )
      : [];

    // Don't render the section if there are no services
    if (!services || services.length === 0) {
      return null;
    }
    return (
      <section className="bg-white rounded-full p-6 mb-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Services Provides
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-6 justify-center">
            {services.map((service, index) => (
              <button
                key={index}
                className="w-[250px] bg-stone-800 border-2 text-white border-stone-800 rounded-full px-6 py-2.5 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors duration-300"
              >
                <span className="text-sm sm:text-base whitespace-nowrap">
                  {service}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchBusinessesByslug(params.id as string);
        if (response.message === "Business fetched successfully") {
          setBusinessData(response.data);
          // Log asset URLs with base URL
          console.log(
            "Avatar URL:",
            `${ASSET_BASE_URL}/${response.data.profile.avatar}`
          );
          console.log(
            "Banner URL:",
            `${ASSET_BASE_URL}/${response.data.profile.banner}`
          );
          console.log(
            "License Documents:",
            response.data.licenses?.map(
              (license: License) => `${ASSET_BASE_URL}/${license.url}`
            )
          );
          console.log(
            "Media Files:",
            response.data.media?.map(
              (mediaItem: MediaItem) => `${ASSET_BASE_URL}/${mediaItem.url}`
            )
          );
        } else {
          setError("Failed to load business data");
        }
      } catch (err) {
        const error = err as ApiError;
        if (error.status === 404) {
          router.push("/pending");
          return;
        }
        console.error("Error fetching business data:", error);
        setError("Failed to load business data");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router]);

  // Add share handlers
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: businessData?.profile.name,
          text: businessData?.profile.description,
          url: window.location.href,
        });
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleWhatsApp = () => {
    const text = `Check out ${businessData?.profile.name}: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div className="flex flex-col items-center justify-center">
        {/* Bouncing dots */}
        <div className="flex justify-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: '0.8s'
              }}
            />
          ))}
        </div>
        
        {/* Zigzag line */}
        <div className="mt-4 relative h-8 w-24">
          <div 
            className="absolute left-0 w-4 h-4 bg-blue-500 rounded-full"
            style={{
              animation: `
                zigzag 2s linear infinite,
                pulse 1s ease-in-out infinite alternate
              `
            }}
          />
        </div>

        <style jsx>{`
          @keyframes zigzag {
            0% {
              left: 0;
              top: 0;
            }
            25% {
              left: 100%;
              top: 100%;
            }
            50% {
              left: 0;
              top: 100%;
            }
            75% {
              left: 100%;
              top: 0;
            }
            100% {
              left: 0;
              top: 0;
            }
          }
        `}</style>

        {/* Loading text */}
        <p className="mt-8 text-sm text-gray-600 text-center animate-pulse">Loading...</p>
      </div>
    </div>

    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Add your error component here
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#service" },
    { label: "Contact", href: "#contact" },
    { label: "QR", href: "#qr" },
  ];

  const socialIcons = {
    website: Globe,
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
  };

  return (
    <div className="font-circular">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {businessData?.profile.name || "Business Name"}
            </span>
          </a>

          {/* Hamburger button */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navigation menu */}
          <div
            className={`w-full md:block md:w-auto ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={handleNavItemClick}
                    className="block py-2 px-3 rounded text-gray-900 hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 dark:text-white md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    aria-current={item.label === "Home" ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="px-4 sm:px-6 lg:px-52">
        <main>
          <ScrollToTopButton isProfilePage={true} />
          <section className="relative py-8 flex flex-col items-center text-center border mb-2 -mt-2 rounded-3xl">
            <div className="absolute top-0 left-0 right-0 h-72 overflow-hidden">
              <img
                src={
                  businessData?.profile.banner
                    ? `${ASSET_BASE_URL}/${businessData.profile.banner}`
                    : "/assets/media/15879.png"
                }
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-0 w-80 h-80 border border-white border-8 bg-black rounded-full overflow-hidden border-8 border-white rounded-full flex items-center justify-center mb-8 mt-20">
              <img
                src={
                  businessData?.profile.avatar
                    ? `${ASSET_BASE_URL}/${businessData.profile.avatar}`
                    : "/444.png"
                }
                alt="Logo"
                
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="sm:text-6xl text-4xl font-bold mb-4">
              {businessData?.profile.name}
            </h2>
            <p className="sm:text-xl text-sm font-medium mb-8">
              {businessData?.subCategory || "No category available"}
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={handleShare}
                className="bg-white border-2 font-medium border-black rounded-full transition hover:scale-110 sm:px-6 px-4 sm:py-2 py-1 flex items-center gap-2"
              >
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.5 10L11.6667 4.16669V7.50002C5.83333 8.33335 3.33333 12.5 2.5 16.6667C4.58333 13.75 7.5 12.4167 11.6667 12.4167V15.8334L17.5 10Z"
                      fill="black"
                    />
                  </svg>
                  <span>Share</span>
                </div>
              </button>
              <button
                onClick={handleWhatsApp}
                className="bg-white border-2 font-medium border-black rounded-full transition hover:scale-110 sm:px-6 px-4 sm:py-2 py-1 flex items-center gap-2"
              >
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15.8747 4.09167C15.1106 3.32009 14.2005 2.70831 13.1976 2.29197C12.1947 1.87564 11.1189 1.66307 10.033 1.66667C5.48301 1.66667 1.77467 5.37501 1.77467 9.92501C1.77467 11.3833 2.15801 12.8 2.87467 14.05L1.70801 18.3333L6.08301 17.1833C7.29134 17.8417 8.64967 18.1917 10.033 18.1917C14.583 18.1917 18.2913 14.4833 18.2913 9.93334C18.2913 7.72501 17.433 5.65 15.8747 4.09167ZM10.033 16.7917C8.79967 16.7917 7.59134 16.4583 6.53301 15.8333L6.28301 15.6833L3.68301 16.3667L4.37467 13.8333L4.20801 13.575C3.52263 12.4809 3.15878 11.2161 3.15801 9.92501C3.15801 6.14167 6.24134 3.05834 10.0247 3.05834C11.858 3.05834 13.583 3.775 14.8747 5.075C15.5144 5.71156 16.0213 6.46879 16.366 7.30278C16.7108 8.13677 16.8865 9.03091 16.883 9.93334C16.8997 13.7167 13.8163 16.7917 10.033 16.7917ZM13.7997 11.6583C13.5913 11.5583 12.5747 11.0583 12.3913 10.9833C12.1997 10.9167 12.0663 10.8833 11.9247 11.0833C11.783 11.2917 11.3913 11.7583 11.2747 11.8917C11.158 12.0333 11.033 12.05 10.8247 11.9417C10.6163 11.8417 9.94967 11.6167 9.16634 10.9167C8.54967 10.3667 8.14134 9.69167 8.01634 9.48334C7.89967 9.27501 7.99967 9.16667 8.10801 9.05834C8.19967 8.96667 8.31634 8.81667 8.41634 8.70001C8.51634 8.58334 8.55801 8.49167 8.62467 8.35834C8.69134 8.21667 8.65801 8.10001 8.60801 8.00001C8.55801 7.90001 8.14134 6.88334 7.97467 6.46667C7.80801 6.06667 7.63301 6.11667 7.50801 6.10834H7.10801C6.96634 6.10834 6.74967 6.15834 6.55801 6.36667C6.37467 6.575 5.84134 7.07501 5.84134 8.09167C5.84134 9.10834 6.58301 10.0917 6.68301 10.225C6.78301 10.3667 8.14134 12.45 10.208 13.3417C10.6997 13.5583 11.083 13.6833 11.383 13.775C11.8747 13.9333 12.3247 13.9083 12.683 13.8583C13.083 13.8 13.908 13.3583 14.0747 12.875C14.2497 12.3917 14.2497 11.9833 14.1913 11.8917C14.133 11.8 14.008 11.7583 13.7997 11.6583Z"
                      fill="black"
                    />
                  </svg>
                  <span>Whatsapp</span>
                </div>
              </button>
            </div>
          </section>

          <section>
                  

          </section>

          {businessData?.media && businessData.media.length > 0 && (
            <section className="mt-7">
              <ImageGrid
                  media={businessData.media}
                className="bg-white shadow-lg rounded-lg overflow-hidden border my-2 rounded-3xl"
              />
            </section>
          )}


          <section
            className="border my-7  rounded-3xl "
            id="service"
            style={{ scrollMarginTop: "100px" }}
          >
            {/* <section className="bg-white rounded-full p-6 mb-8">
              <h2 className="text-2xl font-bold text-center mb-6">
                Services Provides
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap gap-6 justify-center">
                  {(
                    businessData?.profile.additional_services.split(",").map(service => {
                      // Convert camelCase to Title Case with spaces
                      return service.trim().replace(/([A-Z])/g, ' $1')
                                         .replace(/^./, str => str.toUpperCase())
                                         .trim();
                    }) || [
                      "App Development",
                      "Web Development",
                      "Cloud Services",
                      "UI/UX Design",
                      "Digital Marketing",
                    ]
                  ).map((service: string, index: number) => (
                    <button
                      key={index}
                      className="w-[250px] bg-stone-800 border-2 text-white border-stone-800 rounded-full px-6 py-2.5 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors duration-300"
                    >
                      <span className="text-sm sm:text-base whitespace-nowrap">
                        {service}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section> */}

            <hr className="my-4 mx-10 "></hr>

            <section
              className="flex flex-col md:flex-row gap-6 mb-8"
              id="contact"
              style={{ scrollMarginTop: "100px" }}
            >
              {/* Map Section - Left Side */}
              <div className="md:w-1/2">
                <div className="bg-white rounded-lg p-6 h-full">
                  <div className="h-[500px] rounded-lg overflow-hidden">
                      {businessData?.profile.name.toLowerCase() === 'emilia' ? (
                      <>
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.8730957553427!2d76.56412737495825!3d9.463395593246565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062f23a403b63b%3A0xfed9fd50695f7df8!2sEMILIA%20BEAUTY%20HUB%20CHANGANACHERRY!5e0!3m2!1sen!2sin!4v1702359671799!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="mt-2">
                          <a 
                            href="https://maps.app.goo.gl/VTsPuqgduDUwk2du8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:text-blue-700"
                          >
                            View on Google Maps →
                          </a>
                        </div>
                      </>
                    ) : (
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251482.44857791857!2d76.1643857954714!3d9.982669325611842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1702359671799!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    )}
                  </div>
                </div>
              </div>

              {/* Services Grid - Right Side */}
              <div className="md:w-1/2">
                <div className="gap-4 p-6">
                  {/* Company Info Card */}
                  <div className="bg-white rounded-lg mt-6">
                    <h3 className="text-xl font-light mb-4">
                      {businessData?.profile.name}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="font-light text-md text-black">
                          Email: <span>{businessData?.profile.email}</span>
                        </span>
                      </div>
                      <div>
                        <span className="font-light text-md text-black">
                          Phone:{" "}
                          <span>
                            {businessData?.user.phone || "Not available"}
                          </span>
                        </span>
                      </div>
                      <div>
                        <span className="font-light text-md text-black">
                          Address:{" "}
                          <span>
                            {`${businessData?.profile.address}, ${businessData?.profile.city}, ${businessData?.profile.state}, ${businessData?.profile.country}`}
                          </span>
                        </span>
                      </div>
                      
                      {/* Operating Hours */}
                      <div className="mt-6">
                        <h4 className="text-lg font-medium mb-3">Operating Hours</h4>
                        {businessData?.profile.operating_hours && (
                          <div className="space-y-2">
                            {Object.entries(businessData.profile.operating_hours).map(([day, hours]) => {
                              // Convert day names for display
                              const dayName = day === 'web' ? 'Wednesday' : 
                                            day === 'mon' ? 'Monday' :
                                            day === 'tue' ? 'Tuesday' :
                                            day === 'thu' ? 'Thursday' :
                                            day === 'fri' ? 'Friday' :
                                            day === 'sat' ? 'Saturday' :
                                            day === 'sun' ? 'Sunday' : day;
                              
                              // Check if hours is empty string, "closed", or undefined
                              const isStoreClosed = !hours || hours.toLowerCase() === 'closed';
                              
                              return (
                                <div key={day} className="flex justify-between items-center border-b py-1">
                                  <span className="capitalize font-medium">{dayName}</span>
                                  <span className={isStoreClosed ? "text-red-500" : ""}>
                                    {isStoreClosed ? 'Closed' : hours}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="my-4 mx-10 "></hr>

            <section
              className="bg-white  rounded-lg p-6 mb-8 text-center"
              id="about"
              style={{ scrollMarginTop: "100px" }}
            >
              <h2 className="text-xl font-medium mb-2">About Us</h2>
              <div className="hidden md:block flex flex-col items-center justify-center">
                {/* <h2 className="text-xl font-medium mb-2">Contact us</h2> */}
                <p className="text-4xl font-mediu mb-2">
                  {businessData?.user.phone || "Not available"}
                </p>
                <div className="flex justify-center pb-11">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="538"
                    height="39"
                    viewBox="0 0 538 39"
                    fill="none"
                  >
                    <path
                      d="M1 36.9999C90.6667 10.9999 323.3 -25.4001 536.5 36.9999C439.667 17.8332 197 -9.00014 1 36.9999Z"
                      fill="#009A36"
                      stroke="#009A36"
                      stroke-width="4"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-[#111111] text-md text-justify text-center font-medium leading-relaxed">
                  {businessData?.profile.description ||
                    "No description available"}
                </p>
              </div>
              <div className="mt-24">
                <h2 className="text-xl font-medium mb-4">
                  Our Social Media Connects
                </h2>
                <div className="flex justify-center gap-4">
                  {Object.entries(businessData?.profile.socials || {}).map(
                    ([platform, url]) => {
                      if (url) {
                        const Icon = socialIcons[platform as keyof typeof socialIcons];
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <Icon className="w-5 h-5" />
                          </a>
                        );
                      }
                      return null;
                    }
                  )}
                </div>
              </div>
            </section>

          </section>

          {/* <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Business Registration</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">GST</h3>
                <p>12ABCDE1234Z5</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Other License</h3>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  View License
                </a>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Shop & Establishment license
                </h3>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  View License
                </a>
              </div>
            </div>
          </section> */}

          <section
            className="my-7"
            id="qr"
            style={{ scrollMarginTop: "100px" }}
          >
            <DynamicQRCode />
          </section>
        </main>
      </div>
      <FooterSection />
    </div>
  );
};

export default DevMorphixWebsite;
