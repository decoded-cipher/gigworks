
import { Env } from "hono";

import { encode } from 'js-base64'
import { sha256 } from 'hono/utils/crypto';

import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/turso';
import { profilePayment, profile } from '../config/database/schema';
import { ProfilePayment, Profile } from '../config/database/interfaces';



// Initiate Payment via PhonePe
export const initPayment = async (data, env: Env) => {
    return new Promise(async (resolve, reject) => {
        try {

            const PHONEPE_BASE_URL = env.PHONEPE_BASE_URL;
            const MERCHANT_ID = env.PHONEPE_MERCHANT_ID;
            const SALT_KEY = env.PHONEPE_SALT_KEY;
            const SALT_INDEX = env.PHONEPE_SALT_INDEX;
            
            if (!PHONEPE_BASE_URL || !MERCHANT_ID || !SALT_KEY || !SALT_INDEX) {
                reject(new Error('Missing required environment variables'));
            }
            
            const AMOUNT = 1500 * 100;
            // const AMOUNT = 1500;
            
            const REDIRECT_URL = `https://gigwork.co.in/payment/success`;
            const CALLBACK_URL = `https://api.gigwork.co.in/api/v1/payment/callback`;

            const payload = {
                merchantId: MERCHANT_ID,
                merchantTransactionId: data.transactionId,
                merchantUserId: data.user_id,
                amount: AMOUNT,
                redirectUrl: REDIRECT_URL,
                redirectMode: 'POST',
                callbackUrl: CALLBACK_URL,
                paymentInstrument: {
                    type: 'PAY_PAGE'
                }
            };

            const payloadBase64 = encode(JSON.stringify(payload));
            const signature = await sha256(payloadBase64 + '/pg/v1/pay' + SALT_KEY);

            const response = await fetch(`${PHONEPE_BASE_URL}/pg/v1/pay`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'X-VERIFY': signature + '###' + SALT_INDEX
                },
                body: JSON.stringify({ request: payloadBase64 }),
            });

            if (!response.ok) {
                reject(new Error(`PhonePe API error: ${response.statusText}`));
            }

            const result = await response.json();
            resolve(result?.data?.instrumentResponse?.redirectInfo?.url);
            
        } catch (error) {
            reject(error);
        }
    });
}



// Callback from PhonePe
export const paymentCallback = async (data: ProfilePayment) => {
    return new Promise(async (resolve, reject) => {
        try {

            console.log('Payment callback data:', data);

            // SQL Query : UPDATE profile_payment SET payment_status = 'SUCCESS' WHERE transaction_id = data.transactionId

            let result = await db
                .update(profilePayment)
                .set(data)
                .where(eq(profilePayment.transaction_id, data.transaction_id))
                .returning();

            result = result[0];

            console.log('Payment callback result:', result);
            
            resolve(result);

        } catch (error) {
            reject(error);
        }
    });
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



// Get Payment Status
export const getPaymentStatus = async (transaction_id: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : SELECT * FROM profile_payment WHERE transaction_id = transaction_id

            let result = await db
                .select({
                    transaction_id: profilePayment.transaction_id,
                    payment_status: profilePayment.payment_status
                })
                .from(profilePayment)
                .where(sql`${profilePayment.transaction_id} = ${transaction_id}`)
                .get();
            
            return resolve(result);

        } catch (error) {
            reject(error);
        }
    });
}
