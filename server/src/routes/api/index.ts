import { Hono } from 'hono';

import userRouter from './user';
import businessRouter from './business';
import businessCategoryRouter from './businessCategory';

const apiRouter = new Hono();

apiRouter.route('/user', userRouter);
apiRouter.route('/business', businessRouter);
apiRouter.route('/business_category', businessCategoryRouter);

export default apiRouter;
