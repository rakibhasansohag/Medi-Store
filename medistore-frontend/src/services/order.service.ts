import { env } from '@/env';
import { IApiResponse, IOrder } from '@/types';
import { cookies } from 'next/headers';

const API_URL = env.API_URL;

export const orderService = {
	getMyOrders: async (): Promise<IApiResponse<IOrder[]>> => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/orders/my-orders`, {
				headers: {
					Cookie: cookieStore.toString(),
				},
				cache: 'no-store',
			});

			const data = await res.json();

			if (!data.success) {
				return {
					success: false,
					message: data.message || 'Failed to fetch orders',
				};
			}

			return {
				success: true,
				message: 'Success',
				data: data.data,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to fetch orders',
				details: error,
			};
		}
	},

	getOrderById: async (id: string): Promise<IApiResponse<IOrder>> => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/orders/${id}`, {
				headers: {
					Cookie: cookieStore.toString(),
				},
				cache: 'no-store',
			});

			const data = await res.json();

			if (!data.success) {
				return {
					success: false,
					message: data.message || 'Failed to fetch order',
				};
			}

			return {
				success: true,
				message: 'Success',
				data: data.data,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to fetch order',
				details: error,
			};
		}
	},

	getAllOrders: async (): Promise<IApiResponse<IOrder[]>> => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/orders`, {
				headers: {
					Cookie: cookieStore.toString(),
				},
				cache: 'no-store',
			});

			const data = await res.json();

			if (!data.success) {
				return {
					success: false,
					message: data.message || 'Failed to fetch orders',
				};
			}

			return {
				success: true,
				message: 'Success',
				data: data.data,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to fetch orders',
				details: error,
			};
		}
	},
};
