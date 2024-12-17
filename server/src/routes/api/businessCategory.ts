
import { Hono } from 'hono';
const router = new Hono();

import {
    createBusinessCategory,
    getBusinessCategories,
    getBusinessCategoryById,
    updateBusinessCategory,
    deleteBusinessCategory
} from '../../controllers/businessCategory';



/**
 * @route   POST /api/v1/business_category
 * @desc    Create a new business_category
 * @access  Public
 * @params  name
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/business_category
 **/

router.post('/', async (c) => {
    const { name } = await c.req.json();

    if (!name) {
        return c.json({
            status: 400,
            message: 'All fields are required'
        });
    }

    try {
        const category = await createBusinessCategory(name);
        return c.json({
            status: 201,
            message: 'Business category created successfully',
            data: category
        });

    } catch (error) {
        return c.json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});



/**
 * @route   GET /api/v1/business_category
 * @desc    Get all business_category with pagination
 * @access  Public
 * @params  void
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/business_category?page=1&limit=10
 **/

router.get('/', async (c) => {

    const page = Number(c.req.query('page')) || 1;
    const limit = Number(c.req.query('limit')) || 10;
    const search = c.req.query('search') || '';

    try {

        const result = await getBusinessCategories(page, limit, search);

        if (result.data.length > 0) {
            return c.json({
                status: 200,
                message: 'Business categories fetched successfully',
                data: {
                    categories: result.data,
                    meta: {
                        page: page,
                        limit: limit,
                        search: search,
                        total_count: result.count,
                        total_pages: Math.ceil(result.count / limit),
                        previous: page > 1 ? `/api/v1/business_category?page=${page - 1}&limit=${limit}` : null,
                        next: result.data.length === limit ? `/api/v1/business_category?page=${page + 1}&limit=${limit}` : null
                    }
                }
            });
        } else {
            return c.json({
                status: 404,
                message: 'Business categories not found'
            });
        }

    } catch (error) {
        return c.json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});



/**
 * @route   GET /api/v1/business_category/:id
 * @desc    Get a business_category by id
 * @access  Public
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/business_category/1
 **/

router.get('/:id', async (c) => {
    const { id } = c.req.param();

    try {
        const category = await getBusinessCategoryById(id);

        if (category) {
            return c.json({
                status: 200,
                message: 'Business category fetched successfully',
                data: category
            });
        } else {
            return c.json({
                status: 404,
                message: 'Business category not found'
            });
        }

    } catch (error) {
        return c.json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});



/**
 * @route   PATCH /api/v1/business_category/:id
 * @desc    Update a business_category
 * @access  Public
 * @params  id, name
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/business_category/1
 **/

router.patch('/:id', async (c) => {
    const { name } = await c.req.json();
    const id = c.req.param('id');

    if (!name) {
        return c.json({
            status: 400,
            message: 'All fields are required'
        });
    }

    try {
        const category = await updateBusinessCategory(id, name);

        if (category) {
            return c.json({
                status: 200,
                message: 'Business category updated successfully',
                data: category
            });
        } else {
            return c.json({
                status: 404,
                message: 'Business category not found'
            });
        }

    } catch (error) {
        return c.json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});



/**
 * @route   DELETE /api/v1/business_category/:id
 * @desc    Delete a business_category
 * @access  Public
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/business_category/1
 **/

router.delete('/:id', async (c) => {
    const { id } = c.req.param();

    try {
        await deleteBusinessCategory(id);
        return c.json({
            status: 200,
            message: 'Business category deleted successfully',
        });

    } catch (error) {
        return c.json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});


export default router;