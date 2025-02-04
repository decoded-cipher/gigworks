
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/turso';

import { partnerBank } from '../config/database/schema';
import { PartnerBank } from '../config/database/interfaces';



// Save the partner's bank details
export const createPartnerBank = async (data: PartnerBank) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO partner_bank (partner_id, bank_name, account_number, ifsc_code, branch_name, account_holder_name, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            
            let result = await db.insert(partnerBank).values({ ...data }).returning();
            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Delete partner bank details
export const deletePartnerBank = async (partner_id: number) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : DELETE FROM partner_bank WHERE partner_id = $1

            const result = await db
                .delete(partnerBank)
                .where(sql`partner_id = ${partner_id}`);

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
