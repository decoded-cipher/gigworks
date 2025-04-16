
import { Hono } from 'hono';
const router = new Hono();

import { processCheckService, processRequestService, sendMessageToInterakt } from '../../services/bot';
import { sendEmail } from '../../services/email';



/**
 * @route   POST /api/v1/bot/check_service
 * @desc    Check if the service requested by user is valid
 * @access  Public
 * @params  message
 * @return  
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/bot/check_service
 **/

router.post('/check_service', async (c) => {
    const { message } = await c.req.json();

    if (!message) {
        return c.json({
            message: 'bad_request',
            data: null
        }, 400);
    }

    try {
        const response = await processCheckService(message, c.env);
        if (!response) {
            return c.json({
                message: 'service_not_found',
                data: null
            }, 404);
        }
        return c.json({
            message: 'success',
            data: response
        }, 201);
    } catch (error) {
        return c.json({
            message: 'service_processing_error',
            data: null,
            error: error
        }, 500);
    }
});



/**
 * @route   POST /api/v1/bot/request_service
 * @desc    Request a service
 * @access  Public
 * @params  message
 * @return  
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/bot/request_service
 **/

router.post('/request_service', async (c) => {
    const { service } = await c.req.json();
    
    const locationHeader = c.req.header('X-User-Location');
    const location = JSON.parse(locationHeader);

    if (!service || !location) {
        return c.json({
            message: 'bad_request',
            data: null
        }, 400);
    }

    try {
        const response = await processRequestService(service, location, c.env);
        if (!response) {
            return c.json({
                message: 'profile_not_found',
                data: null
            }, 404);
        }
        return c.json({
            message: 'success',
            data: response
        }, 201);
    } catch (error) {
        return c.json({
            message: 'service_processing_error',
            data: null,
            error: error
        }, 500);
    }
});



/**
 * @route   POST /api/v1/bot/send_otp
 * @desc    Send OTP to user
 * @access  Public
 * @params  email
 * @return
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/bot/send_otp
 **/

// router.post('/send_otp', async (c) => {
//     const { message, phone } = await c.req.json();

//     if (!message || !phone) {
//         return c.json({
//             message: 'bad_request',
//             data: null
//         }, 400);
//     }

//     try {
//         const response = await sendMessageToInterakt(message, phone, c.env);
//         if (!response) {
//             return c.json({
//                 message: 'otp_not_sent',
//                 data: null
//             }, 404);
//         }
//         return c.json({
//             message: 'success',
//             data: response
//         }, 201);
//     } catch (error) {
//         return c.json({
//             message: 'otp_sending_error',
//             data: null,
//             error: error
//         }, 500);
//     }
// });



/**
 * @route   POST /api/v1/bot/send_email
 * @desc    Send email to user
 * @access  Public
 * @params  first_name, last_name, email, phone, message
 * @return  
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/bot/send_email
 **/

router.post('/send_email', async (c) => {

    const user_agent = c.req.header('User-Agent');
    const { first_name, last_name, email, phone, message } = await c.req.json();
    
    if (!first_name || !last_name || !email || !phone || !message) {
        return c.json({
            message: 'bad_request',
            data: null
        }, 400);
    }
    
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }); 
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    try {
        const response = await sendEmail(first_name, last_name, email, phone, message, date, time, user_agent, c.env);
        if (!response) {
            return c.json({
                message: 'email_not_sent',
                data: null
            }, 404);
        }
        return c.json({
            message: 'success',
            data: response
        }, 201);
    } catch (error) {
        return c.json({
            message: 'email_sending_error',
            error: error
        }, 500);
    }
});


export default router;