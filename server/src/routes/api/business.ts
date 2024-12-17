
import { Hono } from 'hono';
import { db } from '../../config/database/connection';
import { users } from '../../config/database/schema';

const router = new Hono();



/**
 * @route   POST /api/v1/business
 * @desc    Create a new business
 * @access  Public
 * @params  name, description, category, keywords, url, license_number, issue_date, expiry_date
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/business
 **/

router.post('/', async (c) => {
    const { name, description, category, keywords, url, license_number, issue_date, expiry_date } = c.body;

    if (!name || !description || !category || !keywords || !url || !license_number || !issue_date || !expiry_date) {
        return c.json({
            status: 400,
            message: 'All fields are required'
        });
    }

    const business = await db.insert({
        name,
        description,
        category,
        url,
        license_number,
        issue_date,
        expiry_date
    }).into(users);

    return c.json({
        status: 200,
        message: 'Business created successfully',
        data: business
    });
});


export default router;