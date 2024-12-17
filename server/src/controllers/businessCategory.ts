
import { count, sql } from "drizzle-orm";
import { db } from '../config/database/connection';
import { businessCategory } from '../config/database/schema';



// Create a new business category
export const createBusinessCategory = async (name: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO business_category (name) VALUES (name) RETURNING *

            const result = await db.insert(businessCategory).values({ name }).returning();
            const category = result[0];

            resolve(category);
        } catch (error) {
            reject(error);
        }
    });
}



// Get all business categories
export const getBusinessCategories = async (page: number, limit: number, search: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT id, name FROM business_category WHERE name LIKE '%search%' LIMIT limit OFFSET (page - 1) * limit

            const result = await db
                .select({
                    id: businessCategory.id,
                    name: businessCategory.name
                })
                .from(businessCategory)
                .where(sql`${businessCategory.name} LIKE ${'%' + search + '%'} AND ${businessCategory.status} = 1`)
                .limit(limit)
                .offset((page - 1) * limit);

            resolve({
                data: result,
                count: await db.$count(businessCategory)
            });

        } catch (error) {
            reject(error);
        }
    });
}



// Get a business category by id
export const getBusinessCategoryById = async (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT id, name FROM business_category WHERE id = id AND status = 1

            const result = await db
                .select({
                    id: businessCategory.id,
                    name: businessCategory.name
                })
                .from(businessCategory)
                .where(sql`${businessCategory.id} = ${id} AND ${businessCategory.status} = 1`);

            const category = result[0];

            // Todo : Fetch all the sub categories and sub category options associated with this category

            resolve(category);
        } catch (error) {
            reject(error);
        }
    });
}



// Update a business category
export const updateBusinessCategory = async (id: string, name: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : UPDATE business_category SET name = name WHERE id = id RETURNING *

            const result = await db.update(businessCategory).set({ name }).where({ id }).returning();
            console.log('result', result);
            debugger
            
            const category = result[0];

            resolve(category);
        } catch (error) {
            reject(error);
        }
    });
}



// Delete a business category
export const deleteBusinessCategory = async (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : UPDATE business_category SET status = 0 WHERE id = id

            await db.update(businessCategory).set({ status: 0 }).where({ id });

            // Todo : After deleting the category, we need to soft delete all the sub categories and sub category options associated with this category

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}