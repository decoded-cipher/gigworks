import axios from 'axios';

export const fetchBusinessData = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category` ///api/v1/category?page=1&limit=3
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/business?category_id=${categoryId}`
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/business/${slug}`
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/business/count`

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
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify/login`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};



export const CreateBusiness = async (data: any) => {
  try {
    const response = await axios.post(
      '${process.env.NEXT_PUBLIC_API_URL}/api/v1/business',

      data
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching businesses:', error);

    throw error;
  }

};