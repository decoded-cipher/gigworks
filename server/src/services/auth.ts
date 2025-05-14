import jwt from 'jsonwebtoken';

import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/turso';
import { tokenTable, user } from '../config/database/schema';
import { User, Admin, TokenTable } from "../config/database/interfaces";

import{ generateToken } from '../middleware/authentication';



export const generateOTP = async (phone: string, env: Env): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const formatTimestamp = (timestamp: number): string => {
            const date = new Date(timestamp);
            return date.toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        };

        console.log('[KV Debug] Generating OTP for phone:', phone);
        
        if (!env.KV_STORE) {
            console.error('[KV Debug] KV_STORE not available in env:', env);
            return reject("KV store configuration missing");
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('[KV Debug] Generated OTP:', otp);

        try {
            const existing = await env.KV_STORE.get(phone);
            if (existing) {
                const parsed = JSON.parse(existing);
                console.log('[KV Debug] Existing OTP expires at:', formatTimestamp(parsed.expiresAt));
            }

            const now = Date.now();
            const expiresIn = 5 * 60;
            const expiresAt = now + (expiresIn * 1000);

            const kvData = JSON.stringify({
                otp,
                createdAt: now,
                expiresAt: expiresAt
            });
            console.log('[KV Debug] New OTP created at:', formatTimestamp(now));
            console.log('[KV Debug] New OTP will expire at:', formatTimestamp(expiresAt));

            await env.KV_STORE.put(phone, kvData, {
                expirationTtl: expiresIn
            });
            
            const verification = await env.KV_STORE.get(phone);
            if (verification) {
                const parsed = JSON.parse(verification);
                console.log('[KV Debug] Stored OTP verification:', {
                    otp: parsed.otp,
                    createdAt: formatTimestamp(parsed.createdAt),
                    expiresAt: formatTimestamp(parsed.expiresAt)
                });
            }
            
            resolve(otp);
        } catch (error) {
            console.error('[KV Debug] Error storing OTP:', error);
            reject("Failed to generate OTP");
        }
    });
};

export const verifyOTP = async (phone: string, otp: string, env: Env): Promise<boolean> => {
    console.log('[KV Debug] Verifying OTP for phone:', phone, 'OTP:', otp);
    
    if (!env.KV_STORE) {
        console.error('[KV Debug] KV_STORE not available in env:', env);
        throw new Error("KV store configuration missing");
    }

    try {
        const value = await env.KV_STORE.get(phone);
        console.log('[KV Debug] Retrieved KV value:', value);
        
        if (!value) {
            console.log('[KV Debug] No OTP found for phone:', phone);
            return false;
        }

        const parsedValue = JSON.parse(value);
        console.log('[KV Debug] Parsed KV value:', parsedValue);
        
        const now = Date.now();
        const isValid = parsedValue.otp === otp && now < parsedValue.expiresAt;
        console.log('[KV Debug] OTP validation result:', {
            otpMatch: parsedValue.otp === otp,
            notExpired: now < parsedValue.expiresAt,
            currentTime: now,
            expiresAt: parsedValue.expiresAt,
            timeLeft: Math.floor((parsedValue.expiresAt - now) / 1000) + ' seconds'
        });

        if (isValid) {
            await env.KV_STORE.delete(phone);
            console.log('[KV Debug] Deleted OTP after successful verification');
        }

        return isValid;
    } catch (error) {
        console.error('[KV Debug] Error verifying OTP:', error);
        throw new Error("Failed to verify OTP");
    }
};


// Create Token
export const createAuthToken = async (user: User | Admin, env: Env, isAdmin: boolean = false): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {

            const token = jwt.sign({
                id: user.id,
                name: user.name,
                phone: user.phone,
                role: user.role
            }, env.JWT_TOKEN_SECRET, { expiresIn: env.JWT_TOKEN_EXPIRY });

            const existingToken = await db
                .select(tokenTable)
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
