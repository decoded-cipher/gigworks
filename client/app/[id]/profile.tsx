"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, Mail, Phone, Pencil } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import ImageGrid from "@/app/components/imgsec";
import { FooterSection } from "@/app/components/FooterSection";

// Component to handle description rendering with hydration safety
function BusinessDescription({ description }: { description: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During server-side rendering and initial client render, show plain text
  if (!isClient) {
    return (
      <div className="text-[#111111] text-md text-left font-medium leading-relaxed">
        {description
          ? description.replace(/<[^>]*>/g, "")
          : "No description available"}
      </div>
    );
  }

  // After hydration, show HTML content
  return (
    <div
      className="text-[#111111] text-md text-left font-medium leading-relaxed"
      dangerouslySetInnerHTML={{
        __html: description || "No description available",
      }}
    />
  );
}
import DynamicQRCode from "@/app/components/QrSection";
import ScrollToTopButton from "@/app/components/ScrollToTop";
import { ASSET_BASE_URL, UserLogout } from "@/app/api";
import { useRouter } from "next/navigation";

interface JWTPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  email?: string;
  name?: string;
}

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
  latitude: number;
  longitude: number;
  location_url: string;
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
  slug: string;
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

interface BusinessProfileClientProps {
  businessData: BusinessData;
  initialTokenData: JWTPayload | null;
  isOwner: boolean;
  slug: string;
}

export default function BusinessProfileClient({
  businessData,
  initialTokenData,
  isOwner: initialIsOwner,
  slug,
}: BusinessProfileClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<{
    platform: string;
  } | null>(null);
  const [tokenData, setTokenData] = useState<JWTPayload | null>(
    initialTokenData
  );
  const [isOwner, setIsOwner] = useState(initialIsOwner);
  const [userProfiles] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userProfiles");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // 🎯 NAVIGATION ITEMS FOR THE PROFILE PAGE
  const navItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
    { label: "QR Code", href: "#qr" },
  ];

  const router = useRouter();

  // 🎯 OPTIMIZED EVENT HANDLERS
  const handleClickOutside = (event: MouseEvent) => {
    const dropdown = document.getElementById("account-dropdown");
    if (dropdown && !dropdown.contains(event.target as Node)) {
      setIsAccountMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🎯 DYNAMIC MAP COMPONENT WITH OPTIMIZED LOADING
  const MapWithNoSSR = dynamic(() => import("../components/MapComponent"), {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <div className="flex flex-col items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mb-2 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p>Loading map...</p>
        </div>
      </div>
    ),
  });

  // 🎯 SOCIAL MEDIA ICONS MAPPING
  const socialIcons: { [key: string]: string } = {
    instagram: "/icon/instagram.svg",
    facebook: "/icon/facebook.svg",
    linkedin: "/icon/linkedin.svg",
    twitter: "/icon/twitter.svg",
    youtube: "/icon/youtube.svg",
    reddit: "/icon/reddit.svg",
    tiktok: "/icon/tiktok.svg",
    pinterest: "/icon/pinterest.svg",
    behance: "/icon/behance.svg",
    dribbble: "/icon/dribbble.svg",
    github: "/icon/github.svg",
    medium: "/icon/medium.svg",
    website: "/icon/globe.svg",
  };

  const handleJWTToken = () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        console.log("No JWT token found in cookies");
        localStorage.clear();
        return null;
      }

      const decodedToken = jwtDecode<JWTPayload>(token);

      if (decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        const isExpired = decodedToken.exp < currentTime;

        console.log(
          "Token Expiration Status:",
          isExpired ? "Expired" : "Valid"
        );

        if (isExpired) {
          console.log("Token has expired");
          localStorage.removeItem("userData");
          localStorage.removeItem("userProfiles");
          Cookies.remove("token");
          return null;
        }
      }

      return decodedToken;
    } catch (error) {
      console.error("Error handling JWT token:", error);
      return null;
    }
  };

  useEffect(() => {
    const decoded = handleJWTToken();
    setTokenData(decoded);
    setIsOwner(decoded?.name === businessData.user.name);
  }, [businessData.user.name]);

  const handleEditClick = () => {
    router.push(`/${slug}/edit`);
  };

  const handlelogout = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        console.log("No JWT token found in cookies");
        return null;
      }
      const res = await UserLogout(token);

      if (res.status === 200) {
        Cookies.remove("token");
        localStorage.removeItem("userData");
        localStorage.removeItem("userProfiles");
        router.push("/");
      } else {
        console.log("Error logging out:", res);
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        const shareText = `${businessData?.profile.name}

📍 Location: ${businessData?.profile.address}, ${businessData?.profile.city}
📞 Contact: +91 ${businessData?.user.phone}

Visit our business profile:`;

        await navigator.share({
          title: businessData?.profile.name,
          text: shareText,
          url: `https://gigwork.co.in/${slug}`,
        });
      } else {
        console.log("Link copied to clipboard!");
        await navigator.clipboard.writeText(window.location.href);
        console.log(navigator.clipboard.writeText(window.location.href));
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleWhatsApp = () => {
    if (businessData?.user.phone) {
      const phoneNumber = businessData.user.phone.replace(/\D/g, "");
      const formattedPhone = phoneNumber.startsWith("91")
        ? phoneNumber
        : `91${phoneNumber}`;
      const whatsappUrl = `https://wa.me/${formattedPhone}`;
      window.open(whatsappUrl, "_blank");
    } else {
      alert("No phone number available");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

  function formatOperatingHours(hours: { [key: string]: string }) {
    const to12Hour = (time24: string) => {
      if (!time24 || time24.toLowerCase() === "closed") return "Closed";
      const [hours, minutes] = time24.split(":");
      let hour = Number.parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      hour = hour ? hour : 12;
      return `${hour}:${minutes} ${ampm}`;
    };

    const formatTimeRange = (timeRange: string) => {
      if (timeRange === "Closed") return "Closed";
      const [start, end] = timeRange.split("-");
      return `${to12Hour(start.trim())} - ${to12Hour(end.trim())}`;
    };

    const DAY_NAMES: { [key: string]: string } = {
      mon: "Monday",
      tue: "Tuesday",
      web: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
      sun: "Sunday",
    };

    const orderedDays = ["mon", "tue", "web", "thu", "fri", "sat", "sun"];
    const uniqueDays = new Map();

    orderedDays.slice(0, 7).forEach((day) => {
      if (hours[day]) {
        uniqueDays.set(DAY_NAMES[day], formatTimeRange(hours[day]));
      }
    });

    return Array.from(uniqueDays).map(([day, hours]) => ({
      day,
      hours,
    }));
  }

  return (
    <div className="font-circular">
      {/* 🎯 LOADING STATE */}
      {!businessData ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading business profile...</p>
          </div>
        </div>
      ) : (
        <>
          <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50 shadow-md px-2 sm:px-4 lg:px-52">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 sm:p-4">
              <a
                href=""
                className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse w-1/2 sm:w-auto"
              >
                <span className="self-center text-sm sm:text-base lg:text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis dark:text-white max-w-[150px] sm:max-w-[200px] lg:max-w-[300px]">
                  {businessData?.profile.name || "Business Name"}
                </span>
              </a>

              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-1.5 sm:p-2 w-8 h-8 sm:w-10 sm:h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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

              <div
                className={`w-full md:block md:w-auto ${
                  isMenuOpen ? "block" : "hidden"
                }`}
                id="navbar-default"
              >
                <ul className="font-medium flex flex-col p-2 sm:p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 lg:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        onClick={handleNavItemClick}
                        className="block py-1.5 px-2 sm:py-2 sm:px-3 text-sm sm:text-base rounded text-gray-900 hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 dark:text-white md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        aria-current={
                          item.label === "Home" ? "page" : undefined
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* 🎯 MAIN CONTENT */}
          <div className="px-4 mt-12 sm:px-6 lg:px-52">
            <main>
              <ScrollToTopButton isProfilePage={true} />

              {/* 🎯 HERO SECTION */}
              <section className="relative pb-8 flex flex-col items-center text-center border mb-2 -mt-2 rounded-3xl">
                <div className="w-full relative ">
                  <img
                    src={
                      businessData?.profile.banner
                        ? `${ASSET_BASE_URL}/${businessData.profile.banner}`
                        : "/assets/media/15879.png"
                    }
                    alt="Background"
                    className=" top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                {isOwner && (
                  <div
                    className="absolute top-5 sm:top-12 left-4"
                    id="account-dropdown"
                  >
                    <button
                      onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                      className="p-2 px-4 text-xs text-white bg-black hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2"
                    >
                      Account
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transform transition-transform ${
                          isAccountMenuOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {isAccountMenuOpen && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                        {userProfiles.map((profile: any) => (
                          <button
                            key={profile.id}
                            onClick={() => {
                              router.push(`/${profile.slug}`);
                              setIsAccountMenuOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                            {profile.name}
                          </button>
                        ))}
                        <div className="border-t border-gray-200 my-1" />
                        <button
                          onClick={() => {
                            router.push("/signup");
                            setIsAccountMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-green-600 hover:bg-green-600 hover:text-white flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                          Add new business
                        </button>
                        <div className="border-t border-gray-200 my-1" />
                        <button
                          onClick={() => {
                            handlelogout();
                            setIsAccountMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {isOwner && (
                  <button
                    onClick={handleEditClick}
                    className="absolute top-5 sm:top-12 right-4 p-2 bg-white  hover:bg-gray-300 rounded-full transition-colors"
                    title="Edit Business Profile"
                  >
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                )}

                <div className="absolute left-1/2 w-32 sm:w-60 h-auto transform -translate-x-1/2 bottom-[13rem] sm:bottom-[14rem] ">
                  <img
                    src={
                      businessData?.profile.avatar
                        ? `${ASSET_BASE_URL}/${businessData.profile.avatar}`
                        : "/assets/media/defaultbusiness.png"
                    }
                    alt="Logo"
                    className="w-full h-full rounded-full border-4 border-white object-cover shadow-lg"
                  />
                </div>

                <div className="relative inline-flex items-center mt-24 sm:mt-32">
                  <h2 className="sm:text-4xl text-3xl font-bold mb-4">
                    {businessData?.profile.name}
                  </h2>
                </div>

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
                      <span>WhatsApp</span>
                    </div>
                  </button>
                </div>
              </section>

              <section></section>

              {businessData?.media && businessData.media.length > 0 && (
                <section className="mt-7">
                  <ImageGrid
                    media={businessData.media}
                    className="bg-white shadow-lg rounded-lg overflow-hidden border my-2 w-full rounded-3xl"
                  />
                </section>
              )}

              <section
                className="border my-7  rounded-3xl "
                id="services"
                style={{ scrollMarginTop: "100px" }}
              >
                {businessData?.profile.additional_services && (
                  <section className="bg-white rounded-full p-6 mb-8">
                    <h2 className="text-2xl font-bold text-center mb-6">
                      Services Provides
                    </h2>
                    <div className="max-w-4xl mx-auto">
                      <div className="flex flex-wrap gap-6 justify-center">
                        {(
                          businessData?.profile.additional_services
                            .split(",")
                            .slice(0, 5)
                            .map((service) => {
                              return service
                                .trim()
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())
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
                  </section>
                )}
                <hr className="my-4 mx-10 "></hr>

                <section
                  className="flex flex-col md:flex-row gap-6 mb-8"
                  id="contact"
                  style={{ scrollMarginTop: "100px" }}
                >
                  <div className="md:w-1/2 z-10">
                    <div className="bg-white rounded-lg p-6 h-full">
                      <div className="h-[500px] rounded-lg overflow-hidden">
                        {businessData?.profile?.latitude &&
                        businessData?.profile?.longitude ? (
                          <button
                            onClick={() => {
                              if (businessData?.profile?.location_url) {
                                window.open(
                                  businessData.profile.location_url,
                                  "_blank"
                                );
                              }
                            }}
                            className="w-full h-full"
                            title="View on Google Maps"
                          >
                            <MapWithNoSSR
                              position={[
                                businessData.profile.latitude,
                                businessData.profile.longitude,
                              ]}
                              popupText={
                                businessData.profile.name || "Business Location"
                              }
                            />
                          </button>
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-gray-500">
                            Location not available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2">
                    <div className="gap-4 p-6">
                      <div className="bg-white rounded-lg mt-6">
                        <h3 className="text-xl font-light mb-4">
                          {businessData?.profile.name}
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="font-light text-md text-black">
                              <span>{businessData?.profile.email}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="font-light text-md text-black">
                              <span>
                                +91{" "}
                                {businessData?.profile.phone ||
                                  businessData?.user.phone ||
                                  "Not available"}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                            <span className="font-light text-md text-black">
                              <span>
                                {`${businessData?.profile.address}, ${businessData?.profile.city}, ${businessData?.profile.state}, ${businessData?.profile.country}`}
                              </span>
                            </span>
                          </div>

                          <div className="mt-6">
                            <h4 className="text-lg font-medium mb-3">
                              Operating Hours
                            </h4>
                            {businessData?.profile.operating_hours && (
                              <div className="space-y-2">
                                {formatOperatingHours(
                                  businessData.profile.operating_hours
                                ).map(({ day, hours }) => {
                                  const isStoreClosed =
                                    !hours || hours.toLowerCase() === "closed";

                                  return (
                                    <div
                                      key={day}
                                      className="flex justify-between items-center border-b py-1"
                                    >
                                      <span className="capitalize font-medium">
                                        {day}
                                      </span>
                                      <span
                                        className={
                                          isStoreClosed ? "text-red-500" : ""
                                        }
                                      >
                                        {isStoreClosed ? "Closed" : hours}
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
                  className="bg-white  rounded-lg p-6 mb-8 px-5 text-center"
                  id="about"
                  style={{ scrollMarginTop: "100px" }}
                >
                  <h2 className="text-xl font-medium mb-2">About Us</h2>
                  <div className="hidden md:block flex flex-col items-center justify-center">
                    <p className="text-4xl font-mediu mb-2">
                      +91{" "}
                      {businessData?.profile.phone ||
                        businessData?.user.phone ||
                        "Not available"}
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
                          strokeWidth="4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <BusinessDescription
                      description={businessData?.profile.description || ""}
                    />
                  </div>
                  {businessData?.profile.socials &&
                    Object.values(businessData.profile.socials).some(
                      (url) => url
                    ) && (
                      <div>
                        <h2 className="text-xl font-medium my-4">
                          Our Social Media Connects
                        </h2>
                        <div className="flex justify-center gap-4">
                          {Object.entries(businessData.profile.socials).map(
                            ([platform, url]) => {
                              if (url) {
                                const iconSrc =
                                  socialIcons[platform.toLowerCase()];

                                return (
                                  <div key={platform} className="relative">
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-600 hover:text-gray-800"
                                      onMouseEnter={() =>
                                        setHoveredIcon({ platform })
                                      }
                                      onMouseLeave={() => setHoveredIcon(null)}
                                    >
                                      {iconSrc ? (
                                        <img
                                          src={iconSrc || "/placeholder.svg"}
                                          alt={platform}
                                          className="w-6 h-6"
                                        />
                                      ) : (
                                        platform
                                      )}
                                    </a>
                                    {hoveredIcon?.platform === platform && (
                                      <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white px-3 py-1 rounded-md text-xs whitespace-nowrap">
                                        {platform.charAt(0).toUpperCase() +
                                          platform.slice(1)}
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                              return null;
                            }
                          )}
                        </div>
                      </div>
                    )}
                </section>
              </section>

              <section
                className="my-7"
                id="qr"
                style={{ scrollMarginTop: "100px" }}
              >
                <DynamicQRCode slug={slug || ""} />
              </section>
            </main>
          </div>
        </>
      )}

      <FooterSection />
    </div>
  );
}
