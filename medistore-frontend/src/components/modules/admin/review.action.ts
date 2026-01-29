'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { env } from '@/env';
import { IApiResponse, ICreateReviewInput, IReview } from '@/types';

const API_URL = env.API_URL;

export async function createReview(
	data: ICreateReviewInput,
): Promise<IApiResponse<IReview>> {
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

		revalidateTag('reviews', 'max');
		revalidateTag('medicines', 'max');

		return {
			success: true,
			message: 'Review created successfully',
			data: result.data,
		};
	} catch (error) {
		return {
			success: false,
			message: 'Something went wrong',
			details: error,
		};
	}
}

export async function deleteReview(
	reviewId: string,
): Promise<IApiResponse<void>> {
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

		revalidateTag('reviews', 'max');

		return {
			success: true,
			message: 'Review deleted successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: 'Something went wrong',
			details: error,
		};
	}
}

export async function deleteReviewByAdmin(
	reviewId: string,
): Promise<IApiResponse<void>> {
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

		revalidateTag('reviews', 'max');

		return {
			success: true,
			message: 'Review deleted successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: 'Something went wrong',
			details: error,
		};
	}
}
