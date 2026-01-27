import { prisma } from '../../lib/prisma';
import {
	IMedicine,
	ICreateMedicineInput,
	IUpdateMedicineInput,
	IGetMedicinesQuery,
	IPaginatedResponse,
	UserRole,
} from '../../types';
import paginationSortingHelper from '../../helpers/paginationSortingHelper';

const createMedicine = async (
	data: ICreateMedicineInput,
	sellerId: string,
): Promise<IMedicine> => {
	// Verify category exists
	await prisma.category.findUniqueOrThrow({
		where: { id: data.categoryId },
	});

	const result = await prisma.medicine.create({
		data: {
			...data,
			sellerId,
		},
		include: {
			category: true,
		},
	});

	return result;
};

const getAllMedicines = async (
	query: IGetMedicinesQuery,
): Promise<IPaginatedResponse<IMedicine>> => {
	const {
		search,
		categoryId,
		minPrice,
		maxPrice,
		page = 1,
		limit = 10,
		sortBy = 'createdAt',
		sortOrder = 'desc',
	} = query;

	const { skip } = paginationSortingHelper({ page, limit });

	const where: Record<string, unknown> = {};

	// Search in name, description, manufacturer
	if (search) {
		where.OR = [
			{ name: { contains: search, mode: 'insensitive' } },
			{ description: { contains: search, mode: 'insensitive' } },
			{ manufacturer: { contains: search, mode: 'insensitive' } },
		];
	}

	if (categoryId) {
		where.categoryId = categoryId;
	}

	if (minPrice !== undefined || maxPrice !== undefined) {
		where.price = {};
		if (minPrice !== undefined) {
			(where.price as Record<string, unknown>).gte = Number(minPrice);
		}
		if (maxPrice !== undefined) {
			(where.price as Record<string, unknown>).lte = Number(maxPrice);
		}
	}

	const [data, total] = await Promise.all([
		prisma.medicine.findMany({
			where,
			take: Number(limit),
			skip,
			orderBy: { [sortBy]: sortOrder },
			include: {
				category: {
					select: {
						id: true,
						name: true,
						slug: true,
					},
				},
			},
		}),
		prisma.medicine.count({ where }),
	]);

	return {
		data,
		pagination: {
			total,
			page: Number(page),
			limit: Number(limit),
			totalPages: Math.ceil(total / Number(limit)),
		},
	};
};

const getMedicineById = async (
	id: string,
): Promise<IMedicine | null | undefined> => {
	return await prisma.medicine.findUnique({
		where: { id },
		include: {
			category: true,
			reviews: {
				orderBy: { createdAt: 'desc' },
				take: 10,
			},
		},
	});
};

const getMedicinesBySeller = async (sellerId: string): Promise<IMedicine[]> => {
	return await prisma.medicine.findMany({
		where: { sellerId },
		include: {
			category: true,
		},
		orderBy: { createdAt: 'desc' },
	});
};

const updateMedicine = async (
	id: string,
	data: IUpdateMedicineInput,
	userId: string,
	userRole: UserRole,
): Promise<IMedicine> => {
	const medicine = await prisma.medicine.findUniqueOrThrow({
		where: { id },
		select: { id: true, sellerId: true },
	});

	// Only seller who owns it or admin can update
	if (userRole !== UserRole.ADMIN && medicine.sellerId !== userId) {
		throw new Error('Unauthorized: You can only update your own medicines');
	}

	// Verify category if being updated
	if (data.categoryId) {
		await prisma.category.findUniqueOrThrow({
			where: { id: data.categoryId },
		});
	}

	return await prisma.medicine.update({
		where: { id },
		data,
		include: {
			category: true,
		},
	});
};

const deleteMedicine = async (
	id: string,
	userId: string,
	userRole: UserRole,
): Promise<void> => {
	const medicine = await prisma.medicine.findUniqueOrThrow({
		where: { id },
		select: { id: true, sellerId: true },
	});

	// Only seller who owns it or admin can delete
	if (userRole !== UserRole.ADMIN && medicine.sellerId !== userId) {
		throw new Error('Unauthorized: You can only delete your own medicines');
	}

	await prisma.medicine.delete({
		where: { id },
	});
};

export const MedicineService = {
	createMedicine,
	getAllMedicines,
	getMedicineById,
	getMedicinesBySeller,
	updateMedicine,
	deleteMedicine,
};
