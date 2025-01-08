"use client";

import React, { useState, ChangeEvent, useEffect } from "react";  // Add useEffect import
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GetURL } from '../../api/index';
import axios from "axios";
import { toast } from 'react-hot-toast';  // Add this import

interface FormData {
  fullName: string;
  whatsAppNumber: string;
  address: string;
  idProof: string;
  uploadId: string;  // Changed to string with empty default
  profileImage: string;  // Changed to string with empty default
}

// Update the UploadResponse interface to match the actual API response
interface UploadResponse {
  presignedUrl: string;
  assetpath: string;  // Note: lowercase 'path' to match API response
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

  // Add useEffect to load user data from localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setFormData(prevData => ({
          ...prevData,
          fullName: userData.name || prevData.fullName,
          whatsAppNumber: userData.phone || prevData.whatsAppNumber,
          // Add any other fields you want to auto-fill
        }));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);

  // Add error state
  const [error, setError] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  // Debug log for form data changes
  React.useEffect(() => {
    console.log('Current Form Data:', formData);
  }, [formData]);

  const handleInputChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>  // Updated type
  ) => {
    setError('');
    const { name, value, type } = e.target;
    
    // Check if the event target is an input element with files
    if ('files' in e.target && type === "file" && e.target.files && e.target.files[0]) {
      try {
        setIsUploading(true);
        const file = e.target.files[0];
        const type = file.type;
        const category = name === 'uploadId' ? 'identity' : 'avatar';

        const response = await GetURL({
          type,
          category
        });

        // Use the flattened properties from the response
        const uploadResult: UploadResponse = {
          presignedUrl: response.presignedUrl,
          assetpath: response.assetpath
        };

        // ...rest of file upload logic...
        console.log('GetURL Response:', uploadResult);
        console.log('Asset Path:', uploadResult.assetpath);

        axios.put(uploadResult.presignedUrl, file, {
          headers: {
            'Content-Type': file.type,
          }
        }).then(() => {
          console.log('File upload initiated for:', uploadResult.assetpath);
        });

        setFormData(prev => {
          const newData = {
            ...prev,
            [name]: uploadResult.assetpath
          };
          console.log(`Updated ${name} with assetpath:`, uploadResult.assetpath);
          return newData;
        });

      } catch (error) {
        console.error('Error in file handling:', error);
        toast.error('Error uploading file');
      } finally {
        setIsUploading(false);
      }
    } else {
      // Handle regular input changes
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(''); // Clear any previous errors

    console.log('Submitting form with data:', formData);

    // Validate required fields
    if (!formData.fullName || !formData.whatsAppNumber || !formData.address || !formData.idProof) {
      setError('Please fill in all required fields');
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

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
      
      // Show success message
      toast.success('Profile details saved successfully!');
      
      // Navigate to next step
      router.push("/partnerSignup/2");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error submitting form. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
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
              src="/assets/media/gigworksblk.svg"
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

        {/* Show error message if exists */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {error}
          </div>
        )}

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
                placeholder="Enter your address"
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

