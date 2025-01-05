import React, { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { ASSET_BASE_URL } from "@/app/api";

interface ImageSectionProps {
  images?: Array<{
    src: string;
    alt: string;
    isVideo?: boolean;
    className?: string;
    size?: 'small' | 'medium' | 'large';
  }>;
  media?: Array<{
    _id: string;
    url: string;
    type?: string;
    size?: 'small' | 'medium' | 'large';
  }>;
  className?: string;
}

const defaultImages: ImageSectionProps['images'] = [
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(1).jpg",
    alt: "Office Space 1",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(10).jpg",
    alt: "Office Space 2",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(2).jpg",
    alt: "Office Space 2",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(3).jpg",
    alt: "Office Corridor",
    size: "medium",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(4).jpg",
    alt: "Lab Entrance",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(5).jpg",
    alt: "Office Space 1",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(6).jpg",
    alt: "Office Space 2",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(7).jpg",
    alt: "Office Space 2",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(8).jpg",
    alt: "Office Corridor",
    size: "medium",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(9).jpg",
    alt: "Lab Entrance",
    size: "small",
  },
  
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(10).jpg",
    alt: "Office Space 2",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(2).jpg",
    alt: "Office Space 2",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(3).jpg",
    alt: "Office Corridor",
    size: "medium",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(4).jpg",
    alt: "Lab Entrance",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(5).jpg",
    alt: "Office Space 1",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(6).jpg",
    alt: "Office Space 2",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(7).jpg",
    alt: "Office Space 2",
    size: "small",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(8).jpg",
    alt: "Office Corridor",
    size: "medium",
  },
  {
    src: "https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(9).jpg",
    alt: "Lab Entrance",
    size: "small",
  },
// {
//   src: "/workspace.mp4",
//   alt: "Workspace Video",
//   isVideo: true,
//   size: 'large'
// },
// Add more images as needed
] as const;
const ImageSection = ({ images = defaultImages, media = [], className }: ImageSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    alt: string;
    isVideo: boolean;
  }>(null);

  if (media.length === 0) {
    return null;
  }

  const mediaImages = media.map((item, index) => ({
    src: `${ASSET_BASE_URL}/${item.url}`,
    alt: `Business Image ${index + 1}`,
    size: item.size || 'medium' as const,
    isVideo: item.type ? item.type.startsWith('video/') : false,
  }));

  const getBentoSpan = (imageSize?: 'small' | 'medium' | 'large') => {
    switch(imageSize) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-2 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <>
      <section className={cn(
        "w-full max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden",
        "border border-gray-200",
        "h-[600px]",
        className
      )}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">Gallery</h2>
        </div>

        {/* Scrollable Container with Hidden Scrollbar */}
        <div className="h-[calc(600px-64px)] overflow-y-auto px-6 py-4 
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
            {mediaImages.map((image, index) => {
              const bentoSpan = getBentoSpan(image.size);
              
              return (
                <div 
                  key={index} 
                  className={cn(
                    "relative rounded-xl overflow-hidden group",
                    bentoSpan,
                    "cursor-pointer transform transition-all duration-300",
                    "shadow-sm hover:shadow-xl",
                    "border border-gray-200",
                    "hover:-translate-y-1"
                  )}
                  onClick={() => setSelectedImage(image)}
                >
                  {image.isVideo ? (
                    <video className="w-full h-full object-cover" controls>
                      <source src={image.src} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="w-full h-full relative">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal with Animation */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full mx-auto transform transition-all duration-300">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </button>
            
            {selectedImage.isVideo ? (
              <video 
                className="w-full max-h-[90vh] object-contain rounded-lg" 
                controls 
                autoPlay
              >
                <source src={selectedImage.src} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSection;