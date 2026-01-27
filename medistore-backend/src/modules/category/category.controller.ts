import { Request, Response, NextFunction } from 'express';
import { CategoryService } from './category.service';
import { ICreateCategoryInput, IUpdateCategoryInput } from '../../types';

const createCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data: ICreateCategoryInput = req.body;

		const result = await CategoryService.createCategory(data);

		res.status(201).json({
			success: true,
			message: 'Category created successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getAllCategories = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await CategoryService.getAllCategories(req.query);

		res.status(200).json({
			success: true,
			message: 'Categories retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getCategoryById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		const result = await CategoryService.getCategoryById(id as string);

		if (!result) {
			return res.status(404).json({
				success: false,
				message: 'Category not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Category retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const updateCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const data: IUpdateCategoryInput = req.body;

		const result = await CategoryService.updateCategory(id as string, data);

		res.status(200).json({
			success: true,
			message: 'Category updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const deleteCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		await CategoryService.deleteCategory(id as string);

		res.status(200).json({
			success: true,
			message: 'Category deleted successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const CategoryController = {
	createCategory,
	getAllCategories,
	getCategoryById,
	updateCategory,
	deleteCategory,
};
