
import { Hono } from 'hono';
const router = new Hono();

import { extractCoordinates } from '../../services/location';



/**
 * @route   POST /api/v1/location
 * @desc    Extract coordinates from a Google Maps URL
 * @access  Public
 * @params  url
 * @return  message, data
 * @error   500, { error }
 * @status  200, 500
 * 
 * @example /api/v1/location
 **/

router.post('/', async (c) => {    
    try {

        const data = await c.req.json();

        if (!data.url) {
            return c.json({
                message: 'URL is required'
            }, 400);
        }

        const coordinates = await extractCoordinates(data.url);

        return c.json({
            message: 'Coordinates extracted successfully',
            data: coordinates
        });
        
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



module.exports = router;
