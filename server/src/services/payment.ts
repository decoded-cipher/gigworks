
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';
import { profilePayment, profile } from '../config/database/schema';
import { ProfilePayment, Profile } from '../config/database/interfaces';


export interface ProfilePayment {
    profile_id: string;
    amount: number;
    payment_mode: string;
    payment_status: string;
    payment_id?: string;
    payment_date: string;
}



// Create Payment
export const createPayment = async (data: ProfilePayment) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO profile_payment (profile_id, amount, payment_mode, payment_status, payment_date) VALUES (profile_id, amount, payment_mode, payment_status, payment_date)

            let result = await db
                .insert(profilePayment)
                .values({ ...data })
                .returning();

            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}



// Get all payments of a profile
export const getPayments = async (profile_id: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT * FROM profile_payment WHERE profile_id = profile_id

            let result = await db.select(profilePayment).where(eq('profile_id', profile_id)).get();
            return resolve(result);

        } catch (error) {
            reject(error);
        }
    });
}

