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
