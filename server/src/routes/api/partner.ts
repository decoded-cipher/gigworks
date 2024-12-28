
import { Hono } from 'hono';
const router = new Hono();

import { createUser, getUserByPhone } from '../../services/user';
import { createPartner } from '../../services/partner';
import { createPartnerBank } from '../../services/partnerBank';
// import { createPartnerIdProof } from '../../services/partnerIdProof';

import { User, Partner, PartnerBank, PartnerIdProof, PartnerIdProofType } from '../../config/database/interfaces';


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

        // let partnerIdProof: PartnerIdProof | null = null;
        // if (data.partnerIdProof) {
        //     partnerIdProof = await createPartnerIdProof({ ...data.partnerIdProof, partner_id: partner.id });
        // }
    
        return c.json({
            message: 'Partner created successfully',
            data: {
                user,
                partner,
                partnerBank,
                // partnerIdProof
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