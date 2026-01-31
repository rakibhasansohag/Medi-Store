export const dynamic = 'force-dynamic';

import { ShopFilters } from '@/components/modules/shop/ShopFilters';
import { ShopContent } from '@/components/modules/shop/ShopContent';
import { medicineService } from '@/services/medicine.service';
import { categoryService } from '@/services/category.service';

interface ShopPageProps {
	searchParams: Promise<{
		search?: string;
		categoryId?: string;
		minPrice?: string;
		maxPrice?: string;
		page?: string;
		sortBy?: string;
		sortOrder?: 'asc' | 'desc';
	}>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
	const params = await searchParams;

	const [medicinesRes, categoriesRes] = await Promise.all([
		medicineService.getMedicines({
			search: params.search,
			categoryId: params.categoryId,
			minPrice: params.minPrice,
			maxPrice: params.maxPrice,
			page: params.page || '1',
			limit: '12',
			sortBy: params.sortBy || 'createdAt',
			sortOrder: params.sortOrder || 'desc',
		}),
		categoryService.getCategories(),
	]);

	const medicines = medicinesRes.data?.data || [];
	const pagination = medicinesRes.data?.pagination || {
		total: 0,
		page: 1,
		limit: 12,
		totalPages: 1,
	};
	const categories = categoriesRes.data?.data || [];

	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-1 bg-muted/30'>
				<div className='container mx-auto px-4 py-8'>
					{/* Header */}
					<div className='mb-8'>
						<h1 className='text-3xl md:text-4xl font-bold mb-2'>
							Shop Medicines
						</h1>
						<p className='text-muted-foreground'>
							Browse our wide range of quality medicines
						</p>
					</div>

					{/* Layout */}
					<div className='grid lg:grid-cols-[280px_1fr] gap-8'>
						{/* Filters Sidebar */}
						<ShopFilters categories={categories} />

						{/* Products Grid */}
						<ShopContent medicines={medicines} pagination={pagination} />
					</div>
				</div>
			</main>
		</div>
	);
}
