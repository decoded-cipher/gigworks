"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BusinessOverview from "../components/signup/bussiness-overview";
import LocationDetails from "../components/signup/location-details";
import BusinessOperations from "../components/signup/business-operations";
import { createBusiness, getPaymentLink } from "../api/index";
import { form } from "framer-motion/client";

// Define the main form data interface
export interface FormData {
  // Business Overview
  profileImage: File | null;
  coverImage: File | null;
  avatar: string; // Add this to store the avatar asset path
  banner: string; // Add this to store the banner asset path
  businessName: string;
  businessDescription: string;
  whatsAppNumber: string;
  websiteURL: string;
  businessCategory: string;
  subCategory: string;  // Add this new field
  subCategoryOption: string;  // Add this new field
  ownerName: string;
  emailAddress: string;
  businessType: string;
  slug: string;

  // Location Details
  address: {
    streetAddress: string;
    city: string;
    state: string;
    pinCode: string;
  };
  location: {
    latitude: number | null;
    longitude: number | null;
    fullAddress: string;
    googleMapsLocation?: string;  // Add this field
  };
  operatingHours: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
  socialMediaHandles: Array<{
    platform: string;
    link: string;
  }>;

  // Business Operations
  referral_code: string;
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

// const setLocalStorage = (key: string, value: any) => {
//   localStorage.setItem(key, JSON.stringify(value));
// };

export default function SignupPage() {
  
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://mercury-stg.phonepe.com/web/bundle/checkout.js";
  //   script.defer = true;
  //   document.body.appendChild(script);
  
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Business Overview initial state
    profileImage: null,
    coverImage: null,
    avatar: "", // Initialize avatar
    banner: "", // Initialize banner
    businessName: "",
    businessDescription: "",
    whatsAppNumber: "",
    websiteURL: "",
    businessCategory: "",
    subCategory: "",
    subCategoryOption: "",
    ownerName: "",
    emailAddress: "",
    businessType: "",
    slug: "",

    // Location Details initial state
    address: {
      streetAddress: "",
      city: "",
      state: "",
      pinCode: "",
    },
    location: {
      latitude: null,
      longitude: null,
      fullAddress: "",
      
    },
    operatingHours: [
      {
        day: "Monday",
        startTime: "",
        endTime: "",
      },
    ],
    socialMediaHandles: [
      {
        platform: "Instagram",
        link: "",
      },
    ],

    // Business Operations initial state
    referral_code: "",
    gstin: "",
    otherLicenses: [
      {
        type: "",
        registrationNumber: "",
        certification: "",
      },
    ],
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
  const [error, setError] = useState<string | null>(null);

  const handleFinalSubmit = async () => {
    try {
      setError(null); // Clear any previous errors
      // Helper function to format time
      const formatOperatingHours = (hours: Array<{ day: string; startTime: string; endTime: string }>) => {
        const daysMap: { [key: string]: string } = {
          'Monday': 'mon',
          'Tuesday': 'tue',
          'Wednesday': 'web',
          'Thursday': 'thu',
          'Friday': 'fri',
          'Saturday': 'sat',
          'Sunday': 'sun'
        };

        const formattedHours: { [key: string]: string } = {};
        hours.forEach(({ day, startTime, endTime }) => {
          if (startTime && endTime) {
            formattedHours[daysMap[day]] = `${startTime}-${endTime}`;
          }
        });
        return formattedHours;
      };
      const userDataString:any = localStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      // console.log(userDataString);
      
      const profileData = {
        name: formData.businessName,
        slug: formData.slug,
        description: formData.businessDescription,
        email: formData.emailAddress,
        phone: formData.whatsAppNumber,
        website: formData.websiteURL || "",
        category_id: formData.businessCategory,
        sub_category_id: formData.subCategory,
        sub_category_option_id: formData.subCategoryOption,
        address: formData.address.streetAddress,
        city: formData.address.city,
        state: formData.address.state,
        zip: formData.address.pinCode,
        location_url: formData.location.googleMapsLocation || "", 
        latitude: formData.location.latitude,
        longitude: formData.location.longitude,
        socials: {
          website: formData.socialMediaHandles.find(h => h.platform === "Website")?.link || "",
          facebook: formData.socialMediaHandles.find(h => h.platform === "Facebook")?.link || "",
          instagram: formData.socialMediaHandles.find(h => h.platform === "Instagram")?.link || "",
          twitter: formData.socialMediaHandles.find(h => h.platform === "X (Twitter)")?.link || "",
          linkedin: formData.socialMediaHandles.find(h => h.platform === "LinkedIn")?.link || "",
          youtube: formData.socialMediaHandles.find(h => h.platform === "YouTube")?.link || "",
          reddit: formData.socialMediaHandles.find(h => h.platform === "Reddit")?.link || "",
          tiktok: formData.socialMediaHandles.find(h => h.platform === "TikTok")?.link || "",
          pinterest: formData.socialMediaHandles.find(h => h.platform === "Pinterest")?.link || "",
          behance: formData.socialMediaHandles.find(h => h.platform === "Behance")?.link || "",
          dribbble: formData.socialMediaHandles.find(h => h.platform === "Dribbble")?.link || "",
          github: formData.socialMediaHandles.find(h => h.platform === "GitHub")?.link || "",
          medium: formData.socialMediaHandles.find(h => h.platform === "Medium")?.link || "",

        },
        operating_hours: formatOperatingHours(formData.operatingHours),
        avatar: formData.avatar || "",
        banner: formData.banner || "",
        type: formData.businessType.toLowerCase(),
        additional_services: Object.entries(formData.additionalServices)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(", "),
        gstin: formData.gstin,
        referral_code: formData.referral_code
      };
      
      console.log("asdf",formData.location);
      
      const payload:any = {
        user: {
          name: userData.name,
          phone: userData.phone
        },
        profile: profileData,
        payment: {
          amount: 250,
          payment_status: 'pending'  // Add this required field
        },
        license: formData.otherLicenses
          .filter(license => license.type && license.registrationNumber)
          .map(license => ({
            type_id: license.type,
            number: license.registrationNumber,
            url: license.certification || "license/test.png"
          }))
      };

      // const response = await createBusiness(payload);

      // setLocalStorage('userProfiles', {
      //   name:  formData.businessName,
      //   slug: formData.slug,
      //   avatar: formData.avatar,
      // });
      // Extract the slug from the response
      // const profileSlug = response.data.profile.slug;
      
      // toast.success("Business created successfully!");
      

      const paymentResponse = await getPaymentLink();
      const tokenUrl = paymentResponse.url;
      console.log("Payment URL:", tokenUrl);

      const callback = (status: string) => {
        if (status === 'USER_CANCEL') {
          toast.error("Payment was cancelled.");
        } else if (status === 'CONCLUDED') {
          toast.success("Payment successful!");
          // router.push(`/${profileSlug}`);
        }
      };

      if (window?.PhonePeCheckout?.transact) {
        window.PhonePeCheckout.transact({
          tokenUrl,
          type: "IFRAME",
          callback
        });
      } else {
        toast.error("PhonePe SDK not loaded");
      }
      

    } catch (error: any) {
      console.error("Error creating business:", error);
      const errorMessage = error.response?.data?.error || "Failed to create business. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      await handleFinalSubmit();
    }
  };

  const router = useRouter();

  // const handleNext = () => {
  //   if (currentStep < 3) {
  //     setCurrentStep(currentStep + 1)
  //   } else {
  //     // Handle final submission
  //     console.log('Final form data:', formData)
  //     router.push('/profile')
  //   }
  // }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Show error message if exists */}
      {error && (
        <div className="fixed top-20 left-0 right-0 mx-auto w-full max-w-md z-50">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <nav className="flex flex-col sm:flex-row justify-between items-center p-4 w-full">
          <div className="flex justify-center sm:justify-start w-full sm:w-auto mb-4 sm:mb-0">
            <Image
              src="/assets/media/gigworksblk.svg"
              alt="Logo"
              width={150}
              height={50}
              className="max-w-[206px] max-h-[216px]"
            />
          </div>
          <div className="flex items-center">
            <div className="flex justify-center items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <>
                  <div
                    key={step}
                    className={`w-9 sm:w-10 h-9 sm:h-10 rounded-full flex items-center justify-center ${
                      step <= currentStep ? "bg-black" : "bg-gray-300"
                    }`}
                  >
                    <h1
                      className={`text-center text-sm sm:text-base ${
                        step <= currentStep ? "text-white" : "text-black"
                      }`}
                    >
                      {step}
                    </h1>
                  </div>
                  {step < 3 && (
                    <div className="hidden sm:flex items-center">
                      <div
                        className={`w-4 h-1 rounded-full mr-1 ${
                          step < currentStep ? "bg-black" : "bg-gray-300"
                        }`}
                      ></div>
                      <div
                        className={`w-8 h-1 rounded-full ${
                          step < currentStep ? "bg-black" : "bg-gray-300"
                        }`}
                      ></div>
                      <div
                        className={`w-4 h-1 rounded-full ml-1 ${
                          step < currentStep ? "bg-black" : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </nav>
        <hr className="border-gray-200" />
      </div>

      <div className="flex-grow bg-white px-4 sm:px-8 md:px-20 pt-32 md:pt-20">
        {currentStep === 1 && (
          <BusinessOverview
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <LocationDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentStep === 3 && (
          <BusinessOperations
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bottom-0 left-0 right-0 w-full border-t bg-background px-4 py-6 mt-2">
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
}
