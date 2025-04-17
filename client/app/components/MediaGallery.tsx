import React, { useState } from 'react';
import { Trash2, X, ZoomIn, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { ASSET_BASE_URL, deletebusinessMedia } from '@/app/api';
import ImageUploadButton from './ImageUploadButton';
import { toast } from 'react-hot-toast';
import { cn } from "@/lib/utils";

// Define MediaItem interface locally
interface MediaItem {
  id: string;
  url: string;
  type: string;
}

interface MediaGalleryProps {
  businessId: string;
  media: MediaItem[];
  onUpdate: (newMedia: MediaItem) => void;
  onDelete?: (mediaId: string) => Promise<void>;
}

export default function MediaGallery({
  businessId,
  media,
  onUpdate,
  onDelete
}: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<null | {
    id: string;
    url: string;
    type: string;
    isVideo: boolean;
  }>(null);

  
  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>({});
  const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({});

  const limitedMedia = media.slice(0, 15);
  const hasReachedLimit = media.length >= 15;

  const handleDelete = async (mediaId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering media selection
    try {
      if (onDelete) {
        await onDelete(mediaId);
        toast.success('Media item deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting media item:', error);
      toast.error('Failed to delete media item');
    }
  };

  const mediaItems = limitedMedia.map((item: MediaItem, index) => {
    const fileType = item.type || ''; // Use logical OR instead of nullish coalescing
    const isVideo = fileType.includes('video') ||
      item.url.endsWith('.mp4') ||
      item.url.endsWith('.quicktime') ||
      item.url.endsWith('.mov');
    return {
      id: item.id,
      src: `${ASSET_BASE_URL}/${item.url}`,
      alt: `Business Image ${index + 1}`,
      type: fileType,
      isVideo,
    };
  });
  
  const togglePlay = (id: string) => {
    const video = document.getElementById(`video-${id}`) as HTMLVideoElement;
    if (video) {
      if (playingStates[id]) {
        video.pause();
      } else {
        video.play();
      }
      setPlayingStates(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  const toggleMute = (id: string) => {
    const video = document.getElementById(`video-${id}`) as HTMLVideoElement;
    if (video) {
      video.muted = !mutedStates[id];
      setMutedStates(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
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
            onUploadComplete={(assetPath, mediaId) => {
              if (!mediaId) {
                console.error('No media ID returned from upload');
                return;
              }
              // Pass the new media item to parent only if we have a mediaId
              onUpdate({
                id: mediaId,
                url: assetPath,
                type: 'image' // or determine type from the uploaded file
              });
            }}
          />
        )}
      </div>

      {/* Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              "relative rounded-xl overflow-hidden group cursor-pointer",
              "transform transition-all duration-300",
              "shadow-sm hover:shadow-xl",
              "border border-gray-200",
              "hover:-translate-y-1"
            )}
            onClick={() => setSelectedMedia({
              id: item.id,
              url: item.src,
              type: item.type,
              isVideo: item.isVideo
            })}
          >
            <div className="aspect-square">
              {item.isVideo ? (
                <div className="relative w-full h-full">
                  <video
                    id={`video-${item.id}`}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    muted={true}
                    loop
                    playsInline
                    onPlay={() => setPlayingStates(prev => ({ ...prev, [item.id]: true }))}
                    onPause={() => setPlayingStates(prev => ({ ...prev, [item.id]: false }))}
                  >
                    <source src={item.src} type={item.type} />
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-0 transition-opacity flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(item.id);
                      }}
                      className="text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                      {playingStates[item.id] ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                  </div>
                </div>
              )}
            </div>

            {/* Delete button overlay */}
            <div className="absolute top-2 right-2 z-10">
              {onDelete && (
                <button
                  onClick={(e) => handleDelete(item.id, e)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="relative max-w-7xl w-full mx-auto transform transition-all duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMedia(null);
              }}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </button>

            {selectedMedia.isVideo ? (
              <div className="relative">
                <video
                  id={`modal-video-${selectedMedia.id}`}
                  className="w-full max-h-[90vh] object-contain rounded-lg"
                  controls
                  autoPlay
                  playsInline
                  
                >
                  <source src={`${selectedMedia.url}`} type={selectedMedia.type} />
                  <source src={`${selectedMedia.url}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <img
                src={`${selectedMedia.url}`}
                alt="Gallery item"
                className="w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

