import React, { useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface QrSectionProps {
  slug: string;
  // currentUrl: string;
  // handleShare: () => void;
}

const QrSection: React.FC<QrSectionProps> = ({ slug}) => {
  const qrCodeContainerRef = useRef<HTMLDivElement>(null);
const currentUrl = `https://gigwork.co.in/${slug}`;

  const handleShareClick = async () => {
    if (navigator.share && qrCodeContainerRef.current) {
      try {
        const canvas = await html2canvas(qrCodeContainerRef.current);
        canvas.toBlob((blob) => {
          if (blob) {
            const filesArray = [
              new File([blob], 'qr-code.png', {
                type: blob.type,
              }),
            ];

            const shareData = {
              title: 'Gigwork',
              text: `Check out this business on Gigwork!\n${currentUrl}`,
              files: filesArray,
            };

            if (navigator.canShare && navigator.canShare({ files: filesArray })) {
              navigator.share(shareData)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
            } else {
              // Fallback for browsers that do not support file sharing
              navigator.share({
                title: 'Gigwork',
                text: `Check out this business on Gigwork!\n${currentUrl}`,
                url: currentUrl,
              })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
            }
          }
        });
      } catch (error) {
        console.error('Error generating image for sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      window.open(currentUrl, '_blank');
    }
  };

  return (
    <div>
      <div ref={qrCodeContainerRef} className="w-60 sm:w-80 mx-auto bg-white border rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <h2 className="text-center font-medium mb-4">Scan Me</h2>
          <div className='flex justify-center'>

          <QRCode
            value={currentUrl}
            logoImage="../assets/qr ref1.png"
            size={200}
            qrStyle="dots"
            eyeRadius={10}
            logoWidth={108}
            logoHeight={30}
            logoOpacity={4.8}
            
            />
            </div>
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