"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Replace static import with dynamic import
const LocationPicker = dynamic(
  () => import("../../components/LocationPicker"),
  {
    ssr: false,
  }
);

// Define interfaces (unchanged)
interface LocationData {
  address: string;
  lat: number;
  lng: number;
}

interface AddressState {
  streetAddress: string;
  city: string;
  state: string;
  pinCode: string;
}

interface SelectedLocation {
  latitude: number;
  longitude: number;
  fullAddress: string;
}

interface OperatingHours {
  day: string;
  startTime: string;
  endTime: string;
}

interface SocialMediaHandle {
  platform: string;
  link: string;
}

const LocationDetails: React.FC = () => {
  // State management (unchanged)
  const [address, setAddress] = useState<AddressState>({
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

  const [operatingHours, setOperatingHours] = useState<OperatingHours[]>([
    { day: "Monday", startTime: "", endTime: "" },
  ]);

  const [socialMediaHandles, setSocialMediaHandles] = useState<
    SocialMediaHandle[]
  >([{ platform: "Instagram", link: "" }]);

  // All previous handler methods remain the same

  const handleLocationSelect = (locationData: LocationData) => {
    const addressParts = locationData.address.split(",");

    setAddress({
      streetAddress: addressParts[0] || "",
      city: addressParts[1] || "",
      state: addressParts[2] || "",
      pinCode: addressParts[3] || "",
    });

    setSelectedLocation({
      latitude: locationData.lat,
      longitude: locationData.lng,
      fullAddress: locationData.address,
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addOperatingHours = () => {
    setOperatingHours((prev) => [
      ...prev,
      { day: "Monday", startTime: "", endTime: "" },
    ]);
  };

  const handleOperatingHoursChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newOperatingHours = [...operatingHours];
    newOperatingHours[index] = {
      ...newOperatingHours[index],
      [name]: value,
    };
    setOperatingHours(newOperatingHours);
  };

  const addSocialMediaHandle = () => {
    setSocialMediaHandles((prev) => [
      ...prev,
      { platform: "Instagram", link: "" },
    ]);
  };

  const handleSocialMediaChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newSocialMediaHandles = [...socialMediaHandles];
    newSocialMediaHandles[index] = {
      ...newSocialMediaHandles[index],
      [name]: value,
    };
    setSocialMediaHandles(newSocialMediaHandles);
  };

  const handleNavigation = (url: string) => {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Data:", {
      address,
      operatingHours,
      socialMediaHandles,
    });

    if (typeof window !== "undefined") {
      window.location.href = "/signup/3";
    }
  };

  const removeOperatingHours = (indexToRemove: number) => {
    setOperatingHours((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const removeSocialMediaHandle = (indexToRemove: number) => {
    setSocialMediaHandles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Responsive Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <nav className="flex flex-col sm:flex-row justify-between items-center p-4 w-full">
          <div className="mb-4 sm:mb-0">
            <Image
              src="https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/gigworksblk.svg"
              alt="Logo"
              width={150}
              height={50}
              className="mx-auto sm:mx-0"
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
                <div className="w-4 h-1 rounded-full bg-black mr-1"></div>
                <div className="w-8 h-1 rounded-full bg-black"></div>
                <div className="w-4 h-1 rounded-full bg-black ml-1"></div>
              </div>
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-black rounded-full flex items-center justify-center">
                <h1 className="text-white text-center text-sm sm:text-base">
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

      {/* Responsive Form Container */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-44 pt-32 md:pt-20"
      >
        <div className="w-full bg-white rounded-md p-4 sm:p-6">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-gray-800">
            Location & Operating Details
          </h1>

          {/* Address & Location Section */}

          <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
            <div>
              {/* Responsive Address Inputs */}
              <h1 className="py-2 sm:py-4 font-semibold text-xl ">
                Address & Location <span className="text-red-500">*</span>
              </h1>
              <div className="space-y-8">

              <input
                type="text"
                name="streetAddress"
                value={address.streetAddress}
                onChange={handleAddressChange}
                placeholder="Street Address"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                />
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                placeholder="City/Town"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                />

              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                placeholder="State"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                />
              <input
                type="text"
                name="pinCode"
                value={address.pinCode}
                onChange={handleAddressChange}
                placeholder="Pin Code"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                />
                </div>
            </div>
            {/* Location Picker */}
            <div className="relative w-full z-0">
              <h1 className="py-2 sm:py-4 font-semibold text-xl ">
                Pick Location <span className="text-red-500">*</span>
              </h1>
              <div className="relative w-full  rounded-md">
                <LocationPicker onLocationSelect={handleLocationSelect} />
                <button
                  type="button"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-md shadow-md text-gray-700 font-semibold border border-gray-300"
                >
                  Choose Location
                </button>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="mt-6 space-y-1">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h1 className="py-2 sm:py-4 font-semibold text-xl">
                Operating Hours<span className="text-red-500">*</span>
              </h1>
              <button
                type="button"
                onClick={addOperatingHours}
                className="text-[#303030] font-semibold mb-2 sm:mb-0"
              >
                + Add More
              </button>
            </div>
            {operatingHours.map((hours, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2"
              >
                <select
                  name="day"
                  value={hours.day}
                  onChange={(e) => handleOperatingHoursChange(index, e)}
                  className="w-full sm:w-1/3 border border-gray-300 rounded-md p-2  focus:outline-none focus:ring-1 focus:ring-[#303030]"
                >
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
                  <input
                    type="time"
                    name="startTime"
                    value={hours.startTime}
                    onChange={(e) => handleOperatingHoursChange(index, e)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                  />
                  <input
                    type="time"
                    name="endTime"
                    value={hours.endTime}
                    onChange={(e) => handleOperatingHoursChange(index, e)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                  />
                  {operatingHours.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOperatingHours(index)}
                      className="text-red-500 px-2 py-1 rounded-md hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Handles */}
          <div className="mt-6 space-y-1">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h1 className="py-2 sm:py-4 font-semibold text-xl">
                Social Media Handles<span className="text-red-500">*</span>
              </h1>
              <button
                type="button"
                onClick={addSocialMediaHandle}
                className="text-[#303030] font-semibold mb-2 sm:mb-0"
              >
                + Add More
              </button>
            </div>
            {socialMediaHandles.map((handle, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2"
              >
                <select
                  name="platform"
                  value={handle.platform}
                  onChange={(e) => handleSocialMediaChange(index, e)}
                  className="w-full sm:w-1/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                >
                  {[
                    "Instagram",
                    "Facebook",
                    "Twitter",
                    "LinkedIn",
                    "Website",
                  ].map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    name="link"
                    value={handle.link}
                    onChange={(e) => handleSocialMediaChange(index, e)}
                    placeholder="Profile link address"
                    className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                  />
                  {socialMediaHandles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSocialMediaHandle(index)}
                      className="text-red-500 px-2 py-1 rounded-md hover:bg-red-50 flex-shrink-0"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
            <button
              type="button"
              onClick={() => handleNavigation("/signup/1")}
              className="w-full md:w-40 bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              &larr; Previous
            </button>
            <button
              type="submit"
              className="w-full md:w-40 bg-[#303030] text-white font-bold px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </form>
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

export default LocationDetails;
