import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { ISellerRequest, IUpdateProfileInput } from '../../types';

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized access',
			});
		}

		const result = await UserService.getProfile(req.user.id);

		res.status(200).json({
			success: true,
			message: 'Profile retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const updateProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized access',
			});
		}

		const data: IUpdateProfileInput = req.body;

		const result = await UserService.updateProfile(req.user.id, data);

		res.status(200).json({
			success: true,
			message: 'Profile updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const requestSellerRole = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized access',
			});
		}

		const data: ISellerRequest = req.body;

		const result = await UserService.requestSellerRole(req.user.id, data);

		res.status(200).json({
			success: true,
			message: 'Seller request submitted successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getPendingSellerRequests = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await UserService.getPendingSellerRequests();

		res.status(200).json({
			success: true,
			message: 'Pending seller requests retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const approveSellerRequest = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userId } = req.params;

		const result = await UserService.approveSellerRequest(userId as string);

		res.status(200).json({
			success: true,
			message: 'Seller request approved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const rejectSellerRequest = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userId } = req.params;

		const result = await UserService.rejectSellerRequest(userId as string);

		res.status(200).json({
			success: true,
			message: 'Seller request rejected successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await UserService.getAllUsers();

		res.status(200).json({
			success: true,
			message: 'Users retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.params;

		const result = await UserService.getUserById(userId as string);

		if (!result) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'User retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const updateUserStatus = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userId } = req.params;
		const { status } = req.body;

		const result = await UserService.updateUserStatus(userId as string, status);

		res.status(200).json({
			success: true,
			message: 'User status updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const UserController = {
	getProfile,
	updateProfile,
	requestSellerRole,
	getPendingSellerRequests,
	approveSellerRequest,
	rejectSellerRequest,
	getAllUsers,
	getUserById,
	updateUserStatus,
};
