import express, { Router } from 'express';
import { OrderController } from './order.controller';
import CheckRole, { UserRole } from '../../middleware/auth';

const router = express.Router();

// Customer routes
router.get(
	'/customer/my-orders',
	CheckRole(UserRole.CUSTOMER),
	OrderController.getMyOrders,
);

router.post('/', CheckRole(UserRole.CUSTOMER), OrderController.createOrder);

router.patch(
	'/:id/cancel',
	CheckRole(UserRole.CUSTOMER),
	OrderController.cancelOrder,
);


router.get(
	'/all',
	CheckRole(UserRole.ADMIN, UserRole.SELLER),
	OrderController.getAllOrders,
);

router.patch(
	'/:id/status',
	CheckRole(UserRole.ADMIN, UserRole.SELLER),
	OrderController.updateOrderStatus,
);


router.get('/:id', OrderController.getOrderById);

export const orderRouter: Router = router;
