"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Textarea } from "@nextui-org/input";
import type { FormData } from "../../signup/page";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { GetURL, uploadToPresignedUrl } from "../../api/index"; // Add this import
import {
  fetchBusinessData,
  fetchsubCategoryByCategory,
  checkSlug,
  fetchDataBySubCategory,
} from "../../api/index";

interface Category {
  id: string;
  name: string;
}

interface SubCategory {
  id: string;
  name: string;
}

interface BusinessOverviewProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export default function BusinessOverview({
  formData,
  updateFormData,
  onNext,
}: BusinessOverviewProps) {
  const [slugFocused, setSlugFocused] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cropConfig, setCropConfig] = useState<Crop>({
    unit: "px", // Change to px instead of %
    width: 300, // Set fixed initial width
    height: 300, // Set fixed initial height
    x: 0,
    y: 0,
  });
  const [currentImage, setCurrentImage] = useState<{
    src: string;
    type: "profile" | "cover";
    file: File;
  } | null>(null);
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Add state for preview dimensions
  const [previewDimensions, setPreviewDimensions] = useState({
    width: 300,
    height: 300,
  });

  // Debounce function
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Debounced slug check function
  const debouncedSlugCheck = useCallback(
    debounce(async (slug: string) => {
      if (slug.length < 3) {
        setSlugError("Slug must be at least 3 characters long");
        setSlugAvailable(null);
        return;
      }

      setIsCheckingSlug(true);
      try {
        const response = await checkSlug(slug);
        console.log("response slug", response);

        setSlugAvailable(response.data);
        setSlugError(response.data ? null : "This slug is already taken");
      } catch (error) {
        setSlugError("Error checking slug availability");
        setSlugAvailable(null);
      } finally {
        setIsCheckingSlug(false);
      }
    }, 500),
    []
  );

  const handleInputChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const files = (e.target as HTMLInputElement).files;

    if (type === "file" && files && files[0]) {
      try {
        const file = files[0];
        const imageType = name === "profileImage" ? "profile" : "cover";

        // Validate file size and type
        if (file.size > 5 * 1024 * 1024) {
          // 5MB limit
          alert("File size should be less than 5MB");
          return;
        }

        if (!file.type.startsWith("image/")) {
          alert("Please upload an image file");
          return;
        }

        const objectUrl = URL.createObjectURL(file);
        setCurrentImage({
          src: objectUrl,
          type: imageType,
          file: file,
        });

        setIsCropModalOpen(true);

        // Set initial crop based on image type
        setCropConfig({
          unit: "px",
          width: imageType === "profile" ? 300 : 800,
          height: imageType === "profile" ? 300 : 400,
          x: 0,
          y: 0,
        });
      } catch (error) {
        console.error("Error handling file:", error);
        alert("Error processing image. Please try again.");
      }
      return;
    }

    if (name === "slug") {
      const slugValue = value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      updateFormData({ [name]: slugValue });

      // Only check if slug is valid length
      if (slugValue.length >= 3) {
        debouncedSlugCheck(slugValue);
      }
    } else {
      updateFormData({
        [name]: value,
      });
    }
  };

  const handleRemoveImage = (type: "profile" | "cover") => {
    if (type === "profile") {
      setProfilePreview(null);
      updateFormData({ profileImage: null, avatar: "" });
    } else {
      setCoverPreview(null);
      updateFormData({ coverImage: null, banner: "" });
    }
  };

  const handleCropComplete = (crop: Crop) => {
    setCompletedCrop(crop);
  };

  const getCroppedImg = async (
    image: HTMLImageElement,
    crop: Crop
  ): Promise<Blob> => {
    if (!crop.width || !crop.height) {
      throw new Error("Invalid crop values");
    }

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    // Draw the cropped image
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Return as blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          resolve(blob);
        },
        "image/jpeg",
        0.95 // Quality
      );
    });
  };

  const handleCropSave = async () => {
    if (
      !currentImage ||
      !imgRef.current ||
      !completedCrop?.width ||
      !completedCrop?.height
    ) {
      alert("Please select an area to crop");
      return;
    }

    try {
      setIsUploading(true);
      const croppedImg = await getCroppedImg(imgRef.current, completedCrop);
      const croppedFile = new File([croppedImg], currentImage.file.name, {
        type: "image/jpeg",
      });

      // Get upload URL
      const category = currentImage.type === "profile" ? "avatar" : "banner";
      const response = await GetURL({
        type: "image/jpeg",
        category: category as "avatar" | "identity",
      });

      // Upload the file
      await uploadToPresignedUrl(response.data.presignedUrl, croppedFile);

      // Update preview and form data
      const previewUrl = URL.createObjectURL(croppedImg);
      if (currentImage.type === "profile") {
        setProfilePreview(previewUrl);
        updateFormData({
          profileImage: croppedFile,
          avatar: response.data.assetPath,
        });
      } else {
        setCoverPreview(previewUrl);
        updateFormData({
          coverImage: croppedFile,
          banner: response.data.assetPath,
        });
      }

      setIsCropModalOpen(false);
      setCurrentImage(null);
      setIsUploading(false);
    } catch (error) {
      console.error("Error saving cropped image:", error);
      alert("Error saving image. Please try again.");
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBusinessData();
        setCategories(data.data.categories); // Adjust according to the structure of your data
        console.log(data.data.categories);
      } catch (error) {
        console.error("Error fetching business categories:", error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    // Update form data with category ID
    updateFormData({
      businessCategory: categoryId,
    });

    try {
      const data = await fetchsubCategoryByCategory(categoryId);
      setSubCategories(data.data.subCategory || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategories([]);
    }
  };

  const handleSubCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const subCategoryId = event.target.value;
    setSelectedSubCategory(subCategoryId);

    // Update form data with subcategory ID
    updateFormData({
      subCategory: subCategoryId,
    });

    try {
      const data = await fetchDataBySubCategory(subCategoryId);
      setSubCategoryOptions(data.data.subCategoryOption);
    } catch (error) {
      console.error("Error fetching data by subcategory:", error);
    }
  };

  const handleSubCategoryOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const optionId = event.target.value;

    // Update form data with subcategory option ID
    updateFormData({
      subCategoryOption: optionId,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  // Add this useEffect to load owner's name from localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        if (userData.name) {
          updateFormData({
            ownerName: userData.name,
            // You can also auto-fill other fields if needed, for example:
            whatsAppNumber: userData.phone || formData.whatsAppNumber,
            emailAddress: userData.email || formData.emailAddress,
          });
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold py-4">Business Overview</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-base font-bold pb-2 text-gray-700">
              Business Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              placeholder="Eg : Super Maerk"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-base font-bold pb-2 text-gray-700">
              Business Category<span className="text-red-500">*</span>
            </label>
            <select
              name="businessCategory"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-bold pb-2 text-gray-700">
              SubCategory<span className="text-red-500">*</span>
            </label>
            <select
              name="subCategory"
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            >
              <option value="">Select SubCategory</option>
              {subCategories.map((subCategory: any) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-bold pb-2 text-gray-700">
              Sub Category Options<span className="text-red-500">*</span>
            </label>
            <select
              name="subCategoryOption"
              value={formData.subCategoryOption}
              onChange={handleSubCategoryOptionChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            >
              <option value="">Select Sub Category Option</option>
              {subCategoryOptions.map((option: any) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-bold pb-2 text-gray-700">
              Owner&apos;s/Manager&apos;s Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              placeholder="Eg : John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-base font-bold pb-2 text-gray-700">
              WhatsApp Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="whatsAppNumber"
              value={formData.whatsAppNumber}
              onChange={handleInputChange}
              placeholder="WhatsApp Number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-base font-bold pb-2 text-gray-700">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              placeholder="Eg : supermaerk@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-base font-bold pb-2 text-gray-700">
              Business Type<span className="text-red-500">*</span>
            </label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            >
              <option value="">Business Type</option>
              <option value="online">Online</option>
              <option value="Offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-base font-bold text-gray-700">
              Slug<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="slug"
                placeholder="Eg: super-maerk"
                className={`w-full px-3 py-2 border ${
                  slugError
                    ? "border-red-500"
                    : slugAvailable
                    ? "border-green-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500`}
                required
                onChange={handleInputChange}
                value={formData.slug}
                onFocus={() => setSlugFocused(true)}
                onBlur={() => setSlugFocused(false)}
              />
              {isCheckingSlug && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent"></div>
                </div>
              )}
              {!isCheckingSlug && slugAvailable && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                  ✓
                </div>
              )}
            </div>
            {slugError && <p className="text-red-500 text-sm">{slugError}</p>}
            <div
              className={`text-sm space-y-1 ${
                slugFocused ? "block" : "hidden"
              }`}
            >
              {slugAvailable && (
                <p className="text-gray-600">
                  This will be your unique business URL: gigwork.co.in/
                  <span className="font-medium">
                    {formData.slug || "your-slug"}
                  </span>
                </p>
              )}
              <ul className="text-gray-500 space-y-1 pl-4">
                <li>• Use only letters, numbers, and hyphens</li>
                <li>• Must be between 3-60 characters</li>
                <li>• Cannot start or end with a hyphen</li>
                <li>• Will be converted to lowercase</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6 col-span-3">
          <label
            htmlFor="businessDescription"
            className="block text-lg font-bold mb-2 "
          >
            Business Description
          </label>
          <textarea
            id="businessDescription"
            name="businessDescription"
            value={formData.businessDescription}
            onChange={handleInputChange}
            placeholder="Tell us about your business..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#303030] resize-none"
            required
          />
        </div>

        <div className="col-span-full">
          <h1 className="text-2xl font-bold py-1">Media & Branding</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile Image Upload */}
            <div>
              <label className="block text-base font-bold pb-2 text-gray-700">
                Upload Profile<span className="text-red-500">*</span>
              </label>
              <div className="relative border-2 border-dashed bg-gray-200 rounded-full hover:border-gray-500 transition aspect-square w-32 h-32 mx-auto">
                {profilePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute -top-2 -right-2 flex gap-2">
                      <label className="cursor-pointer bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                        <input
                          type="file"
                          name="profileImage"
                          onChange={handleInputChange}
                          className="hidden"
                          accept="image/*"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </label>
                      <button
                        onClick={() => handleRemoveImage("profile")}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      name="profileImage"
                      onChange={handleInputChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 rounded-full"
                      disabled={isUploading}
                      accept="image/*"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isUploading ? (
                        <p className="text-sm text-gray-600">Uploading...</p>
                      ) : (
                        <div className="text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">
                            Click to upload
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Cover Image Upload */}
            <div>
              <label className="block text-base font-bold pb-2 text-gray-700">
                Upload Cover
              </label>
              <div className="relative border-2 bg-gray-200 rounded-lg hover:border-gray-500 transition min-h-[120px]">
                {coverPreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-full h-[120px] object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <label className="cursor-pointer bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                        <input
                          type="file"
                          name="coverImage"
                          onChange={handleInputChange}
                          className="hidden"
                          accept="image/*"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </label>
                      <button
                        onClick={() => handleRemoveImage("cover")}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      name="coverImage"
                      onChange={handleInputChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={isUploading}
                      accept="image/*"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isUploading ? (
                        <p className="text-sm text-gray-600">Uploading...</p>
                      ) : (
                        <div className="text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">
                            Click to upload
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="w-full md:w-40 bg-[#303030] text-white font-bold px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Next &rarr;
          </button>
        </div>
      </form>

      {/* Crop Modal */}
      {isCropModalOpen && currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[95vw] max-w-[800px] max-h-[90vh] flex flex-col">
            <h3 className="text-lg font-bold mb-4">Adjust Image</h3>

            {/* Crop Area */}
            <div className="flex-1 min-h-0 overflow-auto">
              <ReactCrop
                crop={cropConfig}
                onChange={(c) => setCropConfig(c)}
                onComplete={handleCropComplete}
                aspect={currentImage.type === "profile" ? 1 : 16 / 9}
                circularCrop={currentImage.type === "profile"}
                className="max-h-[60vh] flex items-center justify-center"
              >
                <img
                  ref={imgRef}
                  src={currentImage.src}
                  alt="Crop preview"
                  className="max-w-full max-h-[60vh] object-contain"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const minSize = Math.min(img.width, img.height);
                    setCropConfig({
                      unit: "px",
                      width:
                        currentImage.type === "profile" ? minSize : img.width,
                      height:
                        currentImage.type === "profile"
                          ? minSize
                          : Math.round((img.width / 16) * 9),
                      x: 0,
                      y: 0,
                    });
                  }}
                />
              </ReactCrop>
            </div>

            {/* Action Buttons - Fixed at bottom */}
            <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setIsCropModalOpen(false);
                  setCurrentImage(null);
                }}
                className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCropSave}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
                disabled={
                  isUploading || !completedCrop?.width || !completedCrop?.height
                }
              >
                {isUploading ? "Saving..." : "Save Image"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
