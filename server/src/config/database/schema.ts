
import { nanoid } from 'nanoid'
import { sql, gte, lte } from "drizzle-orm";
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { timestamp } from 'drizzle-orm/mysql-core';

import { partnerIdProofTypes } from './interfaces';



// ------------------------------------------------------------------------------------------------------



// Admin
export const admin = sqliteTable('admin', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    role: integer().$type('ENUM', [1, 2]).default(2).notNull(), // 1: super admin, 2: admin
    salt: text().notNull(),
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['email'] }
        ]
    }
});


// User
export const user = sqliteTable('user', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    phone: text().notNull().unique(),
    role: integer().$type('ENUM', [1, 2]).default(2).notNull(), // 1: partner, 2: profile (business owner)
    status: integer().default(0).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['name'] },
            { columns: ['phone'] },
            { columns: ['role'] }
        ]
    }
});


export const tokenTable = sqliteTable('token', {
    id: text().primaryKey().$default(nanoid),
    
    user_id: text().references(() => user.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    admin_id: text().references(() => admin.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    token: text().notNull().unique(),
    expiry: text(),
    
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['admin_id'], unique: true },
            { columns: ['user_id'], unique: true },
            { columns: ['token'], unique: true },
            { columns: ['expires_at'] }
        ],
        constraints: [
            sql`CHECK (user_id IS NOT NULL OR admin_id IS NOT NULL)`
        ]
    }
});



// ------------------------------------------------------------------------------------------------------



// Category
export const category = sqliteTable('category', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['name'] }
        ]
    }
});


// Sub Category
export const subCategory = sqliteTable('sub_category', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    category_id: text().notNull().references(() => category.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['name'] },
            { columns: ['category_id'] }
        ]
    }
});


// Sub Category Option
export const subCategoryOption = sqliteTable('sub_category_option', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    sub_category_id: text().notNull().references(() => subCategory.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['name'] },
            { columns: ['sub_category_id'] }
        ]
    }
});



// ------------------------------------------------------------------------------------------------------



// Partner
export const partner = sqliteTable('partner', {
    id: text().primaryKey().$default(nanoid),
    user_id: text().notNull().references(() => user.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    avatar: text(),
    referral_code: text(),
    address: text(),
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['user_id'] },
            { columns: ['referral_code'] }
        ]
    }
});


// Partner Payment Info
export const partnerBank = sqliteTable('partner_bank', {
    id: text().primaryKey().$default(nanoid),
    partner_id: text().notNull().references(() => partner.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    
    account_number: text().unique(),
    ifsc: text(),
    bank_name: text(),
    branch_name: text(),
    account_holder: text(),
    upi_id: text().unique(),
    
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['partner_id'] },
            { columns: ['account_number'] },
            { columns: ['upi_id'] }
        ]
    }
});


// Partner Identity Proof
export const partnerIdProof = sqliteTable('partner_id_proof', {
    id: text().primaryKey().$default(nanoid),
    partner_id: text().notNull().references(() => partner.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    
    proof_type_id: integer().$type('ENUM', partnerIdProofTypes.map((type) => type.id)).notNull(),
    proof_number: text().notNull().unique(),
    proof_url: text().notNull(),
    
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['partner_id'] },
            { columns: ['number'] }
        ]
    }
});



// ------------------------------------------------------------------------------------------------------



// Profile
export const profile = sqliteTable('profile', {
    id: text().primaryKey().$default(nanoid),
    user_id: text().notNull().references(() => user.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    
    // Basic Info
    name: text().notNull(),
    slug: text().notNull().unique(),
    description: text(),
    email: text(),
    phone: text().unique(), // Extra phone number other than owner phone number

    // Category
    category_id: text().notNull().references(() => category.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    sub_category_id: text().notNull().references(() => subCategory.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    sub_category_option_id: text().notNull().references(() => subCategoryOption.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),

    // Location
    address: text(),
    city: text(),
    state: text(),
    zip: text(),  // pin code
    country: text().default('India'),

    latitude: text(),
    longitude: text(),
    location_url: text(), // google maps url

    operating_hours: text(),
    socials: text(),

    // Additional details
    avatar: text(),
    banner: text(),
    type: integer().$type('ENUM', [1, 2, 3]).default(1).notNull(), // 1: online, 2: offline, 3: hybrid
    additional_services: text(),
    gstin: text(),
    
    partner_id: text().references(() => partner.id, {onDelete: 'SET NULL', onUpdate: 'CASCADE'}),

    status: integer().default(1).notNull(), // 0: inactive, 1: active, 2: expired, 3: suspended
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['user_id'] },
            { columns: ['name'] },
            { columns: ['slug'] },
            { columns: ['phone'] },
            { columns: ['category_id'] },
            { columns: ['sub_category_id'] },
            { columns: ['sub_category_option_id'] },
            { columns: ['city'] },
            { columns: ['state'] },
            { columns: ['zip'] },
            { columns: ['country'] },
            { columns: ['partner_id'] },
            { columns: ['type'] },
            { columns: ['category_id', 'sub_category_id'] },
            { columns: ['additional_services'] }
        ]
    }
});


// Profile Payment
export const profilePayment = sqliteTable('profile_payment', {
    id: text().primaryKey().$default(nanoid),
    profile_id: text().notNull().references(() => profile.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),

    amount: integer().notNull(),
    payment_mode: text().notNull().default('cash'),
    payment_status: text().notNull().$type('ENUM', ['pending', 'success', 'failed']).default('pending'),
    transaction_id: text(),
    reference_id: text(), // Transaction ID from payment gateway
    payment_date: text(),   // Date from payment gateway

    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['profile_id'] },
            { columns: ['payment_mode'] },
            { columns: ['payment_status'] },
            { columns: ['payment_date'] },
            { columns: ['created_at'] }
        ]
    }
});


// Profile Media
export const profileMedia = sqliteTable('profile_media', {
    id: text().primaryKey().$default(nanoid),
    profile_id: text().notNull().references(() => profile.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    url: text().notNull(),
    description: text(),
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['profile_id'] },
            { columns: ['url'] }
        ]
    }
});



// ------------------------------------------------------------------------------------------------------



// License Type
export const licenseType = sqliteTable('license_type', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull().unique(),
    description: text(),
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['name'] }
        ]
    }
});


// Profile License
export const profileLicense = sqliteTable('profile_license', {
    id: text().primaryKey().$default(nanoid),
    profile_id: text().notNull().references(() => profile.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    license_type_id: text().notNull().references(() => licenseType.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    license_number: text().notNull(),
    license_url: text(),
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['profile_id'] },
            { columns: ['license_type_id'] },
            { columns: ['license_number'] }
        ]
    }
});



// ------------------------------------------------------------------------------------------------------



// Tags
export const tag = sqliteTable('tag', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull().unique(),
    category_id: text().notNull().references(() => category.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    sub_category_id: text().notNull().references(() => subCategory.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['name'] },
            { columns: ['category_id'] },
            { columns: ['sub_category_id'] },
            { columns: ['category_id', 'sub_category_id'] }
        ]
    }
});


// Profile Tags
export const profileTag = sqliteTable('profile_tag', {
    id: text().primaryKey().$default(nanoid),
    profile_id: text().notNull().references(() => profile.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    tag_id: text().notNull().references(() => tag.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['profile_id'] },
            { columns: ['tag_id'] }
        ]
    }
});



// ------------------------------------------------------------------------------------------------------



// Testimonial
export const testimonial = sqliteTable('testimonial', {
    id: text().primaryKey().$default(nanoid),
    profile_id: text().notNull().references(() => profile.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    userDetails: text().notNull(),
    rating: integer().notNull(),
    status: integer().default(0).notNull(),     // 0 - inactive, 1 - active
    comment: text().notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['profile_id'] },
            { columns: ['rating'] }
        ],
        check: [
            gte('rating', 1),
            lte('rating', 5)
        ]
    }
});



// ------------------------------------------------------------------------------------------------------



// Activity Log
export const activityLog = sqliteTable('activity_log', {
    id: text().primaryKey().$default(nanoid),
    
    user_id: text().references(() => user.id, {onDelete: 'SET NULL', onUpdate: 'CASCADE'}),
    admin_id: text().references(() => admin.id, {onDelete: 'SET NULL', onUpdate: 'CASCADE'}),

    path: text().notNull(),
    method: text().notNull(),
    status: integer().notNull(),
    activity: text(),
    user_agent: text(),

    timestamp: timestamp().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['user_id'] },
            { columns: ['admin_id'] },
            { columns: ['path'] },
            { columns: ['method'] },
            { columns: ['status'] },
            { columns: ['timestamp'] },
            { columns: ['timestamp', 'status'] },
            { columns: ['timestamp', 'user_id'] },
            { columns: ['timestamp', 'admin_id'] }
        ],
        constraints: [
            sql`CHECK (user_id IS NOT NULL OR admin_id IS NOT NULL)`
        ]
    }
});
