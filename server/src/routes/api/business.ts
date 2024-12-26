
import { Hono } from 'hono';
const router = new Hono();

import { createUser, getUserByPhone } from '../../services/user';
import { createPayment } from '../../services/payment';
// import { uploadMedia } from '../../services/media';
// import { uploadLicense } from '../../services/license';
import { 
    createProfile, 
    getProfileCount, 
    getRenewalProfiles, 
    getProfileBySlug, 
    checkProfileSlug, 
    getProfilesByCategory
} from '../../services/profile';

import { User, Profile, ProfilePayment, ProfileMedia, ProfileLicense, ProfileTag } from '../../config/database/interfaces';



/**
 * @route   POST /api/v1/business
 * @desc    Create a new business
 * @access  Public
 * @params  name
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/business
 **/

router.post('/', async (c) => {
    try {
        const data = await c.req.json();        

        let user: User = await getUserByPhone(data.user.phone);
    
        let profile: Profile = await createProfile({ ...data.profile, user_id: user.id });
        
        let payment: ProfilePayment | null = null;
        if (data.payment) {
            payment = await createPayment({ ...data.payment, profile_id: profile.id });
        }

        // let media: Media | null = null;
        // if (data.media) {
        //     media = await uploadMedia(data.media, user);
        // }

        // let license: License | null = null;
        // if (data.license) {
        //     license = await uploadLicense(data.license, user);
        // }
    
        return c.json({
            message: 'Business created successfully',
            data: {
                user,
                profile,
                payment,
                // media,
                // license
            }
        }, 201);
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



/**
 * @route   GET /api/v1/business/renewal
 * @desc    Get all businesses that need renewal
 * @access  Public
 * @params  user
 * @return  message, data
 * @error   400, { error }
 * @status  200, 500
 * 
 * @example /api/v1/business/renewal
 **/

router.get('/renewal', async (c) => {
    try {

        const page = Number(c.req.query('page')) || 1;
        const limit = Number(c.req.query('limit')) || 10;
        const days = Number(c.req.query('days')) || 0;

        let profiles = await getRenewalProfiles(page, limit, days);
        
        if (!profiles) {
            return c.json({
                message: 'No businesses found',
            }, 404);
        }

        return c.json({
            message: 'Businesses fetched successfully',
            data: {
                profiles: profiles.data,
                meta: {
                    params: {
                        page: page,
                        limit: limit,
                        days: days
                    },
                    total_count: profiles.count,
                    total_pages: Math.ceil(profiles.count / limit),
                    previous: page > 1 ? `/api/v1/sub_category?page=${page - 1}&limit=${limit}` : null,
                    next: profiles.data.length === limit ? `/api/v1/sub_category?page=${page + 1}&limit=${limit}` : null
                }
            }
        }, 200);

    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



/**
 * @route   GET /api/v1/business/count
 * @desc    Get count of all businesses
 * @access  Public
 * @params  user
 * @return  message, data
 * @error   400, { error }
 * @status  200, 500
 * 
 * @example /api/v1/business/count
 **/

router.get('/count', async (c) => {
    try {        
        
        let count = await getProfileCount();
        return c.json({
            message: 'Businesses count fetched successfully',
            data: count
        }, 200);

    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



/**
 * @route   GET /api/v1/business/:slug
 * @desc    Get a business by slug
 * @access  Public
 * @params  slug
 * @return  message, data
 * @error   400, { error }
 * @status  200, 500, 404
 * 
 * @example /api/v1/business/:slug
 **/

router.get('/:slug', async (c) => {
    try {
        const { slug } = c.req.param();

        let profile = await getProfileBySlug(slug);
        if (!profile) {
            return c.json({
                message: 'Business does not exist or is expired',
            }, 404);
        }

        return c.json({
            message: 'Business fetched successfully',
            data: profile
        }, 200);

    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



/**
 * @route   GET /api/v1/business/slug/check
 * @desc    Check if a business slug is available
 * @access  Public
 * @params  slug
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/business/slug/check?value=slug
 **/

router.get('/slug/check', async (c) => {
    try {

        const slug = c.req.query('value');
        
        let exists = await checkProfileSlug(slug);
        if (exists) {
            return c.json({
                message: 'Slug is not available',
                data: false
            }, 200);
        }

        return c.json({
            message: 'Slug is available',
            data: true
        }, 200);

    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



/**
 * @route   GET /api/v1/business?category_id=123
 * @desc    Get businesses by category with pagination
 * @access  Public
 * @params  category_id, page, limit, search
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/business?category_id=123&page=1&limit=10&search=keyword
 **/

router.get('/', async (c) => {
    try {
        const category_id = c.req.query('category_id');
        const page = Number(c.req.query('page')) || 1;
        const limit = Number(c.req.query('limit')) || 10;
        const search = c.req.query('search') || '';

        let result = await getProfilesByCategory(category_id, page, limit, search);

        if (!result) {
            return c.json({
                message: 'No businesses found',
            }, 404);
        }

        return c.json({
            message: 'Businesses fetched successfully',
            data: {
                profiles: result.data,
                meta: {
                    params: {
                        category_id: category_id,
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

    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



module.exports = router;