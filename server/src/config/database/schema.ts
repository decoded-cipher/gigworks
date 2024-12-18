
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


// User
export const user = sqliteTable('user', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    phone: text().notNull(),
    // role_id: integer().notNull().references(() => userRoles.id),
    role: text().$type('ENUM', ['admin', 'partner', 'user']).default('user'),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});



// ------------------------------------------------------------------------------------------------------



// Category
export const category = sqliteTable('category', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Sub Category
export const subCategory = sqliteTable('sub_category', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    category_id: integer().notNull().references(() => category.id),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Sub Category Option
// export const subCategoryOption = sqliteTable('sub_category_option', {
//     id: text().primaryKey().$default(nanoid),
//     name: text().notNull(),
//     sub_category_id: integer().notNull().references(() => subCategory.id),
//     status: integer().default(1),
//     created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
//     updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
// });



// ------------------------------------------------------------------------------------------------------



// Profile
export const profile = sqliteTable('profile', {
    id: text().primaryKey().$default(nanoid),
    owner_id: integer().notNull().references(() => user.id),
    
    // Basic Info
    name: text().notNull(),
    description: text(),
    email: text(),
    website: text(),
    phone: text(), // Extra phone number other than owner phone number

    // Registration Details
    registration_number: text(),
    gstin: text(),

    // Category
    category_id: integer().notNull().references(() => category.id),
    sub_category_id: integer().notNull().references(() => subCategory.id),
    // sub_category_option_id: integer().notNull().references(() => subCategoryOption.id),

    // Location
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
    logo: text(),
    type: text().$type('ENUM', ['online', 'offline', 'hybrid']).notNull(),
    additional_services: text(),

    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Profile Payment
export const profilePayment = sqliteTable('profile_payment', {
    id: text().primaryKey().$default(nanoid),
    profile_id: integer().notNull().references(() => profile.id),

    amount: integer().notNull(),
    payment_mode: text().notNull().$type('ENUM', ['cash', 'debit_card', 'credit_card', 'net_banking', 'upi', 'wallet']),
    payment_status: text().notNull().$type('ENUM', ['pending', 'success', 'failed']),
    payment_id: text(),
    payment_date: text().notNull(),
    
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Profile Media
export const profileMedia = sqliteTable('profile_media', {
    id: text().primaryKey().$default(nanoid),
    profile_id: integer().notNull().references(() => profile.id),
    url: text().notNull(),
    description: text(),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});



// ------------------------------------------------------------------------------------------------------



// License Type
export const licenseType = sqliteTable('license_type', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    description: text(),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Profile License
export const profileLicense = sqliteTable('profile_license', {
    id: text().primaryKey().$default(nanoid),
    profile_id: integer().notNull().references(() => profile.id),
    license_type_id: integer().notNull().references(() => licenseType.id),
    license_number: text().notNull(),
    issue_date: text().notNull(),
    expiry_date: text().notNull(),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});



// ------------------------------------------------------------------------------------------------------



// Tags
export const tags = sqliteTable('tag', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull(),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


// Profile Tags
export const profileTags = sqliteTable('profile_tag', {
    id: text().primaryKey().$default(nanoid),
    profile_id: integer().notNull().references(() => profile.id),
    tag_id: integer().notNull().references(() => tags.id),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});



// ------------------------------------------------------------------------------------------------------


// Testimonial
export const testimonial = sqliteTable('testimonial', {
    id: text().primaryKey().$default(nanoid),
    profile_id: integer().notNull().references(() => profile.id),
    user_id: integer().notNull().references(() => user.id),
    rating: integer().notNull(),
    status: integer().default(1),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});
