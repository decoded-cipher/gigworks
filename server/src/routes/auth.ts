
import { Hono } from 'hono';
const router = new Hono();

import { generateToken } from '../middleware/authentication';
import { generateOTP, verifyOTP } from '../services/auth';
import { getUserByPhone, createUser, updateUser } from '../services/user';
import { User } from '../config/database/interfaces';

// import { sendMessage } from '../services/message';



/**
 * @route  POST /auth/register
 * @desc   Generate OTP for registration
 * @access Public
 * @param  phone, name
 * @return message, otp
 * @error  400, error
 * 
 * @example POST /auth/register
 */

router.post('/register', async (c) => {
    const { phone, name } = await c.req.json();

    if (!phone || !name) {
        return c.json({
            error: 'Phone number and name are required',
        }, 400);
    }

    try {        
        let user = await getUserByPhone(phone);
        
        if (user) {

            if (user.status === 1) {
                return c.json({
                    error: 'User already exists. Please login',
                }, 400);
            } else {
                const otp = await generateOTP(phone, c.env);
                // sendMessage(phone, `Your OTP is ${otp}`);

                return c.json({
                    message: 'OTP sent successfully',
                    otp,
                });
            }

        } else {
            user = await createUser({ phone, name } as User);
            const otp = await generateOTP(phone, c.env);
            // sendMessage(phone, `Your OTP is ${otp}`);

            return c.json({
                message: 'OTP sent successfully',
                otp,
            });
        }

    } catch (error) {
        return c.json({
            message: 'Error generating OTP',
            error
        }, 400);
    }

});



/**
 * @route  POST /auth/verify/:mode
 * @desc   Verify OTP for registration or login
 * @access Public
 * @param  phone, otp
 * @return message, token
 * @error  400, error
 * 
 * @example POST /auth/verify/register
 * @example POST /auth/verify/login
 */

router.post('/verify/:mode', async (c) => {
    const { phone, otp } = await c.req.json();
    const { mode } = c.req.param();

    if (!phone || !otp) {
        return c.json({
            error: 'Phone number and OTP are required',
        }, 400);
    }

    try {
        const isValid = await verifyOTP(phone, otp, c.env);
        console.log('isValid:', isValid);
        
        if (!isValid) {
            return c.json({
                error: 'Invalid OTP. Please try again',
            }, 400);
        }
        
        const user = await getUserByPhone(phone);
        

        switch (mode) {
            case 'register':
                await updateUser({ id: user.id, status: 1 });
                return c.json({
                    message: 'Phone number verified successfully. Proceed to build your profile',
                }, 201);

            case 'login':
                const token = await generateToken(user, c);
                return c.json({
                    message: 'User logged in successfully',
                    token,
                }, 201);

            default:
                return c.json({
                    error: 'Invalid mode. Please provide a valid mode',
                }, 400);
        }

    } catch (error) {
        return c.json({
            message: 'Error verifying OTP',
            error
        }, 400);
    }
});



/**
 * @route  POST /auth/login
 * @desc   Generate OTP for login
 * @access Public
 * @param  phone
 * @return message, otp
 * @error  400, error
 * 
 * @example POST /auth/login
 */

router.post('/login', async (c) => {
    const { phone } = await c.req.json();

    if (!phone) {
        return c.json({
            error: 'Phone number is required',
        }, 400);
    }

    try {
        const user = await getUserByPhone(phone);

        if (!user) {
            return c.json({
                error: 'User not found. Please register',
            }, 400);
        }

        const otp = await generateOTP(phone, c.env);

        // sendMessage(phone, `Your OTP is ${otp}`);

        return c.json({
            message: 'OTP sent successfully',
            otp,
        });
    } catch (error) {
        return c.json({
            message: 'Error generating OTP',
            error
        }, 400);
    }
});



export default router;