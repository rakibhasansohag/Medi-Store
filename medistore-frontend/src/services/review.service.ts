import { env } from '@/env';
import { IApiResponse, IReview, ICreateReviewInput } from '@/types';
import { cookies } from 'next/headers';

const API_URL = env.API_URL;

export const reviewService = {
	createReview: async (
		data: ICreateReviewInput,
	): Promise<IApiResponse<IReview>> => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/reviews`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookieStore.toString(),
				},
				body: JSON.stringify(data),
			});

			const result = await res.json();

			if (!result.success) {
				return {
					success: false,
					message: result.message || 'Failed to create review',
				};
			}

			return {
				success: true,
				message: 'Review created successfully',
				data: result.data,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to create review',
				details: error,
			};
		}
	},

	getMyReviews: async (): Promise<IApiResponse<IReview[]>> => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/reviews/my-reviews`, {
				headers: {
					Cookie: cookieStore.toString(),
				},
				cache: 'no-store',
			});

			const result = await res.json();

			if (!result.success) {
				return {
					success: false,
					message: result.message || 'Failed to fetch reviews',
				};
			}

			return {
				success: true,
				message: 'Success',
				data: result.data,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to fetch reviews',
				details: error,
			};
		}
	},

	getTopReviews: async (
		limit: number = 10,
	): Promise<IApiResponse<IReview[]>> => {
		try {
			const res = await fetch(`${API_URL}/reviews/top?limit=${limit}`, {
				next: { tags: ['reviews'], revalidate: 60 },
			});

			const result = await res.json();

			if (!result.success) {
				return {
					success: false,
					message: result.message || 'Failed to fetch reviews',
				};
			}

			return {
				success: true,
				message: 'Success',
				data: result.data,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to fetch reviews',
				details: error,
			};
		}
	},

	getAllReviews: async (): Promise<IApiResponse<IReview[]>> => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/reviews/all`, {
				headers: {
					Cookie: cookieStore.toString(),
				},
				cache: 'no-store',
			});

			const result = await res.json();

			if (!result.success) {
				return {
					success: false,
					message: result.message || 'Failed to fetch reviews',
				};
			}

			return {
				success: true,
				message: 'Success',
				data: result.data,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to fetch reviews',
				details: error,
			};
		}
	},

	getReviewsByMedicine: async (
		medicineId: string,
	): Promise<IApiResponse<IReview[]>> => {
		try {
			const res = await fetch(`${API_URL}/reviews/medicine/${medicineId}`, {
				cache: 'no-store',
			});

			const result = await res.json();

			if (!result.success) {
				return {
					success: false,
					message: result.message || 'Failed to fetch reviews',
				};
			}

			return {
				success: true,
				message: 'Success',
				data: result.data,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to fetch reviews',
				details: error,
			};
		}
	},

	deleteReview: async (reviewId: string): Promise<IApiResponse<void>> => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
				method: 'DELETE',
				headers: {
					Cookie: cookieStore.toString(),
				},
			});

			const result = await res.json();

			if (!result.success) {
				return {
					success: false,
					message: result.message || 'Failed to delete review',
				};
			}

			return {
				success: true,
				message: 'Review deleted successfully',
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to delete review',
				details: error,
			};
		}
	},

	deleteReviewByAdmin: async (
		reviewId: string,
	): Promise<IApiResponse<void>> => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/reviews/${reviewId}/admin`, {
				method: 'DELETE',
				headers: {
					Cookie: cookieStore.toString(),
				},
			});

			const result = await res.json();

			if (!result.success) {
				return {
					success: false,
					message: result.message || 'Failed to delete review',
				};
			}

			return {
				success: true,
				message: 'Review deleted successfully',
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to delete review',
				details: error,
			};
		}
	},
};
