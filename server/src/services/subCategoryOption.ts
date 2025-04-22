import { count, eq, sql } from "drizzle-orm";
import { db } from "../config/database/turso";
import { subCategoryOption } from "../config/database/schema";



// Get all sub-category options
export const getAllSubCategoryOptions = async (search: string) => {
  try {

    // SQL Query : SELECT * FROM sub_category_option WHERE status = 1
    // AND name LIKE '%search%' LIMIT 10 OFFSET 0

    let query = db
      .select({
        name: subCategoryOption.name
      })
      .from(subCategoryOption)
      .where(eq(subCategoryOption.status, 1))
      .orderBy(sql`created_at DESC`);

    if (search) {
      query = query.where(sql`${subCategoryOption.name} LIKE ${`%${search}%`}`).limit(10).offset(0);
    }

    const result = await query;
    const names = result.map((item) => item.name);

    return names;
  } catch (error) {
    throw error;
  }
};



// Create a new sub-category
export const createSubCategoryOption = async (
  name: string,
  sub_category_id: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query : INSERT INTO sub_category (name, sub_category_id) VALUES (name, sub_category_id) RETURNING *

      let result = await db
        .insert(subCategoryOption)
        .values({ name, sub_category_id })
        .returning();
      result = result[0];

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};



// Update Sub-Category Option Status
export const updateSubCategoryOptionStatus = async (
  sub_category_option_id: string,
  status: number
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db
        .update(subCategoryOption)
        .set({ status: status, updated_at: sql`(CURRENT_TIMESTAMP)` })
        .where(eq(subCategoryOption.id, sub_category_option_id))
        .returning();

      result = result[0];

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};



// Update Sub-Category Option
export const updateSubCategoryOption = async (
  sub_category_option_id: string,
  name: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query: UPDATE sub_category SET name = name WHERE id = id RETURNING *

      let result = await db
        .update(subCategoryOption)
        .set({ name: name, updated_at: sql`(CURRENT_TIMESTAMP)` })
        .where(eq(subCategoryOption.id, sub_category_option_id))
        .returning();

      result = result[0];

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};



// Get Sub-Category Option By Name
export const getSubCategoryOptionByName = async (name: string) => {
  return new Promise(async (resolve, reject) => {
    try {

      // SQL Query: SELECT * FROM sub_category_option WHERE name = name

      const result = await db
        .select()
        .from(subCategoryOption)
        .where(sql`${subCategoryOption.name} = ${name}`)
        .limit(1);
      
      resolve(result[0]);
    } catch (error) {
      reject(error);
    }
  });
}
