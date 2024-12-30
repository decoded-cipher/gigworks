
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';
import { 
    user, 
    profile, 
    partner, 
    profilePayment, 
    profileMedia, 
    profileTag,
    licenseType,
    profileLicense, 
    category, 
    subCategory, 
    subCategoryOption
} from '../config/database/schema';
import { User, Profile } from '../config/database/interfaces';



// Create a new profile (business) for a user
export const createProfile = async (data: Profile) => {
    return new Promise(async (resolve, reject) => {
        try {

            let socials = data.socials;
            delete data.socials;

            // SQL Query : SELECT id FROM partner WHERE referral_code = data.referral_code

            let partnerData = await db
                .select({
                    id: partner.id
                })
                .from(partner)
                .where(sql`${partner.referral_code} = ${data.referral_code}`)

            if (!partnerData.length) {
                reject(new Error('Invalid referral code'));
            }

            // SQL Query : INSERT INTO profile (name, slug, description, email, website, phone, gstin, category_id, sub_category_id, sub_category_option_id, address, city, state, zip, country, facebook, instagram, twitter, linkedin, youtube, logo, type, additional_services, referral_code, partner_id) VALUES (data.name, data.slug, data.description, data.email, data.website, data.phone, data.gstin, data.category_id, data.sub_category_id, data.sub_category_option_id, data.address, data.city, data.state, data.zip, data.country, data.facebook, data.instagram, data.twitter, data.linkedin, data.youtube, data.logo, data.type, data.additional_services, data.referral_code, partnerData[0].id)
            
            let result = await db
                .insert(profile)
                .values({
                    ...data,
                    ...socials,
                    partner_id: partnerData[0].id
                }).returning();

            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Update a profile (business) of a user by profile id
export const updateProfile = async (id: string, profile: Profile) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : UPDATE profile SET name = name, description = description, email = email, website = website, phone = phone, gstin = gstin, category_id = category

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



// Get all profiles by user
export const getProfilesByUser = async (user_id: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT slug, name, avatar FROM profile WHERE user_id = user_id

            let results = await db
                .select({
                    name: profile.name,
                    slug: profile.slug,
                    avatar: profile.avatar
                })
                .from(profile)
                .where(sql`${profile.user_id} = ${user_id}`)

            resolve(results);
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

            const additionalCount = 1000;
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
                    sub_category.name 
                FROM 
                    profile 
                    INNER JOIN user ON user.id = profile.user_id 
                    LEFT JOIN profile_payment ON profile_payment.profile_id = profile.id 
                    LEFT JOIN category ON category.id = profile.category_id 
                    LEFT JOIN sub_category ON sub_category.id = profile.sub_category_id 
                WHERE 
                    profile.slug = slug AND 
                    julianday(DATETIME(profile_payment.created_at, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP) > 0 AND 
                    profile_payment.payment_status = 'success'
            */

                let profileResult = await db
                    .select({
                        profile: profile,
                        user: {
                            name: user.name,
                            phone: user.phone
                        },
                        category: category.name,
                        subCategory: subCategory.name,
                        subCategoryOption: subCategoryOption.name
                    })
                    .from(profile)
                    .innerJoin(user, sql`${user.id} = ${profile.user_id}`)
                    .leftJoin(profilePayment, sql`${profilePayment.profile_id} = ${profile.id}`)
                    .leftJoin(category, sql`${category.id} = ${profile.category_id}`)
                    .leftJoin(subCategory, sql`${subCategory.id} = ${profile.sub_category_id}`)
                    .leftJoin(subCategoryOption, sql`${subCategoryOption.id} = ${profile.sub_category_option_id}`)
                    .where(sql`
                        ${profile.slug} = ${slug} AND 
                        julianday(DATETIME(${profilePayment.created_at}, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP) > 0 AND
                        ${profilePayment.payment_status} = 'success'
                    `)
                    .get();
                
                if (!profileResult) {
                    resolve(null);
                    return;
                }
                
                const [licenses, media, tags] = await Promise.all([

                    /*
                        SELECT 
                            license_type.name, 
                            profile_license.license_number, 
                            profile_license.license_url, 
                            license_type.description 
                        FROM 
                            profile_license 
                            LEFT JOIN license_type ON license_type.id = profile_license.license_type_id 
                        WHERE 
                            profile_license.profile_id = profileResult.profile.id
                    */
                    
                    db.select({
                        name: licenseType.name,
                        number: profileLicense.license_number,
                        url: profileLicense.license_url,
                        description: licenseType.description
                    })
                    .from(profileLicense)
                    .leftJoin(licenseType, sql`${licenseType.id} = ${profileLicense.license_type_id}`)
                    .where(sql`${profileLicense.profile_id} = ${profileResult.profile.id}`)
                    .all(),
                    
                    // SQL Query : SELECT * FROM profile_media WHERE profile_id = profileResult.profile.id
                    db.select().from(profileMedia).where(sql`${profileMedia.profile_id} = ${profileResult.profile.id}`).all(),

                    // SQL Query : SELECT * FROM profile_tag WHERE profile_id = profileResult.profile.id
                    db.select().from(profileTag).where(sql`${profileTag.profile_id} = ${profileResult.profile.id}`).all()
                    
                ]);
                
                const data = { ...profileResult, licenses, media, tags };
                
                const fieldsToRemove = ['id', 'user_id', 'category_id', 'sub_category_id', 'sub_category_option_id', 'partner_id', 'role', 'updated_at', 'created_at', 'status'];
                const result = removeFields(data, fieldsToRemove);
                
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
