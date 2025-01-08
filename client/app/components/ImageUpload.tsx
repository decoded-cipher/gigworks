import React, { useState, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import { GetURL, uploadToPresignedUrl, BisunessMedia } from '@/app/api';

interface ImageUploadProps {
  businessId: string;
  onUploadComplete: () => void;
  // Update to match GetURLParams category type
  category?: 'identity' | 'avatar' | 'license' | 'banner' | 'media';
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  businessId, 
  onUploadComplete,
  category = 'media' // Default to 'media' if not specified
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const file = event.target.files[0];
    setIsUploading(true);

    try {
      // Get presigned URL with the correct category
      const urlResponse = await GetURL({
        type: file.type,
        category: category
      });

      // Upload to storage
      await uploadToPresignedUrl(urlResponse.presignedUrl, file);

      // Create media record
      await BisunessMedia({
        business_id: businessId,
        url: urlResponse.assetpath,
        type: file.type
      });

      onUploadComplete();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer w-fit">
        <Upload size={20} />
        <span>{isUploading ? 'Uploading...' : 'Upload Images'}</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ImageUpload;