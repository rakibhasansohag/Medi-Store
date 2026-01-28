import { MedicineCard } from '@/components/shared/MedicineCard';
import { IMedicine } from '@/types';

interface RelatedMedicinesProps {
	medicines: IMedicine[];
}

export function RelatedMedicines({ medicines }: RelatedMedicinesProps) {
	return (
		<section className='py-16 bg-muted/30'>
			<div className='container mx-auto px-4'>
				<h2 className='text-2xl md:text-3xl font-bold mb-8'>
					Related Medicines
				</h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{medicines.map((medicine) => (
						<MedicineCard key={medicine.id} medicine={medicine} />
					))}
				</div>
			</div>
		</section>
	);
}
