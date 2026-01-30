'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { env } from '@/env';
import { IApiResponse, IOrder, ICreateOrderInput } from '@/types';

const API_URL = env.API_URL;

export async function createOrder(
	orderData: ICreateOrderInput,
): Promise<IApiResponse<IOrder>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(orderData),
		});

		const data = await res.json();

		if (!data.success) {
			return {
				success: false,
				message: data.message || 'Failed to create order',
			};
		}

		revalidateTag('orders', 'max');

		return {
			success: true,
			message: 'Order created successfully',
			data: data.data,
		};
	} catch (error) {
		return {
			success: false,
			message: 'Something went wrong',
			details: error,
		};
	}
}

export async function updateOrderStatus(
	orderId: string,
	status: string,
): Promise<IApiResponse<IOrder>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify({ status }),
		});

		const data = await res.json();

		if (!data.success) {
			return {
				success: false,
				message: data.message || 'Failed to update order status',
			};
		}

		revalidateTag('orders', 'max');

		return {
			success: true,
			message: 'Order status updated successfully',
			data: data.data,
		};
	} catch (error) {
		return {
			success: false,
			message: 'Something went wrong',
			details: error,
		};
	}
}

export async function cancelOrder(
	orderId: string,
): Promise<IApiResponse<IOrder>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
			method: 'PATCH',
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		const data = await res.json();

		if (!data.success) {
			return {
				success: false,
				message: data.message || 'Failed to cancel order',
			};
		}

		revalidateTag('orders', 'max');

		return {
			success: true,
			message: 'Order cancelled successfully',
			data: data.data,
		};
	} catch (error) {
		return {
			success: false,
			message: 'Something went wrong',
			details: error,
		};
	}
}
