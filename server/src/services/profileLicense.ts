
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/turso';

import { licenseType, profileLicense } from '../config/database/schema';
import { ProfileLicense } from '../config/database/interfaces';



// Save Profile License Data
export const addProfileLicense = async (profile_id: string, data: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT COUNT(*) FROM license_type WHERE id = data.type_id

            if (data.some((item) => !item.type_id || !item.number || !item.url)) {
                return reject('Missing some license data');
            }

            let licenseData: ProfileLicense[] = data.map((item) => {
                return {
                    profile_id: profile_id,
                    license_type_id: item.type_id,
                    license_number: item.number,
                    license_url: item.url
                }
            });

            // SQL Query : INSERT INTO profile_license (profile_id, license_type_id, license_number, license_url) VALUES (profile_id, license_type_id, license_number, license_url) RETURNING license_number, license_url

            let result = await db.insert(profileLicense).values(licenseData).returning({
                license_number: sql`license_number`,
                license_url: sql`license_url`
            });
            
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Remove Profile License Data
export const removeProfileLicense = async (profile_id: string, license_id: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : DELETE FROM profile_license WHERE profile_id = profile_id AND license_id = license_id

            let result = await db
                .delete(profileLicense)
                .where(sql`${eq("profile_id", profile_id)} AND ${eq("license_id", license_id)}`)
                .returning();
            
            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
