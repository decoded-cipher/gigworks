
import jwt from 'jsonwebtoken';

import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';
import { tokenTable, user } from '../config/database/schema';
import { User, TokenTable } from "../config/database/interfaces";

import{ generateToken } from '../middleware/authentication';



// Generate OTP and store it in KV store
export const generateOTP = async (phone: string, env: Env): Promise<string> => {
    return new Promise(async (resolve, reject) => {

        // Temporary : OTP will be the last 6 digits of the phone number
        const otp = phone.slice(-6);
        resolve(otp);

        // if (!env || !env.KV_STORE || typeof env.KV_STORE.put !== 'function' || typeof env.KV_STORE.delete !== 'function') {
        //     return reject("KV_STORE not available");
        // }

        // const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // try {
        //     const existingValue = await env.KV_STORE.get(phone);
        //     if (existingValue) {
        //         await env.KV_STORE.delete(phone);
        //     }
    
        //     await env.KV_STORE.put(phone, JSON.stringify({
        //         otp,
        //         expires: Date.now() + 300000    // 5 minutes
        //     }));

        //     // list all keys for debugging
        //     const keys = await env.KV_STORE.list();
        //     console.log('Keys:', keys);

        //     // list the value for debugging
        //     const value = await env.KV_STORE.get(phone);
        //     console.log('Value after put:', value);
    
        //     resolve(otp);
        // } catch (error) {
        //     reject(error);
        // }
    });
};



// Verify OTP from KV store
export const verifyOTP = async (phone: string, otp: string, env: Env): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {

        // Temporary : OTP will be the last 6 digits of the phone number
        if (phone.slice(-6) === otp) {
            return resolve(true);
        } else {
            return resolve(false);
        }

        // if (!env || !env.KV_STORE || typeof env.KV_STORE.get !== 'function' || typeof env.KV_STORE.delete !== 'function') {
        //     return reject("KV_STORE not available");
        // }

        // try {
        //     const value = await env.KV_STORE.get(phone);
        //     console.log('Value in verifyOTP:', value);

        //     if (!value) {
        //         return resolve(null);
        //     }

        //     const parsedValue = JSON.parse(value);
        //     console.log('Parsed value in verifyOTP:', parsedValue);

        //     if (parsedValue.otp === otp && parsedValue.expires > Date.now()) {
        //         await env.KV_STORE.delete(phone);
        //         return resolve(true);
        //     } else {
        //         return resolve(false);
        //     }
        // } catch (error) {
        //     reject(error);
        // }
    });
};



// Create Token
export const createAuthToken = async (user: User, env: Env): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            
            const token = jwt.sign({
                id: user.id,
                phone: user.phone,
                role: user.role
            }, env.JWT_TOKEN_SECRET, { expiresIn: env.JWT_TOKEN_EXPIRY });

            const existingToken = await db
                .select(tokenTable)
                .from(tokenTable)
                .where(sql`${tokenTable.user_id} = ${user.id}`);
            
            if (existingToken.length) {
                await db
                    .update(tokenTable)
                    .set({
                        token,
                        updated_at: sql`(CURRENT_TIMESTAMP)`
                    })
                    .where(sql`${tokenTable.user_id} = ${user.id}` || sql`${tokenTable.admin_id} = ${user.id}`)
            } else {
                await db
                    .insert(tokenTable)
                    .values({
                        user_id: user.id,
                        token
                    })
                    .returning();
            }

            resolve(token);

        } catch (error) {
            reject(error);
        }
    });
}



// Verify Token
export const verifyAuthToken = async (token: string, env: Env): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const decoded = jwt.verify(token, env.JWT_TOKEN_SECRET);
            resolve(decoded);
        } catch (error) {
            reject(error);
        }
    });
}



// Delete Token
export const deleteAuthToken = async (token: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            token = token.split(' ')[1];
    
            await db
                .delete(tokenTable)
                .where(sql`${tokenTable.token} = ${token}`);
            
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
