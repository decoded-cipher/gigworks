
import dotenv from 'dotenv';
dotenv.config();

import { Hono } from 'hono'

import { cors } from 'hono/cors'
// import { cache } from 'hono/cache'
import { logger } from 'hono/logger'
import { timeout } from 'hono/timeout'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'
import { trimTrailingSlash } from 'hono/trailing-slash'

// import { activityLogger } from './middleware/activityLogger'

import apiRouter from './routes/api';
import authRouter from './routes/auth';



type Bindings = {
    TURSO_URL : string,
    TURSO_AUTH_TOKEN : string,
    JWT_TOKEN_SECRET : string,
    JWT_TOKEN_EXPIRY : string,
    KV_STORE: KVNamespace,
};

const app = new Hono<{ Bindings: Bindings }>();



app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    headers: ['Content-Type', 'Authorization'],
}));

// app.get(
//     '*',
//     cache({
//         cacheName: 'api-cache',
//         cacheControl: 'public, max-age=3600',   // 1 hour
//     })
// )

app.use(logger());
app.use(timeout(10000));
app.use('*', requestId());
app.use(secureHeaders());
app.use(trimTrailingSlash());

// app.use(activityLogger);



app.route('/api/v1', apiRouter);
app.route('/auth', authRouter);



app.get('/', (c) => c.json({
    message: 'API is working properly',
}, 200));

app.use((c) => c.json({
    message: 'API endpoint not found',
}, 404));



export default app;
