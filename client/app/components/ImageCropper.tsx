import React, { useState, useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  imageUrl: string;
  aspect: number;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
  isCircular?: boolean; // Add this prop
}

export default function ImageCropper({ 
  imageUrl, 
  aspect, 
  onCropComplete, 
  onCancel,
  isCircular = false // Default to false
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    width: 300,
    height: 300,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const getCroppedImg = async (image: HTMLImageElement, crop: Crop): Promise<string> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width || 0;
    canvas.height = crop.height || 0;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      image,
      (crop.x || 0) * scaleX,
      (crop.y || 0) * scaleY,
      (crop.width || 0) * scaleX,
      (crop.height || 0) * scaleY,
      0,
      0,
      crop.width || 0,
      crop.height || 0
    );

    return canvas.toDataURL('image/jpeg');
  };

  const handleCropComplete = async (crop: Crop) => {
    if (!crop || !crop.width || !crop.height) return;
    
    try {
      const croppedImageUrl = await getCroppedImg(imgRef.current!, crop);
      onCropComplete(croppedImageUrl);
    } catch (e) {
      console.error('Error creating crop:', e);
    }
  };

  const calculateOptimalDimensions = (imgWidth: number, imgHeight: number) => {
    if (!containerRef.current) return { width: imgWidth, height: imgHeight };

    const containerWidth = containerRef.current.clientWidth - 48; // account for padding
    const containerHeight = window.innerHeight * 0.7; // 70vh
    const minDesiredWidth = 600; // minimum width we want for small images
    
    let scale = 1;
    
    // If image is smaller than minimum desired width, scale it up
    if (imgWidth < minDesiredWidth) {
      scale = minDesiredWidth / imgWidth;
    }

    // Calculate scaled dimensions
    let newWidth = imgWidth * scale;
    let newHeight = imgHeight * scale;

    // If scaled dimensions are too large, scale them down to fit container
    const widthRatio = containerWidth / newWidth;
    const heightRatio = containerHeight / newHeight;
    const finalScale = Math.min(widthRatio, heightRatio, 1);

    return {
      width: Math.floor(newWidth * finalScale),
      height: Math.floor(newHeight * finalScale)
    };
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const { width, height } = calculateOptimalDimensions(img.naturalWidth, img.naturalHeight);
    setDimensions({ width, height });

    // Set initial crop
    const minSize = Math.min(width, height);
    setCrop({
      unit: 'px',
      width: aspect ? minSize : width * 0.8,
      height: aspect ? minSize / aspect : height * 0.8,
      x: (width - (aspect ? minSize : width * 0.8)) / 2,
      y: (height - (aspect ? minSize / aspect : height * 0.8)) / 2
    });
  };

  const cropStyle = isCircular ? {
    className: 'rounded-full',
    style: {
      aspectRatio: '1',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
    }
  } : {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        ref={containerRef}
        className="bg-white p-6 rounded-lg w-[95vw] max-w-[1200px] max-h-[90vh] flex flex-col" 
        style={{ userSelect: 'none' }}
      >
        <h3 className="text-lg font-bold mb-4">Adjust Image</h3>
        
        <div className="flex-1 min-h-0 overflow-auto flex justify-center items-center">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={aspect}
            className="max-w-full max-h-full select-none"
            circularCrop={isCircular}
            ruleOfThirds
            {...cropStyle}
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Crop preview"
              onLoad={handleImageLoad}
              style={{
                width: dimensions.width || 'auto',
                height: dimensions.height || 'auto',
                maxHeight: '70vh',
                userSelect: 'none'
              }}
              draggable="false"
            />
          </ReactCrop>
        </div>

        <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleCropComplete(crop)}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            disabled={!crop?.width || !crop?.height}
          >
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
}
