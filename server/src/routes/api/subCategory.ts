
import { Hono } from 'hono';
const router = new Hono();

import {
    createSubCategory,
    getCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
} from '../../controllers/subCategory';



/**
 * @route   POST /api/v1/sub_category
 * @desc    Create a new sub_category
 * @access  Public
 * @params  name
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/sub_category
 **/

router.post('/', async (c) => {
    const { name, category_id } = await c.req.json();

    if (!name || !category_id) {
        return c.json({
            status: 400,
            message: 'Name and Category ID are required'
        });
    }

    try {
        const sub_category = await createSubCategory(name, category_id);
        return c.json({
            status: 201,
            message: 'Sub category created successfully',
            // data: sub_category
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
 * @route   GET /api/v1/sub_category
 * @desc    Get all sub_category with pagination
 * @access  Public
 * @params  void
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/sub_category?page=1&limit=10
 **/

router.get('/', async (c) => {

    const page = Number(c.req.query('page')) || 1;
    const limit = Number(c.req.query('limit')) || 10;
    const search = c.req.query('search') || '';

    try {

        const result = await getCategories(page, limit, search);

        if (result.data.length > 0) {
            return c.json({
                status: 200,
                message: 'Sub categories fetched successfully',
                data: {
                    sub_categories: result.data,
                    meta: {
                        page: page,
                        limit: limit,
                        search: search,
                        total_count: result.count,
                        total_pages: Math.ceil(result.count / limit),
                        previous: page > 1 ? `/api/v1/sub_category?page=${page - 1}&limit=${limit}` : null,
                        next: result.data.length === limit ? `/api/v1/sub_category?page=${page + 1}&limit=${limit}` : null
                    }
                }
            });
        } else {
            return c.json({
                status: 404,
                message: 'Sub categories not found'
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
 * @route   GET /api/v1/sub_category/:id
 * @desc    Get a sub_category by id
 * @access  Public
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/sub_category/1
 **/

router.get('/:id', async (c) => {
    const { id } = c.req.param();

    try {
        const sub_category = await getSubCategoryById(id);

        if (sub_category) {
            return c.json({
                status: 200,
                message: 'Sub category fetched successfully',
                data: sub_category
            });
        } else {
            return c.json({
                status: 404,
                message: 'Sub category not found'
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
 * @route   PATCH /api/v1/sub_category/:id
 * @desc    Update a sub_category
 * @access  Public
 * @params  id, name
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/sub_category/1
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
        const sub_category = await updateSubCategory(id, name);

        if (sub_category) {
            return c.json({
                status: 200,
                message: 'Sub category updated successfully',
                data: sub_category
            });
        } else {
            return c.json({
                status: 404,
                message: 'Sub category not found'
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
 * @route   DELETE /api/v1/sub_category/:id
 * @desc    Delete a sub_category
 * @access  Public
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/sub_category/1
 **/

router.delete('/:id', async (c) => {
    const { id } = c.req.param();

    try {
        await deleteSubCategory(id);
        return c.json({
            status: 200,
            message: 'Sub category deleted successfully',
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