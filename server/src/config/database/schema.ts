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
    // role_id: integer().foreignKey(userRoles.id),
    role: text().$type('ENUM', ['admin', 'partner', 'business_owner', 'user']),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


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
    category_id: integer().foreignKey(businessCategory.id),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Business Sub Category Options
export const businessSubCategoryOptions = sqliteTable('business_sub_category_options', {
    id: integer().primaryKey(),
    name: text().notNull(),
    sub_category_id: integer().foreignKey(businessSubCategory.id),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Business table
export const business = sqliteTable('business', {
    id: integer().primaryKey(),
    owner_id: integer().foreignKey(users.id),
    
    // basic details
    name: text(),
    description: text(),
    email: text(),
    website: text().nullable(),
    phone: text(),

    // business registration details
    registration_number: text(),
    gstin: text(),

    // business category
    category_id: integer().foreignKey(businessCategory.id),
    sub_category_id: integer().foreignKey(businessSubCategory.id),
    sub_category_option_id: integer().foreignKey(businessSubCategoryOptions.id),
    
    // business location
    address: text(),
    city: text(),
    state: text(),
    country: text(),
    zip: text(),

    // map location
    latitude: text(),
    longitude: text(),

    // social media
    facebook: text(),
    instagram: text(),
    twitter: text(),
    linkedin: text(),
    youtube: text(),

    business_logo: text(),
    business_type: text().$type('ENUM', ['online', 'offline', 'hybrid']).notNull(),

    business_specialities: text(),
    business_keywords: text(),
    


    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Business Media
export const businessMedia = sqliteTable('business_media', {
    id: integer().primaryKey(),
    business_id: integer().foreignKey(business.id),
    url: text(),
    description: text(),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Testimonial
export const testimonial = sqliteTable('testimonial', {
    id: integer().primaryKey(),
    business_id: integer().foreignKey(business.id),
    user_id: integer().foreignKey(users.id),
    rating: integer(),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});


// Business License
export const businessLicense = sqliteTable('business_license', {
    id: integer().primaryKey(),
    business_id: integer().foreignKey(business.id),
    name: text(),
    description: text(),
    license_number: text(),
    issue_date: text(),
    expiry_date: text(),
    status: integer().default(1),
    created_at: text().default(sql('CURRENT_TIMESTAMP')),
    updated_at: text().default(sql('CURRENT_TIMESTAMP')),
});