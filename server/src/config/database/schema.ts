
import { nanoid } from 'nanoid'
import { sql, gte, lte } from "drizzle-orm";
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { timestamp } from 'drizzle-orm/mysql-core';



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
    phone: text().notNull().unique(),
    // role_id: integer().notNull().references(() => userRoles.id),
    role: text().$type('ENUM', ['admin', 'partner', 'user']).default('user').notNull(),
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['phone'] },
            { columns: ['role'] }
        ]
    }
});



// ------------------------------------------------------------------------------------------------------



// Category
export const category = sqliteTable('category', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull().unique(),
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
    name: text().notNull().unique(),
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
    name: text().notNull().unique(),
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



// Profile
export const profile = sqliteTable('profile', {
    id: text().primaryKey().$default(nanoid),
    owner_id: text().notNull().references(() => user.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    
    // Basic Info
    name: text().notNull(),
    description: text(),
    email: text().unique(),
    website: text(),
    phone: text().unique(), // Extra phone number other than owner phone number

    // Registration Details
    registration_number: text().unique(),
    gstin: text().unique(),

    // Category
    category_id: text().notNull().references(() => category.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    sub_category_id: text().notNull().references(() => subCategory.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    // sub_category_option_id: text().notNull().references(() => subCategoryOption.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),

    // Location
    address: text(),
    city: text(),
    state: text(),
    zip: text(),  // pin code
    country: text().default('India'),

    // Operating Hours
    // open_time: text(),
    // close_time: text(),

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

    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['owner_id'] },
            { columns: ['category_id'] },
            { columns: ['sub_category_id'] },
            { columns: ['email'] },
            { columns: ['phone'] }
        ]
    }
});


// Profile Payment
export const profilePayment = sqliteTable('profile_payment', {
    id: text().primaryKey().$default(nanoid),
    profile_id: text().notNull().references(() => profile.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),

    amount: integer().notNull(),
    payment_mode: text().notNull().$type('ENUM', ['cash', 'debit_card', 'credit_card', 'net_banking', 'upi', 'wallet']).$default('cash'),
    payment_status: text().notNull().$type('ENUM', ['pending', 'success', 'failed']),
    payment_id: text(),
    payment_date: text().notNull(),
    
    status: integer().default(1).notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['profile_id'] },
            { columns: ['payment_mode'] },
            { columns: ['payment_status'] },
            { columns: ['payment_date'] }
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
    license_number: text().notNull().unique(),
    license_url: text(),
    issue_date: text().notNull(),
    expiry_date: text().notNull(),
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
export const tags = sqliteTable('tag', {
    id: text().primaryKey().$default(nanoid),
    name: text().notNull().unique(),
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


// Profile Tags
export const profileTags = sqliteTable('profile_tag', {
    id: text().primaryKey().$default(nanoid),
    profile_id: text().notNull().references(() => profile.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    tag_id: text().notNull().references(() => tags.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
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
    user_id: text().notNull().references(() => user.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}),
    rating: integer().notNull(),
    status: integer().default(1).notNull(),
    comment: text().notNull(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull()
}, (table) => {
    return {
        indexes: [
            { columns: ['profile_id'] },
            { columns: ['user_id'] },
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
    user_id: text().notNull(),
    activity: text().notNull(),
    user_agent: text().notNull(),
    timestamp: text().default(sql`(CURRENT_TIMESTAMP)`),
}, (table) => {
    return {
        indexes: [
            { columns: ['user_id'] },
            { columns: ['activity'] },
            { columns: ['timestamp'] }
        ]
    }
});
