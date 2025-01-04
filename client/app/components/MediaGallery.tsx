import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { ASSET_BASE_URL } from '@/app/api';
import ImageUploadButton from './ImageUploadButton';

interface MediaGalleryProps {
  businessId: string;  // This now expects profile.id
  media: Array<{
    _id: string;
    url: string;
    type: string;
  }>;
  onUpdate: () => void;
  onDelete?: (mediaId: string) => Promise<void>;
}

const MediaGallery = ({ 
  businessId,  // This is now profile.id
  media, 
  onUpdate, 
  onDelete 
}: MediaGalleryProps) => {
  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex justify-between items-center">
        <ImageUploadButton
          businessId={businessId}
          category="media"
          label="Add Media"
          multiple={true}
          onUploadComplete={onUpdate}
        />
      </div>

      {/* Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <div key={item._id} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={`${ASSET_BASE_URL}/${item.url}`}
                alt="Gallery item"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay with delete button */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {onDelete && (
                <button
                  onClick={() => onDelete(item._id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
