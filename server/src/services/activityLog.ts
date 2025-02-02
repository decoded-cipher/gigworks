
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/turso';
import { activityLog } from '../config/database/schema';


// Log activity
export const logActivity = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO activity_log (user_id, activity) VALUES (user_id, activity) RETURNING *

            let result = await db
                .insert(activityLog)
                .values({
                    user_id: req.user.id,
                    activity: req.method + " " + req.originalUrl
                })
                .returning();

            result = result[0];

            resolve(result);

        } catch (error) {
            reject(error);
        }
    });
}
