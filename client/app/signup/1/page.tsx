"use client"

import React, { useState, ChangeEvent } from 'react';
import logo from "../../../public/gigworksblk.svg";

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
  [key: string]: string | File | null;
}

const MediaAndBranding = () => {
  const [formData, setFormData] = useState<FormData>({
    profileImage: null,
    coverImage: null,
    businessName: '',
    businessDescription: '',
    whatsAppNumber: '',
    websiteURL: '',
    businessCategory: '',
    ownerName: '',
    emailAddress: '',
    businessType: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex justify-between items-center p-4 flex-shrink-0">
        <img src={logo} alt="Logo" className="h-24" />
        <div className="flex items-center pr-4">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <h1 className='text-white text-center'>1</h1>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-1 rounded-full bg-gray-300 mr-1"></div>
              <div className="w-8 h-1 rounded-full bg-gray-300"></div>
              <div className="w-4 h-1 rounded-full bg-gray-300 ml-1"></div>
            </div>
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="flex items-center">
              <div className="w-4 h-1 rounded-full bg-gray-300 mr-1"></div>
              <div className="w-8 h-1 rounded-full bg-gray-300"></div>
              <div className="w-4 h-1 rounded-full bg-gray-300 ml-1"></div>
            </div>
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </nav>

      <hr className="border-gray-200" />

      <div className="flex-grow bg-white">
        <h1 className='md:mx-28 md:p-2 md:py-4 font-bold text-4xl'>Media & Branding</h1>
        
        <div className="flex flex-col md:mx-20 md:flex-row">
          {['profileImage', 'coverImage'].map((imageType) => (
            <div key={imageType} className='w-full md:w-1/2 p-6 px-10'>
              <label 
                htmlFor={imageType} 
                className="block text-xl font-bold pb-2 text-gray-700 mb-2"
              >
                Upload {imageType === 'profileImage' ? 'Profile' : 'Cover'} Image 
                <span className='text-red-500'> *</span>
              </label>
              <div className="border-2 md:h-20 bg-gray-200 rounded-sm p-4 hover:border-gray-500 transition flex items-center justify-center">
                <input
                  type="file"
                  id={imageType}
                  name={imageType}
                  onChange={handleInputChange}
                  className="hidden"
                  required
                />
                <p>Drag and drop or click to upload</p>
              </div>
            </div>
          ))}
        </div>

        <h1 className='md:mx-28 md:p-2 md:py-4 font-bold text-4xl'>Business Overview</h1>

        <div className="flex flex-col md:mx-20 md:flex-row">
          <div className="w-full md:w-1/2 p-6 px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: 'businessName', label: 'Business Name', type: 'text', placeholder: 'Enter your business name' },
                { name: 'businessDescription', label: 'Business Description', type: 'textarea', placeholder: 'Describe your business briefly' },
                { name: 'whatsAppNumber', label: 'WhatsApp Number', type: 'tel', placeholder: 'Enter your WhatsApp number' },
                { name: 'websiteURL', label: 'Website Link', type: 'url', placeholder: 'Enter your website URL (optional)', required: false },
              ].map(({ name, label, type, placeholder, required = true }) => (
                <div key={name}>
                  <label 
                    htmlFor={name} 
                    className="block text-xl font-bold pb-2 text-gray-700 mb-2"
                  >
                    {label} {required && <span className='text-red-500'>*</span>}
                  </label>
                  {type === 'textarea' ? (
                    <textarea
                      id={name}
                      name={name}
                      value={typeof formData[name] === 'string' ? formData[name] as string : ''}
                      onChange={handleInputChange}
                      placeholder={placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md md:h-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required={required}
                    />
                  ) : (
                    <input
                      type={type}
                      id={name}
                      name={name}
                      value={typeof formData[name] === 'string' ? formData[name] as string : ''}
                      onChange={handleInputChange}
                      placeholder={placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required={required}
                    />
                  )}
                </div>
              ))}
            </form>
          </div>

          <div className="w-full md:w-1/2 p-6 relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { 
                  name: 'businessCategory', 
                  label: 'Business Category', 
                  type: 'select', 
                  options: [
                    { value: 'retail', label: 'Retail' },
                    { value: 'service', label: 'Service' },
                    { value: 'food', label: 'Food & Beverage' },
                    { value: 'technology', label: 'Technology' },
                    { value: 'consulting', label: 'Consulting' }
                  ]
                },
                { 
                  name: 'businessType', 
                  label: 'Business Type', 
                  type: 'select', 
                  options: [
                    { value: 'soleProprietorship', label: 'Sole Proprietorship' },
                    { value: 'partnership', label: 'Partnership' },
                    { value: 'corporation', label: 'Corporation' },
                    { value: 'limitedLiabilityCompany', label: 'Limited Liability Company' }
                  ]
                },
                { name: 'ownerName', label: 'Owner\'s/Manager\'s Name', type: 'text', placeholder: 'Enter owner or manager name' },
                { name: 'emailAddress', label: 'Email Address', type: 'email', placeholder: 'Enter your email address' }
              ].map(({ name, label, type, options, placeholder }) => (
                <div key={name}>
                  <label 
                    htmlFor={name} 
                    className="block text-xl font-bold pb-2 text-gray-700 mb-2"
                  >
                    {label} <span className='text-red-500'>*</span>
                  </label>
                  {type === 'select' ? (
                    <select
                      id={name}
                      name={name}
                      value={typeof formData[name] === 'string' ? formData[name] as string : ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    >
                      <option value="">Select {label}</option>
                      {options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      id={name}
                      name={name}
                      value={typeof formData[name] === 'string' ? formData[name] as string : ''}
                      onChange={handleInputChange}
                      placeholder={placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  )}
                </div>
              ))}
            </form>

            <div className="absolute p-6 right-0">
              <button
                type="submit"
                onClick={() => window.location.href = "/signup/2"}
                className="bg-gray-800 text-white px-10 py-3 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Next
              </button>
              {/* <button
                type="submit"
                onClick={handleSubmit}
                className="bg-gray-800 text-white px-10 py-3 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Next
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaAndBranding;