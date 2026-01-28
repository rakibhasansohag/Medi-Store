import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';
import { ICreateOrderInput, ORDERSTATUS } from '../../types';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized access',
			});
		}

		const data: ICreateOrderInput = req.body;

		const result = await OrderService.createOrder(data, req.user.id);

		res.status(201).json({
			success: true,
			message: 'Order created successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getOrderById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		const result = await OrderService.getOrderById(id as string);

		if (!result) {
			return res.status(404).json({
				success: false,
				message: 'Order not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Order retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized access',
			});
		}

		const result = await OrderService.getMyOrders(req.user.id);

		res.status(200).json({
			success: true,
			message: 'Orders retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getAllOrders = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await OrderService.getAllOrders();

		res.status(200).json({
			success: true,
			message: 'Orders retrieved successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const updateOrderStatus = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { status } = req.body as { status: ORDERSTATUS };

		const result = await OrderService.updateOrderStatus(id as string, status);

		res.status(200).json({
			success: true,
			message: 'Order status updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized access',
			});
		}

		const { id } = req.params;

		const result = await OrderService.cancelOrder(id as string, req.user.id);

		res.status(200).json({
			success: true,
			message: 'Order cancelled successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const OrderController = {
	createOrder,
	getOrderById,
	getMyOrders,
	getAllOrders,
	updateOrderStatus,
	cancelOrder,
};
