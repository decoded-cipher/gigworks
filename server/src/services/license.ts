import { count, eq, sql } from "drizzle-orm";
import { db } from "../config/database/turso";

import { licenseType } from "../config/database/schema";

// Create a new license type
export const createLicenseType = async (name: string, description: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query : INSERT INTO license_type (name, description) VALUES (name, description)

      let result = await db
        .insert(licenseType)
        .values({ name, description })
        .returning();
      result = result[0];

      return resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// Get all license types
export const getLicenseTypes = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query : SELECT * FROM license_type

      let result = await db
        .select({
          id: licenseType.id,
          name: licenseType.name,
          description: licenseType.description,
        })
        .from(licenseType);
      return resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// Update a license
export const updatedLicenseType = async (
  id: string,
  name: string,
  description: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query: UPDATE license_type SET name = name, description = description WHERE id = id

      const updatedLicenseType = await db
        .update(licenseType)
        .set({ name, description })
        .where(eq(licenseType.id, id))
        .returning();

      resolve(updatedLicenseType[0]);
    } catch (error) {
      reject(error);
    }
  });
};
