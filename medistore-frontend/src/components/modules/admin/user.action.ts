'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { env } from '@/env';
import { IApiResponse, IUserProfile, ISellerRequest } from '@/types';

const API_URL = env.API_URL;

export async function updateProfile(data: {
	name?: string;
	phone?: string;
	bio?: string;
	image?: string;
}): Promise<IApiResponse<IUserProfile>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/users/profile`, {
			method: 'PATCH',
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
				message: result.message || 'Failed to update profile',
			};
		}

		revalidateTag('profile', 'max');

		return {
			success: true,
			message: 'Profile updated successfully',
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

export async function requestSellerRole(
	data: ISellerRequest,
): Promise<IApiResponse<IUserProfile>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/users/request-seller`, {
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
				message: result.message || 'Failed to submit seller request',
			};
		}

		revalidateTag('profile', 'max');

		return {
			success: true,
			message: 'Seller request submitted successfully',
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

export async function approveSellerRequest(
	userId: string,
): Promise<IApiResponse<IUserProfile>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(
			`${API_URL}/users/seller-requests/${userId}/approve`,
			{
				method: 'PATCH',
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		const result = await res.json();

		if (!result.success) {
			return {
				success: false,
				message: result.message || 'Failed to approve seller request',
			};
		}

		revalidateTag('seller-requests', 'max');
		revalidateTag('users', 'max');

		return {
			success: true,
			message: 'Seller request approved successfully',
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

export async function rejectSellerRequest(
	userId: string,
): Promise<IApiResponse<IUserProfile>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(
			`${API_URL}/users/seller-requests/${userId}/reject`,
			{
				method: 'PATCH',
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		const result = await res.json();

		if (!result.success) {
			return {
				success: false,
				message: result.message || 'Failed to reject seller request',
			};
		}

		revalidateTag('seller-requests', 'max');

		return {
			success: true,
			message: 'Seller request rejected successfully',
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

export async function updateUserStatus(
	userId: string,
	status: string,
): Promise<IApiResponse<IUserProfile>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/users/${userId}/status`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify({ status }),
		});

		const result = await res.json();

		if (!result.success) {
			return {
				success: false,
				message: result.message || 'Failed to update user status',
			};
		}

		revalidateTag('users', 'max');

		return {
			success: true,
			message: 'User status updated successfully',
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
