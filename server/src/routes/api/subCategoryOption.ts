
import { Hono } from 'hono';
const router = new Hono();

import { createSubCategoryOption } from '../../services/subCategoryOption';



/**
 * @route   POST /api/v1/sub_category_option
 * @desc    Create a new sub_category_option
 * @access  Public
 * @params  name
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/sub_category_option
 **/

router.post('/', async (c) => {
    const { name, sub_category_id } = await c.req.json();

    if (!name || !sub_category_id) {
        return c.json({
            message: 'Name and Sub-Category ID are required'
        }, 400);
    }

    try {
        const sub_category_option = await createSubCategoryOption(name, sub_category_id);
        return c.json({
            message: 'Sub category option created successfully',
            data: sub_category_option
        }, 201);

    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



module.exports = router;
