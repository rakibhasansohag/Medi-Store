import { Button } from '@/components/ui/button';
import { MedicineTable } from '@/components/modules/seller/MedicineTable';
import { medicineService } from '@/services/medicine.service';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function SellerMedicinesPage() {
	const { data } = await medicineService.getMyMedicines();

	const medicines = data || [];

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold'>My Medicines</h1>
					<p className='text-muted-foreground'>
						Manage your medicine inventory
					</p>
				</div>
				<Button asChild>
					<Link href='/dashboard/medicines/add'>
						<Plus className='h-4 w-4 mr-2' />
						Add Medicine
					</Link>
				</Button>
			</div>

			<MedicineTable medicines={medicines} />
		</div>
	);
}
