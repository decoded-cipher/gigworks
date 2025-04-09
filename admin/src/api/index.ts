/// <reference types="vite/client" />

import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BASE_URL; 
// const BASE_URL = "http://127.0.0.1:8787/api/v1";

export const getBusinesses = async (params:any) => {
    const response = await axios.get(`${BASE_URL}/business/renewal`, { params });
    return response.data;
};

export const updateBusinessStatus = async (data:any) => {
    const response = await axios.post(`${BASE_URL}/business/update-status`, data);
    console.log(response.data);
    return response.data;
    
}

// Categories

export const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/category?status=all`);    
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
    const response = await axios.get(`${BASE_URL}/category/${id}?status=all`);
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

export const updateSubCategoryStatus = async (data:any) => {
   
    const response = await axios.put(`${BASE_URL}/sub_category/update-status`, data); 
    return response.data;
}

// Sub Category Options

export const fetchSubCategoryOptions = async (id:number) => {
    const response = await axios.get(`${BASE_URL}/sub_category/${id}?status=all`);
    return response.data;
}

export const addSubCategoryOptions = async (data:any) => {
    const response = await axios.post(`${BASE_URL}/sub_category_option`, data);
    return response.data;
}

export const updateSubCategoryOptions = async (data:any) => {
    const name = {
        name: data.name 
    }   
    console.log("update",data);
    
    const response = await axios.patch(`${BASE_URL}/sub_category_option/${data.sub_category_id}`, name);
    return response.data;
}

export const updateSubCategoryOptionsStatus = async (data:any) => {
    // const name = {
    //     status: data.status,
    //     sub_category_option_id: data.id
    // }
    console.log("update",data);
    
    const response = await axios.patch(`${BASE_URL}/sub_category_option/update-status`, data); 
    return response.data;
}



// license

export const fetchLicense = async () => {
    const response = await axios.get(`${BASE_URL}/license`);
    return response.data;
}

export const addLicenses = async (data:any) => {
    const response = await axios.post(`${BASE_URL}/license`, data);
    // console.log("response",response);
    return response.data;
    
}

export const updateLicense = async (data:any) => {        
    const name = {
        name: data.name,
        description: data.description,
    }    
    const response = await axios.patch(`${BASE_URL}/license/${data.id}`, name);
    return response.data;
}

export const updateLicenseStatus = async (data:any) => {
    // const name = {
    //     status: data.status,
    //     license_id: data.id
    // }    
    console.log("update",data);
    console.log("licencse ipo marumna",);
    
    
    const response = await axios.put(`${BASE_URL}/license/update-status`, data);
    return response.data;

}


//  category status
export const disableCategory = async (id:number) => {
    const response = await axios.patch(`${BASE_URL}/category/${id}/disable`);
    return response.data;
}

export const enableCategory = async (id:number) => {    
    const response = await axios.patch(`${BASE_URL}/category/${id}/enable`);
    return response.data;
}
