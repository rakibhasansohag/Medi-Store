'use server';

import { revalidateTag, updateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { env } from '@/env';
import { IApiResponse, ICategory } from '@/types';

const API_URL = env.API_URL;

export async function createCategory(formData: {
	name: string;
	slug: string;
}): Promise<IApiResponse<ICategory>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/categories`, {
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
				message: data.message || 'Failed to create category',
			};
		}

		updateTag('categories');

		return {
			success: true,
			message: 'Category created successfully',
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

export async function updateCategory(
	id: string,
	formData: { name?: string; slug?: string },
): Promise<IApiResponse<ICategory>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/categories/${id}`, {
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
				message: data.message || 'Failed to update category',
			};
		}

		updateTag('categories');

		return {
			success: true,
			message: 'Category updated successfully',
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

export async function deleteCategory(id: string): Promise<IApiResponse<void>> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${API_URL}/categories/${id}`, {
			method: 'DELETE',
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		const data = await res.json();

		if (!data.success) {
			return {
				success: false,
				message: data.message || 'Failed to delete category',
			};
		}

		revalidateTag('categories', 'max');

		return {
			success: true,
			message: 'Category deleted successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: 'Something went wrong',
			details: error,
		};
	}
}
