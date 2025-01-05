'use client'

import dynamic from 'next/dynamic'
import type { FormData } from '../../signup/page'

const LocationPicker = dynamic(
  () => import("../../components/LocationPicker"),
  { ssr: false }
)

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
  const handleLocationSelect = (locationData: { address: string; lat: number; lng: number }) => {
    const addressParts = locationData.address.split(",")

    updateFormData({
      address: {
        streetAddress: addressParts[0] || "",
        city: addressParts[1] || "",
        state: addressParts[2] || "",
        pinCode: addressParts[3] || "",
      },
      location: {
        latitude: locationData.lat,
        longitude: locationData.lng,
        fullAddress: locationData.address,
      }
    })
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({
      address: {
        ...formData.address,
        [name]: value
      }
    })
  }

  const handleOperatingHoursChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const newHours = [...formData.operatingHours]
    newHours[index] = {
      ...newHours[index],
      [name]: value
    }
    updateFormData({ operatingHours: newHours })
  }

  const handleSocialMediaChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const newHandles = [...formData.socialMediaHandles]
    newHandles[index] = {
      ...newHandles[index],
      [name]: value
    }
    updateFormData({ socialMediaHandles: newHandles })
  }

  const addOperatingHours = () => {
    updateFormData({
      operatingHours: [
        ...formData.operatingHours,
        { day: "Monday", startTime: "", endTime: "" }
      ]
    })
  }

  const removeOperatingHours = (index: number) => {
    updateFormData({
      operatingHours: formData.operatingHours.filter((_, i) => i !== index)
    })
  }

  const addSocialMediaHandle = () => {
    updateFormData({
      socialMediaHandles: [
        ...formData.socialMediaHandles,
        { platform: "Instagram", link: "" }
      ]
    })
  }

  const removeSocialMediaHandle = (index: number) => {
    updateFormData({
      socialMediaHandles: formData.socialMediaHandles.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold py-4">Location & Operating Details</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="w-full bg-white rounded-md p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
            <div>
              <h1 className="py-2 sm:py-4 font-semibold text-xl">
                Address & Location <span className="text-red-500">*</span>
              </h1>
              <div className="space-y-8">
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
              </div>
            </div>

            {/* <div className="relative w-full z-0">
              <h1 className="py-2 sm:py-4 font-semibold text-xl">
                Pick Location <span className="text-red-500">*</span>
              </h1>
              <div className="relative w-full rounded-md">
                <LocationPicker onLocationSelect={handleLocationSelect} />
                <button
                  type="button"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-md shadow-md text-gray-700 font-semibold border border-gray-300"
                >
                  Choose Location
                </button>
              </div>
            </div> */}
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
            {formData.operatingHours.map((hours, index) => (
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
                  {formData.operatingHours.length > 1 && (
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
            {formData.socialMediaHandles.map((handle, index) => (
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
            ))}
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

