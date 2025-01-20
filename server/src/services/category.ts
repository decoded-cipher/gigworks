
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/turso';
import { category, subCategory, profile } from '../config/database/schema';



// Create a new category
export const createCategory = async (name: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO category (name) VALUES (name) RETURNING *

            let result = await db.insert(category).values({ name }).returning();
            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Get all categories
export const getCategories = async (page: number, limit: number, search: string, hasBusiness: boolean) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT id, name FROM category WHERE name LIKE '%search%' LIMIT limit OFFSET (page - 1) * limit

            let result = [];

            if (hasBusiness) {
                result = await db
                    .select({
                        id: category.id,
                        name: category.name,
                        businessCount: count(profile.id)
                    })
                    .from(category)
                    .leftJoin(profile, sql`${profile.category_id} = ${category.id}`)
                    .where(sql`${category.name} LIKE ${'%' + search + '%'} AND ${category.status} = 1`)
                    .groupBy(category.id);
            } else {
                result = await db
                    .select({
                        id: category.id,
                        name: category.name
                    })
                    .from(category)
                    .where(sql`${category.name} LIKE ${'%' + search + '%'} AND ${category.status} = 1`)
                    .limit(limit)
                    .offset((page - 1) * limit);
            }

            resolve({
                data: result,
                count: await db.$count(category)
            });
        } catch (error) {
            reject(error);
        }
    });
}



// Get a category by id
export const getCategoryById = async (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT id, name FROM category WHERE id = id AND status = 1 LEFT JOIN sub_category ON sub_category.category_id = category id

            const results = await db
                .select({
                    categoryId: category.id,
                    categoryName: category.name,
                    subCategoryId: subCategory.id,
                    subCategoryName: subCategory.name
                })
                .from(category)
                .leftJoin(subCategory, sql`${subCategory.category_id} = ${category.id}`)
                .where(sql`${category.id} = ${id} AND ${category.status} = 1 AND ${subCategory.status} = 1`);

            const categoryResult = results.length > 0 ? {
                id: results[0].categoryId,
                name: results[0].categoryName
            } : null;

            const subCategoryResults = results.map(result => ({
                id: result.subCategoryId,
                name: result.subCategoryName
            }));
            
            resolve({
                category: categoryResult,
                subCategory: subCategoryResults
            });
        } catch (error) {
            reject(error);
        }
    });
}



// Update a category
export const updateCategory = async (id: string, name: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : UPDATE category SET name = name, updated_at = NOW() WHERE id = id RETURNING *

            let result = await db
                .update(category)
                .set({ name, updated_at: sql`(CURRENT_TIMESTAMP)` })
                .where(eq(category.id, id))
                .returning();
            
            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Enable/Disable a category
export const enableDisableCategory = async (id: string, status: number) => {
    return new Promise(async (resolve, reject) => {
        try {

            /**
             * SQL Query :
             *      UPDATE category SET status = status, updated_at = NOW() WHERE id = id
             *      UPDATE sub_category SET status = status, updated_at = NOW() WHERE category_id = id
             */

            await db
                .transaction(async (trx) => {
                    await trx
                        .update(category)
                        .set({ status, updated_at: sql`(CURRENT_TIMESTAMP)` })
                        .where(eq(category.id, id))

                    await trx
                        .update(subCategory)
                        .set({ status, updated_at: sql`(CURRENT_TIMESTAMP)` })
                        .where(eq(subCategory.category_id, id))
                });

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}