"use client"

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageSectionProps {
  images?: Array<{
    src: string;
    alt: string;
    isVideo?: boolean;
    className?: string;
    size?: 'small' | 'medium' | 'large';
  }>;
  className?: string;
}

const defaultImages = [
  { 
    src: "/2(1).png", 
    alt: "Office Space 1",
    size: 'small'
  },
  { 
    src: "/2(2).png", 
    alt: "Office Space 2",
    size: 'small'
  },
  { 
    src: "/2(3).png", 
    alt: "Office Corridor",
    size: 'medium'
  },
  { 
    src: "/2(4).png", 
    alt: "Lab Entrance",
    size: 'small'
  },
  { 
    src: "/2(5).png", 
    alt: "Lab Space",
    size: 'small'
  }
] as const;

const ImageSection = ({ images = defaultImages, className }: ImageSectionProps) => {
  const [expandedImage, setExpandedImage] = useState<number | null>(null);

  return (
    <section className={cn("w-full h-[400px] p-2", className)}>
      <div className="grid grid-cols-3 gap-1 h-full overflow-hidden">
        <div className="col-span-3 grid grid-cols-3 gap-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          {images.map((image, index) => {
            const gridSpan = image.size === 'large' ? 'col-span-2 row-span-2' : 
                            image.size === 'medium' ? 'col-span-2' : 'col-span-1';
            
            const isExpanded = expandedImage === index;
            
            return (
              <div 
                key={index} 
                className={cn(
                  "relative overflow-hidden rounded-lg bg-gray-100 transition-all duration-300",
                  gridSpan,
                  isExpanded ? "row-span-2" : "h-32",
                  "cursor-pointer",
                  image.className
                )}
                onClick={() => setExpandedImage(isExpanded ? null : index)}
              >
                {image.isVideo ? (
                  <video className="w-full h-full object-contain" controls>
                    <source src={image.src} type="video/mp4" />
                  </video>
                ) : (
                  <div className={cn(
                    "w-full h-full flex items-center justify-center p-1",
                    isExpanded ? "aspect-auto" : "aspect-square"
                  )}>
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className={cn(
                        "max-w-full max-h-full w-auto h-auto object-contain transition-all duration-300",
                        isExpanded ? "scale-100" : "hover:scale-105"
                      )}
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