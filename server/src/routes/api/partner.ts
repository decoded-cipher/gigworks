
import { Hono } from 'hono';
const router = new Hono();

import { verifyToken } from '../../middleware/authentication';

import { createUser, getUserByPhone } from '../../services/user';
import { createPartner, updatePartner, getPartnerById, getPartnerAnalytics } from '../../services/partner';
import { createPartnerBank, deletePartnerBank } from '../../services/partnerBank';
import { createPartnerIdProof, deletePartnerIdProof } from '../../services/partnerProof';

import { User, Partner, PartnerBank, PartnerIdProof } from '../../config/database/interfaces';
import { removeFields } from '../../utils/helpers';


/**
 * @route   POST /api/v1/partner
 * @desc    Create a new partner
 * @access  Public
 * @params  user_id, avatar
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/partner
 **/

router.post('/', async (c) => {
    try {
        const data = await c.req.json();        

        let user: User = await getUserByPhone(data.user.phone);
    
        let partner: Partner = await createPartner(data.partner, user);

        if(!partner) {
            return c.json({
                message: 'User already has a partner account'
            }, 400);
        }
        
        let partnerBank: PartnerBank | null = null;
        if (data.partnerBank) {
            partnerBank = await createPartnerBank({ ...data.partnerBank, partner_id: partner.id });
        }

        let partnerIdProof = null;
        if (data.identityProof) {
            partnerIdProof = await createPartnerIdProof({ ...data.identityProof, partner_id: partner.id });
        }
    
        return c.json({
            message: 'Partner created successfully'
        });
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



/**
 * @route   PATCH /api/v1/partner
 * @desc    Update partner data
 * @access  Authenticated
 * @params  token, avatar
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/partner
 **/

router.patch('/', verifyToken, async (c) => {
    try {
        const data = await c.req.json();
        const user: User = c.req._user;
        
        let partnerData: Partner = await getPartnerById(user);
        partnerData = partnerData[0];

        if (!partnerData) {
            return c.json({
                message: 'Partner not found'
            }, 400);
        }

        if(data.partnerBank) {
            await deletePartnerBank(partnerData.partner.id);
            await createPartnerBank({ ...data.partnerBank, partner_id: partnerData.partner.id });
        }

        if(data.identityProof) {
            await deletePartnerIdProof(partnerData.partner.id);
            await createPartnerIdProof({ ...data.identityProof, partner_id: partnerData.partner.id });
        }

        const partner: Partner = await updatePartner({ ...data.partner, id: partnerData.partner.id });

        return c.json({
            message: 'Partner data updated successfully',
            data: partner
        });
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



/**
 * @route   GET /api/v1/partner
 * @desc    Get partner data by token
 * @access  Authenticated
 * @params  token
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/partner
 **/

router.get('/', verifyToken, async (c) => {
    try {
        const user: User = c.req._user;
        const partner: Partner = await getPartnerById(user);

        const result = removeFields(partner, ['id', 'user_id', 'partner_id', 'updated_at', 'created_at', 'status', 'role', 'proof_type_id', 'proof_url']);

        return c.json({
            message: 'Partner data fetched successfully',
            data: result
        });
    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});



/**
 * @route   GET /api/v1/partner/analytics
 * @desc    Get partner analytics
 * @access  Authenticated
 * @params  token
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/partner/analytics
 **/

router.get('/analytics', verifyToken, async (c) => {
    try {

        const start = c.req.query('start');
        const end = c.req.query('end');

        const user: User = c.req._user;
        const analytics = await getPartnerAnalytics(user, start, end);

        return c.json({
            message: 'Partner analytics fetched successfully',
            data: {
                analytics,
                meta: {
                    total: analytics.reduce((acc, cur) => acc + cur.count, 0),
                    start: start,
                    end: end
                }
            }
        });

    } catch (error) {
        return c.json({
            message: 'Internal Server Error',
            error: error.message
        }, 500);
    }
});


module.exports = router;