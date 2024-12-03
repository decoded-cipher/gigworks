"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "otherLicenses" || name === "certifications") {
      const index = parseInt(e.target.dataset.index || "0");
      setFormData((prev) => {
        const updated = [
          ...prev[
            name as keyof Pick<FormData, "otherLicenses" | "certifications">
          ],
        ];
        updated[index] = value;
        return { ...prev, [name]: updated };
      });
    } else if (type === "checkbox") {
      const [group, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [group]: {
          ...prev[
            group as keyof Pick<
              FormData,
              "paymentMethods" | "additionalServices"
            >
          ],
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

  const handleAddField = (
    fieldName: keyof Pick<FormData, "otherLicenses" | "certifications">
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] as string[]), ""],
    }));
  };

  const handleRemoveField = (
    fieldName: keyof Pick<FormData, "otherLicenses" | "certifications">,
    index: number
  ) => {
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
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row justify-between items-center p-4 w-full">
        <div className="mb-4 sm:mb-0">
          <Image
            src="https://pub-5c418d5b44bb4631a94f83fb5c3b463d.r2.dev/gigworksblk.svg"
            alt="Logo"
            width={150}
            height={50}
            className="w-auto h-10"
          />
        </div>
        <div className="flex items-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-black rounded-full flex items-center justify-center">
              <h1 className="text-white text-center text-sm sm:text-base">1</h1>
            </div>
            <div className="hidden sm:flex items-center">
              <div className="w-4 h-1 rounded-full bg-black mr-1"></div>
              <div className="w-8 h-1 rounded-full bg-black"></div>
              <div className="w-4 h-1 rounded-full bg-black ml-1"></div>
            </div>
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-black rounded-full flex items-center justify-center">
              <h1 className="text-white text-center text-sm sm:text-base">2</h1>
            </div>
            <div className="hidden sm:flex items-center">
              <div className="w-4 h-1 rounded-full bg-black mr-1"></div>
              <div className="w-8 h-1 rounded-full bg-black"></div>
              <div className="w-4 h-1 rounded-full bg-black ml-1"></div>
            </div>
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-black rounded-full flex items-center justify-center">
              <h1 className="text-white text-center text-sm sm:text-base">3</h1>
            </div>
          </div>
        </div>
      </nav>

      <hr className="border-gray-200" />
      {/* Main */}
      <div className="flex-grow bg-white py-6 px-4 sm:px-44">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-start mb-6">
          Business Operations
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-start mb-6">
          Business Registration Details
        </h2>

     
          {/* Business Registration and GSTIN - Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-lg font-bold mb-2">
                Business Registration Number
              </label>
              <input
                type="text"
                name="businessRegistrationNumber"
                value={formData.businessRegistrationNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2">GSTIN</label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Other Licenses and Certifications - Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold">Other Licenses</h3>
                <button
                  type="button"
                  onClick={() => handleAddField("otherLicenses")}
                  className="text-[#303030] font-semibold"
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
                      className="text-red-500 px-2 py-1 rounded-md hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold">
                  Certifications/Licenses
                </h3>
                <button
                  type="button"
                  onClick={() => handleAddField("certifications")}
                  className="text-[#303030] font-semibold"
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
                      className="text-red-500 px-2 py-1 rounded-md hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods - Grid Layout */}
          <h2 className="text-xl sm:text-2xl font-bold my-6">
            Payment Methods Accepted
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            {Object.keys(formData.paymentMethods).map((method) => (
              <div key={method} className="flex items-center">
                <input
                  type="checkbox"
                  id={method}
                  name={`paymentMethods.${method}`}
                  checked={formData.paymentMethods[method]}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor={method} className="text-base capitalize">
                  {method.replace(/([A-Z])/g, " $1")}
                </label>
              </div>
            ))}
          </div>

          {/* Additional Services - Grid Layout */}
          <h2 className="text-xl sm:text-2xl font-bold my-6">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            {Object.keys(formData.additionalServices).map((service) => (
              <div key={service} className="flex items-center">
                <input
                  type="checkbox"
                  id={service}
                  name={`additionalServices.${service}`}
                  checked={formData.additionalServices[service]}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor={service} className="text-base capitalize">
                  {service.replace(/([A-Z])/g, " $1")}
                </label>
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Flex Layout */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
            <button
              type="button"
              onClick={() => router.push("/signup/2")}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              &larr; Previous
            </button>
            <button
              type="submit"
              onClick={() => router.push("/profile")}
              className="bg-[#303030] text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Next &rarr;
            </button>
          </div>
      </div>
      {/* Footer */}
      <div className="bottom-0 px-4 py-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left"> 
          © 2024{" "}
          <a
            href="https://gigwork.co.in/"
            className="hover:underline"
            target="_blank"
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
  );
};

export default MediaAndBranding;
