"use client";

import React, { useEffect, useState, useRef } from "react";
import { Share2 } from "lucide-react";
import html2canvas from 'html2canvas';

const DynamicQRCode = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [showUrl, setShowUrl] = useState("");
  const shareRef = useRef(null);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    const url = window.location.href;
    const cleanUrl = url.replace(/^(https?:\/\/)/, '');
    setShowUrl(cleanUrl);
  }, []);

  const handleShare = async () => {
    try {
      if (shareRef.current) {
        const canvas = await html2canvas(shareRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        // Convert canvas to blob
        const blob = await (await fetch(canvas.toDataURL())).blob();
        const file = new File([blob], 'share-qr.png', { type: 'image/png' });

        if (navigator.share) {
          await navigator.share({
            title: "Scan QR Code",
            text: `Check out this link: ${currentUrl}`,
            url: currentUrl,
            files: [file],
            
        });
        } else {
          // Fallback for browsers without native share
          const link = document.createElement('a');
          link.href = canvas.toDataURL();
          link.download = 'share-qr.png';
          link.click();          
        }
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Sharing failed. Please try again.");
    }
  };

  return (
    <div>
      <div 
        ref={shareRef} 
        className="w-80 mx-auto bg-white border rounded-lg shadow-lg p-6"
      >
        <div className="space-y-4">
          <h2 className="text-center font-medium mb-4">Scan Me</h2>

          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`}
            alt="QR Code"
            className="w-full h-auto mx-auto"
          />

          <p className="text-sm text-gray-500 text-center break-all">
            {showUrl}
          </p>
        </div>
      </div>

      <button
        onClick={handleShare}
        className="flex items-center justify-center w-full gap-2 p-2 mt-4 text-sm bg-transparent"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>
    </div>
  );
};

export default DynamicQRCode;