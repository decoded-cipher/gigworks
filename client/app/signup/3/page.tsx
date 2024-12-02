"use client";

import React, { useState, ChangeEvent } from "react";
import logo from "../../../public/gigworksblk.svg";

interface FormData {
  businessRegistrationNumber: string;
  gstin: string;
  otherLicenses: string[];
  certifications: string[];
  paymentMethods: {
    [key: string]: boolean;
  };
  additionalServices: {
    [key: string]: boolean;
  };
}

const MediaAndBranding: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    businessRegistrationNumber: "",
    gstin: "",
    otherLicenses: [""],
    certifications: [""],
    paymentMethods: {
      cash: false,
      creditDebitCards: false,
      upiQrCode: false,
      wallets: false,
      bankTransfers: false,
      others: false,
    },
    additionalServices: {
      homeDelivery: false,
      customOrders: false,
      onlineConsultation: false,
      afterSalesSupport: false,
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "otherLicenses" || name === "certifications") {
      const index = parseInt(e.target.dataset.index || "0");
      setFormData((prev) => {
        const updated = [...prev[name as keyof Pick<FormData, "otherLicenses" | "certifications">]];
        updated[index] = value;
        return { ...prev, [name]: updated };
      });
    } else if (type === "checkbox") {
      const [group, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [group]: {
          ...prev[group as keyof Pick<FormData, "paymentMethods" | "additionalServices">],
          [key]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddField = (fieldName: keyof Pick<FormData, "otherLicenses" | "certifications">) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] as string[]), ""],
    }));
  };

  const handleRemoveField = (fieldName: keyof Pick<FormData, "otherLicenses" | "certifications">, index: number) => {
    setFormData((prev) => {
      const updated = [...(prev[fieldName] as string[])];
      updated.splice(index, 1);
      return { ...prev, [fieldName]: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex justify-between items-center p-4 flex-shrink-0">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-24" />
        </div>
        <div className="flex items-center pr-4">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <h1 className='text-white text-center'>1</h1>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-1 rounded-full bg-black mr-1"></div>
              <div className="w-8 h-1 rounded-full bg-black"></div>
              <div className="w-4 h-1 rounded-full bg-black ml-1"></div>
            </div>
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <h1 className='text-white text-center'>2</h1>
            </div>

            <div className="flex items-center">
              <div className="w-4 h-1 rounded-full bg-black mr-1"></div>
              <div className="w-8 h-1 rounded-full bg-black"></div>
              <div className="w-4 h-1 rounded-full bg-black ml-1"></div>
            </div>
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <h1 className='text-white text-center'>3</h1>
            </div>
          </div>
        </div>
      </nav>

      <hr className="border-gray-200" />

      <div className="flex-grow bg-white">
        <h1 className="md:mx-28 md:p-2 md:py-4 font-bold text-4xl">Business Operations</h1>

        <h2 className="md:mx-28 md:my-4 md:p-2 md:py-4 font-bold text-2xl">Business Registration Details</h2>

        <div className="flex flex-wrap md:mx-20 gap-6">
          {/* Business Registration and GSTIN - Side by Side */}
          <div className="flex w-full space-x-4 md:mx-10 md:space-x-20">
            <div className="flex flex-col w-1/2 ">
              <label className="block text-xl font-bold mb-2">Business Registration Number</label>
              <input
                type="text"
                name="businessRegistrationNumber"
                value={formData.businessRegistrationNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="block text-xl font-bold mb-2">GSTIN</label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
          </div>

        <div className="flex w-full space-x-4 md:mx-10 md:space-x-20">
          {/* Other Licenses with Add/Remove Functionality */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Other Licenses</h3>
              <button
                type="button"
                onClick={() => handleAddField("otherLicenses")}
                className="text-black underline"
              >
                + Add More
              </button>
            </div>
            {formData.otherLicenses.map((license, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  name="otherLicenses"
                  data-index={index}
                  value={license}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
                {formData.otherLicenses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField("otherLicenses", index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Certifications with Add/Remove Functionality */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Certifications/Licenses</h3>
              <button
                type="button"
                onClick={() => handleAddField("certifications")}
                className="text-black underline"
              >
                + Add More
              </button>
            </div>
            {formData.certifications.map((certification, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  name="certifications"
                  data-index={index}
                  value={certification}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
                {formData.certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField("certifications", index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* Payment Methods */}
        <h2 className="md:mx-28 md:p-2 md:py-4 font-bold text-2xl">Payment Methods Accepted <span>-</span></h2>
        <div className="flex flex-wrap md:mx-20 gap-10">
          <div className="w-full flex">
            <div className="w-1/2 flex flex-col space-y-2">
              {Object.keys(formData.paymentMethods).slice(0, 3).map((method) => (
                <div key={method} className="flex md:mx-20 font-semibold items-center">
                  <input
                    type="checkbox"
                    id={method}
                    name={`paymentMethods.${method}`}
                    checked={formData.paymentMethods[method]}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor={method} className="text-lg capitalize">
                    {method.replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              ))}
            </div>
            <div className="w-1/2 flex flex-col  space-y-2">
              {Object.keys(formData.paymentMethods).slice(3).map((method) => (
                <div key={method} className="flex md:mx-20 font-semibold items-center">
                  <input
                    type="checkbox"
                    id={method}
                    name={`paymentMethods.${method}`}
                    checked={formData.paymentMethods[method]}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor={method} className="text-lg capitalize">
                    {method.replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <h2 className="md:mx-28 md:p-2 md:py-4 font-bold text-2xl">Additional Services</h2>
        <div className="flex flex-wrap md:mx-20 gap-4">
          <div className="w-full flex">
            <div className="w-1/2 flex flex-col space-y-2">
              {Object.keys(formData.additionalServices).slice(0, 2).map((service) => (
                <div key={service} className="flex md:mx-20 font-semibold items-center">
                  <input
                    type="checkbox"
                    id={service}
                    name={`additionalServices.${service}`}
                    checked={formData.additionalServices[service]}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor={service} className="text-lg capitalize">
                    {service.replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              ))}
            </div>
            <div className="w-1/2 flex flex-col space-y-2">
              {Object.keys(formData.additionalServices).slice(2).map((service) => (
                <div key={service} className="flex md:mx-20 font-semibold items-center">
                  <input
                    type="checkbox"
                    id={service}
                    name={`additionalServices.${service}`}
                    checked={formData.additionalServices[service]}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor={service} className="text-lg capitalize">
                    {service.replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between md:mx-20 p-6">
          <button
            type="submit"
            onClick={() => window.location.href = '/signup/2'}
            className="bg-white text-tertiary border border-tertiary px-10 py-3 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            previous
          </button>
          <button
            type="submit"
            onClick={() => window.location.href = '/profile'}
            className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            Create Business Profile
          </button>
        </div>
        {/* <div className="flex justify-between md:mx-20 p-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-white text-tertiary border border-tertiary px-10 py-3 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            previous
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            Create Business Profile
          </button>
        </div> */}

      </div>
    </div>
  );
};

export default MediaAndBranding;