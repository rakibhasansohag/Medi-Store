import { env } from '@/env';
import { IApiResponse, ICategory } from '@/types';

const API_URL = env.API_URL;

export const categoryService = {
	getCategories: async (): Promise<IApiResponse<{ data: ICategory[] }>> => {
		try {
			const res = await fetch(`${API_URL}/categories`, {
				next: { tags: ['categories'] },
			});

			return await res.json();
			
		} catch (error) {
			return {
				success: false,
				message: 'Failed to fetch categories',
				details: error,
			};
		}
	},

	getCategoryById: async (
		id: string,
	): Promise<IApiResponse<{ data: ICategory }>> => {
		try {
			const res = await fetch(`${API_URL}/categories/${id}`);
			return await res.json();
		
		} catch (error) {
			return {
				success: false,
				message: 'Failed to fetch category',
				details: error,
			};
		}
	},
};
