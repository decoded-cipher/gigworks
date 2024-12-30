import axios from 'axios';

const BASE_URL = "https://gigworks-server.devmorphix.workers.dev";
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const fetchBusinessData = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/category` ///api/v1/category?page=1&limit=3
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching business data:', error);
    throw error;
  }
};

export const fetchBusinessesByCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/business?category_id=${categoryId}`
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


export const fetchBusinessCount = async () =>{
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
  category: 'identity' | 'avatar';
}

interface GetURLResponse {
  presignedUrl: string;
  assetpath: string;
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
    return response.data;
  } catch (error) {
    console.error('Error getting presigned URL:', error);
    throw error;
  }
};

// no correct

export const UploadMedia = async (data: any) => {
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
    return response.data;
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
    return response.data;
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

export const VerifyRegisterOTP = async (data: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/verify/register`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const UserLogout = async (data: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
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


export const fetchsubCategoryByCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/category/${categoryId}`
    );
    // console.log('response',response.data);
    
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
    console.log('response',response.data);
    
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

