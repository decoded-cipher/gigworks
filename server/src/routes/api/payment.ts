
import { Hono } from 'hono'
const router = new Hono();

import { nanoid } from 'nanoid';
import { encode } from 'js-base64'
import { sha256 } from 'hono/utils/crypto';



/**
 * @route   POST /api/v1/payment/initiate
 * @desc    Create a new payment
 * @access  Public
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/payment/initiate
 **/

router.post('/initiate', async (c) => {
    try {

        const PHONEPE_BASE_URL = c.env.PHONEPE_BASE_URL;
        const MERCHANT_ID = c.env.PHONEPE_MERCHANT_ID;
        const SALT_KEY = c.env.PHONEPE_SALT_KEY;
        const SALT_INDEX = c.env.PHONEPE_SALT_INDEX;

        if (!PHONEPE_BASE_URL || !MERCHANT_ID || !SALT_KEY || !SALT_INDEX) {
            return c.json({ error: 'Missing required environment variables' }, 400);
        }

        const REDIRECT_URL = `${c.env.BASE_URL}/api/v1/payment/payment-success`;
        const CALLBACK_URL = `${c.env.BASE_URL}/api/v1/payment/callback`;

        const payload = {
            merchantId: MERCHANT_ID,
            merchantTransactionId: nanoid(16),
            merchantUserId: 'user001',
            amount: 1000,
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
            throw new Error(`PhonePe API error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("result : ", result);

        return c.json({ url: result.data.instrumentResponse.redirectInfo.url });
    } catch (error) {
        console.error("Error initiating payment:", error);
        return c.json({ error: 'Failed to initiate payment' }, 500);
    }
});



/**
 * @route   POST /api/v1/payment/callback
 * @desc    Handle payment callback
 * @access  Public
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/payment/callback
 **/

router.post('/callback', async (c) => {
    const body = await c.req.json()
    const { transactionId, status } = body

    if (status === 'SUCCESS') {
        return c.json({ message: 'Payment successful', data: { transactionId } })
    } else {
        return c.json({ message: 'Payment failed', data: { transactionId } }, 400)
    }
})



/**
 * @route   GET /api/v1/payment/payment-success
 * @desc    Handle payment success
 * @access  Public
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/payment/payment-success
 **/

router.get('/payment-success', async (c) => {
    const { transactionId, status } = c.req.query

    if (status === 'SUCCESS') {
        return c.json({ message: 'Payment successful', data: { transactionId } })
    } else {
        return c.json({ message: 'Payment failed', data: { transactionId } }, 400)
    }
})





export default router;