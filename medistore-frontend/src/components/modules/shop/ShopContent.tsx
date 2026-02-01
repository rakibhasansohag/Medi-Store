'use client';

import { MedicineCard } from '@/components/shared/MedicineCard';
import { Button } from '@/components/ui/button';
import { IMedicine } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShopContentProps {
	medicines: IMedicine[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	onPageChange?: (page: number) => void;
}

export function ShopContent({
	medicines,
	pagination,
	onPageChange,
}: ShopContentProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const navigateToPage = (page: number) => {
		if (onPageChange) {
			onPageChange(page);
			return;
		}
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		router.push(`/shop?${params.toString()}`);
	};

	if (medicines.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='text-center py-16'
			>
				<div className='text-6xl mb-4'>🔍</div>
				<h3 className='text-2xl font-semibold mb-2'>No medicines found</h3>
				<p className='text-muted-foreground mb-6'>
					Try adjusting your filters or search terms
				</p>
				<Button onClick={() => router.push('/shop')}>Clear Filters</Button>
			</motion.div>
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
			<motion.div
				layout
				className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
			>
				<AnimatePresence mode='popLayout'>
					{medicines.map((medicine) => (
						<motion.div
							layout
							key={medicine.id}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.2 }}
						>
							<MedicineCard medicine={medicine} />
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>

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
