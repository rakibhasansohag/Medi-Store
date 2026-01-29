import express, { Router } from 'express';
import { ReviewController } from './review.controller';
import CheckRole, { UserRole } from '../../middleware/auth';

const router = express.Router();

// Public routes
router.get('/top', ReviewController.getTopReviews);
router.get('/medicine/:medicineId', ReviewController.getReviewsByMedicine);

// Customer routes
router.get(
	'/my-reviews',
	CheckRole(UserRole.CUSTOMER),
	ReviewController.getMyReviews,
);

router.post('/', CheckRole(UserRole.CUSTOMER), ReviewController.createReview);

router.patch(
	'/:id',
	CheckRole(UserRole.CUSTOMER),
	ReviewController.updateReview,
);

router.delete(
	'/:id',
	CheckRole(UserRole.CUSTOMER),
	ReviewController.deleteReview,
);

// Admin routes
router.get('/all', CheckRole(UserRole.ADMIN), ReviewController.getAllReviews);

router.delete(
	'/:id/admin',
	CheckRole(UserRole.ADMIN),
	ReviewController.deleteReviewByAdmin,
);

export const reviewRouter: Router = router;
