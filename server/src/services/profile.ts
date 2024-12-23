
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';
import { profile } from '../config/database/schema';
import { Profile, User } from '../config/database/interfaces';



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
export const updateProfile = async (user_id: number, profile_id: string, profile: Profile) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : UPDATE profile SET name = name, description = description, email = email, website = website, phone = phone, registration_number = registration_number, gstin = gstin, category_id = category

            let result = await db.update(profile).set({ ...profile }).where(eq('user_id', user_id), eq('id', profile_id)).returning();
            result = result[0];

            return resolve(result);

        } catch (error) {
            reject(error);
        }
    });
}



// Delete a profile (business) of a user by profile id
export const deleteProfile = async (user_id: number, profile_id: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : DELETE FROM profile WHERE user_id = user_id AND id = profile_id

            let result = await db.delete(profile).where(eq('user_id', user_id), eq('id', profile_id)).returning();
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