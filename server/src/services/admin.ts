
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/turso';

import crypto from 'crypto';

import { admin } from '../config/database/schema';
import { Admin } from '../config/database/interfaces';
import { createAuthToken } from "../services/auth";



// Create a new admin
export const createAdmin = async (data: Admin) => {
    return new Promise(async (resolve, reject) => {
        try {

            const existingAdmin = await db
                .select()
                .from(admin)
                .where(eq(admin.email, data.email))
                .limit(1);

            if (existingAdmin.length > 0) {
                reject(new Error('Admin with this email already exists'));
            }

            const salt = crypto.randomBytes(16).toString('hex');

            crypto.pbkdf2(data.password, salt, 1000, 64, 'sha256', (err, derivedKey) => {
                if (err) {
                    return reject(err);
                }

                const hashedPassword = derivedKey.toString('hex');

                const adminData = {
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                    salt: salt
                };

                // SQL Query : INSERT INTO admin (name, email, password, salt, role, status) VALUES (...) RETURNING *
                
                db.insert(admin)
                    .values(adminData)
                    .returning()
                    .then(result => resolve(result[0]))
                    .catch(error => reject(error));
            });

        } catch (error) {
            reject(error);
        }
    });
}



// Login admin
export const loginAdmin = async ({ email, password }, env) => {
    return new Promise(async (resolve, reject) => {
        try {

            const existingAdmin = await db
                .select()
                .from(admin)
                .where(eq(admin.email, email))
                .limit(1);

            if (existingAdmin.length === 0) {
                return reject(new Error('Admin with this email does not exist'));
            }

            const adminData = existingAdmin[0];

            crypto.pbkdf2(password, adminData.salt, 1000, 64, 'sha256', (err, derivedKey) => {
                if (err) {
                    return reject(err);
                }

                const hashedPassword = derivedKey.toString('hex');

                if (hashedPassword !== adminData.password) {
                    return reject(new Error('Invalid password'));
                }

                createAuthToken(adminData, { JWT_TOKEN_SECRET: env.JWT_TOKEN_SECRET, JWT_TOKEN_EXPIRY: env.JWT_TOKEN_EXPIRY }, true)
                    .then(token => {
                        resolve({
                            token,
                            details: {
                                // id: adminData.id,
                                name: adminData.name,
                                email: adminData.email,
                                // role: adminData.role
                            }
                        });
                    })
                    .catch(error => reject(error));
            });

        } catch (error) {
            reject(error);
        }
    });
}