
import { Hono } from 'hono';
const router = new Hono();

import { createAdmin } from '../../services/admin';
import { Admin } from '../../config/database/interfaces';



/**
 * @route   POST /api/v1/admin
 * @desc    Create a new admin
 * @access  Public
 * @params  name, email, password, role
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/admin
 **/

router.post('/', async (c) => {
    const { name, email, password } = await c.req.json();

    if (!name || !email || !password) {
        return c.json({
            message: 'Name, email, password and role are required'
        }, 400);
    }

    try {
        const admin: Admin = await createAdmin({ name, email, password });

        return c.json({
            message: 'Admin created successfully',
            data: admin
        }, 201);
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



export default router;