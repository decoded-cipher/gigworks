'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { fetchCorrdinates } from '../../api/index'
// Import marker icon assets to fix the missing marker icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Dynamically import the Leaflet components to avoid SSR issues
const MapWithNoSSR = dynamic(
  () => import('../MapComponent'), 
  { 
    ssr: false,
    loading: () => (
      <div className="rounded-md border border-gray-300 h-[300px] flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p>Loading map...</p>
        </div>
      </div>
    )
  }
)

const LocationPicker = dynamic(
  () => import("../../components/LocationPicker"),
  { ssr: false }
)

interface Address {
  streetAddress: string
  city: string
  state: string
  pinCode: string
}

interface Location {
  latitude: number | null
  longitude: number | null
  fullAddress: string
  googleMapsLocation?: string // Add this property
}

interface OperatingHour {
  day: string
  startTime: string
  endTime: string
}

interface SocialMediaHandle {
  platform: string
  link: string
}

interface FormData {
  address: Address
  location: Location
  operatingHours: OperatingHour[]
  socialMediaHandles: SocialMediaHandle[]
}

interface LocationDetailsProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export default function LocationDetails({
  formData,
  updateFormData,
  onNext,
  onPrevious
}: LocationDetailsProps) {
  // Initialize with Monday if no operating hours exist
  useEffect(() => {
    if (!formData.operatingHours || formData.operatingHours.length === 0) {
      const initialSchedule = {
        operatingHours: [{
          day: "Monday",
          startTime: "09:00",
          endTime: "17:00"
        }]
      };
      updateFormData(initialSchedule);
    } else if (
      formData.operatingHours.length === 1 && 
      formData.operatingHours[0].day === "Monday" && 
      (!formData.operatingHours[0].startTime || !formData.operatingHours[0].endTime)
    ) {
      // Ensure default times are set for Monday if they're missing
      updateFormData({
        operatingHours: [{
          ...formData.operatingHours[0],
          startTime: formData.operatingHours[0].startTime || "09:00",
          endTime: formData.operatingHours[0].endTime || "17:00"
        }]
      });
    }
  }, []);

  const handleLocationSelect = (locationData: { address: string; lat: number; lng: number }) => {
    const addressParts = locationData.address.split(",")

    updateFormData({
      address: {
        streetAddress: addressParts[0]?.trim() || "",
        city: addressParts[1]?.trim() || "",
        state: addressParts[2]?.trim() || "",
        pinCode: addressParts[3]?.trim() || "",
      },
      location: {
        latitude: locationData.lat,
        longitude: locationData.lng,
        fullAddress: locationData.address,
      }
    })
  }

  // Update the handleAddressChange function to extract coordinates from Google Maps link
  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'location') {
      // Update Google Maps Location field immediately
      updateFormData({
        location: {
          ...formData.location,
          googleMapsLocation: value
        }
      })
      
      // Check if it's a Google Maps link
      if (value && (value.includes('google.com/maps') || value.includes('maps.app.goo.gl'))) {
        try {
          // Call the API to fetch coordinates
          const response = await fetchCorrdinates(value);
          console.log('Coordinates fetched:', response);
          
          if (response?.data.coordinates) {
            // Update form data with the fetched coordinates
            console.log('Updating form data with coordinates:', response.data.coordinates);
            
            updateFormData({
              location: {
                ...formData.location,
                googleMapsLocation: value,
                latitude: response.data.coordinates.latitude,
                longitude: response.data.coordinates.longitude
              }
              
            });
          }
          console.log('Form data updated with coordinates:', formData.location);
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        }
      }
    } else {
      // Handle regular address fields
      updateFormData({
        address: {
          ...formData.address,
          [name]: value
        }
      })
    }
  }

  const handleOperatingHoursChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newHours = formData.operatingHours.map((hour, i) => {
      if (i === index) {
        return {
          ...hour,
          [name]: value
        };
      }
      return hour;
    });
    
    updateFormData({
      operatingHours: newHours
    });
  };

  const handleSocialMediaChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const newHandles = formData.socialMediaHandles.map((handle, i) => 
      i === index ? { ...handle, [name]: value } : handle
    )
    updateFormData({ socialMediaHandles: newHandles })
  }

  const addOperatingHours = () => {
    const selectedDays = formData.operatingHours.map(hour => hour.day)
    const availableDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      .filter(day => !selectedDays.includes(day))
    
    if (availableDays.length > 0) {
      updateFormData({
        operatingHours: [
          ...formData.operatingHours,
          { day: availableDays[0], startTime: "09:00", endTime: "17:00" }
        ]
      })
    }
  }

  const removeOperatingHours = (index: number) => {
    // Prevent removing if it's Monday and it's the only entry
    if (index === 0 && formData.operatingHours.length === 1 && formData.operatingHours[0].day === "Monday") {
      return
    } 
    
    updateFormData({
      operatingHours: formData.operatingHours.filter((_, i) => i !== index)
    })
  }  
  const addSocialMediaHandle = () => {
    const selectedPlatforms = formData.socialMediaHandles.map(handle => handle.platform)
    const availablePlatforms = [
      "Instagram",
      "Facebook", 
      "X (Twitter)",
      "LinkedIn",
      "Website",
      "YouTube",
      "Reddit",
      "TikTok",
      "Pinterest",
      "Behance",
      "Dribbble",
      "GitHub",
      "Medium",
    ].filter(platform => !selectedPlatforms.includes(platform))
    
    if (availablePlatforms.length > 0) {
      updateFormData({
        socialMediaHandles: [
          ...formData.socialMediaHandles,
          { platform: availablePlatforms[0], link: "" }
        ]
      })
    }
  }

  const removeSocialMediaHandle = (index: number) => {
    updateFormData({
      socialMediaHandles: formData.socialMediaHandles.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Ensure Monday has default times before submission
    const updatedHours = formData.operatingHours.map(hour => ({
      ...hour,
      startTime: hour.startTime || "09:00",
      endTime: hour.endTime || "17:00"
    }));
  
    updateFormData({ operatingHours: updatedHours });
    onNext();
  };

  const getAvailableDaysForDropdown = (currentIndex: number) => {
    const selectedDays = formData.operatingHours
      .filter((_, index) => index !== currentIndex)
      .map(hour => hour.day)
    
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      .filter(day => !selectedDays.includes(day))
  }

  const getAvailablePlatformsForDropdown = (currentIndex: number) => {
    const selectedPlatforms = formData.socialMediaHandles
      .filter((_, index) => index !== currentIndex)
      .map(handle => handle.platform)
    
    return [
      "Instagram",
      "Facebook",
      "X (Twitter)",
      "LinkedIn",
      "Website",
      "YouTube",
      "Reddit",
      "TikTok",
      "Pinterest",
      "Behance",
      "Dribbble",
      "GitHub",
      "Medium",
    ].filter(platform => !selectedPlatforms.includes(platform))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold py-4">Location & Operating Details</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="w-full bg-white rounded-md p-4 sm:p-6">
            <div>
              <h2 className="py-2 sm:py-4 font-semibold text-xl">
                Address & Location <span className="text-red-500">*</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.address.streetAddress}
                  onChange={handleAddressChange}
                  placeholder="Street Address"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                  required
                />
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                  placeholder="City/Town"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                  required
                />
                <input
                  type="text"
                  name="state"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                  placeholder="State"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                  required
                />
                <input
                  type="text"
                  name="pinCode"
                  value={formData.address.pinCode}
                  onChange={handleAddressChange}
                  placeholder="Pin Code"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                  required
                />
                <input
                  type="text"
                  name='location'
                  value={formData.location.googleMapsLocation}
                  onChange={handleAddressChange}
                  placeholder='Google Maps Location'
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030] col-span-2"
                  required
                />
                {/* Replace the iframe section with this */}
                <div className="col-span-2 mt-4 z-10">
                  {formData.location.latitude && formData.location.longitude ? (
                    <MapWithNoSSR 
                      position={[formData.location.latitude, formData.location.longitude]} 
                      popupText={formData.address.streetAddress || "Business Location"}
                    />
                  ) : formData.location.googleMapsLocation ? (
                    <div className="rounded-md border border-gray-300 h-[300px] flex items-center justify-center bg-gray-100">
                      <div className="flex flex-col items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p>Extracting coordinates from the link...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-md border border-gray-300 h-[300px] flex items-center justify-center bg-gray-100">
                      <div className="flex flex-col items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p>Enter a Google Maps link to see the location</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          {/* Operating Hours */}
          <div className="mt-6 space-y-1">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h2 className="py-2 sm:py-4 font-semibold text-xl">
                Operating Hours<span className="text-red-500">*</span>
              </h2>
              <button
                type="button"
                onClick={addOperatingHours}
                className="text-[#303030] font-semibold mb-2 sm:mb-0"
                disabled={formData.operatingHours.length >= 7}
              >
                + Add More
              </button>
            </div>
            {formData.operatingHours.map((hours, index) => {
              const availableDays = getAvailableDaysForDropdown(index)
              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2"
                >
                  <select
                    name="day"
                    value={hours.day}
                    onChange={(e) => handleOperatingHoursChange(index, e)}
                    className="w-full sm:w-1/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                  >
                    {index === 0 ? (
                      // First dropdown shows Monday only if it's the initial entry
                      formData.operatingHours.length === 1 ? (
                        <>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                        </>
                      ) : (
                        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                          .map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))
                      )
                    ) : (
                      Array.from(new Set([hours.day, ...availableDays]))
                        .map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))
                    )}
                  </select>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
                    <input
                      type="time"
                      name="startTime"
                      value={hours.startTime || "09:00"}
                      onChange={(e) => handleOperatingHoursChange(index, e)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                    />
                    <input
                      type="time"
                      name="endTime"
                      value={hours.endTime || "17:00"}
                      onChange={(e) => handleOperatingHoursChange(index, e)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#303030]"
                    />
                    {/* Only show remove button if it's not Monday as the only entry */}
                    {!(index === 0 && formData.operatingHours.length === 1 && hours.day === "Monday") && (
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
              )
            })}
          </div>

          {/* Social Media Handles */}
          <div className="mt-6 space-y-1">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h2 className="py-2 sm:py-4 font-semibold text-xl">
                Social Media Handles<span className="text-red-500">*</span>
              </h2>
              <button
                type="button"
                onClick={addSocialMediaHandle}
                className="text-[#303030] font-semibold mb-2 sm:mb-0"
                disabled={formData.socialMediaHandles.length >= 13}
              >
                + Add More
              </button>
            </div>
            {formData.socialMediaHandles.map((handle, index) => {
              const availablePlatforms = getAvailablePlatformsForDropdown(index)
              return (
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
                    {index === 0 ? (
                      [
                        "Instagram",
                        "Facebook",
                        "X (Twitter)",
                        "LinkedIn",
                        "Website",
                        "YouTube",
                        "Reddit",
                        "TikTok",
                        "Pinterest",
                        "Behance",
                        "Dribbble",
                        "GitHub",
                        "Medium",
                      ].map((platform) => (
                        <option key={platform} value={platform}>
                          {platform}
                        </option>
                      ))
                    ) : (
                      Array.from(new Set([handle.platform, ...availablePlatforms]))
                        .map((platform) => (
                          <option key={platform} value={platform}>
                            {platform}
                          </option>
                        ))
                    )}
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
                    {formData.socialMediaHandles.length > 1 && (
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
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <button
            type="button"
            onClick={onPrevious}
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
      </form>
    </div>
  )
}
