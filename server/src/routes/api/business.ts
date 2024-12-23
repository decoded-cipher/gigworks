
import { Hono } from 'hono';
const router = new Hono();

import { createUser, getUserByPhone } from '../../services/user';
import { createProfile } from '../../services/profile';
// import { createPayment } from '../../services/payment';
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
        
        // let payment: Payment | null = null;
        // if (c.body.payment) {
        //     payment = await createPayment(data.payment, user);
        // }

        // let media: Media | null = null;
        // if (c.body.media) {
        //     media = await uploadMedia(data.media, user);
        // }

        // let license: License | null = null;
        // if (c.body.license) {
        //     license = await uploadLicense(data.license, user);
        // }
    
        return c.json({
            message: 'Business created successfully',
            data: {
                user,
                profile,
            //     payment,
            //     media,
            //     license
            }
        }, 201);
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



module.exports = router;