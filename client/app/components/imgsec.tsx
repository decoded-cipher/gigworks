        "use client";

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

    const defaultImages: ImageSectionProps['images'] =    [
      {
        src: "/2 (1).png",
        alt: "Office Space 1",
        size: "small",
      },
      {
        src: "/2 (2).png",
        alt: "Office Space 2",
        size: "small",
      },
      {
        src: "/2 (2).png",
        alt: "Office Space 2",
        size: "small",
      },
      {
        src: "/2 (3).png",
        alt: "Office Corridor",
        size: "medium",
      },
      {
        src: "/2 (4).png",
        alt: "Lab Entrance",
        size: "small",
      },
      {
        src: "/2 (1).png",
        alt: "Office Space 1",
        size: "small",
      },
      {
        src: "/2 (2).png",
        alt: "Office Space 2",
        size: "small",
      },
      {
        src: "/2 (2).png",
        alt: "Office Space 2",
        size: "small",
      },
      {
        src: "/2 (3).png",
        alt: "Office Corridor",
        size: "medium",
      },
      {
        src: "/2 (4).png",
        alt: "Lab Entrance",
        size: "small",
      },
      {
        src: "/2 (1).png",
        alt: "Office Space 1",
        size: "small",
      },
      {
        src: "/2 (2).png",
        alt: "Office Space 2",
        size: "small",
      },
      {
        src: "/2 (2).png",
        alt: "Office Space 2",
        size: "small",
      },
      {
        src: "/2 (3).png",
        alt: "Office Corridor",
        size: "medium",
      },
      {
        src: "/2 (4).png",
        alt: "Lab Entrance",
        size: "small",
      },
      {
        src: "/2 (4).png",
        alt: "Lab Entrance",
        size: "small",
      },
      {
        src: "/2 (5).png",
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

    const ImageSection = ({ images = defaultImages, className }: ImageSectionProps) => {
    const [expandedImage, setExpandedImage] = useState<number | null>(null);

    return (
        <section className={cn("w-full h-[400px] sm:h-[500px] sm:w-auto lg:h-[700px] p-4", className)}>
        <div className="h-full overflow-hidden">
            <div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(100px)] gap-2 overflow-y-auto pr-2">
            {images.map((image, index) => {
                const gridSpan = 
                image.size === 'large' 
                    ? 'lg:col-span-2 lg:row-span-2' 
                    : image.size === 'medium' 
                    ? 'sm:col-span-2' 
                    : '';
                
                const isExpanded = expandedImage === index;
                
                return (
                <div 
                    key={index} 
                    className={cn(
                    "relative rounded-lg transition-all duration-300",
                    gridSpan,
                    isExpanded ? "row-span-2" : "",
                    "cursor-pointer group",
                    image.className
                    )}
                    onClick={() => setExpandedImage(isExpanded ? null : index)}
                >
                    {image.isVideo ? (
                    <video className="w-full h-full object-contain rounded-lg" controls>
                        <source src={image.src} type="video/mp4" />
                    </video>
                    ) : (
                    <div className="w-full h-full aspect-square sm:aspect-[4/3] flex items-center justify-center">
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