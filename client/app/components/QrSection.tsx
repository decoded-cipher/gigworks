"use client";

import React, { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { url } from "inspector";

const DynamicQRCode = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [showUrl,SetShowUrl] = useState("")
 
  useEffect(() => {
    setCurrentUrl(window.location.href);
    const url = window.location.href
    const cleanUrl = url.replace(/^(https?:\/\/)/, '');
    SetShowUrl(cleanUrl);
  }, []);

  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check this out!",
          url: currentUrl,
        });
      } else {
  
        await navigator.clipboard.writeText(currentUrl);
        alert("URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div>
      <div className="w-80 mx-auto bg-white border rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <h2 className="text-center font-medium mb-4">Scan Me</h2>

          {/* QR Code Image */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
              currentUrl
            )}`}
            alt="QR Code"
            className="w-full h-auto mx-auto"
          />

          {/* URL Text */}
          <p className="text-sm text-gray-500 text-center break-all">
            {showUrl}
          </p>
        </div>
      </div>
          <button
            onClick={handleShare}
            className="flex items-center justify-center w-full gap-2 p-2 mt-4 text-sm bg-transparent "
          >
            <Share2 className="w-4 h-4" />
            share
          </button>
    </div>
  );
};

export default DynamicQRCode;
