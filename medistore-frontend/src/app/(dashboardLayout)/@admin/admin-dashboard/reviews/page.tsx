import { AdminReviewsTable } from '@/components/modules/admin/AdminReviewsTable';
import { reviewService } from '@/services/review.service';

export default async function AdminReviewsPage() {
	const { data } = await reviewService.getAllReviews();

	const reviews = data || [];

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Reviews Management</h1>
				<p className='text-muted-foreground'>
					Monitor and manage all customer reviews
				</p>
			</div>

			<AdminReviewsTable reviews={reviews} />
		</div>
	);
}
