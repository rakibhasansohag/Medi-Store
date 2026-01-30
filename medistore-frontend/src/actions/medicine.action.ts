'use server';

import { revalidateTag, updateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { env } from '@/env';
import { IApiResponse, IMedicine } from '@/types';

const API_URL = env.API_URL;

interface ICreateMedicineData {
	name: string;
	description: string;
	manufacturer: string;
	price: number;
	stock: number;
	imageUrl?: string;
	categoryId: string;
}

export async function createMedicine(
	formData: ICreateMedicineData,
): Promise<IApiResponse<IMedicine>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/medicines`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(formData),
		});

		const data = await res.json();

		if (!data.success) {
			return {
				success: false,
				message: data.message || 'Failed to create medicine',
			};
		}

		revalidateTag('medicines', 'max');

		return {
			success: true,
			message: 'Medicine created successfully',
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

export async function updateMedicine(
	id: string,
	formData: Partial<ICreateMedicineData>,
): Promise<IApiResponse<IMedicine>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/medicines/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(formData),
		});

		const data = await res.json();

		if (!data.success) {
			return {
				success: false,
				message: data.message || 'Failed to update medicine',
			};
		}

		revalidateTag('medicines', 'max');

		return {
			success: true,
			message: 'Medicine updated successfully',
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

export async function deleteMedicine(id: string): Promise<IApiResponse<void>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/medicines/${id}`, {
			method: 'DELETE',
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		const data = await res.json();

		if (!data.success) {
			return {
				success: false,
				message: data.message || 'Failed to delete medicine',
			};
		}

		updateTag('medicines');

		return {
			success: true,
			message: 'Medicine deleted successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: 'Something went wrong',
			details: error,
		};
	}
}

export async function updateMedicineStock(
	medicineId: string,
	quantity: number,
): Promise<IApiResponse<IMedicine>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/medicines/${medicineId}/stock`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify({ quantity }),
		});

		const data = await res.json();

		if (!data.success) {
			return {
				success: false,
				message: data.message || 'Failed to update stock',
			};
		}

		revalidateTag('medicines', 'max');

		return {
			success: true,
			message: 'Stock updated successfully',
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