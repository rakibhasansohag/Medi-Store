import { Button } from '@/components/ui/button';
import { CategoryTable } from '@/components/modules/admin/CategoryTable';
import { categoryService } from '@/services/category.service';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function CategoriesPage() {
	const { data } = await categoryService.getCategories();

	const categories = data?.data || [];

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold'>Categories</h1>
					<p className='text-muted-foreground'>Manage medicine categories</p>
				</div>
				<Button asChild>
					<Link href='/admin-dashboard/categories/add'>
						<Plus className='h-4 w-4 mr-2' />
						Add Category
					</Link>
				</Button>
			</div>

			<CategoryTable categories={categories} />
		</div>
	);
}
