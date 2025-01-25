"use client";

import React, { useState, useEffect, useCallback } from "react";
import Editor from "react-simple-wysiwyg";
import {
  fetchBusinessesByslug,
  ASSET_BASE_URL,
  updateBusiness,
  GetURL,
  uploadToPresignedUrl,
  createBusinessMedia,
} from "@/app/api";
import { useParams, useRouter } from "next/navigation";
import {
  Pencil,
  Save,
  X,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Globe,
} from "lucide-react";

import MediaGallery from "@/app/components/MediaGallery";
import Cookies from 'js-cookie';
import OperatingHours from "@/app/components/OperatingHours";
import { deletebusinessMedia } from "@/app/api";
import { toast } from "react-hot-toast"; // Add toast for notifications
import { s } from "framer-motion/client";
import ImageCropper from "@/app/components/ImageCropper";

// Define MediaItem interface locally if import fails
interface MediaItem {
  id: string;
  url: string;
  type: string;
}

// Add License interface before other interfaces
interface License {
  name: string;
  number: string;
  url: string;
  description: string;
}

interface BusinessProfile {
  _id: string;
  name: string;
  description: string;
  email: string;
  phone: string | null;
  address: string;
  city: string;
  state: string;
  country: string;
  operating_hours: {
    [key: string]: string;
  };
  socials: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    [key: string]: string | undefined; // Add index signature for socials
  };
  avatar: string;
  banner: string;
  type: string;
  additional_services: string;
  gstin: string;
  id: string; // Add this field
  [key: string]: any; // Add index signature to allow dynamic access
}

interface BusinessData {
  profile: BusinessProfile;
  user: {
    name: string;
    phone: string;
  };
  _id: string;
  media: MediaItem[]; // Using the imported MediaItem type
  category: string;
  subCategory: string;
  subCategoryOption: string;
  licenses: License[]; // Now License is defined
  tags: string[];
}

export const runtime = "edge";

// Add this social media config object near the top of your component

const socialMediaConfig = {
  website: { label: "Website URL", icon: "/icon/globe.svg" },
  facebook: { label: "Facebook Profile", icon: "/icon/facebook.svg" },
  instagram: { label: "Instagram Profile", icon: "/icon/instagram.svg" },
  twitter: { label: "Twitter Profile", icon: "/icon/twitter.svg" },
  linkedin: { label: "LinkedIn Profile", icon: "/icon/linkedin.svg" },
  youtube: { label: "YouTube Channel", icon: "/icon/youtube.svg" },
  reddit: { label: "Reddit Profile", icon: "/icon/reddit.svg" },
  tiktok: { label: "TikTok Profile", icon: "/icon/tiktok.svg" },
  pinterest: { label: "Pinterest Profile", icon: "/icon/pinterest.svg" },
  behance: { label: "Behance Profile", icon: "/icon/behance.svg" },
  dribbble: { label: "Dribbble Profile", icon: "/icon/dribbble.svg" },
  github: { label: "GitHub Profile", icon: "/icon/github.svg" },
  medium: { label: "Medium Profile", icon: "/icon/medium.svg" },
};

interface LocationData {
  embedUrl: string;
  mapsUrl: string | null;
}

type BusinessLocations = {
  [key: string]: LocationData;
};

const BUSINESS_LOCATIONS: BusinessLocations = {
  "emilia": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.8730957553427!2d76.56412737495825!3d9.463395593246565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062f23a403b63b%3A0xfed9fd50695f7df8!2sEMILIA%20BEAUTY%20HUB%20CHANGANACHERRY!5e0!3m2!1sen!2sin!4v1702359671799!5m2!1sen!2sin",
    mapsUrl: "https://maps.app.goo.gl/VTsPuqgduDUwk2du8"
  },
  "anjaneya gym": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.6791870223733!2d76.5665951!3d9.4495045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062528d37a641d%3A0x66e967f68f9994bb!2sAnjaneya%20Gym!5e0!3m2!1sen!2sin!4v1736680465049!5m2!1sen!2sin",
    mapsUrl: "https://maps.app.goo.gl/wWFbsqCAxa5XUHpj9"
  },
  "acme decor": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.722946930944!2d76.5714552!3d9.4456761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0625808d39e54d%3A0x2b8378272ddf82aa!2sacme%20DECOR!5e0!3m2!1sen!2sin!4v1737032116084!5m2!1sen!2sin",
    mapsUrl: "https://maps.app.goo.gl/wWFbsqCAxa5XUHpj9"
  },
  "pathil electricals sanitary": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1967.9015774093411!2d76.5679237!3d9.438655!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0625eb50756337%3A0xde34a5bb2a767a61!2sPATHIL%20ELECTRICAL%20%26%20SANITARY!5e0!3m2!1sen!2sin!4v1737035238332!5m2!1sen!2sin",
    mapsUrl: "https://maps.app.goo.gl/wWFbsqCAxa5XUHpj9"
  },
  "adobe designs & digital printing": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3935.7607718648087!2d76.54132767502395!3d9.44236569063642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMjYnMzIuNSJOIDc2wrAzMiczOC4xIkU!5e0!3m2!1sen!2sin!4v1737118006785!5m2!1sen!2sin",
    mapsUrl: null  // No maps URL provided
  },
  "wedboat photography": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3929.0097795578995!2d76.27212147503143!3d10.016050290090138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDAwJzU3LjgiTiA3NsKwMTYnMjguOSJF!5e0!3m2!1sen!2sin!4v1737118448906!5m2!1sen!2sin",
    mapsUrl: null  // No maps URL provided
  },
  "al-tech aluminium house": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1039.0457764470052!2d76.5675167!3d9.437330400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06255b1dcfebb3%3A0x3109daf53a6bf1ff!2sHrishikesh%20building!5e1!3m2!1sen!2sin!4v1737356965310!5m2!1sen!2sin",
    mapsUrl: null  // No maps URL provided
  },
  "fab tech": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2078.1127415475403!2d76.5664288!3d9.4338151!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06251eeb8d34ad%3A0xef156d4ab8447e21!2sFabtech%20interior%20and%20exterior%20gypsum!5e1!3m2!1sen!2sin!4v1737615318000!5m2!1sen!2sin",
    mapsUrl: null  // No maps URL provided
  },
  "drona": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1039.0456727537864!2d76.5674698!3d9.4373648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0625701baac7ab%3A0xa786339129ca58de!2sDrona%20fitness%20centre!5e1!3m2!1sen!2sin!4v1737615500571!5m2!1sen!2sin",
    mapsUrl: null  // No maps URL provided
  },
  "mk tech": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4156.036580982765!2d76.567734!3d9.449475000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMjYnNTguMSJOIDc2wrAzNCcwMy44IkU!5e1!3m2!1sen!2sin!4v1737615571336!5m2!1sen!2sin",
    mapsUrl: null  // No maps URL provided
  },
  "a&d digital vision": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43046.333304051135!2d76.58383945!3d9.4507664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0625913e4243d7%3A0xf6c0ab6d281939a6!2sThrikkodithanam%2C%20Kerala!5e1!3m2!1sen!2sin!4v1737615756685!5m2!1sen!2sin",
    mapsUrl: null  // No maps URL provided
  },
  "sri ambika decor": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5380.799053926908!2d76.5624093!3d9.4502936!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0625bd70eb9cfb%3A0xdbee1de18b9c2bd8!2sSri%20Ambika%20Decoration!5e1!3m2!1sen!2sin!4v1737615901900!5m2!1sen!2sin",
    mapsUrl: null  // No maps URL provided
  },
  "kasthuritissue": {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d719.9638923314029!2d76.5666106241674!3d9.449273442096539!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0625b7fd82ef3b%3A0x2f0376ec4bbc0c1!2sKasthuri%20premium%20tissues!5e0!3m2!1sen!2sin!4v1737634242110!5m2!1sen!2sin",
    mapsUrl: null  // No maps URL provided
  }
} as const;

// Default location for fallback
const DEFAULT_LOCATION: LocationData = {
  embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251482.44857791857!2d76.1643857954714!3d9.982669325611842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1702359671799!5m2!1sen!2sin",
  mapsUrl: null
};

const MapSection = ({ businessName, slug }: { businessName: string, slug: string }) => {
  const location = BUSINESS_LOCATIONS[businessName.toLowerCase()] || 
                  BUSINESS_LOCATIONS[slug.toLowerCase()] || 
                  DEFAULT_LOCATION;

  return (
    <>
      <iframe
        src={location.embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {location.mapsUrl && (
        <div className="mt-2">
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            View on Google Maps →
          </a>
        </div>
      )}
    </>
  );
};

export default function EditBusinessPage() {
  // Move all hooks to the top, before any conditional logic
  const [isMounted, setIsMounted] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});
  const params = useParams();
  const router = useRouter();
  const [cropperState, setCropperState] = useState<{
    isOpen: boolean;
    imageUrl: string;
    fieldType: "avatar" | "banner" | null;
  }>({
    isOpen: false,
    imageUrl: "",
    fieldType: null,
  });

  // Wrap fetchData with useCallback
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchBusinessesByslug(params.id as string);
      if (response.message === "Business fetched successfully") {
        setBusinessData(response.data);
      } else {
        setError("Failed to load business data");
      }
    } catch (err) {
      setError("Failed to load business data");
    } finally {
      setIsLoading(false);
    }
  }, [params.id]); // Only depend on params.id

  // Update useEffect to depend on the stable fetchData function
  useEffect(() => {
    if (params.id && isMounted) {
      fetchData();
    }
  }, [params.id, fetchData, isMounted]); // Include isMounted to prevent unnecessary fetches

  // Combine mounting and fetch effects
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);


  useEffect(() => {
    const token = Cookies.get('token');
    const slug = params.id;   
    if (!token && slug) {
      router.push(`/${slug}`); // Redirect to the page with the slug if no token
    }
  }, [router]);


  const handleFieldChange = (field: string, value: any) => {
    setPendingChanges(prev => {
      const fieldParts = field.split(".");
      if (fieldParts.length > 1 && fieldParts[0] === "socials") {
        return {
          ...prev,
          socials: {
            ...(prev.socials || {}),
            [fieldParts[1]]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });

    // Update local state for immediate UI feedback
    setBusinessData(prev => {
      if (!prev) return null;
      if (field.startsWith("socials.")) {
        const socialField = field.split(".")[1];
        return {
          ...prev,
          profile: {
            ...prev.profile,
            socials: {
              ...prev.profile.socials,
              [socialField]: value,
            },
          },
        };
      }
      return {
        ...prev,
        profile: {
          ...prev.profile,
          [field]: value,
        },
      };
    });
  };

  const handleOperatingHoursUpdate = (newHours: { [key: string]: string }) => {
    setPendingChanges(prev => ({
      ...prev,
      operating_hours: newHours,
    }));

    setBusinessData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        profile: {
          ...prev.profile,
          operating_hours: newHours,
        },
      };
    });
  };

  const handleImageUpload = (assetpath: string, field: 'avatar' | 'banner') => {
    setPendingChanges(prev => ({
      ...prev,
      [field]: assetpath,
    }));

    setBusinessData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        profile: {
          ...prev.profile,
          [field]: assetpath,
        },
      };
    });
  };

  const handleSave = async () => {
    try {
      if (!businessData?.profile.id || Object.keys(pendingChanges).length === 0) {
        router.push(`/${params.id}`);
        return;
      }

      await updateBusiness(businessData.profile.id, pendingChanges);
      toast.success("All changes saved successfully");
      setPendingChanges({});
      router.push(`/${params.id}`);
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleMediaDelete = async (mediaId: string) => {
    try {
      if (businessData?.profile.id) {
        await deletebusinessMedia(businessData.profile.id, mediaId);
        // Update local state instead of fetching all data again
        setBusinessData(prev => {
          if (!prev) return null;
          return {
            ...prev,
            media: prev.media.filter(item => item.id !== mediaId)
          };
        });
        toast.success('Media item deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting media:', error);
      toast.error('Failed to delete media item');
    }
  };

  // Add this new function to handle media updates
  const handleMediaUpdate = (newMedia: MediaItem) => {
    setBusinessData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        media: [...prev.media, {
          id: newMedia.id,
          url: newMedia.url,
          type: newMedia.type || 'image/jpeg' // Provide a default type if none exists
        }]
      };
    });
  };

  const handleImageSelect = async (file: File, fieldType: "avatar" | "banner") => {
    const imageUrl = URL.createObjectURL(file);
    setCropperState({
      isOpen: true,
      imageUrl,
      fieldType,
    });
  };

  const handleCroppedImage = async (croppedImageUrl: string) => {
    try {
      if (!cropperState.fieldType || !businessData?.profile.id) return;

      // Convert base64/URL to blob
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });

      // Get presigned URL
      const uploadResponse = await GetURL({
        type: file.type,
        category: cropperState.fieldType,
      });

      if (!uploadResponse.presignedUrl) {
        throw new Error("Failed to get presigned URL");
      }

      // Upload to storage
      await uploadToPresignedUrl(uploadResponse.presignedUrl, file);

      // Update business profile
      await handleFieldChange(cropperState.fieldType, uploadResponse.assetpath);

      // Close cropper
      setCropperState({
        isOpen: false,
        imageUrl: "",
        fieldType: null,
      });

      toast.success("Image updated successfully");
    } catch (error) {
      console.error("Error handling cropped image:", error);
      toast.error("Failed to update image");
    }
  };

  // Loading and error states can now be checked after all hooks are declared
  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!businessData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex md:flex-row flex-col justify-between items-center mb-8">
          <h1 className="text-2xl font-bold md:pb-0 pb-2">Edit Business Profile</h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push(`/${params.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg"
            >
              <X size={20} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              <Save size={20} />
              Save All Changes
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Images */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Profile Images</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile Avatar */}
              <div>
                <h3 className="text-sm font-medium mb-2">Profile Image</h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageSelect(file, "avatar");
                  }}
                  className="hidden"
                  id="avatar-input"
                />
                <div className="relative">
                  <img
                    src={
                      businessData.profile.avatar
                        ? `${ASSET_BASE_URL}/${businessData.profile.avatar}`
                        : "/placeholder-avatar.png"
                    }
                    alt="Avatar"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                  <label
                    htmlFor="avatar-input"
                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer"
                  >
                    <Pencil size={16} />
                  </label>
                </div>
              </div>
              {/* Banner Image */}
              <div>
                <h3 className="text-sm font-medium mb-2">Banner Image</h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageSelect(file, "banner");
                  }}
                  className="hidden"
                  id="banner-input"
                />
                <div className="relative">
                  <img
                    src={
                      businessData.profile.banner
                        ? `${ASSET_BASE_URL}/${businessData.profile.banner}`
                        : "/placeholder-banner.png"
                    }
                    alt="Banner"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <label
                    htmlFor="banner-input"
                    className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer"
                  >
                    <Pencil size={16} />
                  </label>
                </div>


              </div>
            </div>
            {/* Image Cropper Modal */}
            {cropperState.isOpen && (
              <ImageCropper
                imageUrl={cropperState.imageUrl}
                aspect={cropperState.fieldType === "avatar" ? 1 : 3} // 600/200 simplified to 3
                onCropComplete={handleCroppedImage}
                onCancel={() =>
                  setCropperState({ isOpen: false, imageUrl: "", fieldType: null })
                }
              />
            )}
          </section>

          {/* Basic Information */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  defaultValue={businessData.profile.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Category
                </label>
                <input
                  type="text"
                  defaultValue={businessData.category}
                  onChange={(e) => handleFieldChange("category", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Sub-Category
                </label>
                <input
                  type="text"
                  defaultValue={businessData.subCategory}
                  onChange={(e) => handleFieldChange("subCategory", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Sub-Category options
                </label>
                <input
                  type="text"
                  defaultValue={businessData.subCategoryOption}
                  onChange={(e) => handleFieldChange("subCategoryOption", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <div className="border rounded-lg">
                  <Editor
                    value={businessData.profile.description || ''}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    containerProps={{
                      className: "min-h-[150px] p-2"
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={businessData.profile.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  maxLength={10}
                  defaultValue={businessData.profile.phone || ""}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  defaultValue={businessData.profile.address}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </section>

          {/* Add this new section after Contact Information and before Social Media Links */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Additional Services</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {businessData.profile.additional_services
                  .split(",")
                  .map((service, index) => {
                    const formattedService = service
                      .trim()
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())
                      .trim();

                    return (
                      <span
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
                        {formattedService}
                      </span>
                    );
                  })}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Edit Services (comma-separated)
                </label>
                <input
                  type="text"
                  defaultValue={businessData.profile.additional_services}
                  onBlur={(e) =>
                    handleFieldChange("additional_services", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., customOrders, afterSalesSupport"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter services separated by commas. Use camelCase for multiple
                  words (e.g., customOrders).
                </p>
              </div>
            </div>
          </section>

          {/* Social Media Links */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
            <div className="space-y-4">
              {Object.entries(socialMediaConfig).map(
                ([key, { label, icon }]) => (
                  <div key={key} className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                      <img src={icon} alt={label} className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        {label}
                      </label>
                      <input
                        type="url"
                        defaultValue={
                          businessData.profile.socials?.[
                          key as keyof typeof businessData.profile.socials
                          ] || ""
                        }
                        onBlur={(e) =>
                          handleFieldChange(`socials.${key}`, e.target.value)
                        }
                        className="w-full p-2 border rounded-lg"
                        placeholder={`Enter ${label}`}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Operating Hours */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
            <OperatingHours
              hours={businessData.profile.operating_hours}
              onUpdate={handleOperatingHoursUpdate}
            />
          </section>

          {/* Media Gallery */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Media Gallery</h2>
            <MediaGallery
              media={businessData.media}
              businessId={businessData.profile.id} // Changed from _id to profile.id
              onUpdate={handleMediaUpdate}
              onDelete={handleMediaDelete}
            />
          </section>

          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Business Operation</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">GSTIN</h3>
                <p className="p-2 bg-gray-50 rounded-lg">
                  {businessData.profile.gstin || "Not provided"}
                </p>
              </div>
              {businessData.licenses.map((license, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-sm font-medium mb-1">
                    License {index + 1}
                  </h3>
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <p>
                      <span className="font-medium">Name:</span> {license.name}
                    </p>
                    <p>
                      <span className="font-medium">Number:</span>{" "}
                      {license.number}
                    </p>
                    {license.url && (
                      <div>
                        <span className="font-medium">Certificate:</span>
                        <img
                          src={`${ASSET_BASE_URL}/${license.url}`}
                          alt={`License certificate for ${license.name}`}
                          className="mt-2 max-w-full h-auto rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Map Section */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="w-full h-64">
              <MapSection 
                businessName={businessData.profile.name} 
                slug={businessData.profile.slug} 
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

