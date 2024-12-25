
import { Hono } from 'hono';
const router = new Hono();

import { createUser, getUserByPhone } from '../../services/user';
import { createProfile, getRenewalProfiles } from '../../services/profile';
import { createPayment } from '../../services/payment';
// import { uploadMedia } from '../../services/media';
// import { uploadLicense } from '../../services/license';

import { user, profile, profilePayment, profileMedia, profileLicense, profileTags } from '../../config/database/schema';
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
 * @route   GET /api/v1/business
 * @desc    Get all businesses based on renewal
 * @access  Public
 * @params  user
 * @return  message, data
 * @error   400, { error }
 * @status  200, 500
 * 
 * @example /api/v1/business
 **/

router.get('/', async (c) => {
    try {        
        
        let profiles = await getRenewalProfiles();
        return c.json({
            message: 'Businesses fetched successfully',
            data: profiles
        }, 200);

    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



module.exports = router;