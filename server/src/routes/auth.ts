
import { Hono } from 'hono';
const router = new Hono();

import { generateOTP, verifyOTP, createAuthToken, deleteAuthToken } from '../services/auth';
import { getUserByPhone, createUser, updateUser } from '../services/user';
import { getProfilesByUser } from '../services/profile';
import { User } from '../config/database/interfaces';
import { sendOtpToInterakt } from '../services/bot';



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
    try {
        const { phone, name, isPartner } = await c.req.json();

        if (!phone || !name) {
            return c.json({
                error: 'Phone number and name are required'
            }, 400);
        }

        let user = await getUserByPhone(phone);
        const otp = await generateOTP(phone, c.env);

        if (user) {
            if (user.status === 1) {
                return c.json({
                    error: 'User already exists. Please login'
                }, 400);
            }
        } else {
            const role = isPartner ? 1 : 2;
            user = await createUser({ phone, name, role } as User);
        }

        // Send OTP via WhatsApp
        try {
            await sendOtpToInterakt(otp, phone, c.env as any);
        } catch (error) {
            console.error('Error sending OTP via WhatsApp:', error);
        }

        return c.json({
            message: 'OTP sent successfully',
            otp
        });

    } catch (error) {
        return c.json({
            message: 'Error generating OTP',
            error: error.message || error
        }, 500);
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
        return errorRes(c, 'Phone number and OTP are required', 400);
    }

    try {
        const isValid = await verifyOTP(phone, otp, c.env);
        
        if (!isValid) {
            return errorRes(c, 'Invalid OTP. Please try again', 400);
        }
        
        const user = await getUserByPhone(phone);
        if (!user) {
            return errorRes(c, 'User not found', 404);
        }

        switch (mode) {
            case 'register':
                await updateUser({ id: user.id, status: 1 });
                return successRes(c, 'Phone number verified successfully', 201);

            case 'login':
                const token = await createAuthToken(user, c.env);
                const profiles = await getProfilesByUser(user.id);

                const data = {
                    token,
                    user: {
                        name: user.name,
                        phone: user.phone,
                        ...(user.role === 1 ? { partner: true } : { profiles: profiles })
                    }
                };
                
                return successRes(c, 'User logged in successfully', 201, { data });

            default:
                return errorRes(c, 'Invalid mode. Please provide a valid mode', 400);
        }

    } catch (error) {
        return errorRes(c, 'Error verifying OTP', 400, error);
    }
});

// Helper functions
const errorRes = (c, message, statusCode, error = null) => {
    return c.json({ error: message, details: error }, statusCode);
}

const successRes = (c, message, statusCode, data = {}) => {
    return c.json({ message, ...data }, statusCode);
}



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
    try {
        const { phone } = await c.req.json();

        if (!phone) {
            return c.json({
                error: 'Phone number is required'
            }, 400);
        }

        const user = await getUserByPhone(phone);

        if (!user) {
            return c.json({
                error: 'User not found. Please register'
            }, 404);
        }

        const otp = await generateOTP(phone, c.env);
        
        // Send OTP via WhatsApp
        try {
            await sendOtpToInterakt(otp, phone, c.env as any);
        } catch (error) {
            console.error('Error sending OTP via WhatsApp:', error);
        }

        return c.json({
            message: 'OTP sent successfully',
            otp
        });

    } catch (error) {
        return c.json({
            message: 'Error generating OTP',
            error: error.message || error
        }, 500);
    }
});



/**
 * @route  POST /auth/logout
 * @desc   Logout user
 * @access Private
 * @param  token
 * @return message
 * @error  400, error
 * 
 * @example POST /auth/logout
 */

router.post('/logout', async (c) => {
    try {
        const token = c.req.header('Authorization');
        if (!token) {
            return c.json({
                error: 'Token is required'
            }, 400);
        }

        await deleteAuthToken(token, c.env);
        return c.json({
            message: 'User logged out successfully'
        });

    } catch (error) {
        return c.json({
            message: 'Error logging out user',
            error: error.message || error
        }, 500);
    }
});



export default router;