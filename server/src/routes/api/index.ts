import { Hono } from 'hono';

import userRouter from './user';
import categoryRouter from './category';
import subCategoryRouter from './subCategory';

const apiRouter = new Hono();

apiRouter.route('/user', userRouter);
apiRouter.route('/category', categoryRouter);
apiRouter.route('/sub_category', subCategoryRouter);

export default apiRouter;
