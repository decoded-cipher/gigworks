
import { createMiddleware } from 'hono/factory'

import { db } from '../config/database/turso';
import { activityLog } from '../config/database/schema';
import { logActivity } from '../services/activityLog';

interface ActivityLog {
    user_id: string;
    activity: string;
    user_agent: string;
}


export const activityLogger = createMiddleware(async (c, next) => {
    const { req } = c;
    const { user } = req;
    
    const method = req.method.toUpperCase();
    const loggableMethods = ['POST', 'PATCH', 'PUT', 'DELETE'];    

    if (!loggableMethods.includes(method)) {
        await next();
        return;
    }

    const activityLogData: ActivityLog = {
        user_id: user ? user.id : 'public',
        activity: `${req.method} ${req.path}`,
        user_agent: req.headers ? req.headers['user-agent'] : 'unknown',
    };

    try {
        await db.insert(activityLog).values(activityLogData).execute();
    } catch (error) {
        console.error('Error logging activity:', error);
    }

    await next();
});
