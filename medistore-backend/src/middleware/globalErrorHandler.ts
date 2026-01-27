import { NextFunction, Request, Response } from 'express';
import { Prisma } from '../../../../module-23-requirement-analysis-erd-project-setup/generated/prisma/client';

function errorHandler(
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	let statusCode = 500;
	let errorMessage = 'Internal Server Error';
	let errorDetails = err;

	console.error('DEBUG ERROR:', errorDetails);

	// Prisma validation error
	if (err instanceof Prisma.PrismaClientValidationError) {
		statusCode = 400;
		errorMessage = 'Invalid data or missing required fields';
	}

	// Prisma known request error
	else if (err instanceof Prisma.PrismaClientKnownRequestError) {
		switch (err.code) {
			case 'P2000':
				statusCode = 400;
				errorMessage = 'Input value is too long for a field';
				break;

			case 'P2002':
				statusCode = 409;
				errorMessage = 'Duplicate value. This record already exists';
				break;

			case 'P2003':
				statusCode = 400;
				errorMessage = 'Related record not found (foreign key error)';
				break;

			case 'P2025':
				statusCode = 404;
				errorMessage = 'Record not found';
				break;

			default:
				statusCode = 400;
				errorMessage = 'Database request error';
		}
	}

	// Prisma connection error
	else if (err instanceof Prisma.PrismaClientInitializationError) {
		statusCode = 500;
		errorMessage = 'Database connection failed';
	}

	// Prisma internal panic
	else if (err instanceof Prisma.PrismaClientRustPanicError) {
		statusCode = 500;
		errorMessage = 'Database crashed unexpectedly';
	}

	// Prisma unknown error
	else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
		statusCode = 500;
		errorMessage = 'Database request error';
	}

	// Prisma Client rrust panic error
	else if (err instanceof Prisma.PrismaClientRustPanicError) {
		statusCode = 500;
		errorMessage = 'Database crashed unexpectedly';
	}

	// Prisma client initizlizeation error
	else if (err instanceof Prisma.PrismaClientInitializationError) {
		if (err.errorCode === 'P1000') {
			statusCode = 401;
			errorMessage =
				'Database connection failed. Please check your credentials';
		} else if (err.errorCode === 'P1001') {
			statusCode = 400;
			errorMessage = "Can't connect to the database. Please try again";
		}
	}

	// Normal JS Error
	else if (err instanceof Error) {
		statusCode = 400;
		errorMessage = err.message;
	}

	res.status(statusCode).json({
		success: false,
		message: errorMessage,
		details: errorDetails,
	});
}

export default errorHandler;
