import express, { Router } from 'express';
import { CategoryController } from './category.controller';
import CheckRole, { UserRole } from '../../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);

// Admin only routes
router.post('/', CheckRole(UserRole.ADMIN), CategoryController.createCategory);

router.patch(
	'/:id',
	CheckRole(UserRole.ADMIN),
	CategoryController.updateCategory,
);

router.delete(
	'/:id',
	CheckRole(UserRole.ADMIN),
	CategoryController.deleteCategory,
);

export const categoryRouter: Router = router;
