
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';
import { user, profile, profilePayment, profileMedia, profileTag, profileLicense, category, subCategory, subCategoryOption } from '../config/database/schema';
import { User, Profile } from '../config/database/interfaces';



// Create a new profile (business) for a user
export const createProfile = async (data: Profile) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO profile (name, description, email, website, phone, registration_number, gstin, category_id, user_id) VALUES (name, description, email, website, phone, registration_number, gstin, category_id, user_id)
            
            let result = await db.insert(profile).values({ ...data }).returning();
            result = result[0];

            return resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Update a profile (business) of a user by profile id
export const updateProfile = async (id: string, profile: Profile) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : UPDATE profile SET name = name, description = description, email = email, website = website, phone = phone, registration_number = registration_number, gstin = gstin, category_id = category

            let result = await db.update(profile).set({ ...profile }).where(sql`${profile.id} = ${id}`).returning();
            result = result[0];

            return resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Get all profiles by category id with pagination
export const getProfilesByCategory = async (category_id: string, page: number, limit: number, search: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            /*
                SELECT 
                    profile.name, 
                    profile.slug, 
                    profile.type, 
                    profile.avatar, 
                    profile.city 
                FROM 
                    profile 
                    LEFT JOIN category ON category.id = profile.category_id 
                WHERE 
                    profile.category_id = category_id AND 
                    profile.name LIKE %search% AND 
                    profile.status = 1 AND 
                    category.status = 1 
                ORDER BY 
                    profile.name ASC 
                LIMIT 
                    limit 
                OFFSET 
                    (page - 1) * limit
            */

            let results = await db
                .select({
                    name: profile.name,
                    slug: profile.slug,
                    type: profile.type,
                    avatar: profile.avatar,
                    location: profile.city,
                })
                .from(profile)
                .leftJoin(category, sql`${category.id} = ${profile.category_id}`)
                .where(sql
                    `
                        ${profile.category_id} = ${category_id} AND 
                        ${profile.name} LIKE ${'%' + search + '%'} AND 
                        ${profile.status} = 1 AND
                        ${category.status} = 1
                    `
                )
                .limit(limit)
                .offset((page - 1) * limit)
                .orderBy(profile.name, 'ASC')

            resolve({
                data: results,
                count: await db.$count(profile)
            });
            
        } catch (error) {
            reject(error);
        }
    });
}



// Get total number of profiles (businesses)
export const getProfileCount = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            
            // SQL Query : SELECT COUNT(*) FROM profile

            const additionalCount = 100;
            let result = await db.select({ count: sql`COUNT(*)` }).from(profile).get();
            result = result.count + additionalCount;

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Get all profiles with upcoming renewals
export const getRenewalProfiles = async (page: number, limit: number, days: number) => {
    return new Promise(async (resolve, reject) => {
        try {

            /*
                SELECT 
                    profile.id, 
                    profile.name, 
                    user.name, 
                    user.phone, 
                    profile_payment.created_at, DATE(profile_payment.created_at, '+1 YEAR'), 
                    CAST((julianday(DATE(profile_payment.created_at, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP)) AS INTEGER) 
                FROM 
                    profile 
                    LEFT JOIN user ON user.id = profile.user_id 
                    LEFT JOIN profile_payment ON profile_payment.profile_id = profile.id 
                WHERE 
                    julianday(DATE(profile_payment.created_at, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP) < days
                ORDER BY 
                    profile_payment.created_at
                LIMIT
                    limit
                OFFSET
                    (page - 1) * limit
            */

            let results = await db
                .select({
                    profileId: profile.id,
                    profileName: profile.name,
                    owner: user.name,
                    phone: user.phone,
                    expiryDate: sql`DATETIME(${profilePayment.created_at}, '+1 YEAR')`,
                    daysLeft: sql`CAST((julianday(DATETIME(${profilePayment.created_at}, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP)) AS INTEGER)`
                })
                .from(profile)
                .leftJoin(user, sql`${user.id} = ${profile.user_id}`)
                .leftJoin(profilePayment, sql`${profilePayment.profile_id} = ${profile.id}`)
                .where(sql`julianday(DATETIME(${profilePayment.created_at}, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP) < ${days}`)
                // .limit(limit)
                // .offset((page - 1) * limit)
                .orderBy(profilePayment.created_at)

            resolve({
                data: results,
                count: await db.$count(profile)
            });

        } catch (error) {
            reject(error);
        }
    });
}



// Check if profile slug exists
export const checkProfileSlug = async (slug: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT * FROM profile WHERE slug = slug

            let result = await db
                .select()
                .from(profile)
                .where(sql`${profile.slug} = ${slug}`)
                .get();

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Get profile by slug
export const getProfileBySlug = async (slug: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            /*
                SELECT 
                    profile.*, 
                    user.name, 
                    user.phone, 
                    category.name, 
                    sub_category.name, 
                    sub_category_option.name, 
                    profile_media.*, 
                    profile_license.*, 
                    profile_tag.* 
                FROM 
                    profile 
                    INNER JOIN user ON user.id = profile.user_id 
                    LEFT JOIN profile_payment ON profile_payment.profile_id = profile.id 
                    LEFT JOIN profile_media ON profile_media.profile_id = profile.id 
                    LEFT JOIN profile_license ON profile_license.profile_id = profile.id 
                    LEFT JOIN profile_tag ON profile_tag.profile_id = profile.id 
                    LEFT JOIN category ON category.id = profile.category_id 
                    LEFT JOIN sub_category ON sub_category.id = profile.sub_category_id 
                    LEFT JOIN sub_category_option ON sub_category_option.id = profile.sub_category_option_id 
                WHERE 
                    profile.slug = slug AND 
                    julianday(DATETIME(profile_payment.created_at, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP) > 0
            */
           
            
            let result = await db
                .select({
                    profile: profile,
                    user: {
                        name: user.name,
                        phone: user.phone
                    },
                    category: category.name,
                    subCategory: subCategory.name,
                    // subCategoryOption: subCategoryOption.name,
                    media: profileMedia,
                    license: profileLicense,
                    tags: profileTag,
                })
                .from(profile)
                .innerJoin(user, sql`${user.id} = ${profile.user_id}`)
                .leftJoin(profilePayment, sql`${profilePayment.profile_id} = ${profile.id}`)
                .leftJoin(profileMedia, sql`${profileMedia.profile_id} = ${profile.id}`)
                .leftJoin(profileLicense, sql`${profileLicense.profile_id} = ${profile.id}`)
                .leftJoin(profileTag, sql`${profileTag.profile_id} = ${profile.id}`)
                .leftJoin(category, sql`${category.id} = ${profile.category_id}`)
                .leftJoin(subCategory, sql`${subCategory.id} = ${profile.sub_category_id}`)
                // .leftJoin(subCategoryOption, sql`${subCategoryOption.id} = ${profile.sub_category_option_id}`)
                .where(sql`
                    ${profile.slug} = ${slug} AND 
                    julianday(DATETIME(${profilePayment.created_at}, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP) > 0`
                )
                .get();
            
            
            const fieldsToRemove = ['id', 'user_id', 'partner_id', 'role', 'updated_at', 'created_at', 'status'];
            // result = removeFields(result, fieldsToRemove);
                        
            resolve(result);

        } catch (error) {
            reject(error);
        }
    });
}



// Remove fields from object
const removeFields = (obj: any, fields: string[]) => {
    if (Array.isArray(obj)) {
        return obj.map(item => removeFields(item, fields));
    } else if (obj && typeof obj === 'object') {
        return Object.keys(obj).reduce((newObj, key) => {
            if (!fields.includes(key)) {
                newObj[key] = removeFields(obj[key], fields);
            }
            return newObj;
        }, {} as any);
    }
    return obj;
}
