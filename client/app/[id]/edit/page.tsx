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
  createLicense, // Add this import
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
import Cookies from "js-cookie";
import OperatingHours from "@/app/components/OperatingHours";
import { deletebusinessMedia, DeleteLicense, fetchLicenseData } from "@/app/api";
import { toast } from "react-hot-toast"; // Add toast for notifications
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
  _id: string; // Add this field
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

interface LicenseType {
  id: string;
  name: string;
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



export default function EditBusinessPage() {
  // Move all hooks to the top, before any conditional logic
  const [isMounted, setIsMounted] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  

  const [licenseTypes, setLicenseTypes] = useState<LicenseType[]>([]);
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

  const [newLicense, setNewLicense] = useState({
    name: "",
    number: "",
    file: null as File | null,
  });
  const [isAddingLicense, setIsAddingLicense] = useState(false);

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

  useEffect(() => {
    const fetchLicenses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchLicenseData();
        if (response.data && Array.isArray(response.data)) {
          setLicenseTypes(response.data);
        } else {
          setError("Invalid license data format");
        }
      } catch (error) {
        console.error("Error fetching license types:", error);
        setError("Failed to fetch license types");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLicenses();
  }, []);

  // Combine mounting and fetch effects
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    const slug = params.id;
    if (!token && slug) {
      router.push(`/${slug}`); // Redirect to the page with the slug if no token
    }
  }, [router]);

  const handleDeleteLicense = async (licenseId: string) => {
    try {
      if (!businessData) {
        throw new Error("Business data is not available");
      }
      const profileId = businessData.profile.id;
      await DeleteLicense(profileId, licenseId);
      // Update the state to remove the deleted license
      if (businessData) {
        const updatedLicenses = businessData.licenses.filter(
          (license) => license._id !== licenseId
        );
        setBusinessData({ ...businessData, licenses: updatedLicenses });
      }
    } catch (error) {
      console.error("Failed to delete license", error);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setPendingChanges((prev) => {
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
    setBusinessData((prev) => {
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
    setPendingChanges((prev) => ({
      ...prev,
      operating_hours: newHours,
    }));

    setBusinessData((prev) => {
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

  const handleImageUpload = (assetpath: string, field: "avatar" | "banner") => {
    setPendingChanges((prev) => ({
      ...prev,
      [field]: assetpath,
    }));

    setBusinessData((prev) => {
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
      if (
        !businessData?.profile.id ||
        Object.keys(pendingChanges).length === 0
      ) {
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
        setBusinessData((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            media: prev.media.filter((item) => item.id !== mediaId),
          };
        });
        toast.success("Media item deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting media:", error);
      toast.error("Failed to delete media item");
    }
  };

  // Add this new function to handle media updates
  const handleMediaUpdate = (newMedia: MediaItem) => {
    setBusinessData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        media: [
          ...prev.media,
          {
            id: newMedia.id,
            url: newMedia.url,
            type: newMedia.type || "image/jpeg", // Provide a default type if none exists
          },
        ],
      };
    });
  };

  const handleImageSelect = async (
    file: File,
    fieldType: "avatar" | "banner"
  ) => {
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
      const file = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

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

  const handleAddLicense = async () => {
    try {
      if (!businessData?.profile.id || !newLicense.file) {
        toast.error("Please fill all license details");
        return;
      }

      // Get presigned URL for file upload
      const uploadResponse = await GetURL({
        type: newLicense.file.type,
        category: 'license',
      });

      if (!uploadResponse.presignedUrl) {
        throw new Error("Failed to get presigned URL");
      }

      // Upload file to storage
      await uploadToPresignedUrl(uploadResponse.presignedUrl, newLicense.file);

      // Create license with the correct structure
      const licenseData = {
        url: uploadResponse.assetpath,
        number: newLicense.number,
        type_id: newLicense.name, // Assuming name field contains the type_id
      };

      await createLicense(businessData.profile.id, licenseData);

      // Refresh business data
      await fetchData();

      // Reset form
      setNewLicense({
        name: "",
        number: "",
        file: null,
      });
      setIsAddingLicense(false);
      toast.success("License added successfully");
    } catch (error) {
      console.error("Error adding license:", error);
      toast.error("Failed to add license");
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
          <h1 className="text-2xl font-bold md:pb-0 pb-2">
            Edit Business Profile
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
                  setCropperState({
                    isOpen: false,
                    imageUrl: "",
                    fieldType: null,
                  })
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
                  onChange={(e) =>
                    handleFieldChange("category", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleFieldChange("subCategory", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleFieldChange("subCategoryOption", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <div className="border rounded-lg">
                  <Editor
                    value={businessData.profile.description || ""}
                    onChange={(e) =>
                      handleFieldChange("description", e.target.value)
                    }
                    containerProps={{
                      className: "min-h-[150px] p-2",
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
                  .slice(0, 5)
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
                <p className="text-sm text-red-500">
                  Only the first 5 services are shown.
                </p>
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
                    {/* <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteLicense(license._id)}
                    >
                      Delete License
                    </button> */}
                  </div>
                </div>
              ))}

              {/* Add License Button */}
              <button
                onClick={() => setIsAddingLicense(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add New License
              </button>

              {/* Add License Form */}
              {isAddingLicense && (
                <div className="mt-4 p-4 border rounded-lg space-y-4">
                  <h3 className="font-medium">Add New License</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="License Name"
                      value={newLicense.name}
                      onChange={(e) => setNewLicense(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="License Number"
                      value={newLicense.number}
                      onChange={(e) => setNewLicense(prev => ({ ...prev, number: e.target.value }))}
                      className="w-full p-2 border rounded-lg"
                    />
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setNewLicense(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                      className="w-full p-2 border rounded-lg"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddLicense}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Save License
                      </button>
                      <button
                        onClick={() => setIsAddingLicense(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>


        </div>
      </div>
    </div>
  );
}
