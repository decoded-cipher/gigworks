
import { Hono } from 'hono';
const router = new Hono();

import { processCheckService } from '../../services/bot';



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
        const response = await processCheckService(message);
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
            data: null
        }, 500);
    }
});



export default router;