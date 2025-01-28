"use client";

import React, { useState, useEffect } from "react";
import type { FormData } from "../../signup/page";
import { fetchLicenseData, GetURL } from "../../api/index";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import axios from "axios";

interface LicenseType {
  id: string;
  name: string;
  description?: string;
}
interface PreviewFile {
  url: string;
  file: File;
}

interface BusinessOperationsProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => Promise<void>; // Updated to handle async
  onPrevious: () => void;
}

export default function BusinessOperations({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}: BusinessOperationsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [licenseTypes, setLicenseTypes] = useState<LicenseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Added isUploading state
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<(string | null)[]>([null]);

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

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    if (type === "file" && target.files?.[0]) {
      const file = target.files[0];
      const index = parseInt(target.dataset.index || "0");

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      const newPreviews = [...previews];
      newPreviews[index] = previewUrl;
      setPreviews(newPreviews);

      try {
        setIsUploading(true);

        const response = await GetURL({
          type: file.type,
          category: "license",
        });

        const uploadResponse = await axios.put(
          response.data.presignedUrl,
          file,
          {
            headers: {
              "Content-Type": file.type,
            },
          }
        );

        if (uploadResponse.status !== 200) {
          throw new Error(`HTTP error! status: ${uploadResponse.status}`);
        }

        const newLicenses = [...formData.otherLicenses];
        newLicenses[index] = {
          ...newLicenses[index],
          certification: response.data.assetPath,
        };
        updateFormData({ otherLicenses: newLicenses });
      } catch (error) {
        console.error("Error uploading license:", error);
        // Remove preview on error
        const newPreviews = [...previews];
        newPreviews[index] = null;
        setPreviews(newPreviews);
        alert("Error uploading file. Please try again.");
      } finally {
        setIsUploading(false);
      }
      return;
    }
    const checked = type === "checkbox" ? target.checked : undefined;
    const index = parseInt(target.dataset.index || "0");
    const field = target.dataset.field;

    if (name === "otherLicenses") {
      const newLicenses = [...formData.otherLicenses];
      newLicenses[index] = {
        ...newLicenses[index],
        [field as string]: value,
      };
      updateFormData({ otherLicenses: newLicenses });
    } else if (type === "checkbox" && checked !== undefined) {
      const [group, key] = name.split(".");
      updateFormData({
        [group]: {
          ...formData[
            group as keyof Pick<
              FormData,
              "paymentMethods" | "additionalServices"
            >
          ],
          [key]: checked,
        },
      });
    } else {
      updateFormData({ [name]: value });
    }
  };

  const removeLicense = (index: number) => {
    // Clean up preview URL
    if (previews[index]) {
      URL.revokeObjectURL(previews[index]!);
    }
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    updateFormData({
      otherLicenses: formData.otherLicenses.filter((_, i) => i !== index),
    });
  };

  const addLicense = () => {
    setPreviews([...previews, null]);
    updateFormData({
      otherLicenses: [
        ...formData.otherLicenses,
        { type: "", registrationNumber: "", certification: "" },
      ],
    });
  };

  const removeFile = (index: number) => {
    // Clean up preview URL
    if (previews[index]) {
      URL.revokeObjectURL(previews[index]!);
    }
    const newPreviews = [...previews];
    newPreviews[index] = null;
    setPreviews(newPreviews);

    // Clear the certification in formData
    const newLicenses = [...formData.otherLicenses];
    newLicenses[index] = {
      ...newLicenses[index],
      certification: "",
    };
    updateFormData({ otherLicenses: newLicenses });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onNext();
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitError(
        error.message || "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {submitError && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{submitError}</span>
          <button
            onClick={() => setSubmitError(null)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-start mb-6">
        Business Operations
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="w-full bg-white rounded-md">
          <h2 className="text-xl font-semibold text-start mb-4">
            Business Registration Details
          </h2>

          {/* Business Registration and GSTIN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-lg font-bold mb-2">GSTIN</label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
                placeholder="22AAA*********5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#303030]"
              />
            </div>
          </div>

          {/* Other Licenses */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formData.otherLicenses.map((license, index) => (
              <React.Fragment key={index}>
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold">Licenses</h3>
                    {index === formData.otherLicenses.length - 1 && (
                      <button
                        type="button"
                        onClick={addLicense}
                        className="text-[#303030] font-semibold"
                      >
                        + Add More
                      </button>
                    )}
                  </div>
                  <select
                    name="otherLicenses"
                    data-index={index}
                    data-field="type"
                    value={license.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#303030]"
                  >
                    <option value="">Select License Type</option>
                    {isLoading && <option disabled>Loading...</option>}
                    {error && <option disabled>{error}</option>}
                    {licenseTypes.map((type) => (
                      <option
                        key={type.id}
                        value={type.id}
                        title={type.description}
                      >
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label className="block text-lg font-bold mb-2">
                    License Number
                  </label>
                  <input
                    type="text"
                    name="otherLicenses"
                    data-index={index}
                    data-field="registrationNumber"
                    value={license.registrationNumber}
                    onChange={handleInputChange}
                    placeholder="KL0520*******08"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#303030]"
                  />
                </div>

                <div className="w-full relative">
                
        <div key={index}>
          <label className="block text-base font-semibold mb-2">
            Upload Certificate {index + 1}
          </label>
          <input
            type="file"
            name="otherLicenses"
            data-index={index}
            data-field="certification"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={isUploading}
            accept="image/*,.pdf"
          />
          {/* {isUploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>} */}
          {/* <FilePreview path={license.certification} label={`Certificate ${index + 1}`} /> */}
        </div>
     

                  {formData.otherLicenses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLicense(index)}
                      className="absolute -top-2 -right-2 text-red-500 px-2 py-1 rounded-full bg-red-50 hover:bg-red-100"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Payment Methods */}
          <h2 className="text-xl font-semibold text-start py-4">
            Payment Methods Accepted
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(formData.paymentMethods).map(
              ([method, checked]) => (
                <div key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    id={method}
                    name={`paymentMethods.${method}`}
                    checked={checked}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor={method} className="text-base capitalize">
                    {method.replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              )
            )}
          </div>

          {/* Additional Services */}
          <h2 className="text-xl font-semibold text-start py-4">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(formData.additionalServices).map(
              ([service, checked]) => (
                <div key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    id={service}
                    name={`additionalServices.${service}`}
                    checked={checked}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor={service} className="text-base capitalize">
                    {service.replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              )
            )}
          </div>

          {/* Referrals */}
          <h2 className="text-xl font-semibold text-start py-4">
            Referrals <span className="text-gray-500 text-sm">if any</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="w-full">
              <input
                type="text"
                name="referral_code"
                value={formData.referral_code}
                onChange={handleInputChange}
                placeholder="If any referral code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#303030]"
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isSubmitting}
            className="w-full md:w-40 bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            &larr; Previous
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-40 bg-[#303030] text-white font-bold px-4 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
