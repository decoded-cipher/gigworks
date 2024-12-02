"use client"
import React, { useState, useEffect } from "react";
import logo from "../../../public/gigworksblk.svg";
import dynamic from 'next/dynamic';

// Replace static import with dynamic import
const LocationPicker = dynamic(() => import('../../components/LocationPicker'), { 
  ssr: false 
});

// Define interfaces
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
  // State for address details
  const [address, setAddress] = useState<AddressState>({
    streetAddress: '',
    city: '',
    state: '',
    pinCode: ''
  });

  // State for selected location
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);

  // State for operating hours
  const [operatingHours, setOperatingHours] = useState<OperatingHours[]>([
    { day: 'Monday', startTime: '', endTime: '' }
  ]);

  // State for social media handles
  const [socialMediaHandles, setSocialMediaHandles] = useState<SocialMediaHandle[]>([
    { platform: 'Instagram', link: '' }
  ]);

  // Move handleLocationSelect inside the component
  const handleLocationSelect = (locationData: LocationData) => {
    // Parse the address from Nominatim response
    const addressParts = locationData.address.split(',');

    setAddress({
      streetAddress: addressParts[0] || '',
      city: addressParts[1] || '',
      state: addressParts[2] || '',
      pinCode: addressParts[3] || ''
    });

    // Optionally store full location details
    setSelectedLocation({
      latitude: locationData.lat,
      longitude: locationData.lng,
      fullAddress: locationData.address
    });
  };

  // Handle address input changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add more operating hours
  const addOperatingHours = () => {
    setOperatingHours(prev => [
      ...prev,
      { day: 'Monday', startTime: '', endTime: '' }
    ]);
  };

  // Handle operating hours changes
  const handleOperatingHoursChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newOperatingHours = [...operatingHours];
    newOperatingHours[index] = {
      ...newOperatingHours[index],
      [name]: value
    };
    setOperatingHours(newOperatingHours);
  };

  // Add more social media handles
  const addSocialMediaHandle = () => {
    setSocialMediaHandles(prev => [
      ...prev,
      { platform: 'Instagram', link: '' }
    ]);
  };

  // Handle social media handle changes
  const handleSocialMediaChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newSocialMediaHandles = [...socialMediaHandles];
    newSocialMediaHandles[index] = {
      ...newSocialMediaHandles[index],
      [name]: value
    };
    setSocialMediaHandles(newSocialMediaHandles);
  };

  // Example of using window safely
  const handleNavigation = (url: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Data:', {
      address,
      operatingHours,
      socialMediaHandles
    });
    
    if (typeof window !== 'undefined') {
      window.location.href = '/signup/3';
    }
  };

  // Add useEffect for client-side initialization if needed
  useEffect(() => {
    // Any client-side only initialization can go here
  }, []);

  return (
    <div className="flex flex-col h-screen md:mx-20 ">
      <nav className="flex justify-between items-center p-4 flex-shrink-0">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-24" />
        </div>
        <div className="flex items-center pr-4">
          <div className="flex justify-center items-center space-x-2">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
                  <h1 className='text-center'>{num}</h1>
                </div>
                {num < 3 && (
                  <div className="flex items-center">
                    <div className="w-4 h-1 rounded-full bg-black mr-1"></div>
                    <div className="w-8 h-1 rounded-full bg-black"></div>
                    <div className="w-4 h-1 rounded-full bg-black ml-1"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>

      <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white min-h-screen p-8">
        <div className="w-full bg-white rounded-md p-6">
          {/* Header */}
          <h1 className="text-4xl font-semibold text-gray-800 mb-6">
            Location & Operating Details
          </h1>

          {/* Address & Location Section */}
          <h1 className="md:py-4 font-bold text-2xl">Business Operations <span className="text-red-500">*</span></h1>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                name="streetAddress"
                value={address.streetAddress}
                onChange={handleAddressChange}
                placeholder="Street Address"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#303030]"
              />
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                placeholder="City/Town"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#303030]"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                placeholder="State"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#303030]"
              />
              <input
                type="text"
                name="pinCode"
                value={address.pinCode}
                onChange={handleAddressChange}
                placeholder="Pin Code"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#303030]"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Pick Location</label>
              <div>
              <div className="relative  w-full border border-gray-300 rounded-md">

                {/* <label className="block text-gray-700 mb-2">Pick Location</label> */}
                <LocationPicker onLocationSelect={handleLocationSelect} />
              </div>
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
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
          <h1 className="md:py-4 font-bold text-2xl">Operating Hours<span className="text-red-500">*</span></h1>
          <button
            type="button"
            onClick={addOperatingHours}
            className="text-[#303030] font-semibold"
          >
            + Add More
          </button>
          </div>
          {operatingHours.map((hours, index) => (
            <div key={index} className="flex justify-between  gap-4 mb-2">
              
              <select
                name="day"
                value={hours.day}
                onChange={(e) => handleOperatingHoursChange(index, e)}
                className="border md:w-1/3 border-gray-300 rounded-md p-4 focus:outline-none focus:ring focus:ring-[#303030]"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <div className="flex items-center gap-4">

              <input
                type="time"
                name="startTime"
                value={hours.startTime}
                onChange={(e) => handleOperatingHoursChange(index, e)}
                className="border  border-gray-300 rounded-md p-4 focus:outline-none focus:ring focus:ring-[#303030]"
              />
              <input
                type="time"
                name="endTime"
                value={hours.endTime}
                onChange={(e) => handleOperatingHoursChange(index, e)}
                className="border border-gray-300 rounded-md p-4 focus:outline-none focus:ring focus:ring-[#303030]"
              />
              </div>
            </div>
          ))}
         
        </div>

        {/* Social Media Handles */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
          <h1 className="md:py-4 font-bold text-2xl">Social Media Handles<span className="text-red-500">*</span></h1>
          <button
            type="button"
            onClick={addSocialMediaHandle}
            className="text-[#303030] font-semibold"
          >
            + Add More
          </button>
          </div>
          {socialMediaHandles.map((handle, index) => (
            <div key={index} className="flex justify-between gap-4 mb-2">
              <select
                name="platform"
                value={handle.platform}
                onChange={(e) => handleSocialMediaChange(index, e)}
                className="border border-gray-300 rounded-md p-4 md:w-1/3 focus:outline-none focus:ring focus:ring-[#303030]"
              >
                {['Instagram', 'Facebook', 'Twitter', 'LinkedIn'].map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
              <input
                type="text"
                name="link"
                value={handle.link}
                onChange={(e) => handleSocialMediaChange(index, e)}
                placeholder="Profile link address"
                className="border border-gray-300 rounded-md p-4 md:w-1/3 focus:outline-none focus:ring focus:ring-[#303030]"
              />
            </div>
          ))}
          
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => handleNavigation('/signup/1')}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            &larr; Previous
          </button>
          <button
            type="submit"
            className="bg-[#303030] text-white px-4 py-2 rounded-md"
          >
            Next &rarr;
          </button>
        </div>
    </div>
      </form >
    </div >
  );
};

export default LocationDetails;