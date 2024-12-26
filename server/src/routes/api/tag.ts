
import { Hono } from 'hono';
const router = new Hono();

import { createTag, getTags } from '../../services/tag';
import { tag, profileTag } from '../../config/database/schema';
import { Tag, ProfileTag } from '../../config/database/interfaces';



/**
 * @route   POST /api/v1/tag
 * @desc    Create a new tag
 * @access  Public
 * @params  name, category_id, sub_category_id
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/tag
 **/

router.post('/', async (c) => {
    const { name, category_id, sub_category_id } = await c.req.json();

    if (!name || !category_id || !sub_category_id) {
        return c.json({
            message: 'Name, category_id and sub_category_id are required'
        }, 400);
    }

    try {
        const tag: Tag = await createTag({ name, category_id, sub_category_id });

        return c.json({
            message: 'Tag created successfully',
            data: tag
        }, 201);
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



/**
 * @route   GET /api/v1/tag
 * @desc    Get all tags by category and sub category with pagination
 * @access  Public
 * @params  category_id, sub_category_id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/tag
 **/

router.get('/', async (c) => {
    
    const category_id = c.req.query('category_id');
    const sub_category_id = c.req.query('sub_category_id');
    const page = Number(c.req.query('page')) || 1;
    const limit = Number(c.req.query('limit')) || 10;
    const search = c.req.query('search') || '';

    try {
        const result = await getTags(category_id, sub_category_id, page, limit, search);

        if (result.data.length > 0) {
            return c.json({
                message: 'Tags fetched successfully',
                data: {
                    tags: result.data,
                    meta: {
                        params: {
                            category_id: category_id,
                            sub_category_id: sub_category_id,
                            page: page,
                            limit: limit,
                            search: search
                        },
                        total_count: result.count,
                        total_pages: Math.ceil(result.count / limit),
                        previous: page > 1 ? `/api/v1/sub_category?page=${page - 1}&limit=${limit}` : null,
                        next: result.data.length === limit ? `/api/v1/sub_category?page=${page + 1}&limit=${limit}` : null
                    }
                }
            }, 200);
        }
        
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



export default router;