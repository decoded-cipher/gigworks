
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';

import { tag, profileTag } from '../config/database/schema';
import { Tag, ProfileTag } from '../config/database/interfaces';



// Create a new tag
export const createTag = async (data: Tag) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO tag (name) VALUES (name)
            
            let result = await db.insert(tag).values({ ...data }).returning();
            result = result[0];

            return resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Get all tags by category and sub category with pagination
export const getTags = async (category_id: number, sub_category_id: number, page: number, limit: number, search: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            let result = await db
                .select({
                    id: tag.id,
                    name: tag.name
                })
                .from(tag)
                .where(sql
                    `
                        ${tag.category_id} = ${category_id} AND 
                        ${tag.sub_category_id} = ${sub_category_id} AND 
                        ${tag.name} LIKE ${'%' + search + '%'} AND 
                        ${tag.status} = 1
                    `
                )
                .limit(limit)
                .offset((page - 1) * limit);
            
            resolve({
                data: result,
                count: await db.$count(tag)
            });
            
        } catch (error) {
            reject(error);
        }
    });
}