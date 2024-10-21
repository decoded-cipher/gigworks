import { Hono } from 'hono';

import userRouter from './user';

const apiRouter = new Hono();

apiRouter.route('/user', userRouter);

export default apiRouter;
