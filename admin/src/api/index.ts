
import axios from 'axios';

const BASE_URL = 'http://localhost:8787/api/v1';


export const getBusinesses = async (params:any) => {
    const response = await axios.get(`${BASE_URL}/business/renewal`, { params });
    return response.data;
};

// Categories

export const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/category`);    
    return response.data;
}

export const addCategories = async (data:any) => {
    const response = await axios.post(`${BASE_URL}/category`, data);
    return response.data;
}

export const updateCategories = async (data:any) => {    
    const name = {
        name: data.name
    }
    const response = await axios.patch(`${BASE_URL}/category/${data.id}`, name);
    return response.data;
}

// Sub Categories

export const fetchSubCategories = async (id:number) => {
    const response = await axios.get(`${BASE_URL}/category/${id}`);
    return response.data;
}

export const addSubCategories = async (data:any) => {
    const response = await axios.post(`${BASE_URL}/sub_category`, data);
    return response.data;
}

export const updateSubCategories = async (data:any) => {
    console.log("update",data);
    
    const name = {
        name: data.name 
    }
    const response = await axios.patch(`${BASE_URL}/sub_category/${data.category_id}`, name);
    return response.data;
}

// Sub Category Options

export const fetchSubCategoryOptions = async (id:number) => {
    const response = await axios.get(`${BASE_URL}/sub_category/${id}`);
    return response.data;
}

export const addSubCategoryOptions = async (data:any) => {
    const response = await axios.post(`${BASE_URL}/sub_category_option`, data);
    return response.data;
}


// license

export const fetchLicense = async () => {
    const response = await axios.get(`${BASE_URL}/license`);
    return response.data;
}

export const addLicenses = async (data:any) => {
    const response = await axios.post(`${BASE_URL}/license`, data);
    console.log("response",response);
    return response.data;
    
}