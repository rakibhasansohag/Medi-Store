import { prisma } from '../../lib/prisma';
import { ICreateReviewInput, IUpdateReviewInput, IReview } from '../../types';

const createReview = async (
	data: ICreateReviewInput,
	customerId: string,
): Promise<IReview> => {
	// Check if medicine exists
	await prisma.medicine.findUniqueOrThrow({
		where: { id: data.medicineId },
	});

	// Check if user has already reviewed this medicine
	const existingReview = await prisma.review.findFirst({
		where: {
			customerId,
			medicineId: data.medicineId,
		},
	});

	if (existingReview) {
		throw new Error('You have already reviewed this medicine');
	}

	// Check if user has purchased this medicine
	const hasPurchased = await prisma.order.findFirst({
		where: {
			customerId,
			items: {
				some: {
					medicineId: data.medicineId,
				},
			},
			status: 'DELIVERED',
		},
	});

	if (!hasPurchased) {
		throw new Error('You can only review medicines you have purchased');
	}

	return await prisma.review.create({
		data: {
			rating: data.rating,
			comment: data?.comment,
			customerId,
			medicineId: data.medicineId,
		},
	});
};

const getAllReviews = async (): Promise<IReview[]> => {
	return await prisma.review.findMany({
		orderBy: { createdAt: 'desc' },
		include: {
			medicine: {
				select: {
					id: true,
					name: true,
					imageUrl: true,
				},
			},
		},
	});
};

const getTopReviews = async (limit: number = 10): Promise<IReview[]> => {
	return await prisma.review.findMany({
		where: {
			rating: {
				gte: 4,
			},
		},
		orderBy: {
			rating: 'desc',
		},
		take: limit,
		include: {
			medicine: {
				select: {
					id: true,
					name: true,
					imageUrl: true,
				},
			},
		},
	});
};

const getReviewsByMedicine = async (medicineId: string): Promise<IReview[]> => {
	return await prisma.review.findMany({
		where: { medicineId },
		orderBy: { createdAt: 'desc' },
	});
};

const getMyReviews = async (customerId: string): Promise<IReview[]> => {
	return await prisma.review.findMany({
		where: { customerId },
		orderBy: { createdAt: 'desc' },
		include: {
			medicine: {
				select: {
					id: true,
					name: true,
					imageUrl: true,
				},
			},
		},
	});
};

const updateReview = async (
	reviewId: string,
	data: IUpdateReviewInput,
	customerId: string,
): Promise<IReview> => {
	const review = await prisma.review.findUniqueOrThrow({
		where: { id: reviewId },
		select: { id: true, customerId: true },
	});

	if (review.customerId !== customerId) {
		throw new Error('Unauthorized access');
	}

	return await prisma.review.update({
		where: { id: reviewId },
		data,
	});
};

const deleteReview = async (
	reviewId: string,
	customerId: string,
): Promise<void> => {
	const review = await prisma.review.findUniqueOrThrow({
		where: { id: reviewId },
		select: { id: true, customerId: true },
	});

	if (review.customerId !== customerId) {
		throw new Error('Unauthorized access');
	}

	await prisma.review.delete({
		where: { id: reviewId },
	});
};

const deleteReviewByAdmin = async (reviewId: string): Promise<void> => {
	await prisma.review.delete({
		where: { id: reviewId },
	});
};

export const ReviewService = {
	createReview,
	getAllReviews,
	getTopReviews,
	getReviewsByMedicine,
	getMyReviews,
	updateReview,
	deleteReview,
	deleteReviewByAdmin,
};
