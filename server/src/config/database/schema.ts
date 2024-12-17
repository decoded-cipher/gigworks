
import { nanoid } from 'nanoid'
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
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    phone: text().notNull(),
    // role_id: integer().notNull().references(() => userRoles.id),
    role: text().$type('ENUM', ['admin', 'partner', 'business_owner', 'user']),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Business Category
export const businessCategory = sqliteTable('business_category', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Business Sub Category
export const businessSubCategory = sqliteTable('business_sub_category', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    category_id: integer().notNull().references(() => businessCategory.id),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Business Sub Category Options
export const businessSubCategoryOptions = sqliteTable('business_sub_category_options', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    sub_category_id: integer().notNull().references(() => businessSubCategory.id),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Business table
export const business = sqliteTable('business', {
    id: text().primaryKey().$default(nanoid),
    owner_id: integer().notNull().references(() => users.id),
    
    // Basic Info
    name: text().notNull(),
    description: text(),
    email: text(),
    website: text(),
    phone: text(), // Extra phone number other than owner phone number

    // Registration Details
    registration_number: text(),
    gstin: text(),

    // Business Category
    category_id: integer().notNull().references(() => businessCategory.id),
    sub_category_id: integer().notNull().references(() => businessSubCategory.id),
    sub_category_option_id: integer().notNull().references(() => businessSubCategoryOptions.id),

    // Business Location
    address: text().notNull(),
    city: text().notNull(),
    state: text().notNull(),
    zip: text().notNull(),  // pin code
    country: text().default('India'),

    // Social Media
    facebook: text(),
    instagram: text(),
    twitter: text(),
    linkedin: text(),
    youtube: text(),

    // Additional details
    business_logo: text(),
    business_type: text().$type('ENUM', ['online', 'offline', 'hybrid']).notNull(),
    additional_services: text(),

    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Profile Payment
export const profilePayment = sqliteTable('profile_payment', {
    id: text().primaryKey().$default(nanoid),
    business_id: integer().notNull().references(() => business.id),

    amount: integer().notNull(),
    payment_mode: text().notNull().$type('ENUM', ['cash', 'debit_card', 'credit_card', 'net_banking', 'upi', 'wallet']),
    payment_status: text().notNull().$type('ENUM', ['pending', 'success', 'failed']),
    payment_id: text(),
    payment_date: text().notNull(),
    
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Business Media
export const businessMedia = sqliteTable('business_media', {
    id: text().primaryKey().$default(nanoid),
    business_id: integer().notNull().references(() => business.id),
    url: text().notNull(),
    description: text(),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Testimonial
export const testimonial = sqliteTable('testimonial', {
    id: text().primaryKey().$default(nanoid),
    business_id: integer().notNull().references(() => business.id),
    user_id: integer().notNull().references(() => users.id),
    rating: integer().notNull(),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Business License
export const businessLicense = sqliteTable('business_license', {
    id: text().primaryKey().$default(nanoid),
    business_id: integer().notNull().references(() => business.id),
    name: text().notNull(),
    description: text(),
    license_number: text().notNull(),
    issue_date: text().notNull(),
    expiry_date: text().notNull(),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});



// ------------------------------------------------------------------------------------------------------



// Keywords
export const keywords = sqliteTable('keywords', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Business Keywords
export const businessKeywords = sqliteTable('business_keywords', {
    id: text().primaryKey().$default(nanoid),
    business_id: integer().notNull().references(() => business.id),
    keyword_id: integer().notNull().references(() => keywords.id),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});
