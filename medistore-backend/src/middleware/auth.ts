import { NextFunction, Request, Response } from 'express';
import { auth as betterAuth } from '../lib/auth';
import { UserRole, IUser, UserStatus } from '../types';

declare global {
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}

const CheckRole = (...roles: UserRole[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const session = await betterAuth.api.getSession({
				headers: req.headers as Record<string, string>,
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
				role: session.user.role as UserRole,
				status: session.user.status as UserStatus,
				emailVerified: session.user.emailVerified,
				phone: session.user.phone as string | undefined,
			};

			if (roles.length && !roles.includes(req?.user?.role)) {
				return res.status(403).json({
					success: false,
					message: 'Forbidden Access! You are not authorized',
				});
			}

			next();
		} catch (error) {
			next(error);
		}
	};
};

export default CheckRole;
export { UserRole };
