
import { Hono } from 'hono';
const router = new Hono();

import { createAdmin, loginAdmin } from '../../services/admin';
import { Admin } from '../../config/database/interfaces';



/**
 * @route   POST /api/v1/admin/signup
 * @desc    Create a new admin
 * @access  Public
 * @params  name, email, password, role
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/admin/signup
 **/

router.post('/signup', async (c) => {
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
            // data: admin
        }, 201);
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



/**
 * @route   POST /api/v1/admin/login
 * @desc    Login admin
 * @access  Public
 * @params  email, password
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/admin/login
 **/

router.post('/login', async (c) => {
    const { email, password } = await c.req.json();

    if (!email || !password) {
        return c.json({
            message: 'Email and password are required'
        }, 400);
    }

    try {
        const admin = await loginAdmin({ email, password }, c.env);

        return c.json({
            message: 'Login successful',
            data: admin
        }, 200);

    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



export default router;