import { Hono } from 'hono';
import { db } from '../../config/database/connection';
import { user } from '../../config/database/schema';

const userRouter = new Hono();

userRouter.get('/', async (c) => {
    const allUsers = await db.select().from(user);
    return c.json({
        status: 200,
        message: 'All users fetched successfully',
        data: allUsers
    });
});

export default userRouter;