
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';
import { user, profile, profilePayment } from '../config/database/schema';
import { User, Profile, ProfilePayment } from '../config/database/interfaces';



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



// Get all profiles (businesses) of a user
export const getProfiles = async (user_id: number) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT * FROM profile WHERE user_id = user_id

            let result = await db.select(profile).where(eq('user_id', user_id)).get();
            return resolve(result);

        } catch (error) {
            reject(error);
        }
    });
}



// Get a profile (business) of a user by profile id
export const getProfile = async (user_id: number, profile_id: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT * FROM profile WHERE user_id = user_id AND id = profile_id

            let result = await db.select(profile).where(eq('user_id', user_id), eq('id', profile_id)).get();
            return resolve(result[0]);

        } catch (error) {
            reject(error);
        }
    });
}



// Update a profile (business) of a user by profile id
export const updateProfile = async (id: string, profile: Profile) => {
    return new Promise(async (resolve, reject) => {
        try {

            let result = await db
                .update(profile)
                .set({ ...profile })
                .where(eq('id', profile_id))
                .returning();
            
                result = result[0];

            return resolve(result);

        } catch (error) {
            reject(error);
        }
    });
}



// Get all profiles (businesses) by category id
export const getProfilesByCategory = async (category_id: number) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT * FROM profile WHERE category_id = category_id

            let result = await db.select(profile).where(eq('category_id', category = id)).get();
            return resolve(result);

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

            let result = await db.select(count()).from(profile).get();
            return resolve(result[0].count);

        } catch (error) {
            reject(error);
        }
    });
}



// Get all profiles with upcoming renewals
export const getRenewalProfiles = async () => {
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
                    julianday(DATE(profile_payment.created_at, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP) < 10 
                ORDER BY 
                    profile_payment.created_at
            */

            let results = await db
                .select({
                    profileId: profile.id,
                    profileName: profile.name,
                    owner: user.name,
                    phone: user.phone,
                    // lastPaymentDate: profilePayment.created_at,
                    expiryDate: sql`DATETIME(${profilePayment.created_at}, '+1 YEAR')`,
                    daysLeft: sql`CAST((julianday(DATETIME(${profilePayment.created_at}, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP)) AS INTEGER)`
                    // daysLeft: sql`CAST((julianday(${profilePayment.payment_expiry}) - julianday(CURRENT_TIMESTAMP)) AS INTEGER)`
                })
                .from(profile)
                .leftJoin(user, sql`${user.id} = ${profile.user_id}`)
                .leftJoin(profilePayment, sql`${profilePayment.profile_id} = ${profile.id}`)
                .where(sql`julianday(DATETIME(${profilePayment.created_at}, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP) < 10`)
                .orderBy(profilePayment.created_at)

            resolve(results);

        } catch (error) {
            reject(error);
        }
    });
}