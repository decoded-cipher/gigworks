'use client'

import { useState } from 'react'
import { Textarea } from "@nextui-org/input"
import type { FormData } from '../../signup/page'

interface BusinessOverviewProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export default function BusinessOverview({
  formData,
  updateFormData,
  onNext
}: BusinessOverviewProps) {
  const [slugFocused, setSlugFocused] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement

    if (name === "slug") {
      const slugValue = value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")

      updateFormData({ [name]: slugValue })
    } else {
      updateFormData({
        [name]: files ? files[0] : value
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <div>
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
              value={formData.businessCategory}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            >
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
            <select 
              name="subCategory"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              
            >
              <option value="">Select Sub Category</option>
            </select>
          </div>

          {/* Second Row */}
          <div>
            <label className="block text-base font-bold pb-2 text-gray-700">
              Sub Category Options<span className="text-red-500">*</span>
            </label>
            <select 
              name="subCategoryOptions"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              
            >
              <option value="">Select Sub Category</option>
            </select>
          </div>

          <div>
            <label className="block text-base font-bold pb-2 text-gray-700">
              Owner&apos;s/Manager&apos;s Name<span className="text-red-500">*</span>
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

          {/* Third Row */}
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
              <option value="soleProprietorship">Sole Proprietorship</option>
              <option value="partnership">Partnership</option>
              <option value="corporation">Corporation</option>
              <option value="limitedLiabilityCompany">Limited Liability Company</option>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
                onChange={handleInputChange}
                value={formData.slug}
                onFocus={() => setSlugFocused(true)}
                onBlur={() => setSlugFocused(false)}
              />
            </div>
            <div className={`text-sm space-y-1 ${slugFocused ? "block" : "hidden"}`}>
              <p className="text-gray-600">
                This will be your unique business URL: gigwork.co.in/
                <span className="font-medium">{formData.slug || "your-slug"}</span>
              </p>
              <ul className="text-gray-500 space-y-1 pl-4">
                <li>• Use only letters, numbers, and hyphens</li>
                <li>• Must be between 3-60 characters</li>
                <li>• Cannot start or end with a hyphen</li>
                <li>• Will be converted to lowercase</li>
              </ul>
            </div>
          </div>

          {/* Business Description */}
          <div className="col-span-full">
            <label className="block text-base font-bold pb-2 text-gray-700">
              Business Description
            </label>
            <Textarea
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleInputChange}
              placeholder="Business Description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 h-24"
            />
          </div>

          {/* Media & Branding Section */}
          <div className="col-span-full">
            <h1 className="text-2xl font-bold py-1">Media & Branding</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-bold pb-2 text-gray-700">
                  Upload Profile<span className="text-red-500">*</span>
                </label>
                <div className="relative border-2 bg-gray-200 rounded-lg hover:border-gray-500 transition h-20">
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-gray-600">Drag and drop or click to upload</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-base font-bold pb-2 text-gray-700">
                  Upload Cover
                </label>
                <div className="relative border-2 bg-gray-200 rounded-lg hover:border-gray-500 transition h-20">
                  <input
                    type="file"
                    name="coverImage"
                    onChange={handleInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-gray-600">Drag and drop or click to upload</p>
                  </div>
                </div>
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
    </div>
  )
}

