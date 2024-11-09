
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';



// User Roles
// export const userRoles = sqliteTable('user_roles', {
//     id: integer().primaryKey(),
//     name: text(),
//     description: text(),
//     status: integer().default(1),
//     created_at: text().default(sql('CURRENT_TIMESTAMP')),
//     updated_at: text().default(sql('CURRENT_TIMESTAMP')),
// });


// Users
export const users = sqliteTable('users', {
    id: integer().primaryKey(),
    name: text().notNull(),
    phone: text().notNull(),
    // role_id: integer().foreignKey(userRoles.id).notNull(),,
    role: text().$type('ENUM', ['admin', 'partner', 'business_owner', 'user']),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Business table
export const business = sqliteTable('business', {
    id: integer().primaryKey(),
    owner_id: integer().foreignKey(users.id).notNull(),
    
    // Basic Info
    name: text().notNull(),
    description: text().nullable(),
    email: text().nullable(),
    website: text().nullable(),
    phone: text().nullable(), // Extra phone number other than owner phone number

    // Registration Details
    registration_number: text().nullable(),
    gstin: text().nullable(),

    // Business Category
    category_id: integer().foreignKey(businessCategory.id).notNull(),
    sub_category_id: integer().foreignKey(businessSubCategory.id).notNull(),
    sub_category_option_id: integer().foreignKey(businessSubCategoryOptions.id).notNull(),

    // Business Location
    address: text().notNull(),
    city: text().notNull(),
    state: text().notNull(),
    zip: text().notNull(),  // pin code
    country: text().default('India'),

    // Social Media
    facebook: text().nullable(),
    instagram: text().nullable(),
    twitter: text().nullable(),
    linkedin: text().nullable(),
    youtube: text().nullable(),

    // Additional details
    business_logo: text().nullable(),
    business_type: text().$type('ENUM', ['online', 'offline', 'hybrid']).notNull(),
    additional_services: text().nullable(),

    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Profile Payment
export const profilePayment = sqliteTable('profile_payment', {
    id: integer().primaryKey(),
    business_id: integer().foreignKey(business.id),

    amount: integer().notNull(),
    payment_mode: text().notNull().$type('ENUM', ['cash', 'debit_card', 'credit_card', 'net_banking', 'upi', 'wallet']),
    payment_status: text().notNull().$type('ENUM', ['pending', 'success', 'failed']),
    payment_id: text().nullable(),
    payment_date: text().notNull(),
    
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Business Media
export const businessMedia = sqliteTable('business_media', {
    id: integer().primaryKey(),
    business_id: integer().foreignKey(business.id),
    url: text().notNull(),
    description: text().nullable(),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Testimonial
export const testimonial = sqliteTable('testimonial', {
    id: integer().primaryKey(),
    business_id: integer().foreignKey(business.id),
    user_id: integer().foreignKey(users.id),
    rating: integer().notNull(),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Business License
export const businessLicense = sqliteTable('business_license', {
    id: integer().primaryKey(),
    business_id: integer().foreignKey(business.id),
    name: text().notNull(),
    description: text().nullable(),
    license_number: text().notNull(),
    issue_date: text().notNull(),
    expiry_date: text().notNull(),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});



// ------------------------------------------------------------------------------------------------------



// Business Category
export const businessCategory = sqliteTable('business_category', {
    id: integer().primaryKey(),
    name: text().notNull(),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Business Sub Category
export const businessSubCategory = sqliteTable('business_sub_category', {
    id: integer().primaryKey(),
    name: text().notNull(),
    category_id: integer().foreignKey(businessCategory.id).notNull(),,
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Business Sub Category Options
export const businessSubCategoryOptions = sqliteTable('business_sub_category_options', {
    id: integer().primaryKey(),
    name: text().notNull(),
    sub_category_id: integer().foreignKey(businessSubCategory.id).notNull(),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Keywords
export const keywords = sqliteTable('keywords', {
    id: integer().primaryKey(),
    name: text().notNull(),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Business Keywords
export const businessKeywords = sqliteTable('business_keywords', {
    id: integer().primaryKey(),
    business_id: integer().foreignKey(business.id),
    keyword_id: integer().foreignKey(keywords.id),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});
