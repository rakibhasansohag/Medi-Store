import { reviewService } from '@/services/review.service';
import { ReviewsMarquee } from './ReviewsMarquee';

export async function ReviewsSectionContainer() {
	const reviewsRes = await reviewService.getTopReviews(20);
	const reviews = reviewsRes.data || [];

	if (reviews.length === 0) return null;

	return <ReviewsMarquee reviews={reviews} />;
}
