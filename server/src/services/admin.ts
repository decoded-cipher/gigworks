
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';

// import bcrypt from 'bcrypt';

import { admin } from '../config/database/schema';
import { Admin } from '../config/database/interfaces';



// Create a new admin
export const createAdmin = async (data: Admin) => {
    return new Promise(async (resolve, reject) => {
        try {

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);

            data.password = hashedPassword;

            console.log(data);
            debugger
            

            // SQL Query : INSERT INTO admin (name, email, password) VALUES (name, email, password) RETURNING *

            let result = await db.insert(admin).values({ ...data }).returning();
            result = result[0];
            
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
