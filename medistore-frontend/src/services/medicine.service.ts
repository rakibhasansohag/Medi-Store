import { env } from '@/env';
import {
	IApiResponse,
	IMedicine,
	IMedicineWithSeller,
	IPaginatedResponse,
} from '@/types';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const API_URL = env.API_URL;

interface IGetMedicinesParams {
	search?: string;
	categoryId?: string;
	minPrice?: string;
	maxPrice?: string;
	page?: string;
	limit?: string;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

export const medicineService = {
	getMedicines: async (
		params?: IGetMedicinesParams,
	): Promise<IApiResponse<IPaginatedResponse<IMedicineWithSeller>>> => {
		try {
			const url = new URL(`${API_URL}/medicines`);

			if (params) {
				Object.entries(params).forEach(([key, value]) => {
					if (value) url.searchParams.append(key, value);
				});
			}

			const res = await fetch(url.toString(), {
				next: { tags: ['medicines'] },
			});

			return await res.json();
			// return { success: true, message: 'Success', data: data.data };
		} catch (error) {
			return {
				success: false,
				message: 'Failed to fetch medicines',
				details: error,
			};
		}
	},

	getMedicineById: async (
		id: string,
	): Promise<IApiResponse<{ data: IMedicine }>> => {
		try {
			const res = await fetch(`${API_URL}/medicines/${id}`, {
				cache: 'no-store',
			});

			const data = await res.json();
			return { success: true, message: 'Success', data };
		} catch (error) {
			return {
				success: false,
				message: 'Failed to fetch medicine',
				details: error,
			};
		}
	},

	createMedicine: async (
		medicineData: Partial<IMedicine>,
	): Promise<IApiResponse<IMedicine>> => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/medicines`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookieStore.toString(),
				},
				body: JSON.stringify(medicineData),
			});

			const data = await res.json();

			if (!data.success) {
				return {
					success: false,
					message: data.message || 'Failed to create medicine',
				};
			}

			console.log('create Mediciene', data);

			return {
				success: true,
				message: 'Medicine created successfully',
				data: data.data,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to create medicine',
				details: error,
			};
		}
	},

	updateMedicine: async (
		id: string,
		medicineData: Partial<IMedicine>,
	): Promise<IApiResponse<IMedicine>> => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/medicines/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookieStore.toString(),
				},
				body: JSON.stringify(medicineData),
			});

			const data = await res.json();

			if (!data.success) {
				return {
					success: false,
					message: data.message || 'Failed to update medicine',
				};
			}

			console.log('update Mediciene', data);

			revalidateTag('medicines', 'max');

			return {
				success: true,
				message: 'Medicine updated successfully',
				data: data.data,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to update medicine',
				details: error,
			};
		}
	},

	deleteMedicine: async (id: string): Promise<IApiResponse<void>> => {
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

			console.log('delete Mediciene', data);

			revalidateTag('medicines', 'max');

			return {
				success: true,
				message: 'Medicine deleted successfully',
			};
		} catch (error) {
			return {
				success: false,
				message: 'Failed to delete medicine',
				details: error,
			};
		}
	},

	getMyMedicines: async (): Promise<IApiResponse<IMedicine[]>> => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${API_URL}/medicines/seller/my-medicines`, {
				headers: {
					Cookie: cookieStore.toString(),
				},
				cache: 'no-store',
			});

			const data = await res.json();

			if (!data.success) {
				return {
					success: false,
					message: data.message || 'Failed to fetch medicines',
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
				message: 'Failed to fetch your medicines',
				details: error,
			};
		}
	},
};
