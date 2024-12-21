
import { Hono } from 'hono';
const apiRouter = new Hono();


import userRouter from './user';
import categoryRouter from './category';
import subCategoryRouter from './subCategory';


apiRouter.route('/user', userRouter);
apiRouter.route('/category', categoryRouter);
apiRouter.route('/sub_category', subCategoryRouter);


export default apiRouter;
