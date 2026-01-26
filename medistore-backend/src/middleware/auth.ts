import { NextFunction, Request, Response } from 'express';
import { auth as betterAuth } from '../lib/auth';

declare global {
	namespace Express {
		interface Request {
			user?: {
				id: string;
				email: string;
				name: string;
				role: string;
				emailVerified: boolean;
			};
		}
	}
}

export enum UserRole {
	CUSTOMER = 'CUSTOMER',
	SELLER = 'SELLER',
	ADMIN = 'ADMIN',
}

const CheckRole = (...roles: UserRole[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log(req);

			// Get user session
			const session = await betterAuth.api.getSession({
				headers: req.headers as any,
			});

			if (!session) {
				return res.status(401).json({
					success: false,
					message: 'Unauthorized Access!',
				});
			}

			if (!session.user.emailVerified) {
				return res.status(403).json({
					success: false,
					message: 'Email is not verified! Please verify your email.',
				});
			}

			req.user = {
				id: session.user.id,
				email: session.user.email,
				name: session.user.name,
				role: session.user.role as string,
				emailVerified: session.user.emailVerified,
			};

			if (roles.length && !roles.includes(req.user.role as UserRole)) {
				return res.status(403).json({
					success: false,
					message: 'Forbidden Access! You are not authorized',
				});
			}

			next(); // request continues
		} catch (error) {
			next(error);
		}
	};
};

export default CheckRole;
