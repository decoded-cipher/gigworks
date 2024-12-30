
import { eachMonthOfInterval, format } from 'date-fns';

import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';

import { user, profile, partner, partnerBank, partnerIdProof, partnerIdProofType } from '../config/database/schema';
import { User, Partner, PartnerBank, PartnerIdProof, PartnerIdProofType, User } from '../config/database/interfaces';
import { PgHalfVector } from "drizzle-orm/pg-core";



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



// Get partner data ny partner_id
export const getPartnerById = async (user: User) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT * FROM partner WHERE user_id = user.id

            let partnerData = await db
                .select()
                .from(partner)
                .where(sql`user_id = ${user.id}`);
            
            partnerData = partnerData[0];
            
            resolve({
                name: user.name,
                phone: user.phone,
                avatar: partnerData.avatar,
                referral_code: partnerData.referral_code,
            });

        } catch (error) {
            reject(error);
        }
    });
}



// Get partner analytics
export const getPartnerAnalytics = async (user: User, start: string, end: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            /*
                SELECT
                    strftime('%Y-%m', profile.created_at) AS month,
                    COUNT(profile.id) AS count
                FROM
                    partner
                LEFT JOIN
                    profile ON profile.partner_id = partner.id
                WHERE
                    profile.partner_id = partner.id AND
                    profile.created_at BETWEEN start AND end
                GROUP BY
                    strftime('%Y-%m', profile.created_at)
                ORDER BY
                    strftime('%Y-%m', profile.created_at)
            */

            const referredProfiles = await db
                .select({
                    month: sql`strftime('%Y-%m', profile.created_at)`,
                    count: count(profile.id).as('count'),
                })
                .from(partner)
                .leftJoin(profile, sql`profile.partner_id = partner.id`)
                .where(sql`
                    profile.partner_id = ${partner.id} AND
                    profile.created_at BETWEEN ${start} AND ${end}
                `)
                .groupBy(sql`strftime('%Y-%m', profile.created_at)`)
                .orderBy(sql`strftime('%Y-%m', profile.created_at)`);

            const allMonths = eachMonthOfInterval({
                start: new Date(start),
                end: new Date(end),
            }).map(date => format(date, 'yyyy-MM'));

            const result = allMonths.map(month => {
                const profile = referredProfiles.find(p => p.month === month);
                return {
                    month,
                    count: profile ? profile.count : 0,
                };
            });

            resolve(result);

        } catch (error) {
            reject(error);
        }
    });
}

