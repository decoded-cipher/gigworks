import axios from 'axios';
import { log } from 'console';

// const BASE_URL = "https://gigworks-server.devmorphix.workers.dev";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const ASSET_BASE_URL = process.env.NEXT_PUBLIC_ASSET_BASE_URL;
// export const ASSET_BASE_URL = 'https://pub-3aaf2182691d4cb6b5270a8f14ad704a.r2.dev';

export const fetchBusinessData = async (params:any = {}) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/category?hasBusiness=true`,
        ///api/v1/category?page=1&limit=3
    );
      
        
    return response.data;
  } catch (error) {
    console.error('Error fetching business data:', error);
    throw error;
  }
};

export const fetchBusinessesByCategory = async (category_name: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/business?category_name=${category_name}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error;
  }
};

export const fetchBusinessesByslug = async (slug: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/business/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error;
  }
};


export const fetchBusinessCount = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/business/count`

    );
    return response.data;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error;
  }
};

interface GetURLParams {
  type: string;
  category: 'identity' | 'avatar' | 'license' | 'banner' | 'media'; // Added 'media' as valid category
}

// Update the response interface to match the expected structure
interface GetURLResponse {
  data: {
    presignedUrl: string;
    assetPath: string;
  };
  presignedUrl: string;  // Add this
  assetpath: string;     // Add this
}

export const GetURL = async (params: GetURLParams): Promise<GetURLResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/media/get-presigned-url`,
      {
        params: {
          type: params.type,     
          category: params.category 
        }
      }
    );
    // Transform the response to match both interfaces
    return {
      ...response.data,
      presignedUrl: response.data.data.presignedUrl,
      assetpath: response.data.data.assetPath
    };
  } catch (error) {
    console.error('Error getting presigned URL:', error);
    throw error;  
  }
};

// Add BusinessProfile interface at the top of the file
interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string | null;
  address: string;
  city: string;
  state: string;
  country: string;
  operating_hours: {
    [key: string]: string;
  };
  socials: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    [key: string]: string | undefined;
  };
  avatar: string;
  banner: string;
  type: string;
  additional_services: string;
  gstin: string;
  [key: string]: any;
}

// export const GetURL = async (category: 'avatar' | 'banner' | 'license' | 'identity', fileType: string) => {
//   try {
//     // Check if API URL is defined
//     if (!process.env.NEXT_PUBLIC_API_URL) {
//       throw new Error('API URL is not defined');
//     }

//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/v1/media/get-presigned-url`,
//       {
//         params: {
//           type: fileType,
//           category: category
//         }
//       }
//     );
//     return response.data;
//   } catch (error: any) {
//     // Better error handling
//     if (error.code === 'ERR_NAME_NOT_RESOLVED') {
//       console.error('API URL could not be resolved. Check your environment variables and API server.');
//     }
//     throw error;
//   }
// };

export const uploadToPresignedUrl = async (presignedUrl: string, file: File) => {
  try {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};




export const UserRegister = async (data: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/register`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error;
  }
};

export const UserLogin = async (data: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      data
    );
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const VerifyLoginOTP = async (data: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/verify/login`,
      data
    );
    return response;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const CreatePartner = async (data: any) => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    const response = await axios.post(
      `${BASE_URL}/api/v1/partner`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const BisunessMedia = async (data: any) => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    const response = await axios.post(
      `${BASE_URL}/api/v1/media`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const DeleteLicense = async (profileId: string, licenseId: string) => {
  try {
      const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    console.log('Deleting license:', profileId, licenseId);
    

    const response = await axios.delete(`${BASE_URL}/api/v1/business/${profileId}/license/${licenseId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
      });
      console.log(response.data);
      
      return response.data;
    } catch (error) { 
      console.error('Error in deleting license:', error);
      throw error;
    }
};

export const AddLicense = async (profileId: string, licenseData: { url: string, number: string, type_id: string }) => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      throw new Error('Authorization token not found');
    }

    const response = await axios.post(`${BASE_URL}/api/v1/business/${profileId}/license`, licenseData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Add response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error in adding license:', error.response ? error.response.data : error.message);
    } else {
      console.error('Error in adding license:', error);
    }
    throw error;
  }
};

export const updatePartner = async (data: any) => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    console.log(data);
    
    const response = await axios.patch(
      `${BASE_URL}/api/v1/partner`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
}

export const GetPartner = async () => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    const response = await axios.get(
      `${BASE_URL}/api/v1/partner`,
      
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const GetPartnerAnalytics = async (start?: string, end?: string) => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    const response = await axios.get(
      `${BASE_URL}/api/v1/partner/analytics`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          start,
          end
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

export const VerifyRegisterOTP = async (data: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/verify/register`,
      data
    );
    return response;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const UserLogout = async (data: any) => {
  try {

    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      throw new Error('No token provided');
    }


    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }, 
      }
    );
    return response;
  } catch (error) {
    console.error('Error in logout:', error);
    throw error;
  }
};

interface BusinessPayload {
  user: {
    name: string
    phone: string
  }
  profile: {
    name: string
    slug: string
    description: string
    email: string
    website: string
    category_id: string
    sub_category_id: string
    address: string
    city: string
    state: string
    zip: string
    type: string
  }
  payment: {
    amount: number
    payment_status: string
  }
}



export const createBusiness = async (data: BusinessPayload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/business`,

      data
    )
    return response.data
  } catch (error) {
    console.error('Error creating business:', error)
    throw error
  }
}


export const getPaymentLink = async (data: { profile_id: string, mode: string, type: string }) => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    const response = await axios.post(
      `${BASE_URL}/api/v1/payment/initiate`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching payment link:', error);
    throw error;
  }
}


export const fetchsubCategoryByCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/category/${categoryId}`
    );
   
    
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    throw error;
  }
}




export const fetchDataBySubCategory = async (subCategoryId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/sub_category/${subCategoryId}`
    );
   
    
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    throw error;
  }
}


export const checkSlug = async (value: string) => { 
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/business/slug/check`,
      {
        params: { value }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error;
  }
}

export const fetchLicenseData = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/license`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching license data:', error);
    throw error;
  }
}

export const createBusinessMedia = async (businessId: string, data: { url: string, type: string, description: string }) => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

        // console.log(typeof data);
        // console.log(data);
        
        
    const response = await axios.post(
      `${BASE_URL}/api/v1/business/${businessId}/media`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating media:', error);
    throw error;
  }
};

export const deletebusinessMedia = async (businessId: string, mediaId: string) => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    const response = await axios.delete(
      `${BASE_URL}/api/v1/business/${businessId}/media/${mediaId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting media:', error);
    throw error;
  }
}




export const updateBusiness = async (businessId: string, updateData: Record<string, any>) => {
  try {
    // console.log("Sending update request for business:", businessId);
    // console.log("Update data:", updateData);

    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    const response = await axios.patch(
      `${BASE_URL}/api/v1/business/${businessId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating business:", error);
    throw error;
  }
};

export const createLicense = async (businessId: string, licenseData: {
  url: string;
  number: string;
  type_id: string;
}) => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    const response = await axios.post(
      `${BASE_URL}/api/v1/business/${businessId}/license`,
      licenseData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating license:", error);
    throw error;
  }
};


// location search

export const fetchServices = async (query: string) => {
  try {
    console.log(query);
    
    const response = await axios.get(
      `${BASE_URL}/api/v1/sub_category_option?search=${query}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}


// fetch location based services

export const searchBusinesses = async (
  service: string, 
  coordinates: { lat: string; lon: string }
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/bot/request_service`,
      { service },
      { 
        headers: {
          'Content-Type': 'application/json',
          'X-User-Location': JSON.stringify({
            latitude: coordinates.lat,
            longitude: coordinates.lon
          })
        }
      }
    );
    console.log(response.data);
    
    
    return response.data;
  } catch (error) {
    console.error('Error searching businesses:', error);
    throw error;
  }
};

export const submitContactForm = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  turnstileToken: string;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/bot/send_email`,
      {
        ...formData
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

export const fetchCorrdinates = async (url: string ) =>{
  console.log(url);
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    const data = {
      url: url
    };
    const response = await axios.post(`${BASE_URL}/api/v1/location`, data,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) 
    console.log(response.data.data);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }

}

export const checkPaymentStatus = async (transaction_id: string) => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    const response = await axios.get(
      `${BASE_URL}/api/v1/payment/status`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          transaction_id
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
}