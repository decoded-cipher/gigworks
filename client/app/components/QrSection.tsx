import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Share2 } from 'lucide-react';

interface QrSectionProps {
  slug: string;
  // currentUrl: string;
  // handleShare: () => void;
}

const QrSection: React.FC<QrSectionProps> = ({ slug}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);
  const currentUrl = `https://gigwork.co.in/${slug}`;

  useEffect(() => {
    // Clear the container first
    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = '';
    }

    // Create new QR code instance only if it doesn't exist
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: 200,
        height: 200,
        data: currentUrl,
        image: '../favicon-32x32.png',
        dotsOptions: {
          color: '#000000',
          type: 'rounded'
        },
        backgroundOptions: {
          color: '#ffffff',
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 10
        }
      });
    } else {
      // If QR code instance exists, just update the data
      qrCode.current.update({
        data: currentUrl
      });
    }

    // Append to container
    if (qrCodeRef.current && qrCode.current) {
      qrCode.current.append(qrCodeRef.current);
    }

    return () => {
      if (qrCodeRef.current) {
        qrCodeRef.current.innerHTML = '';
      }
    };
  }, [currentUrl]);
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Gigwork',
        text: 'Check out this business on Gigwork!',
        url: currentUrl,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      window.open(currentUrl, '_blank');
    }
  };

  return (
    <div>
      <div className="w-60 sm:w-80 mx-auto bg-white border rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <h2 className="text-center font-medium mb-4">Scan Me</h2>
          <div ref={qrCodeRef} className="w-full h-auto mx-auto flex justify-center" />
      <p className="text-sm text-gray-500 text-center break-all mt-4">
        gigwork.co.in/{slug}
      </p>
        </div>
      </div>
      <button
        onClick={handleShareClick}
        className="flex items-center justify-center w-full gap-2 p-2 mt-4 text-sm bg-transparent"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>
    </div>
  );
};

export default QrSection;