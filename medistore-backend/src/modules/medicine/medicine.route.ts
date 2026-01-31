import express, { Router } from 'express';
import { MedicineController } from './medicine.controller';
import CheckRole, { UserRole } from '../../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', MedicineController.getAllMedicines);

router.get(
	'/seller/my-medicines',
	CheckRole(UserRole.SELLER),
	MedicineController.getMyMedicines,
);

router.post(
	'/',
	CheckRole(UserRole.SELLER, UserRole.ADMIN),
	MedicineController.createMedicine,
);

router.patch(
	'/:id/stock',
	CheckRole(UserRole.SELLER, UserRole.ADMIN),
	MedicineController.updateStock,
);

router.patch(
	'/:id',
	CheckRole(UserRole.SELLER, UserRole.ADMIN),
	MedicineController.updateMedicine,
);

router.delete(
	'/:id',
	CheckRole(UserRole.SELLER, UserRole.ADMIN),
	MedicineController.deleteMedicine,
);

router.get('/:id', MedicineController.getMedicineById);

export const medicineRouter: Router = router;
