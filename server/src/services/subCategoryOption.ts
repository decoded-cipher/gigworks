
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';
import { subCategoryOption } from '../config/database/schema';



// Create a new sub-category
export const createSubCategoryOption = async (name: string, sub_category_id: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO sub_category (name, sub_category_id) VALUES (name, sub_category_id) RETURNING *

            let result = await db.insert(subCategoryOption).values({ name, sub_category_id }).returning();
            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

