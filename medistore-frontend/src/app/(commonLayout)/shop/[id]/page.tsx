import { MedicineDetail } from '@/components/modules/shop/MedicineDetail';
import { RelatedMedicines } from '@/components/modules/shop/RelatedMedicines';
import { medicineService } from '@/services/medicine.service';
import { reviewService } from '@/services/review.service';
import { userService } from '@/services/user.service';
import { notFound } from 'next/navigation';

interface MedicineDetailPageProps {
	params: Promise<{ id: string }>;
}

export default async function MedicineDetailPage({
	params,
}: MedicineDetailPageProps) {
	const { id } = await params;

	const [medicineRes, reviewsRes, sessionRes] = await Promise.all([
		medicineService.getMedicineById(id),
		reviewService.getReviewsByMedicine(id),
		userService.getSession(),
	]);

	if (!medicineRes.success || !medicineRes.data?.data) {
		notFound();
	}

	const medicine = medicineRes.data.data;
	const reviews = reviewsRes.data || [];
	const canReview =
		!!sessionRes.data?.user && sessionRes.data.user.role === 'CUSTOMER';

	// Fetch related medicines
	const relatedRes = await medicineService.getMedicines({
		categoryId: medicine.categoryId,
		limit: '4',
	});

	const relatedMedicines =
		relatedRes.data?.data.filter((m) => m.id !== medicine.id) || [];

	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-1'>
				<MedicineDetail
					medicine={medicine}
					reviews={reviews}
					canReview={canReview}
				/>
				{relatedMedicines.length > 0 && (
					<RelatedMedicines medicines={relatedMedicines} />
				)}
			</main>
		</div>
	);
}
