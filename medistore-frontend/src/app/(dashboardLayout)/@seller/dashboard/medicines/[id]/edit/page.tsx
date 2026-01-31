import { EditMedicineForm } from '@/components/modules/seller/EditMedicineForm';
import { categoryService } from '@/services/category.service';
import { medicineService } from '@/services/medicine.service';
import { notFound } from 'next/navigation';

interface EditMedicinePageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function EditMedicinePage({
	params,
}: EditMedicinePageProps) {
	const { id } = await params;

	// Fetch medicine and categories in parallel
	const [medicineRes, categoriesRes] = await Promise.all([
		medicineService.getMedicineById(id),
		categoryService.getCategories(),
	]);

	const medicine = medicineRes.data?.data;
	const categories = categoriesRes.data?.data || [];

	// If medicine not found, show 404
	if (!medicine) {
		notFound();
	}

	return (
		<div className='max-w-4xl space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Edit Medicine</h1>
				<p className='text-muted-foreground'>
					Update medicine information and inventory
				</p>
			</div>

			<EditMedicineForm medicine={medicine} categories={categories} />
		</div>
	);
}
