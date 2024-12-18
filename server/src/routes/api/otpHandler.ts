
import { Hono } from 'hono';
const otpRouter = new Hono();

import { generateOTP } from '../../services/otpHandler';



otpRouter.post('/generate', async (c) => {
    
    const { phone } = await c.req.json();
    const otp = await generateOTP(phone, c.env);

    return c.json({
        status: 200,
        message: 'OTP generated successfully',
        data: otp
    });

});



export default otpRouter;