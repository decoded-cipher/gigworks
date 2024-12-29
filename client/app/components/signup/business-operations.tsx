'use client'

import React, { useState } from 'react'
import type { FormData } from '../../signup/page'

interface BusinessOperationsProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => Promise<void> // Updated to handle async
  onPrevious: () => void
}

export default function BusinessOperations({
  formData,
  updateFormData,
  onNext,
  onPrevious
}: BusinessOperationsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement  // Type assertion to HTMLInputElement to access checked property
    const { name, value, type } = target
    const checked = type === 'checkbox' ? target.checked : undefined
    const index = parseInt(target.dataset.index || "0")
    const field = target.dataset.field

    if (name === "otherLicenses") {
      const newLicenses = [...formData.otherLicenses]
      newLicenses[index] = {
        ...newLicenses[index],
        [field as string]: value
      }
      updateFormData({ otherLicenses: newLicenses })
    } else if (type === "checkbox" && checked !== undefined) {
      const [group, key] = name.split(".")
      updateFormData({
        [group]: {
          ...formData[group as keyof Pick<FormData, "paymentMethods" | "additionalServices">],
          [key]: checked
        }
      })
    } else {
      updateFormData({ [name]: value })
    }
  }

  const addLicense = () => {
    updateFormData({
      otherLicenses: [
        ...formData.otherLicenses,
        { type: "", registrationNumber: "", certification: "" }
      ]
    })
  }

  const removeLicense = (index: number) => {
    updateFormData({
      otherLicenses: formData.otherLicenses.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onNext()
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
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
                    <option value="Business">Business License</option>
                    <option value="Professional">Professional License</option>
                    <option value="Trade">Trade License</option>
                    <option value="Special">Special Permit</option>
                    <option value="Industry">Industry Certificate</option>
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
                  <label className="block text-lg font-bold mb-2">
                    Upload Certificate
                  </label>
                  <div className="relative border-2 bg-gray-200 rounded-lg hover:border-gray-500 transition h-20">
                    <input
                      type="file"
                      name="otherLicenses"
                      data-index={index}
                      data-field="certification"
                      onChange={handleInputChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-sm text-gray-600">Drag and drop or click to upload</p>
                    </div>
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
            {Object.entries(formData.paymentMethods).map(([method, checked]) => (
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
            ))}
          </div>

          {/* Additional Services */}
          <h2 className="text-xl font-semibold text-start py-4">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(formData.additionalServices).map(([service, checked]) => (
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
            ))}
          </div>

          {/* Referrals */}
          <h2 className="text-xl font-semibold text-start py-4">
            Referrals <span className="text-gray-500 text-sm">if any</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="w-full">
              <input
                type="text"
                name="businessRegistrationNumber"
                value={formData.businessRegistrationNumber}
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
            {isSubmitting ? 'Creating...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

