import { env } from '@/env';
import { IApiResponse, IUserProfile } from '@/types';
import { cookies } from 'next/headers';

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
	getSession: async function () {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${AUTH_URL}/get-session`, {
				headers: {
					Cookie: cookieStore.toString(),
				},
				cache: 'no-store',
			});

			const session = await res.json();

			if (session === null) {
				return { data: null, error: { message: 'Session is missing.' } };
			}

			return { data: session, error: null };
		} catch (err) {
			console.error(err);
			return { data: null, error: { message: 'Something Went Wrong' } };
		}
	},

	getProfile: async function (): Promise<IApiResponse<IUserProfile>> {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/users/profile`, {
				headers: {
					Cookie: cookieStore.toString(),
				},
				cache: 'no-store',
			});

			const result = await res.json();

			if (!result.success) {
				return {
					success: false,
					message: result.message || 'Failed to fetch profile',
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
				message: 'Failed to fetch profile',
				details: error,
			};
		}
	},

	getAllUsers: async function (): Promise<IApiResponse<IUserProfile[]>> {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/users/all`, {
				headers: {
					Cookie: cookieStore.toString(),
				},
				cache: 'no-store',
			});

			const result = await res.json();

			if (!result.success) {
				return {
					success: false,
					message: result.message || 'Failed to fetch users',
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
				message: 'Failed to fetch users',
				details: error,
			};
		}
	},

	getUserById: async function (
		userId: string,
	): Promise<IApiResponse<IUserProfile>> {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/users/${userId}`, {
				headers: {
					Cookie: cookieStore.toString(),
				},
				cache: 'no-store',
			});

			const result = await res.json();

			if (!result.success) {
				return {
					success: false,
					message: result.message || 'Failed to fetch user',
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
				message: 'Failed to fetch user',
				details: error,
			};
		}
	},

	getPendingSellerRequests: async function (): Promise<
		IApiResponse<IUserProfile[]>
	> {
		{
			try {
				const cookieStore = await cookies();

				const res = await fetch(`${API_URL}/users/seller-requests`, {
					headers: {
						Cookie: cookieStore.toString(),
					},
					cache: 'no-store',
				});

				const result = await res.json();

				if (!result.success) {
					return {
						success: false,
						message: result.message || 'Failed to fetch seller requests',
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
					message: 'Failed to fetch seller requests',
					details: error,
				};
			}
		}
	},
};

