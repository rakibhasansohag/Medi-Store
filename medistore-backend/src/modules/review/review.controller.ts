import { Request, Response, NextFunction } from 'express';
import { ReviewService } from './review.service';
import { ICreateReviewInput, IUpdateReviewInput } from '../../types';

const createReview = async (
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

		const data: ICreateReviewInput = req.body;

		const result = await ReviewService.createReview(data, req.user.id);

		res.status(201).json({
			success: true,
			message: 'Review created successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getAllReviews = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await ReviewService.getAllReviews();

		res.status(200).json({
			success: true,
			message: 'Reviews retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getTopReviews = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const limit = req.query.limit ? Number(req.query.limit) : 10;
		const result = await ReviewService.getTopReviews(limit);

		res.status(200).json({
			success: true,
			message: 'Top reviews retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getReviewsByMedicine = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { medicineId } = req.params;

		const result = await ReviewService.getReviewsByMedicine(
			medicineId as string,
		);

		res.status(200).json({
			success: true,
			message: 'Reviews retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getMyReviews = async (
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

		const result = await ReviewService.getMyReviews(req.user.id);

		res.status(200).json({
			success: true,
			message: 'Your reviews retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const updateReview = async (
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

		const { id } = req.params;
		const data: IUpdateReviewInput = req.body;

		const result = await ReviewService.updateReview(
			id as string,
			data,
			req.user.id,
		);

		res.status(200).json({
			success: true,
			message: 'Review updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const deleteReview = async (
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

		const { id } = req.params;

		await ReviewService.deleteReview(id as string, req.user.id);

		res.status(200).json({
			success: true,
			message: 'Review deleted successfully',
		});
	} catch (error) {
		next(error);
	}
};

const deleteReviewByAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		await ReviewService.deleteReviewByAdmin(id as string);

		res.status(200).json({
			success: true,
			message: 'Review deleted successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const ReviewController = {
	createReview,
	getAllReviews,
	getTopReviews,
	getReviewsByMedicine,
	getMyReviews,
	updateReview,
	deleteReview,
	deleteReviewByAdmin,
};
