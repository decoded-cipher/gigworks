import { Hono } from 'hono';
import { errorHandler } from './middleware/errorHandler';

import apiRouter from './routes/api';
import authRouter from './routes/auth';

const app = new Hono();


app.route('/api', apiRouter);
app.route('/auth', authRouter);


app.get('/', (c) => c.json({
    status: 200,
    message: 'API is working properly',
}));


app.use('*', errorHandler);

app.use((c) => c.json({
    status: 404,
    message: 'API endpoint not found',
}));


export default app;