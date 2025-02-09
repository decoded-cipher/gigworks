"use client";
import {
  GetPartner,
  updatePartner,
  ASSET_BASE_URL,
  GetURL,
  uploadToPresignedUrl,
} from "@/app/api";
import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import ImageCropper from "../../components/ImageCropper";
import { toast } from "react-hot-toast"; // Add toast for notifications
import { useParams, useRouter } from "next/navigation";


interface Partner {
  user: {
    name: string;
    phone: string;
  };
  partner: {
    address: string;
    avatar: string;
    referral_code: string;
  };
  partnerBank: {
    account_holder: string;
    account_number: string;
    bank_name: string;
    branch_name: string;
    ifsc: string;
    upi_id: string;
  } | null;
  partnerIdProof: string;
}

const EditPartner = () => {
  const [partner, setPartner] = useState<Partner | null>(null);
  const router = useRouter();
  const [cropperState, setCropperState] = useState<{
    isOpen: boolean;
    imageUrl: string;
    fieldType: "avatar" | "banner" | null;
  }>({
    isOpen: false,
    imageUrl: "",
    fieldType: null,
  });
  const [newBankAccount, setNewBankAccount] = useState<{
    account_holder: string;
    account_number: string;
    bank_name: string;
    branch_name: string;
    ifsc: string;
    upi_id: string;
  }>({
    account_holder: "",
    account_number: "",
    bank_name: "",
    branch_name: "",
    ifsc: "",
    upi_id: "",
  });
  const [changedFields, setChangedFields] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await GetPartner();
        setPartner(res.data[0]);
        console.log("Partner data:", res.data[0]);
      } catch (error) {
        console.error("Failed to fetch partner data:", error);
      }
    };
    fetchPartner();
  }, []);

  const handleFieldChange = (field: string, value: string) => {
    if (partner) {
      setPartner({
        ...partner,
        partner: {
          ...partner.partner,
          [field]: value,
        },
      });
      // Update changedFields with the correct nested structure
      setChangedFields((prev) => ({
        ...prev,
        partner: {
          ...(typeof prev.partner === "object" ? prev.partner : {}),
          [field]: value,
        },
      }));
    }
  };

  const handleSaveChanges = async () => {
    
    if (Object.keys(changedFields).length > 0) {
      try {
        // Create the proper structure for the API call
        const updateData = {
          ...partner,
          ...changedFields,
        };
        await updatePartner(updateData);
        console.log("Partner updated successfully");
        router.push("/partnerProfile"); 
        // Reset changed fields after successful update
        setChangedFields({});
      } catch (error) {
        console.error("Failed to update partner data:", error);
      }
    }else{
      console.log("No changes to save");
      alert("No changes to save");
    }
  };

  const handleImageSelect = async (
    file: File,
    fieldType: "avatar" | "banner"
  ) => {
    const imageUrl = URL.createObjectURL(file);
    setCropperState({
      isOpen: true,
      imageUrl,
      fieldType,
    });
  };

  const handleCroppedImage = async (croppedImageUrl: string) => {
    try {
      if (!cropperState.fieldType || !partner?.partner.referral_code) return;

      // Convert base64/URL to blob
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const file = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      // Get presigned URL
      const uploadResponse = await GetURL({
        type: file.type,
        category: cropperState.fieldType,
      });

      if (!uploadResponse.presignedUrl) {
        throw new Error("Failed to get presigned URL");
      }

      // Upload to storage
      await uploadToPresignedUrl(uploadResponse.presignedUrl, file);

      // Update business profile
      await handleFieldChange(cropperState.fieldType, uploadResponse.assetpath);

      // Close cropper
      setCropperState({
        isOpen: false,
        imageUrl: "",
        fieldType: null,
      });

      toast.success("Image updated successfully");
    } catch (error) {
      console.error("Error handling cropped image:", error);
      toast.error("Failed to update image");
    }
  };

  const handleDeleteBankAccount = () => {
    if (partner) {
      setPartner({
        ...partner,
        partnerBank: null,
      });
      setChangedFields((prev) => ({
        ...prev,
        partnerBank: null,
      }));
    }
  };

  const handleAddBankAccount = async () => {
    if (
      partner &&
      newBankAccount.account_holder &&
      newBankAccount.account_number &&
      newBankAccount.bank_name &&
      newBankAccount.branch_name &&
      newBankAccount.ifsc &&
      newBankAccount.upi_id
    ) {
      const updatedPartner = {
        ...partner,
        partnerBank: newBankAccount,
      };
      try {
        await updatePartner(updatedPartner);
        setPartner(updatedPartner);
        setChangedFields({}); // Reset changed fields after successful update
        setNewBankAccount({
          account_holder: "",
          account_number: "",
          bank_name: "",
          branch_name: "",
          ifsc: "",
          upi_id: "",
        });
        console.log("Bank account added successfully");
      } catch (error) {
        console.error("Failed to add bank account:", error);
      }
    } else {
      console.error("All bank account fields are required");
    }
  };

  return (
    <div>
      {partner ? (
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
              <h3 className="text-sm font-medium mb-2 flex items-center justify-center" >Profile Image</h3>
            <div className="flex items-center justify-center">
              <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageSelect(file, "avatar");
                }}
                className="hidden"
                id="avatar-input"
              />
              <div className="relative">
                <img
                  src={
                    partner.partner.avatar
                      ? `${ASSET_BASE_URL}/${partner.partner.avatar}`
                      : "/placeholder-avatar.png"
                  }
                  alt="Avatar"
                  className="w-32 h-32 object-cover rounded-full"
                />
                <label
                  htmlFor="avatar-input"
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer"
                >
                  <Pencil size={16} />
                </label>
              </div>
              </>
            </div>
            {cropperState.isOpen && (
              <ImageCropper
                imageUrl={cropperState.imageUrl}
                aspect={cropperState.fieldType === "avatar" ? 1 : 3} // 600/200 simplified to 3
                onCropComplete={handleCroppedImage}
                onCancel={() =>
                  setCropperState({
                    isOpen: false,
                    imageUrl: "",
                    fieldType: null,
                  })
                }
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  defaultValue={partner.user.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={partner.user.phone}
                  disabled
                  className="w-full p-2 border rounded-lg bg-gray-100"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                defaultValue={partner.partner.address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="bg-green-200/20 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-1 ">
                Bank Account
              </label>
              {partner.partnerBank ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Account Holder
                    </label>
                    <input
                      type="text"
                      value={partner.partnerBank.account_holder}
                      disabled
                      className="w-full p-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={partner.partnerBank.account_number}
                      disabled
                      className="w-full p-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={partner.partnerBank.bank_name}
                      disabled
                      className="w-full p-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Branch
                    </label>
                    <input
                      type="text"
                      value={partner.partnerBank.branch_name}
                      disabled
                      className="w-full p-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      IFSC code
                    </label>
                    <input
                      type="text"
                      value={partner.partnerBank.ifsc}
                      disabled
                      className="w-full p-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      value={partner.partnerBank.upi_id}
                      disabled
                      className="w-full p-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <button
                      onClick={handleDeleteBankAccount}
                      className="p-2 bg-red-500 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Account Holder"
                    value={newBankAccount.account_holder}
                    onChange={(e) =>
                      setNewBankAccount({
                        ...newBankAccount,
                        account_holder: e.target.value,
                      })
                    }
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Account Number"
                    value={newBankAccount.account_number}
                    onChange={(e) =>
                      setNewBankAccount({
                        ...newBankAccount,
                        account_number: e.target.value,
                      })
                    }
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Bank Name"
                    value={newBankAccount.bank_name}
                    onChange={(e) =>
                      setNewBankAccount({
                        ...newBankAccount,
                        bank_name: e.target.value,
                      })
                    }
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Branch Name"
                    value={newBankAccount.branch_name}
                    onChange={(e) =>
                      setNewBankAccount({
                        ...newBankAccount,
                        branch_name: e.target.value,
                      })
                    }
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    value={newBankAccount.ifsc}
                    onChange={(e) =>
                      setNewBankAccount({
                        ...newBankAccount,
                        ifsc: e.target.value,
                      })
                    }
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="UPI ID"
                    value={newBankAccount.upi_id}
                    onChange={(e) =>
                      setNewBankAccount({
                        ...newBankAccount,
                        upi_id: e.target.value,
                      })
                    }
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                  <div>
                    <button
                      onClick={handleAddBankAccount}
                      className="p-2 bg-green-500 text-white rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleSaveChanges}
              className="p-2 bg-blue-500 text-white rounded-lg mt-4"
            >
              Save Changes
            </button>
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditPartner;
