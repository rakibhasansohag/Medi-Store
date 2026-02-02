import { env } from '@/env';
import {
	IApiResponse,
	IMedicineWithSeller,
	IPaginatedResponse,
} from '@/types';

const API_URL = env.NEXT_PUBLIC_BACKEND_URL;

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

export const medicineClientService = {
	getMedicines: async (
		params?: IGetMedicinesParams,
	): Promise<IApiResponse<IPaginatedResponse<IMedicineWithSeller>>> => {
		try {
			
			const baseUrl = API_URL.toString().replace(/\/$/, '');
			const url = new URL(`${baseUrl}/medicines`);

			if (params) {
				Object.entries(params).forEach(([key, value]) => {
					if (value) url.searchParams.append(key, value);
				});
			}

			const res = await fetch(url.toString(), {
				// Cache control can be added here if needed, but we handle caching in the component
			});

			return await res.json();
		} catch (error) {
			console.error('Failed to fetch medicines client-side:', error);
			return {
				success: false,
				message: 'Failed to fetch medicines',
				data: {
					data: [],
					meta: { total: 0, page: 1, limit: 12, totalPages: 0 },
				} as unknown as IPaginatedResponse<IMedicineWithSeller>,
			};
		}
	},
};
