import { MedicineForm } from '@/components/modules/seller/MedicineForm';
import { categoryService } from '@/services/category.service';

export default async function AddMedicinePage() {
	const { data } = await categoryService.getCategories();
	const categories = data?.data || [];

	return (
		<div className='max-w-4xl space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Add Medicine</h1>
				<p className='text-muted-foreground'>
					Add a new medicine to your inventory
				</p>
			</div>

			<MedicineForm categories={categories} />
		</div>
	);
}
