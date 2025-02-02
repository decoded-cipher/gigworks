
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/turso';

import { partnerIdProof } from '../config/database/schema';
import { PartnerIdProof, partnerIdProofTypes } from '../config/database/interfaces';



// Save the partner's ID proof
export const createPartnerIdProof = async (data: PartnerIdProof): Promise<PartnerIdProof> => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO partner_id_proof (partner_id, proof_type_id, proof_number, proof_url) VALUES ($1, $2, $3, $4) RETURNING *
            
            let result = await db.insert(partnerIdProof).values({
                partner_id: data.partner_id,
                proof_type_id: partnerIdProofTypes.find((type) => type.slug === data.proof_type)?.id,
                proof_number: data.proof_number,
                proof_url: data.proof_url
            }).returning();
            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Delete partner ID proof
export const deletePartnerIdProof = async (partner_id: number) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : DELETE FROM partner_id_proof WHERE partner_id = $1

            const result = await db
                .delete(partnerIdProof)
                .where(sql`partner_id = ${partner_id}`);

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
