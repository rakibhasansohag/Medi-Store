import { Request, Response, NextFunction } from 'express';
import { MedicineService } from './medicine.service';
import {
	ICreateMedicineInput,
	IUpdateMedicineInput,
	IGetMedicinesQuery,
} from '../../types';

const createMedicine = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized access',
			});
		}

		const data: ICreateMedicineInput = req.body;

		const result = await MedicineService.createMedicine(data, req.user.id);

		res.status(201).json({
			success: true,
			message: 'Medicine created successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getAllMedicines = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const query: IGetMedicinesQuery = {
			search: req.query.search as string,
			categoryId: req.query.categoryId as string,
			minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
			maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
			page: req.query.page ? Number(req.query.page) : 1,
			limit: req.query.limit ? Number(req.query.limit) : 10,
			sortBy: (req.query.sortBy as string) || 'createdAt',
			sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
		};

		const result = await MedicineService.getAllMedicines(query);

		res.status(200).json({
			success: true,
			message: 'Medicines retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getMedicineById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		const result = await MedicineService.getMedicineById(id as string);

		if (!result) {
			return res.status(404).json({
				success: false,
				message: 'Medicine not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Medicine retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getMyMedicines = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized access',
			});
		}

		const result = await MedicineService.getMedicinesBySeller(req.user.id);

		res.status(200).json({
			success: true,
			message: 'Your medicines retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const updateMedicine = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized access',
			});
		}

		const { id } = req.params;
		const data: IUpdateMedicineInput = req.body;

		const result = await MedicineService.updateMedicine(
			id as string,
			data,
			req.user.id,
			req.user.role,
		);

		res.status(200).json({
			success: true,
			message: 'Medicine updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const deleteMedicine = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized access',
			});
		}

		const { id } = req.params;

		await MedicineService.deleteMedicine(
			id as string,
			req.user.id,
			req.user.role,
		);

		res.status(200).json({
			success: true,
			message: 'Medicine deleted successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const MedicineController = {
	createMedicine,
	getAllMedicines,
	getMedicineById,
	getMyMedicines,
	updateMedicine,
	deleteMedicine,
};
