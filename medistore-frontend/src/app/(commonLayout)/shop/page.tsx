export const dynamic = 'force-dynamic';

import { ShopClientContainer } from '@/components/modules/shop/ShopClientContainer';
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
		<ShopClientContainer
			initialMedicines={medicines}
			initialPagination={pagination}
			categories={categories}
		/>
	);
}
