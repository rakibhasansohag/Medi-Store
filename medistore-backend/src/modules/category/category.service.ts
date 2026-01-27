import paginationSortingHelper from '../../../helpers/paginationSortingHelper';
import { prisma } from '../../lib/prisma';
import {
	ICategory,
	ICreateCategoryInput,
	IUpdateCategoryInput,
	IPaginatedResponse,
	IPaginationOptions,
} from '../../types';

const createCategory = async (
	data: ICreateCategoryInput,
): Promise<ICategory> => {
	const result = await prisma.category.create({
		data: {
			name: data.name,
			slug: data.slug.toLowerCase(),
		},
	});

	return result;
};

const getAllCategories = async (
	options: IPaginationOptions,
): Promise<IPaginatedResponse<ICategory>> => {
	const { page, limit, skip, sortBy, sortOrder } =
		paginationSortingHelper(options);

	const [data, total] = await Promise.all([
		prisma.category.findMany({
			take: limit,
			skip,
			orderBy: { [sortBy]: sortOrder },
		}),
		prisma.category.count(),
	]);

	return {
		data,
		pagination: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
};

const getCategoryById = async (id: string): Promise<ICategory | null> => {
	return await prisma.category.findUnique({
		where: { id },
	});
};

const getCategoryBySlug = async (slug: string): Promise<ICategory | null> => {
	return await prisma.category.findUnique({
		where: { slug },
	});
};

const updateCategory = async (
	id: string,
	data: IUpdateCategoryInput,
): Promise<ICategory> => {
	await prisma.category.findUniqueOrThrow({
		where: { id },
	});

	const updateData: IUpdateCategoryInput = {};

	if (data.name) updateData.name = data.name;
	if (data.slug) updateData.slug = data.slug.toLowerCase();

	return await prisma.category.update({
		where: { id },
		data: updateData,
	});
};

const deleteCategory = async (id: string): Promise<ICategory> => {
	// Check if category has medicines
	const medicineCount = await prisma.medicine.count({
		where: { categoryId: id },
	});

	if (medicineCount > 0) {
		throw new Error(
			`Cannot delete category. It has ${medicineCount} medicines associated with it.`,
		);
	}

	return await prisma.category.delete({
		where: { id },
	});
};

export const CategoryService = {
	createCategory,
	getAllCategories,
	getCategoryById,
	getCategoryBySlug,
	updateCategory,
	deleteCategory,
};
