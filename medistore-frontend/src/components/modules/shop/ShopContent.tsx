'use client';

import { MedicineCard } from '@/components/shared/MedicineCard';
import { Button } from '@/components/ui/button';
import { IMedicine } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShopContentProps {
	medicines: IMedicine[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export function ShopContent({ medicines, pagination }: ShopContentProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const navigateToPage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		router.push(`/shop?${params.toString()}`);
	};

	if (medicines.length === 0) {
		return (
			<div className='text-center py-16'>
				<div className='text-6xl mb-4'>🔍</div>
				<h3 className='text-2xl font-semibold mb-2'>No medicines found</h3>
				<p className='text-muted-foreground mb-6'>
					Try adjusting your filters or search terms
				</p>
				<Button onClick={() => router.push('/shop')}>Clear Filters</Button>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			{/* Results Info */}
			<div className='flex items-center justify-between'>
				<p className='text-sm text-muted-foreground'>
					Showing {(pagination.page - 1) * pagination.limit + 1} -{' '}
					{Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
					{pagination.total} results
				</p>
			</div>

			{/* Products Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{medicines.map((medicine) => (
					<MedicineCard key={medicine.id} medicine={medicine} />
				))}
			</div>

			{/* Pagination */}
			{pagination.totalPages > 1 && (
				<div className='flex items-center justify-center gap-2 pt-8'>
					<Button
						variant='outline'
						size='icon'
						onClick={() => navigateToPage(pagination.page - 1)}
						disabled={pagination.page === 1}
					>
						<ChevronLeft className='h-4 w-4' />
					</Button>

					{Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
						(page) => (
							<Button
								key={page}
								variant={page === pagination.page ? 'default' : 'outline'}
								onClick={() => navigateToPage(page)}
							>
								{page}
							</Button>
						),
					)}

					<Button
						variant='outline'
						size='icon'
						onClick={() => navigateToPage(pagination.page + 1)}
						disabled={pagination.page === pagination.totalPages}
					>
						<ChevronRight className='h-4 w-4' />
					</Button>
				</div>
			)}
		</div>
	);
}
