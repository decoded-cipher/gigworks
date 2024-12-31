"use client";

import { ReactNode, useState } from "react";
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
    size?: 'small' | 'medium' | 'large'; // Add size property to media items
  }>;
  className?: string;
}

// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(1).jpg
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(1).png
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(10).jpg
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(11).jpg
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(12).jpg
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(2).jpg
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(3).jpg
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(4).jpg
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(5).jpg
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(6).jpg 
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(7).jpg
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(8).jpg
// https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/1%20(9).jpg

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
  const [expandedImage, setExpandedImage] = useState<number | null>(null);

  if (media.length === 0) {
    return null;
  }

  // Update the mediaImages mapping to include the size property
  const mediaImages = media.map((item, index) => ({
    src: `${ASSET_BASE_URL}/${item.url}`,
    alt: `Business Image ${index + 1}`,
    size: item.size || 'medium' as const, // Use provided size or default to medium
    isVideo: item.type ? item.type.startsWith('video/') : false,
  }));

  // Update the grid layout logic
  const getGridSpan = (imageSize?: 'small' | 'medium' | 'large') => {
    switch(imageSize) {
      case 'large':
        return 'lg:col-span-2 lg:row-span-2';
      case 'medium':
        return 'sm:col-span-2';
      default:
        return '';
    }
  };

  return (
    <section className={cn("w-full h-[400px] sm:h-[500px] sm:w-auto lg:h-[700px] p-4", className)}>
      <div className="h-full overflow-hidden">
        <div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(100px)] gap-2 overflow-y-auto pr-2">
          {mediaImages.map((image, index) => {
            const gridSpan = getGridSpan(image.size);
            const isExpanded = expandedImage === index;
            
            return (
              <div 
                key={index} 
                className={cn(
                  "relative rounded-lg transition-all duration-300",
                  gridSpan,
                  isExpanded ? "row-span-2" : "",
                  "cursor-pointer group"
                )}
                onClick={() => setExpandedImage(isExpanded ? null : index)}
              >
                {image.isVideo ? (
                  <video className="w-full h-full object-contain rounded-lg" controls>
                    <source src={image.src} type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full h-full aspect-square sm:aspect-[4/3] flex items-center justify-center">
                    {/* Replace Next.js Image with standard img tag */}
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className={cn(
                        "w-full h-full rounded-lg object-cover transition-transform duration-300",
                        isExpanded ? "object-contain" : "group-hover:scale-105"
                      )}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImageSection;