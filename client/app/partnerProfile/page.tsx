"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { MapPin, Clock, Phone, Briefcase, Dribbble } from "lucide-react";
import ImageGrid from "../components/imgsec";
import { FooterSection } from "../components/FooterSection";
import { div } from "framer-motion/client";
import ScrollToTopButton from "../components/ScrollToTop";
import { GetPartner, GetPartnerAnalytics, ASSET_BASE_URL ,UserLogout} from "../api";
import Cookies from "js-cookie";

interface PartnerData {
  name: string;
  phone: string;
  avatar: string;
  referral_code: string;
}

interface AnalyticsData {
  analytics: {
    month: string;
    count: number;
  }[];
  meta: {
    total: number;
    start: string;
    end: string;
  };
}

const DevMorphixWebsite = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = React.useState(false);
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [hoveredBar, setHoveredBar] = useState<{
    month: string;
    count: number;
  } | null>(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), 0, 1).toISOString().split("T")[0], // First day of current year
    end: new Date(new Date().getFullYear(), 11, 31).toISOString().split("T")[0], // Last day of current year
  });

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const [partnerResponse, analyticsResponse] = await Promise.all([
          GetPartner(),
          GetPartnerAnalytics(dateRange.start, dateRange.end),
        ]);
        setPartnerData(partnerResponse.data);
        setAnalyticsData(analyticsResponse.data);
      } catch (error) {
        const axiosError = error as AxiosError<{ error: string }>;
        console.error("Error fetching data:", axiosError);
        if (
          axiosError.response?.data?.error ===
          "Cannot read properties of undefined (reading 'avatar')"
        ) {
          router.push("/partnerSignup/1");
        }
        console.error("Error fetching data:", axiosError.response?.data?.error);
      }
    };

    fetchPartnerData();
  }, [dateRange, router]); // Re-fetch when date range changes



  const handlelogout = async () => {
    try {
      const token = Cookies.get("token");
      // console.log("Raw JWT Token:", token);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

  const textToCopy = partnerData?.referral_code || "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const navItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#service" },
    { label: "Contact", href: "#contact" },
    { label: "QR", href: "#qr" },
  ];

  const renderAnalyticsChart = () => {
    if (!analyticsData) return null;

    const maxCount = Math.max(
      ...analyticsData.analytics.map((item) => item.count)
    );
    const chartHeight = 200; // pixels

    return (
      <div className="w-full p-4">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex md:flex-row flex-col justify-between items-center">
            <span>Total Referrals: {analyticsData.meta.total}</span>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  className="border rounded-md p-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between h-[300px] pt-2 gap-2">
          {analyticsData.analytics.map((item) => {
            const height = item.count
              ? (item.count / maxCount) * chartHeight
              : 4;
            const month = new Date(item.month).toLocaleString("default", {
              month: "short",
            });

            return (
              <div
                key={item.month}
                className="flex flex-col items-center flex-1 relative"
                onMouseEnter={() => setHoveredBar(item)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${height}px` }}
                />
                <span className="text-xs mt-2 rotate-45 origin-left">{month}</span>
                <span className="text-xs mt-2">{item.count}</span>

                {/* Tooltip */}
                {hoveredBar?.month === item.month && (
                  <div className="absolute z-50 -top-8 bg-gray-800 text-white px-3 py-1 rounded-md text-xs whitespace-nowrap">
                    {`${month}: ${item.count}`} profiles
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="font-circular">
      <div className="px-4 sm:px-6 lg:px-52">
        <main>
          <ScrollToTopButton isProfilePage={true} />
          <section className="relative py-8 flex flex-col items-center text-center border mb-2 -mt-2 rounded-3xl">
            <div className="absolute top-0 left-0 right-0 h-72 overflow-hidden">
              <img
                src="/assets/media/back.png"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>
            <button
                onClick={handlelogout}
                className="absolute top-12 left-4 p-2 text-left text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2 rounded-lg"
                title="Edit Business Profile"
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
                {/* <Pencil className="w-4 h-4 text-gray-600" /> */}
              </button>

            <div className="relative z-10 w-80 h-80 border border-white border-8 bg-black rounded-full flex items-center justify-center mb-8 mt-20">
              {partnerData?.avatar ? (
                <img
                  src={`${ASSET_BASE_URL}/${partnerData.avatar}`}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <img src="/444.png" alt="Logo" width={200} height={200} />
              )}
            </div>

            <h2 className="sm:text-6xl text-4xl font-bold mb-4">
              {partnerData?.name || "Loading..."}
            </h2>
            <p className="text-xl font-light text-gray-600 mb-2">
              Reference Code
            </p>
            <div className="flex justify-center items-center w-full">
              <div className="inline-flex items-center gap-2">
                <p className="text-xl font-medium ">
                  {partnerData?.referral_code || "Loading..."}
                </p>
                <button
                  onClick={copyToClipboard}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  aria-label={copied ? "Copied" : "Copy to clipboard"}
                >
                  {copied ? (
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
                      className="text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
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
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </section>
          <h2 className="text-2xl font-semibold mb-4 text-center py-4">
            Analytics
          </h2>
          <section className="relative py-8 flex flex-col items-center text-center border mb-2 -mt-2 rounded-3xl">
            {renderAnalyticsChart()}
            <div className="flex items-center gap-2 mb-4">
              {/* <Phone size={20} />
              <p className="text-lg">{partnerData?.phone || "Loading..."}</p> */}
            </div>
          </section>
        </main>
      </div>
      <FooterSection />
    </div>
  );
};

export default DevMorphixWebsite;
