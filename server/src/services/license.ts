
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';

import { licenseType } from '../config/database/schema';



// Create a new license type
export const createLicenseType = async (name: string, description: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO license_type (name, description) VALUES (name, description)

            let result = await db.insert(licenseType).values({ name, description }).returning();
            result = result[0];

            return resolve(result);

        } catch (error) {
            reject(error);
        }
    });
}



// Get all license types
export const getLicenseTypes = async () => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT * FROM license_type

            let result = await db.select({
                id: licenseType.id,
                name: licenseType.name,
                description: licenseType.description
            }).from(licenseType);
            return resolve(result);

        } catch (error) {
            reject(error);
        }
    });
}
