import express, { Router } from 'express';
import { OrderController } from './order.controller';
import CheckRole, { UserRole } from '../../middleware/auth';

const router = express.Router();

// Customer routes
router.get(
	'/my-orders',
	CheckRole(UserRole.CUSTOMER, UserRole.SELLER),
	OrderController.getMyOrders,
);

router.post('/', CheckRole(UserRole.CUSTOMER), OrderController.createOrder);

router.patch(
	'/:id/cancel',
	CheckRole(UserRole.CUSTOMER),
	OrderController.cancelOrder,
);

// Admin/Seller routes
router.get(
	'/',
	CheckRole(UserRole.ADMIN, UserRole.SELLER),
	OrderController.getAllOrders,
);

router.get('/:id', OrderController.getOrderById);

router.patch(
	'/:id/status',
	CheckRole(UserRole.ADMIN, UserRole.SELLER),
	OrderController.updateOrderStatus,
);

export const orderRouter: Router = router;
