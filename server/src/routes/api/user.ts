import { Hono } from 'hono';
import { getAllUsers } from '../../services/userService';

const userRouter = new Hono();

userRouter.get('/', async (c) => {
    const users = await getAllUsers();
    return c.json({
        status: 200,
        message: 'All users fetched successfully',
        data: users
    });
});

export default userRouter;