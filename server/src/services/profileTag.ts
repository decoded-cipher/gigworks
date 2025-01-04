
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';
import { profileTag } from "../config/database/schema";



// Add profile tag
export const addProfileTag = async (data: ProfileTag) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO profile_tag (profile_id, tag_id) VALUES (profile_id, tag_id)

            let result = await db.insert(profileTag).values(data).returning();
            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Remove profile tag
export const removeProfileTag = async (profileId: string, tagId: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : DELETE FROM profile_tag WHERE profile_id = profileId AND tag_id = tagId

            let result = await db
                .delete(profileTag)
                .where(sql`profile_id = ${profileId} AND id = ${tagId}`)
                .returning();
            
            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
