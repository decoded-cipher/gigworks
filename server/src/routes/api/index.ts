
import { Hono } from 'hono';
const apiRouter = new Hono();


import userRouter from './user';
import categoryRouter from './category';
import subCategoryRouter from './subCategory';
import businessRouter from './business';
import tagRouter from './tag';


apiRouter.route('/user', userRouter);
apiRouter.route('/category', categoryRouter);
apiRouter.route('/sub_category', subCategoryRouter);
apiRouter.route('/business', businessRouter);
apiRouter.route('/tag', tagRouter);


export default apiRouter;
