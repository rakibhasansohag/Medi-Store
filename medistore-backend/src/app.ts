import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';

import express, { Application } from 'express';

import errorHandler from './middleware/globalErrorHandler';
import { notFound } from './middleware/notFound';

import { auth } from './lib/auth';

const app: Application = express();

app.use(
	cors({
		origin: process.env.APP_URL || 'http://localhost:3000',
		credentials: true,
	}),
);

app.use(express.json());

app.all('/api/auth/*splat', toNodeHandler(auth));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use(errorHandler);
app.use(notFound);

export default app;
