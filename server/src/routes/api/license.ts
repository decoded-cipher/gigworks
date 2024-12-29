
import { Hono } from 'hono';
const router = new Hono();

import { createLicenseType, getLicenseTypes } from '../../services/license';
import { license } from '../../config/database/schema';



/**
 * @route   POST /api/v1/license
 * @desc    Add a new license type to the system
 * @access  Public
 * @params  name, description
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/license
 **/

router.post('/', async (c) => {
    const { name, description } = await c.req.json();

    if (!name || !description) {
        return c.json({
            message: 'Name and description are required'
        }, 400);
    }

    try {
        let licenseType = await createLicenseType(name, description);

        return c.json({
            message: 'License type created successfully',
            data: licenseType
        }, 201);
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



/**
 * @route   GET /api/v1/license
 * @desc    Get all license types
 * @access  Public
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/license
 **/

router.get('/', async (c) => {
    try {
        let licenseTypes = await getLicenseTypes();

        return c.json({
            message: 'License types retrieved successfully',
            data: licenseTypes
        }, 200);
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



export default router;