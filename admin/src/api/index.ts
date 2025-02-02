
import axios from 'axios';

const BASE_URL = 'http://localhost:8787/api/v1';


export const getBusinesses = async (params) => {
    const response = await axios.get(`${BASE_URL}/business/renewal`, { params });
    return response.data;
};
