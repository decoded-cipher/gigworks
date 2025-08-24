
import { Hono } from 'hono';
const apiRouter = new Hono();


import adminRouter from './admin';
import analyticsRouter from './analytics';
import botRouter from './bot';
import businessRouter from './business';
import categoryRouter from './category';
import feedbackRouter from './feedback';
import licenseRouter from './license';
import locationRouter from './location';
import mediaRouter from './media';
import partnerRouter from './partner';
import paymentRouter from './payment';
import subCategoryRouter from './subCategory';
import subCategoryOptionRouter from './subCategoryOption';
import tagRouter from './tag';


apiRouter.route('/admin', adminRouter);
apiRouter.route('/analytics', analyticsRouter);
apiRouter.route('/bot', botRouter);
apiRouter.route('/business', businessRouter);
apiRouter.route('/category', categoryRouter);
apiRouter.route('/feedback', feedbackRouter);
apiRouter.route('/license', licenseRouter);
apiRouter.route('/location', locationRouter);
apiRouter.route('/media', mediaRouter);
apiRouter.route('/partner', partnerRouter);
apiRouter.route('/payment', paymentRouter);
apiRouter.route('/sub_category', subCategoryRouter);
apiRouter.route('/sub_category_option', subCategoryOptionRouter);
apiRouter.route('/tag', tagRouter);


export default apiRouter;
