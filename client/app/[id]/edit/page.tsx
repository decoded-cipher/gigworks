"use client";

import React, { useState, useEffect } from "react";
import {
  fetchBusinessesByslug,
  ASSET_BASE_URL,
  updateBusiness,
} from "@/app/api";
import { useParams, useRouter } from "next/navigation";
import { Pencil, Save, X, Facebook, Instagram, Twitter, Linkedin, Youtube, Globe } from 'lucide-react';
import ImageGrid from "@/app/components/imgsec";
import ImageUploadButton from "@/app/components/ImageUploadButton";
import MediaGallery from "@/app/components/MediaGallery";
import OperatingHours from "@/app/components/OperatingHours";
import { deletebusinessMedia } from "@/app/api";
import { toast } from "react-hot-toast";

interface License {
  name: string;
  number: string;
  url: string;
  description: string;
}

interface MediaItem {
  id: string;
  url: string;
  type: string;
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
    [key: string]: string | undefined;
  };
  avatar: string;
  banner: string;
  type: string;
  additional_services: string;
  gstin: string;
  id: string;
  [key: string]: any;
}

interface BusinessData {
  profile: BusinessProfile;
  user: {
    name: string;
    phone: string;
  };
  _id: string;
  media: MediaItem[];
  category: string;
  subCategory: string;
  subCategoryOption: string;
  licenses: License[];
  tags: string[];
}

interface Changes {
  [key: string]: any;
}

export const runtime = "edge";

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

export default function EditBusinessPage() {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [changes, setChanges] = useState<Changes>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const params = useParams();
  const router = useRouter();

  const fetchData = async () => {
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
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.push(`/${params.id}`);
    }
  }, [params.id, router]);

  useEffect(() => {
    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  useEffect(() => {
    setHasUnsavedChanges(Object.keys(changes).length > 0);
  }, [changes]);

  const handleFieldChange = (field: string, value: any) => {
    setChanges((prev) => {
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

    // Update UI immediately
    setBusinessData((prev) => {
      if (!prev) return null;
      const fieldParts = field.split(".");
      if (fieldParts.length > 1 && fieldParts[0] === "socials") {
        return {
          ...prev,
          profile: {
            ...prev.profile,
            socials: {
              ...prev.profile.socials,
              [fieldParts[1]]: value,
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

  const handleSaveAllChanges = async () => {
    try {
      if (!businessData?.profile.id || Object.keys(changes).length === 0) return;

      await updateBusiness(businessData.profile.id, changes);
      toast.success("All changes saved successfully");
      setChanges({});
      router.push(`/${params.id}`);
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleImageUpload = (assetpath: string, field: "avatar" | "banner") => {
    handleFieldChange(field, assetpath);
  };

  const handleMediaDelete = async (mediaId: string) => {
    try {
      if (businessData?.profile.id) {
        await deletebusinessMedia(businessData.profile.id, mediaId);
      }
      fetchData();
      toast.success("Media item deleted successfully");
    } catch (error) {
      console.error("Error deleting media:", error);
      toast.error("Failed to delete media item");
    }
  };

  const handleOperatingHoursUpdate = (newHours: { [key: string]: string }) => {
    handleFieldChange("operating_hours", newHours);
  };

  if (isLoading) {
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
          <h1 className="text-2xl font-bold md:pb-0 pb-2">
            Edit Business Profile
            {hasUnsavedChanges && (
              <span className="text-yellow-600 text-sm ml-2">
                (Unsaved changes)
              </span>
            )}
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push(`/${params.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg"
            >
              <X size={20} />
              Cancel
            </button>
            <button
              onClick={handleSaveAllChanges}
              className={`flex items-center gap-2 px-4 py-2 ${
                hasUnsavedChanges
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              } rounded-lg`}
              disabled={!hasUnsavedChanges}
            >
              <Save size={20} />
              {hasUnsavedChanges ? "Save All Changes" : "No Changes"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Images */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Profile Images</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Profile Image</h3>
                <ImageUploadButton
                  businessId={businessData.profile.id}
                  category="avatar"
                  label="Upload Avatar"
                  showPreview={true}
                  currentImage={
                    businessData.profile.avatar
                      ? `${ASSET_BASE_URL}/${businessData.profile.avatar}`
                      : undefined
                  }
                  multiple={false}
                  onUploadComplete={(assetpath) => {
                    if (assetpath) {
                      handleImageUpload(assetpath, "avatar");
                    }
                  }}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Banner Image</h3>
                <ImageUploadButton
                  businessId={businessData.profile.id}
                  category="banner"
                  label="Upload Banner"
                  showPreview={true}
                  currentImage={
                    businessData.profile.banner
                      ? `${ASSET_BASE_URL}/${businessData.profile.banner}`
                      : undefined
                  }
                  multiple={false}
                  onUploadComplete={(assetpath) => {
                    if (assetpath) {
                      handleImageUpload(assetpath, "banner");
                    }
                  }}
                />
              </div>
            </div>
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
                  Description
                </label>
                <textarea
                  defaultValue={businessData.profile.description}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg min-h-[100px]"
                />
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
                  defaultValue={businessData.user.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  defaultValue={businessData.profile.address}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </section>

          {/* Additional Services */}
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
                  onChange={(e) =>
                    handleFieldChange("additional_services", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., customOrders, afterSalesSupport"
                />
              </div>
            </div>
          </section>

          {/* Social Media Links */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
            <div className="space-y-4">
              {Object.entries(socialMediaConfig).map(([key, { label, icon }]) => (
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
                      onChange={(e) =>
                        handleFieldChange(`socials.${key}`, e.target.value)
                      }
                      className="w-full p-2 border rounded-lg"
                      placeholder={`Enter ${label}`}
                    />
                  </div>
                </div>
              ))}
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
              businessId={businessData.profile.id}
              onUpdate={() => fetchData()}
              onDelete={handleMediaDelete}
            />
          </section>

          {/* Business Operation */}
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
        </div>
      </div>
    </div>
  );
}

