import express, { Router } from 'express';
import { UserController } from './user.controller';
import CheckRole, { UserRole } from '../../middleware/auth';

const router = express.Router();

// Authenticated user routes
router.get(
	'/profile',
	CheckRole(UserRole.CUSTOMER, UserRole.SELLER, UserRole.ADMIN),
	UserController.getProfile,
);

router.patch(
	'/profile',
	CheckRole(UserRole.CUSTOMER, UserRole.SELLER, UserRole.ADMIN),
	UserController.updateProfile,
);

router.post(
	'/request-seller',
	CheckRole(UserRole.CUSTOMER),
	UserController.requestSellerRole,
);

// Admin routes
router.get(
	'/seller-requests',
	CheckRole(UserRole.ADMIN),
	UserController.getPendingSellerRequests,
);

router.patch(
	'/seller-requests/:userId/approve',
	CheckRole(UserRole.ADMIN),
	UserController.approveSellerRequest,
);

router.patch(
	'/seller-requests/:userId/reject',
	CheckRole(UserRole.ADMIN),
	UserController.rejectSellerRequest,
);

router.get('/all', CheckRole(UserRole.ADMIN), UserController.getAllUsers);

router.get('/:userId', CheckRole(UserRole.ADMIN), UserController.getUserById);

router.patch(
	'/:userId/status',
	CheckRole(UserRole.ADMIN),
	UserController.updateUserStatus,
);

export const userRouter: Router = router;
