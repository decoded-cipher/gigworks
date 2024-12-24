"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  branch: string;
  upiId: string;
}

const BankDetailsForm = () => {
  const [formData, setFormData] = useState<BankDetails>({
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
    branch: "",
    upiId: "",
  });

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
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
                <h1 className="text-white text-center text-sm sm:text-base">1</h1>
              </div>
              <div className="hidden sm:flex items-center">
                <div className="w-4 h-1 rounded-full bg-black mr-1"></div>
                <div className="w-8 h-1 rounded-full bg-black"></div>
                <div className="w-4 h-1 rounded-full bg-black ml-1"></div>
              </div>
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-black rounded-full flex items-center justify-center">
                <h1 className="text-white text-center text-sm sm:text-base">2</h1>
              </div>
            </div>
          </div>
        </nav>
        <hr className="border-gray-200" />
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white py-6 px-4 sm:px-8 md:px-20 pt-32 md:pt-20">
        <h1 className="text-2xl font-bold mb-6">Bank Details</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Holder Name */}
            <div>
              <label className="block text-base font-semibold mb-2">
                Account Holder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="accountHolderName"
                placeholder="Account Holder Name"
                value={formData.accountHolderName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-base font-semibold mb-2">
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            {/* IFSC */}
            <div>
              <label className="block text-base font-semibold mb-2">
                IFSC <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ifsc"
                placeholder="IFSC code"
                value={formData.ifsc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            {/* Branch */}
            <div>
              <label className="block text-base font-semibold mb-2">
                Branch <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="branch"
                placeholder="Branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            {/* UPI ID */}
            <div>
              <label className="block text-base font-semibold mb-2">
                UPI ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="upiId"
                placeholder="UPI ID"
                value={formData.upiId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#303030] text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Create Profile
            </button>
          </div>
        </form>
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

export default BankDetailsForm;

