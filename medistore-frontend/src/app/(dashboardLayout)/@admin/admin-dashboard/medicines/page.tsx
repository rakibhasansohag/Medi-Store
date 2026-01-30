import { AdminMedicineManagement } from '@/components/modules/admin/AdminMedicineManagement';
import { medicineService } from '@/services/medicine.service';

export default async function AdminMedicinesPage() {
	const { data } = await medicineService.getMedicines({ limit: '100' });

	console.log('medicines', data);
	const medicines = data?.data || [];

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Medicines Management</h1>
				<p className='text-muted-foreground'>
					View and manage all medicines across the platform
				</p>
			</div>

			<AdminMedicineManagement medicines={medicines} />
		</div>
	);
}
