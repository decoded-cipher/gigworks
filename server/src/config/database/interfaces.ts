
export const Category = {
    name: 'string',
}

export const SubCategory = {
    name: 'string',
    category_id: 'number',
}

export const SubCategoryOption = {
    name: 'string',
    sub_category_id: 'number',
}

export interface LicenseType {
    name: string;
    description: string;
}

// export interface Tag {
//     name: string;
// }


// ------------------------------------------------------------------------------------------------------


export interface User {
    id: string
    name: string;
    phone: string;
    role?: string;
    status?: string;
}


export interface Profile {
    user_id: string;

    name: string;
    slug: string;
    description?: string;
    email?: string;
    website?: string;
    phone?: string;

    registration_number?: string;
    gstin?: string;

    category_id: number;
    sub_category_id: number;
    // sub_category_option_id: number

    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;

    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;

    logo?: string;
    type: string;
    additional_services?: string;

    status?: string;
}


export interface ProfilePayment {
    profile_id: string;
    amount: number;
    payment_mode: string;
    payment_status: string;
    payment_id?: string;
    payment_date: string;
}


export interface ProfileMedia {
    profile_id: string;
    url: string;
    description?: string;
}


export interface ProfileLicense {
    profile_id: string;
    license_type_id: string;
    license_number: string;
    license_url?: string;
    status?: string;
}


// export interface ProfileTag {
//     profile_id: string;
//     tag_id: string;
//     status?: string;
// }


// export interface Testimonial {
//     profile_id: string;
//     user_id: number;
//     rating: number;
//     comment: string;
// }


// export interface ActivityLog {
//     user_id: string;
//     activity: string;
//     user_agent: string;
//     timestamp: string;
// }
