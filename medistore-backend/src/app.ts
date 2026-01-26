import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import morgan from 'morgan';

import express, { Application } from 'express';

import errorHandler from './middleware/globalErrorHandler';
import { notFound } from './middleware/notFound';

import { auth } from './lib/auth';

const app: Application = express();

// middlewares
app.use(morgan('dev'));
app.use(
	cors({
		origin: process.env.APP_URL || 'http://localhost:3000',
		credentials: true,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes (Better auth routes)
app.all('/api/v1/auth/*splat', toNodeHandler(auth));


// Check Health
app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use(errorHandler);

app.use(notFound);

export default app;
