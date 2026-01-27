import { CategoryForm } from '@/components/modules/admin/CategoryForm';

export default function AddCategoryPage() {
	return (
		<div className='max-w-2xl space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Add Category</h1>
				<p className='text-muted-foreground'>Create a new medicine category</p>
			</div>

			<CategoryForm />
		</div>
	);
}
