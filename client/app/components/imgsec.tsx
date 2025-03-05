import React, { useState, useRef } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ASSET_BASE_URL } from "@/app/api";
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageSectionProps {
  images?: Array<{
    src: string;
    alt: string;
    isVideo?: boolean;
    className?: string;
    size?: 'small' | 'medium' | 'large';
    description?: string | null;
  }>;
  media?: Array<{
    _id?: string;
    id?: string;
    url: string;
    type?: string;
    size?: 'small' | 'medium' | 'large';
    description?: string | null;
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
] as const;

const ImageSection = ({ images = defaultImages, media = [], className }: ImageSectionProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  if (media.length === 0) {
    return null;
  }

  const mediaImages = media.map((item, index) => {
    const fileType = item.type || '';
    const isVideo = fileType.includes('video') || item.url.endsWith('.mp4') || item.url.endsWith('.quicktime') || item.url.endsWith('.mov');
    return {
      src: `${ASSET_BASE_URL}/${item.url}`,
      alt: `Business Image ${index + 1}`,
      size: item.size || 'medium' as const,
      isVideo,
      description: item.description || null,
      id: item.id || item._id || `img-${index}`,
    };
  });

  const getBentoSpan = (imageSize?: 'small' | 'medium' | 'large') => {
    switch(imageSize) {
      case 'large':
        return 'md:col-span-1 md:row-span-1';//'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-1';//'md:col-span-2 md:row-span-1'; 
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <>
      <section className={cn(
        "w-full mx-auto bg-white rounded-xl shadow-xl overflow-hidden",
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
                  key={image.id} 
                  className={cn(
                    "relative rounded-xl overflow-hidden group",
                    bentoSpan,
                    "cursor-pointer transform transition-all duration-300",
                    "shadow-sm hover:shadow-xl",
                    "border border-gray-200",
                    "hover:-translate-y-1"
                  )}
                  onClick={() => setSelectedImageIndex(index)}
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
                      
                      {/* Description Overlay - Show if available */}
                      {image.description && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white text-sm truncate">{image.description}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal with Swiper for Images */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div className="relative max-w-7xl w-full h-full mx-auto transform transition-all duration-300">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(null);
              }}
              className="absolute top-4 right-4 z-50 text-white hover:text-black/40 bg-black/10 hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </button>

            <div className="absolute top-1/2 -translate-y-1/2 left-4 z-40">
              <button
                onClick={handlePrevImage}
                className="bg-black/20 hover:bg-white/20 p-2 rounded-full text-white"
              >
                <ChevronLeft size={24} />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-4 z-40">
              <button
                onClick={handleNextImage}
                className="bg-black/20 hover:bg-white/20 p-2 rounded-full text-white"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div onClick={(e: React.MouseEvent) => e.stopPropagation()} className="h-full w-full flex items-center justify-center">
              <Swiper
                initialSlide={selectedImageIndex}
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                className="h-full w-full flex items-center"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setSelectedImageIndex(swiper.activeIndex)}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
              >
                {mediaImages.map((image, index) => (
                  <SwiperSlide key={`slide-${image.id}`} className="flex flex-col items-center justify-center h-full">
                    {image.isVideo ? (
                      <video 
                        className="w-full max-h-[80vh] object-contain rounded-lg" 
                        controls 
                        autoPlay
                      >
                        <source src={image.src} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full w-full">
                        <div className="flex items-center justify-center flex-1">
                          <img 
                            src={image.src} 
                            alt={image.alt}
                            className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
                          />
                        </div>
                        {image.description && (
                          <div className="bg-black/60 p-4 mt-4 rounded-lg max-w-2xl">
                            <p className="text-white text-center">{image.description}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSection;