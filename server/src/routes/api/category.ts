
import { Hono } from 'hono';
const router = new Hono();

import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    enableDisableCategory
} from '../../controllers/category';
import { subCategory } from '../../config/database/schema';



/**
 * @route   POST /api/v1/category
 * @desc    Create a new category
 * @access  Public
 * @params  name
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/category
 **/

router.post('/', async (c) => {
    const { name } = await c.req.json();

    if (!name) {
        return c.json({
            status: 400,
            message: 'Name is required'
        });
    }

    try {
        const category = await createCategory(name);
        return c.json({
            status: 201,
            message: 'Category created successfully',
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
 * @route   GET /api/v1/category
 * @desc    Get all category with pagination
 * @access  Public
 * @params  void
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/category?page=1&limit=10
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
                message: 'Categories fetched successfully',
                data: {
                    categories: result.data,
                    meta: {
                        page: page,
                        limit: limit,
                        search: search,
                        total_count: result.count,
                        total_pages: Math.ceil(result.count / limit),
                        previous: page > 1 ? `/api/v1/category?page=${page - 1}&limit=${limit}` : null,
                        next: result.data.length === limit ? `/api/v1/category?page=${page + 1}&limit=${limit}` : null
                    }
                }
            });
        } else {
            return c.json({
                status: 404,
                message: 'Categories not found'
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
 * @route   GET /api/v1/category/:id
 * @desc    Get a category by id
 * @access  Public
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/category/1
 **/

router.get('/:id', async (c) => {
    const { id } = c.req.param();

    try {
        const category = await getCategoryById(id);

        if (category) {
            return c.json({
                status: 200,
                message: 'Category fetched successfully',
                data: category
            });
        } else {
            return c.json({
                status: 404,
                message: 'Category not found'
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
 * @route   PATCH /api/v1/category/:id
 * @desc    Update a category
 * @access  Public
 * @params  id, name
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/category/1
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
        const category = await updateCategory(id, name);

        if (category) {
            return c.json({
                status: 200,
                message: 'Category updated successfully',
                data: category
            });
        } else {
            return c.json({
                status: 404,
                message: 'Category not found'
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
 * @route   PATCH /api/v1/category/:id/:mode
 * @desc    Enable/Disable a category
 * @access  Public
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/category/1
 **/

router.patch('/:id/:mode', async (c) => {
    const { id, mode } = c.req.param();

    if (!id || !mode) {
        return c.json({
            status: 400,
            message: 'Category ID and MODE are required'
        });
    }

    let status = 0;
    switch (mode) {
        case 'enable':
            status = 1;
            break;
        case 'disable':
            status = 0;
            break;
        default:
            return c.json({
                status: 400,
                message: 'Invalid mode'
            });
    }

    try {
        await enableDisableCategory(id, status);
        return c.json({
            status: 200,
            message: 'Category and Sub-categories updated successfully',
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