"use client";

import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { GetURL, uploadToPresignedUrl, createBusinessMedia } from '@/app/api';
import { toast } from 'react-hot-toast';

interface ImageUploadButtonProps {
  businessId: string;
  onUploadComplete: (assetpath?: string) => void;
  category: 'media' | 'avatar' | 'banner' |'identity';
  label?: string;
  showPreview?: boolean;
  currentImage?: string;
  multiple?: boolean;
}

const ImageUploadButton = ({ 
  businessId,
  onUploadComplete, 
  category,
  label = "Select Images",
  showPreview = false,
  currentImage,
  multiple = false
}: ImageUploadButtonProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (const file of selectedFiles) {
        console.log(`Starting upload for ${file.name}`);
        
        // Get presigned URL
        const urlResponse = await GetURL({
          type: file.type,
          category: category
        });
        console.log('URL Response:', urlResponse);

        if (!urlResponse || !urlResponse.presignedUrl || !urlResponse.assetpath) {
          throw new Error('Invalid URL response from server');
        }

        // Upload to storage
        await uploadToPresignedUrl(urlResponse.presignedUrl, file);
        console.log(`File ${file.name} uploaded successfully to storage`);

        if (category === 'avatar' || category === 'banner' || category === 'identity') {
          console.log(`Completing ${category} upload with assetpath:`, urlResponse.assetpath);
          onUploadComplete(urlResponse.assetpath);
        } else {
          // For media, create media record
          await createBusinessMedia(businessId, {
            url: urlResponse.assetpath,
            type: file.type,
          });
          onUploadComplete();
        }

        setUploadProgress(100);
        toast.success(`${file.name} uploaded successfully`);
      }

      setSelectedFiles([]);
    } catch (error) {
      console.error('Error in upload process:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      {showPreview && currentImage && (
        <div className="mb-2 relative rounded-lg overflow-hidden">
          <img 
            src={currentImage} 
            alt="Current image" 
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer">
              <Upload size={20} />
              <span>Change {label}</span>
              <input
                type="file"
                accept="image/*"
                multiple={multiple}
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      {!showPreview && (
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer">
          <Upload size={20} />
          <span>{label}</span>
          <input
            type="file"
            multiple={multiple}
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      )}

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Selected files:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                <span>{file.name}</span>
                <button
                  onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                  className="text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 space-y-2">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-blue-300"
            >
              {isUploading ? 'Uploading...' : 'Upload Selected Files'}
            </button>
            
            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadButton;
