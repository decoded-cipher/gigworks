import { Hono } from 'hono';
import { errorHandler } from './middleware/errorHandler';

import dotenv from 'dotenv';
dotenv.config();

import apiRouter from './routes/api';
import authRouter from './routes/auth';

type Bindings = {
    TURSO_URL : string,
    TURSO_AUTH_TOKEN : string
};

const app = new Hono<{ Bindings: Bindings }>();

app.route('/api/v1', apiRouter);
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