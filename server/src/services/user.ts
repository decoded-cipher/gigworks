
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';
import { user, profile } from '../config/database/schema';
import { User, Profile } from '../config/database/interfaces';



// Create a new user
export const createUser = async (data: User) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO user (name, phone, role) VALUES (name, phone, role) RETURNING *

            let result = await db.insert(user).values({ ...data }).returning();
            result = result[0];
            
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Get user by phone
export const getUserByPhone = async (phone: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT * FROM user WHERE phone = phone

            let result = await db.select().from(user).where(sql`phone = ${phone}`);
            result = result[0];            

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Update user by ID
export const updateUser = async (data: User) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : UPDATE user SET name = name, phone = phone, role = role WHERE id = id RETURNING *

            let result = await db.update(user).set({ ...data }).where(sql`id = ${data.id}`).returning();
            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}