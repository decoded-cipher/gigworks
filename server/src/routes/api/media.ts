
import { Hono } from 'hono';
const router = new Hono();

import { verifyToken } from '../../middleware/authentication';

import { nanoid } from 'nanoid';
import { profileMedia } from '../../config/database/schema';
import { ProfileMedia } from '../../config/database/interfaces';

import { generatePreSignedUrl, saveProfileMedia } from '../../services/media';



/**
 * @route   GET /api/v1/media/get-presigned-url
 * @desc    Generate a pre-signed URL for uploading media
 * @access  Public
 * @params  name, type
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/media
 **/

router.get('/get-presigned-url', async (c) => {    
    try {
        const type = c.req.query('type');
        const category = c.req.query('category');

        const categories = ['avatar', 'banner', 'media', 'license', 'identity'];
        const allowedFileTypes = ['image', 'video'];

        if (!type || !category) {
            return c.json({
                message: 'Type and Category are required'
            }, 400);
        }

        if (!categories.includes(category)) {
            return c.json({
                message: 'Invalid category'
            }, 400);
        }

        if (!allowedFileTypes.includes(type.split('/')[0])) {
            return c.json({
                message: 'Invalid file type'
            }, 400);
        }

        const fileExtension = type.split('/')[1];
        const path = `${category}/${nanoid()}${fileExtension ? `.${fileExtension}` : ''}`;
        const url = await generatePreSignedUrl(path, type, c.env);        

        if (!url) {
            return c.json({
                message: 'Error generating pre-signed URL'
            }, 400);
        }
    
        return c.json({
            message: 'Presigned URL generated successfully',
            data: {
                assetPath: path,
                presignedUrl: url
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
 * @route   POST /api/v1/media
 * @desc    Upload media to profile
 * @access  Public
 * @params  user, media
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 * 
 * @example /api/v1/media
 **/

router.post('/', verifyToken, async (c) => {
    try {
        const { profile_id, url, description } = await c.req.json();

        if (!profile_id || !url) {
            return c.json({
                message: 'Profile ID and URL are required'
            }, 400);
        }

        let result = await saveProfileMedia({ profile_id, url, description });

        if (!result) {
            return c.json({
                message: 'Error saving media'
            }, 400);
        }

        return c.json({
            message: 'Media saved successfully',
            data: result
        }, 201);
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



module.exports = router;
