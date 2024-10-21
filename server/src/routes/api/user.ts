import { Hono } from 'hono';

const userRouter = new Hono();

// Get all users
userRouter.get('/', async (c) => {
  try {
    // Logic to fetch users
    return c.json({ message: 'Get all users' });
  } catch (error) {
    return c.json({ message: 'Failed to get users', error: error.message }, 500);
  }
});


export default userRouter;