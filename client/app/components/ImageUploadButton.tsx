import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { GetURL, uploadToPresignedUrl, createBusinessMedia } from '@/app/api';

interface ImageUploadButtonProps {
  businessId: string;  // This now expects profile.id instead of _id
  onUploadComplete: () => void;
  category: 'media' | 'avatar' | 'banner';
  label?: string;
  showPreview?: boolean;
  currentImage?: string;
  multiple?: boolean;
}

const ImageUploadButton = ({ 
  businessId,  // This is now profile.id
  onUploadComplete, 
  category,
  label = "Select Images",
  showPreview = false,
  currentImage,
  multiple = true
}: ImageUploadButtonProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const totalFiles = selectedFiles.length;
      let completedFiles = 0;
      
      for (const file of selectedFiles) {
        // Get presigned URL
        const urlResponse = await GetURL({
          type: file.type,
          category: category
        });

        // Upload to storage
        await uploadToPresignedUrl(urlResponse.presignedUrl, file);

        // Create media record using profile.id
        await createBusinessMedia(businessId, {
          url: urlResponse.assetpath,
          type: file.type
        });

        completedFiles++;
        setUploadProgress((completedFiles / totalFiles) * 100);
      }

      setSelectedFiles([]);
      setUploadProgress(0);
      onUploadComplete();
    } catch (error) {
      console.error('Error uploading images:', error);
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
          
          {/* Upload button and progress */}
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
