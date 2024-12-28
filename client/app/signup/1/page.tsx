"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Textarea } from "@nextui-org/input";

// Define the form data type
interface FormData {
  profileImage: File | null;
  coverImage: File | null;
  businessName: string;
  businessDescription: string;
  whatsAppNumber: string;
  websiteURL: string;
  businessCategory: string;
  ownerName: string;
  emailAddress: string;
  businessType: string;
  slug: string;
  [key: string]: string | File | null;
}

const MediaAndBranding = () => {
  const [formData, setFormData] = useState<FormData>({
    profileImage: null,
    coverImage: null,
    businessName: "",
    businessDescription: "",
    whatsAppNumber: "",
    websiteURL: "",
    businessCategory: "",
    ownerName: "",
    emailAddress: "",
    businessType: "",
    slug: "",
  });
  const [slugFocused, setSlugFocused] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "slug") {
      const slugValue = value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      setFormData((prev) => ({
        ...prev,
        [name]: slugValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const renderFormField = (
    name: string,
    label: string,
    type: string,
    placeholder?: string,
    required: boolean = true,
    options?: { value: string; label: string }[]
  ) => (
    <div key={name}>
      <label
        htmlFor={name}
        className="block text-base sm:text-xl font-bold pb-2 text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={
            typeof formData[name] === "string" ? (formData[name] as string) : ""
          }
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          required={required}
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <Textarea
          id={name}
          name={name}
          value={
            typeof formData[name] === "string" ? (formData[name] as string) : ""
          }
          onChange={handleInputChange}
          placeholder={placeholder}
          minRows={1}
          className="w-full px-3 border border-gray-300 rounded-md focus:border-transparent focus:ring-0"
          required={required}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={
            typeof formData[name] === "string" ? (formData[name] as string) : ""
          }
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          required={required}
        />
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <nav className="flex flex-col sm:flex-row justify-between items-center p-4 w-full">
          <div className="flex justify-center sm:justify-start w-full sm:w-auto mb-4 sm:mb-0">
            <Image
              src="https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/gigworksblk.svg"
              alt="Logo"
              width={150}
              height={50}
              className="max-w-[206px] max-h-[216px]"
            />
          </div>
          <div className="flex items-center">
            <div className="flex justify-center items-center space-x-2">
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-black rounded-full flex items-center justify-center">
                <h1 className="text-white text-center text-sm sm:text-base">
                  1
                </h1>
              </div>
              <div className="hidden sm:flex items-center">
                <div className="w-4 h-1 rounded-full bg-gray-300 mr-1"></div>
                <div className="w-8 h-1 rounded-full bg-gray-300"></div>
                <div className="w-4 h-1 rounded-full bg-gray-300 ml-1"></div>
              </div>
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <h1 className="text-black text-center text-sm sm:text-base">
                  2
                </h1>
              </div>
              <div className="hidden sm:flex items-center">
                <div className="w-4 h-1 rounded-full bg-gray-300 mr-1"></div>
                <div className="w-8 h-1 rounded-full bg-gray-300"></div>
                <div className="w-4 h-1 rounded-full bg-gray-300 ml-1"></div>
              </div>
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <h1 className="text-black text-center text-sm sm:text-base">
                  3
                </h1>
              </div>
            </div>
          </div>
        </nav>
        <hr className="border-gray-200" />
      </div>

      <div className="flex-grow bg-white px-4 sm:px-8 md:px-20 pt-32 md:pt-20">
        <h1 className="text-2xl font-bold py-4">Business Overview</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* First Row */}
            <div>
              <label className="block text-base font-bold pb-2 text-gray-700">
                Business Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Eg : Super Maerk"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-base font-bold pb-2 text-gray-700">
                Business Category<span className="text-red-500">*</span>
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option value="">Select Category</option>
                <option value="retail">Retail</option>
                <option value="service">Service</option>
                <option value="food">Food & Beverage</option>
                <option value="technology">Technology</option>
                <option value="consulting">Consulting</option>
              </select>
            </div>

            <div>
              <label className="block text-base font-bold pb-2 text-gray-700">
                Sub Category<span className="text-red-500">*</span>
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option value="">Select Sub Category</option>
              </select>
            </div>

            {/* Second Row */}
            <div>
              <label className="block text-base font-bold pb-2 text-gray-700">
                Sub Category Options<span className="text-red-500">*</span>
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option value="">Select Sub Category</option>
              </select>
            </div>

            <div>
              <label className="block text-base font-bold pb-2 text-gray-700">
                Owner&apos;s/Manager&apos;s Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Eg : Jhone Doe"
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
                placeholder="WhatsApp Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            {/* Third Row */}
            <div>
              <label className="block text-base font-bold pb-2 text-gray-700">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Eg : supermaerk@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-base font-bold pb-2 text-gray-700">
                Business Type<span className="text-red-500">*</span>
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option value="">Business Type</option>
                <option value="soleProprietorship">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="corporation">Corporation</option>
                <option value="limitedLiabilityCompany">
                  Limited Liability Company
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-base font-bold  text-gray-700">
                Slug<span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="slug"
                  placeholder="Eg: super-maerk"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                  onChange={handleInputChange}
                  value={formData.slug}
                  onFocus={() => setSlugFocused(true)}
                  onBlur={() => setSlugFocused(false)}
                />
                {/* <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Info className="text-gray-400" size={20} />
        </div> */}
              </div>

              <div
                className={`text-sm space-y-1 ${
                  slugFocused ? "block" : "hidden"
                }`}
              >
                <p className="text-gray-600">
                  This will be your unique business URL: gigwork.co.in/
                  <span className="font-medium">
                    {formData.slug || "your-slug"}
                  </span>
                </p>
                <ul className="text-gray-500 space-y-1 pl-4">
                  <li>• Use only letters, numbers, and hyphens</li>
                  <li>• Must be between 3-60 characters</li>
                  <li>• Cannot start or end with a hyphen</li>
                  <li>• Will be converted to lowercase</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Business Description - Full Width */}
          <div>
            <label className="block text-base font-bold pb-2 text-gray-700">
              Business Description
            </label>
            <textarea
              placeholder="Business Description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 h-24"
            />
          </div>

          {/* Media & Branding Section */}
          <h1 className="text-2xl font-bold py-1">Media & Branding</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-bold pb-2 text-gray-700">
                Upload Profile<span className="text-red-500">*</span>
              </label>
              <div className="border-2 bg-gray-200 rounded-lg p-4 hover:border-gray-500 transition flex items-center justify-center h-20">
                <p className="text-sm">Drag and drop or click to upload</p>
              </div>
            </div>

            <div>
              <label className="block text-base font-bold pb-2 text-gray-700">
                Upload Cover
              </label>
              <div className="border-2 bg-gray-200 rounded-lg p-4 hover:border-gray-500 transition flex items-center justify-center h-20">
                <p className="text-sm">Drag and drop or click to upload</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              onClick={() => (window.location.href = "/signup/2")}
              className="w-full md:w-40 bg-[#303030] text-white font-bold px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Next &rarr;
            </button>
          </div>
        </form>
      </div>
      {/* Footer */}
      <div className="bottom-0 left-0 right-0 w-full border-t bg-background px-4 py-6 mt-2">
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

export default MediaAndBranding;
