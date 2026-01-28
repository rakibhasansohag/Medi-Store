import { Button } from '@/components/ui/button';
import { MedicineCard } from '@/components/shared/MedicineCard';
import { IMedicine } from '@/types';
import Link from 'next/link';

interface FeaturedMedicinesProps {
	medicines: IMedicine[];
}

export function FeaturedMedicines({ medicines }: FeaturedMedicinesProps) {
	return (
		<section className='py-16'>
			<div className='container mx-auto px-4'>
				<div className='flex items-center justify-between mb-12'>
					<div>
						<h2 className='text-3xl md:text-4xl font-bold mb-2'>
							Featured Medicines
						</h2>
						<p className='text-muted-foreground'>
							Top-rated and most popular medicines
						</p>
					</div>
					<Button variant='outline' asChild>
						<Link href='/shop'>View All</Link>
					</Button>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{medicines.map((medicine) => (
						<MedicineCard key={medicine.id} medicine={medicine} />
					))}
				</div>
			</div>
		</section>
	);
}
