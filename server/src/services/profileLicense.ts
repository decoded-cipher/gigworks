
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';

import { profileLicense } from '../config/database/schema';
import { ProfileLicense } from '../config/database/interfaces';



// Save Profile License Data
export const saveProfileLicense = async (profile_id: string, data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let licenseData: ProfileLicense[] = data.map((item) => {
                return {
                    profile_id: profile_id,
                    license_type_id: item.type_id,
                    license_number: item.number,
                    license_url: item.url
                }
            });

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

