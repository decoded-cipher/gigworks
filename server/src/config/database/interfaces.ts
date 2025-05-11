
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

export interface Tag {
    name: string;
    category_id: string;
    sub_category_id: string;
    status?: string;
}


// ------------------------------------------------------------------------------------------------------


export interface User {
    id: string
    name: string;
    
    phone: string;
    
    role?: string;
    status?: string;
}

export interface Admin {
    id: string;
    name: string;

    email: string;
    password: string;
    salt: string;

    role?: string;
    status?: string;
}


export interface Profile {
    user_id: string;

    name: string;
    slug: string;
    description?: string;
    email?: string;
    phone?: string;

    category_id: string;
    sub_category_id: string;
    sub_category_option_id: string;

    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    
    latitude?: number;
    longitude?: number;
    location_url?: string;

    operating_hours?: string;
    socials?: string;

    logo?: string;
    type: string;
    additional_services?: string;
    gstin?: string;

    referral_code?: string;
    partner_id?: string;

    status?: string;
}


export interface ProfilePayment {
    profile_id: string;
    amount: number;
    payment_mode?: string;
    payment_status?: string;
    transaction_id?: string;
    reference_id?: string;
    payment_date?: string;
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


export interface ProfileTag {
    profile_id: string;
    tag_id: string;
    status?: string;
}


export interface Partner {
    user_id: string;
    avatar?: string;
    address?: string;
    referral_code?: string;
    status?: string;
}


export interface PartnerBank {
    partner_id: string;
    account_number?: string;
    ifsc?: string;
    bank_name?: string;
    branch_name?: string;
    account_holder?: string;
    upi_id?: string;
}

export interface TokenTable {
    user_id?: string;
    admin_id?: string;
    token: string;
    expiry: string;
}

export interface ProfileMedia {
    profile_id: string;
    url: string;
    description?: string;
    status?: string;
}


// ------------------------------------------------------------------------------------------------------


interface PartnerIdProofType {
    id: number;
    name: string;
    slug: string;
}

export const partnerIdProofTypes: PartnerIdProofType[] = [
    { id: 1, name: 'Aadhar Card', slug: 'aadhar-card' },
    { id: 2, name: 'Voter ID', slug: 'voter-id' },
    { id: 3, name: 'Driving License', slug: 'driving-license' },
    { id: 4, name: 'Passport', slug: 'passport' },
    { id: 5, name: 'PAN Card', slug: 'pan-card' }
];

export interface PartnerIdProof {
    partner_id: string;
    proof_type_id: number;
    proof_number: string;
    proof_url?: string;
    status?: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
    location_url?: string;
};