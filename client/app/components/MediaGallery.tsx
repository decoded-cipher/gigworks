import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { ASSET_BASE_URL, deletebusinessMedia } from '@/app/api';
import ImageUploadButton from './ImageUploadButton';
import { toast } from 'react-hot-toast';
interface MediaGalleryProps {
  businessId: string;  // This now expects profile.id
  media: Array<{
    id: string; // Changed from _id to id
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
  const limitedMedia = media.slice(0, 15); // Limit to 15 items
  const hasReachedLimit = media.length >= 15;

  
  const handleDelete = async (mediaId: string) => {
    try {
      await deletebusinessMedia(businessId, mediaId);
      onUpdate();
      toast.success('Media item deleted successfully');
    } catch (error) {
      console.error('Error deleting media item:', error);
      toast.error('Failed to delete media item');
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Button or Limit Message */}
      <div className="flex justify-between items-center">
        {hasReachedLimit ? (
          <p className="text-red-500">You have reached the limit of 15 media items.</p>
        ) : (
          <ImageUploadButton
            businessId={businessId}
            category="media"
            label="Add Media"
            multiple={true}
            onUploadComplete={onUpdate}
          />
        )}
      </div>

      {/* Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {limitedMedia.map((item) => (
          <div key={item.id} className="relative group">
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
                  onClick={() => handleDelete(item.id)}
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
