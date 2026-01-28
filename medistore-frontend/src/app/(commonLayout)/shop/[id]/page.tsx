import { MedicineDetail } from '@/components/modules/shop/MedicineDetail';
import { RelatedMedicines } from '@/components/modules/shop/RelatedMedicines';
import { medicineService } from '@/services/medicine.service';
import { notFound } from 'next/navigation';

interface MedicineDetailPageProps {
	params: Promise<{ id: string }>;
}

export default async function MedicineDetailPage({
	params,
}: MedicineDetailPageProps) {
	const { id } = await params;

	const { data, success } = await medicineService.getMedicineById(id);

	if (!success || !data?.data) {
		notFound();
	}

	const medicine = data.data;

	// Fetch related medicines from same category
	const relatedRes = await medicineService.getMedicines({
		categoryId: medicine.categoryId,
		limit: '4',
	});

	const relatedMedicines =
		relatedRes.data?.data.filter((m) => m.id !== medicine.id) || [];

	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-1'>
				<MedicineDetail medicine={medicine} />
				{relatedMedicines.length > 0 && (
					<RelatedMedicines medicines={relatedMedicines} />
				)}
			</main>
		</div>
	);
}
