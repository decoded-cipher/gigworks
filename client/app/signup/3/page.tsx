"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FormData {
  businessRegistrationNumber: string;
  gstin: string;
  otherLicenses: Array<{
    type: string;
    registrationNumber: string;
    certification: string;
  }>;
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
    otherLicenses: [{
      type: "",
      registrationNumber: "",
      certification: ""
    }],
    certifications: [""],
    paymentMethods: {
      cash: false,
      creditDebitCards: false,
      Upi: false,
      NetBanking: false,
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const type = (e.target as HTMLInputElement).type;
    const checked = (e.target as HTMLInputElement).checked;
    const index = parseInt(e.target.dataset.index || "0");
    const field = e.target.dataset.field;

    if (name === "otherLicenses") {
      const newLicenses = [...formData.otherLicenses];
      newLicenses[index] = {
        ...newLicenses[index],
        [field as string]: value
      };
      setFormData(prev => ({
        ...prev,
        otherLicenses: newLicenses
      }));
    } else if (name === "certifications") {
      const newCertifications = [...formData.certifications];
      newCertifications[index] = value;
      setFormData(prev => ({
        ...prev,
        certifications: newCertifications
      }));
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
    if (fieldName === "otherLicenses") {
      setFormData(prev => ({
        ...prev,
        otherLicenses: [
          ...prev.otherLicenses,
          { type: "", registrationNumber: "", certification: "" }
        ]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: [...(prev[fieldName] as string[]), ""]
      }));
    }
  };

  const handleRemoveField = (
    fieldName: keyof Pick<FormData, "otherLicenses" | "certifications">,
    index: number
  ) => {
    if (fieldName === "otherLicenses") {
      setFormData(prev => ({
        ...prev,
        otherLicenses: prev.otherLicenses.filter((_, i) => i !== index)
      }));
    } else {
      setFormData(prev => {
        const updated = [...(prev[fieldName] as string[])];
        updated.splice(index, 1);
        return { ...prev, [fieldName]: updated };
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
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
                <div className="w-4 h-1 rounded-full bg-black mr-1"></div>
                <div className="w-8 h-1 rounded-full bg-black"></div>
                <div className="w-4 h-1 rounded-full bg-black ml-1"></div>
              </div>
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-black rounded-full flex items-center justify-center">
                <h1 className="text-white text-center text-sm sm:text-base">
                  3
                </h1>
              </div>
            </div>
          </div>
        </nav>
        <hr className="border-gray-200" />
      </div>
      {/* Main */}
      <div className="flex-grow bg-white py-6 px-4 sm:px-44 pt-32 md:pt-20">
        <h1 className="text-2xl md:text-3xl font-bold text-start mb-6">
          Business Operations
        </h1>

        <h2 className="hidden md:block text-xl font-semibold text-start mb-4">
          Business Registration Details
        </h2>

        {/* Business Registration and GSTIN - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-lg font-bold mb-2">GSTIN</label>
            <input
              type="text"
              name="gstin"
              value={formData.gstin}
              onChange={handleInputChange}
              placeholder="22AAA*********5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formData.otherLicenses.map((license, index) => (
            <React.Fragment key={index}>
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">Other Licenses</h3>
                  {index === formData.otherLicenses.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleAddField("otherLicenses")}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
                
              <div className="w-full relative">
                <label className="block text-lg font-bold mb-2">
                  Upload Certificate
                </label>
                <input
                  type="file"
                  name="otherLicenses"
                  data-index={index}
                  data-field="certification"
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                />
                {formData.otherLicenses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField("otherLicenses", index)}
                    className="absolute -top-2 -right-2 text-red-500 px-2 py-1 rounded-full bg-red-50 hover:bg-red-100"
                  >
                    ✕
                  </button>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
        {/* Payment Methods - Grid Layout */}
        <h2 className="text-xl font-semibold text-start py-4">
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
        <h2 className="text-xl font-semibold text-start py-4">
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
        <h2 className="text-xl font-semibold text-start py-4">Refferals <span className="text-gray-500 text-sm">if any</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="w-full">
            <input
              type="text"
              placeholder="If any refferal code"
              name="businessRegistrationNumber"
              value={formData.businessRegistrationNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Navigation Buttons - Flex Layout */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <button
            type="button"
            onClick={() => router.push("/signup/2")}
            className="w-full md:w-40 bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            &larr; Previous
          </button>
          <button
            type="submit"
            onClick={() => router.push("/profile")}
            className="w-full md:w-40 bg-[#303030] text-white font-bold px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Next &rarr;
          </button>
        </div>
      </div>
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

export default MediaAndBranding;

