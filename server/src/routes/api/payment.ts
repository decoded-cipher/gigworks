
import { Hono } from 'hono'
const router = new Hono();

import { nanoid } from 'nanoid';
import { decode } from 'js-base64'
import { User, ProfilePayment } from '../../config/database/interfaces';
import { verifyToken } from "../../middleware/authentication";

import { createPayment, initPayment, paymentCallback } from '../../services/payment';
import { updateProfileStatus } from '../../services/profile';



/**
 * @route   POST /api/v1/payment/initiate
 * @desc    Initiate new payment
 * @access  Private
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/payment/initiate
 **/

router.post('/initiate', verifyToken, async (c) => {
    try {

        const VALID_MODES = ['phonepe', 'cash'];
        const VALID_TYPES = ['renewal', 'new'];

        const isValidPaymentRequest = (profile_id: string, mode: string, type: string) => {
            return VALID_MODES.includes(mode) && VALID_TYPES.includes(type) && profile_id !== null && profile_id !== undefined;
        };


    
        const { profile_id, mode, type }: { profile_id: string, mode: string; type: string } = await c.req.json();            
        if (!isValidPaymentRequest(profile_id, mode, type)) {
            return c.json({ error: 'Invalid profile_id, mode, or type' }, 400);
        }
        
        const user: User = c.req._user;
        if (!user) {
            return c.json({ error: 'User not found' }, 400);
        }


        
        const transactionId = nanoid(16);

        let createPaymentResponse = await createPayment({
            profile_id: profile_id,
            amount: 1500 * 100,
            transaction_id: transactionId,
        } as ProfilePayment);

        if (!createPaymentResponse) {
            return c.json({ error: 'Failed to create payment record' }, 400);
        }

        if (mode === 'phonepe') {
            let paymentUrl = await initPayment({ user_id: user.id, transactionId }, c.env);
            if (!paymentUrl) {
                return c.json({ error: 'Failed to initiate payment' }, 400);
            }
            return c.json({ message: 'Payment initiated successfully', data: { mode, paymentUrl, transactionId } }, 201);
        } else if (mode === 'cash') {
            return c.json({ message: 'Payment initiated successfully', data: { mode, transactionId } }, 201);
        }

    } catch (error) {
        console.error('Error initiating payment:', error);
        return c.json({ error: 'Failed to initiate payment. Please try again later.' }, 500);
    }
});



/**
 * @route   POST /api/v1/payment/callback
 * @desc    Callback from payment gateway
 * @access  Public
 * @return  message
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/payment/callback
 **/

router.post('/callback', async (c) => {
    const data = await c.req.json();
    
    if (!data) {
        return c.json({ error: 'Invalid request' }, 400);
    }

    let decodedData = JSON.parse(decode(data.response));
    
    try {
        let paymentResponse = await paymentCallback({
            transaction_id: decodedData.data.merchantTransactionId,
            payment_status: decodedData.code === 'PAYMENT_SUCCESS' ? 'success' : 'failed',
            amount: Number(decodedData.amount) / 100,
            payment_mode: decodedData.data.paymentInstrument.type,
            reference_id: decodedData.data.transactionId,
        } as ProfilePayment);

        if (!paymentResponse) {
            return c.json({ error: 'Failed to update payment record' }, 400);
        }

        if (paymentResponse.payment_status === 'success') {
            let profileUpdateResponse = await updateProfileStatus(paymentResponse.profile_id, 1);
            if (!profileUpdateResponse) {
                return c.json({ error: 'Failed to update profile status' }, 400);
            }

            return c.json({ message: 'Payment callback processed successfully', data: paymentResponse }, 200);
        }
    } catch (err) {
        console.error('Callback error:', err);
        return c.text('Callback failed', 500);
    }
});



/**
 * @route   GET /api/v1/payment/status
 * @desc    Get payment status
 * @access  Private
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/payment/status?transaction_id=1234567890
 **/

router.get('/status', verifyToken, async (c) => {
    try {
        
        const transaction_id = c.req.query('transaction_id');
        if (!transaction_id) {
            return c.json({ error: 'Transaction ID is required' }, 400);
        }

        const user: User = c.req._user;
        if (!user) {
            return c.json({ error: 'User not found' }, 400);
        }

        let paymentStatusResponse = await getPaymentStatus(transaction_id, user.id);
        if (!paymentStatusResponse) {
            return c.json({ error: 'Failed to get payment status' }, 400);
        }

        return c.json({ message: 'Payment status retrieved successfully', data: paymentStatusResponse }, 200);

    } catch (error) {
        console.error('Error getting payment status:', error);
        return c.json({ error: 'Failed to get payment status. Please try again later.' }, 500);
    }
});



export default router;