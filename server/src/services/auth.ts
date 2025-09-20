
import jwt from 'jsonwebtoken';

import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/turso';
import { tokenTable, user } from '../config/database/schema';
import { User, Admin, TokenTable } from "../config/database/interfaces";



// Generate OTP and store it in KV store
export const generateOTP = async (phone: string, env: any): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const kv = env?.KV_STORE;
        if (!kv || typeof kv.put !== 'function' || typeof kv.delete !== 'function') {
            return reject("KV_STORE not available");
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        try {
            const existingValue = await kv.get(phone);
            if (existingValue) {
                await kv.delete(phone);
            }
    
            await kv.put(phone, JSON.stringify({
                otp,
                expires: Date.now() + 300000    // 5 minutes
            }), { expirationTtl: 300 });
    
            resolve(otp);
        } catch (error) {
            reject(error);
        }
    });
};



// Verify OTP from KV store
export const verifyOTP = async (phone: string, otp: string, env: any): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        const kv = env?.KV_STORE;
        if (!kv || typeof kv.get !== 'function' || typeof kv.delete !== 'function') {
            return reject("KV_STORE not available");
        }

        try {
            const value = await kv.get(phone);

            if (!value) {
                return resolve(false);
            }

            const parsedValue = JSON.parse(value);

            if (parsedValue.otp === otp && parsedValue.expires > Date.now()) {
                await kv.delete(phone);
                return resolve(true);
            } else {
                return resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};



// Create Token
export const createAuthToken = async (user: User | Admin, env: any, isAdmin: boolean = false): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {

            const token = jwt.sign({
                id: user.id,
                name: user.name,
                phone: isAdmin ? undefined : (user as User).phone,
                role: user.role
            }, env.JWT_TOKEN_SECRET, { expiresIn: env.JWT_TOKEN_EXPIRY });

            const existingToken = await db
                .select()
                .from(tokenTable)
                .where(sql`${isAdmin ? tokenTable.admin_id : tokenTable.user_id} = ${user.id}`);
            
            if (existingToken.length) {
                await db
                    .update(tokenTable)
                    .set({
                        token,
                        updated_at: sql`(CURRENT_TIMESTAMP)`
                    })
                    .where(sql`${isAdmin ? tokenTable.admin_id : tokenTable.user_id} = ${user.id}`);
            } else {
                await db
                    .insert(tokenTable)
                    .values({
                        [isAdmin ? 'admin_id' : 'user_id']: user.id,
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
export const verifyAuthToken = async (token: string, env: any): Promise<any> => {
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
