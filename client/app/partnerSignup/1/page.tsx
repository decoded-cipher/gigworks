"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GetURL } from '../../api/index';
import axios from "axios";

interface FormData {
  fullName: string;
  whatsAppNumber: string;
  address: string;
  idProof: string;
  uploadId: string;  // Changed to string with empty default
  profileImage: string;  // Changed to string with empty default
}

interface UploadResponse {
  presignedUrl: string;
  assetpath: string;
}

const ProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    whatsAppNumber: "",
    address: "",
    idProof: "",
    uploadId: "",  // Initialize with empty string instead of null
    profileImage: "",  // Initialize with empty string instead of null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  // Debug log for form data changes
  React.useEffect(() => {
    console.log('Current Form Data:', formData);
  }, [formData]);

  const handleInputChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const files = (e.target as HTMLInputElement).files;

    if (type === "file" && files && files[0]) {
      try {
        setIsUploading(true);
        const file = files[0];
    
        // Get file type from the mime type
        const type = file.type;
    
        // Set category based on input field name
        const category = name === 'uploadId' ? 'identity' : 'avatar';
    
        console.log('Uploading file:', {
          name,
          type,
          category,
          fileSize: file.size
        });
        // Get presigned URL
        const response:any = await GetURL({
          type,
          category
        });

        console.log('GetURL Response:', response);

        // Upload file to presigned URL
        const uploadResponse = await axios.put(response.data.presignedUrl, file, {
          headers: {
            'Content-Type': file.type,
            // 'x-amz-acl': 'public-read'
          }
        });

        if (uploadResponse.status !== 200) {
          throw new Error(`HTTP error! status: ${uploadResponse.status}`);
        }

        console.log('File uploaded successfully');

        // Log the responseAttachment
        console.log('ResponseAttachment:', `${name}-${response.assetpath}. URL: ${response.presignedUrl}`);

        // Update form data with assetpath
        setFormData(prev => {
          const newData = {
            ...prev,
            [name]: response.assetpath
          };
          console.log('Updated form data:', newData);
          return newData;
        });

      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
      } finally {
        setIsUploading(false);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Submitting form with data:', formData);

    try {
      // Format the data according to the required structure
      const formattedData = {
        user: {
          name: formData.fullName,
          phone: formData.whatsAppNumber,
        },
        partner: {
          address: formData.address,
          avatar: formData.profileImage || "https://fastly.picsum.photos/id/535/200/300.jpg?hmac=iN2CqXJjjbBwtMlTUpWyZV6xFRfk_-XSDYRSk2eFbsQ",
          identityProof: formData.uploadId
        }
      };

      // Store in localStorage
      localStorage.setItem('partnerFormData', JSON.stringify(formattedData));
      
      // Navigate to next step
      router.push("/partnerSignup/2");
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview component to show uploaded files
  const FilePreview = ({ path, label }: { path: string; label: string }) => {
    if (!path) return null;
    
    return (
      <div className="mt-2">
        <p className="text-sm text-gray-600">{label}: {path}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <nav className="flex flex-col sm:flex-row justify-between items-center p-4 w-full">
          <div className="mb-4 sm:mb-0">
            <Image
              src="https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/gigworksblk.svg"
              alt="Logo"
              width={150}
              height={50}
              className="w-auto h-10"
            />
          </div>
          <div className="flex items-center">
            <div className="flex justify-center items-center space-x-2">
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-black rounded-full flex items-center justify-center">
                <h1 className="text-white text-center text-sm sm:text-base">1</h1>
              </div>
              <div className="hidden sm:flex items-center">
                <div className="w-4 h-1 rounded-full bg-gray-300 mr-1"></div>
                <div className="w-8 h-1 rounded-full bg-gray-300"></div>
                <div className="w-4 h-1 rounded-full bg-gray-300 ml-1"></div>
              </div>
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <h1 className="text-black text-center text-sm sm:text-base">2</h1>
              </div>
            </div>
          </div>
        </nav>
        <hr className="border-gray-200" />
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white py-6 px-4 sm:px-8 md:px-20 pt-32 md:pt-20">
        <h1 className="text-2xl font-bold mb-6">Profile Overview</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-base font-semibold mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Eg : Kili Maerk"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-base font-semibold mb-2">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="whatsAppNumber"
                placeholder="WhatsApp Number"
                value={formData.whatsAppNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            {/* Address */}
            <div className="row-span-2">
              <label className="block text-base font-semibold mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Business Description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 h-36"
              />
            </div>

            {/* ID Proof */}
            <div>
              <label className="block text-base font-semibold mb-2">
                ID Proof <span className="text-red-500">*</span>
              </label>
              <select
                name="idProof"
                value={formData.idProof}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="">Select</option>
                <option value="passport">Passport</option>
                <option value="drivingLicense">Driving License</option>
                <option value="nationalId">National ID</option>
              </select>
            </div>

            {/* Upload ID */}
            <div>
              <label className="block text-base font-semibold mb-2">
                Upload ID
              </label>
              <input
                type="file"
                name="uploadId"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={isUploading}
              />
              {isUploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
              <FilePreview path={formData.uploadId} label="ID Document" />
            </div>
          </div>

          {/* Media Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Media</h2>
            <div>
              <label className="block text-base font-semibold mb-2">
                Upload Profile
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <input
                  type="file"
                  name="profileImage"
                  onChange={handleInputChange}
                  className="hidden"
                  id="profileImage"
                  accept="image/*"
                  disabled={isUploading}
                />
                <label
                  htmlFor="profileImage"
                  className={`cursor-pointer text-gray-600 ${isUploading ? 'opacity-50' : ''}`}
                >
                  {isUploading ? 'Uploading...' : 'Drag and drop or click to upload'}
                </label>
                <FilePreview path={formData.profileImage} label="Profile Image" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
           <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="w-full md:w-40 bg-[#303030] text-white font-bold px-4 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Next →'}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="bottom-0 left-0 right-0 w-full border-t bg-background px-4 py-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
            © 2024{" "}
            <a
              href="https://gigwork.co.in/"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gigwork
            </a>
            . All rights reserved.
          </p>
          <div className="text-sm text-gray-500 flex space-x-4">
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

