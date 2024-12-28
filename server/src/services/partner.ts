
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';

import { partner, partnerBank, partnerIdProof, partnerIdProofType } from '../config/database/schema';
import { Partner, PartnerBank, PartnerIdProof, PartnerIdProofType, User } from '../config/database/interfaces';



// Generate a unique referral code
const generateReferralCode = async (user: User): Promise<string> => {
    const prefix = `${user.name.substring(0, 2).toUpperCase()}${user.phone.substring(0, 2).toUpperCase()}`;
    const suffix = user.phone.slice(-2).toUpperCase();

    for (let attempts = 0; attempts < 10; attempts++) {
        const randomPart = Math.random().toString(36).substring(2, 4).toUpperCase();
        const referralCode = `${prefix}${randomPart}${suffix}`;

        const result = await db
            .select()
            .from(partner)
            .where(sql`referral_code = ${referralCode}`);

        if (result.length === 0) {
            return referralCode;
        }
    }

    throw new Error('Unable to generate unique referral code');
};



// Create a new partner
export const createPartner = async (data: Partner, user: User) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT * FROM partner WHERE user_id = user.id

            const result = await db
                .select()
                .from(partner)
                .where(sql`user_id = ${user.id}`);            

            if (result.length > 0) {
                resolve(null);
            }

            const referralCode = await generateReferralCode(user);

            // SQL Query : INSERT INTO partner (user_id, referral_code) VALUES (user.id, referralCode)

            const newPartner = await db
                .insert(partner)
                .values({
                    ...data,
                    user_id: user.id,
                    referral_code: referralCode
                })
                .returning();

            resolve(newPartner[0]);
        } catch (error) {
            reject(error);
        }
    });
}

