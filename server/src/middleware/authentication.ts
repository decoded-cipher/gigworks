
import { HonoContext, Next } from 'hono';
import jwt, { TokenExpiredError } from 'jsonwebtoken';


interface DecodedToken {
    [key: string]: any;
}


export const verifyToken = async (c: HonoContext, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
        return c.json({
            message: 'Access denied. No token provided'
        }, 401);
    }

    const bearerToken = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(bearerToken, c.env.JWT_TOKEN_SECRET) as DecodedToken;
        c.req.user = decoded;
        await next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return c.json({
                message: 'Token expired. Please login again',
            }, 401);
        }
        return c.json({
            message: 'Invalid token. Please login again',
            // error: error.message,
        }, 400);
    }
};

