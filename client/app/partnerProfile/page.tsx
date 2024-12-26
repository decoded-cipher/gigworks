"use client";

import React, { useState } from "react";
import { MapPin, Clock, Phone, Briefcase, Dribbble } from "lucide-react";
import ImageGrid from "../components/imgsec";
import { FooterSection } from "../components/FooterSection";
import { div } from "framer-motion/client";
import DynamicQRCode from "../components/QrSection";
import ScrollToTopButton from "../components/ScrollToTop";

const DevMorphixWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

  const textToCopy = "#ABC23SK";

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

  return (
    <div className="font-circular">
      <div className="px-4 sm:px-6 lg:px-52">
        <main>
          <ScrollToTopButton isProfilePage={true} />
          <section className="relative py-8 flex flex-col items-center text-center border mb-2 -mt-2 rounded-3xl">
            <div className="absolute top-0 left-0 right-0 h-72 overflow-hidden">
              <img
                src="/back.png"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 w-80 h-80 border border-white border-8 bg-black rounded-full flex items-center justify-center mb-8 mt-20">
              {/* <h1 className="text-white text-4xl font-bold">DEV.X</h1> */}
              <img src="/444.png" alt="Logo" width={200} height={200} />{" "}
              {/*  if you want to zoom in or zoom out, change the width and height */}
            </div>

            <h2 className="sm:text-6xl text-4xl font-bold mb-4">
              Arjun A Acharry
            </h2>
            <p className="sm:text-2xl text-xl font-medium mb-8">
              Reference Code
            </p>
            <div className="flex justify-center items-center w-full">
              <div className="inline-flex items-center gap-2">
                <p className="text-xl font-medium mb-8">{textToCopy}</p>
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
          <h2 className="text-2xl font-semibold mb-4 text-center py-4">Analytics</h2>
          <section className="relative py-8 flex flex-col items-center text-center border mb-2 -mt-2 rounded-3xl">

          </section>
        </main>
      </div>
      <FooterSection />
    </div>
  );
};

export default DevMorphixWebsite;
