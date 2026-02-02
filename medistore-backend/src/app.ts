import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import morgan from 'morgan';

import express, { Application } from 'express';

import errorHandler from './middleware/globalErrorHandler';
import { notFound } from './middleware/notFound';

import { auth } from './lib/auth';
import { categoryRouter } from './modules/category/category.route';
import { medicineRouter } from './modules/medicine/medicine.route';
import { orderRouter } from './modules/order/order.route';
import { reviewRouter } from './modules/review/review.route';
import { userRouter } from './modules/user/user.route';

const app: Application = express();

// middlewares
app.use(morgan('dev'));

const allowedOrigins = [process.env.APP_URL].filter(Boolean);

// app.use(
// 	cors({
// 		origin: process.env.APP_URL,
// 		credentials: true,
// 	}),
// );

app.use(
	cors({
		origin: (origin, callback) => {
			// Allow requests with no origin (mobile apps, Postman, etc.)
			if (!origin) return callback(null, true);

			// Check if origin is in allowedOrigins or matches Vercel preview pattern
			const isAllowed =
				allowedOrigins.includes(origin) ||
				/^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
				/^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

			if (isAllowed) {
				callback(null, true);
			} else {
				callback(new Error(`Origin ${origin} not allowed by CORS`));
			}
		},
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
		exposedHeaders: ['Set-Cookie'],
	}),
);


app.use(express.json());
app.set('truest proxy', true);
app.use(express.urlencoded({ extended: true }));

// Check Health
app.get('/', (req, res) => {
	res.send('Hello World');
});

// routes (Better auth routes)
app.all('/api/v1/auth/*splat', toNodeHandler(auth));

// Routes for Services and Apis
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/medicines', medicineRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', userRouter);

app.use(errorHandler);
app.use(notFound);

export default app;
