import { prisma } from '../lib/prisma';
import { Medicine, Review, User } from '../../generated/prisma/client';

interface Logger {
	info: (message: string) => void;
	success: (message: string) => void;
	error: (message: string, error?: any) => void;
}

const reviewComments = {
	5: [
		'Excellent product! Exactly what I needed.',
		'Amazing quality and fast delivery. Highly recommend!',
		'Works perfectly. Will definitely buy again.',
		'Outstanding! Exceeded my expectations.',
		'Best product in its category. Very satisfied!',
		'Incredible results! Worth every penny.',
	],
	4: [
		'Very good product, just as described.',
		'Great quality, minor packaging issue.',
		'Works well, slightly pricey but worth it.',
		'Good product, fast shipping.',
		'Satisfied with my purchase. Recommended.',
		'Solid product, does what it promises.',
	],
	3: [
		'Product is okay, nothing special.',
		'Average quality, does the job.',
		'It works but expected better.',
		'Decent product for the price.',
		'Neither great nor terrible, just okay.',
	],
	2: [
		'Not what I expected. Disappointed.',
		'Quality could be better.',
		'Did not work as well as advertised.',
		'Below average, not worth the price.',
	],
	1: [
		'Very disappointed with this product.',
		'Did not work for me at all.',
		'Poor quality, would not recommend.',
		'Waste of money. Very unsatisfied.',
	],
};

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomRating(): number {
	// Weighted towards higher ratings (more realistic)
	const random = Math.random();
	if (random < 0.5) return 5; // 50% chance
	if (random < 0.75) return 4; // 25% chance
	if (random < 0.9) return 3; // 15% chance
	if (random < 0.97) return 2; // 7% chance
	return 1; // 3% chance
}

function getRandomComment(rating: number): string {
	const comments = reviewComments[rating as keyof typeof reviewComments];
	return comments[Math.floor(Math.random() * comments.length)];
}

export async function seedReviews(
	logger: Logger,
	customers: User[],
	medicines: Medicine[],
): Promise<Review[]> {
	const reviews: Review[] = [];

	try {
		if (customers.length === 0) {
			throw new Error('No customers available for seeding reviews');
		}

		if (medicines.length === 0) {
			throw new Error('No medicines available for seeding reviews');
		}

		// Each medicine gets 0-5 reviews
		logger.info(`Creating reviews for ${medicines.length} medicines...`);

		for (const medicine of medicines) {
			const reviewCount = getRandomInt(0, 5);

			if (reviewCount === 0) {
				continue;
			}

			// Select random customers for reviews (no duplicates per medicine)
			const reviewers = [...customers]
				.sort(() => 0.5 - Math.random())
				.slice(0, Math.min(reviewCount, customers.length));

			for (const customer of reviewers) {
				try {
					const rating = getRandomRating();
					const comment = getRandomComment(rating);

					const review = await prisma.review.create({
						data: {
							rating,
							comment,
							customerId: customer.id,
							medicineId: medicine.id,
						},
					});

					reviews.push(review);
				} catch (error: any) {
					// Skip if duplicate review (same customer + medicine)
					if (error.code !== 'P2002') {
						logger.error(
							`  ✗ Failed to create review for ${medicine.name}`,
							error,
						);
					}
				}
			}

			if (reviewCount > 0) {
				const avgRating = (
					reviews
						.filter((r) => r.medicineId === medicine.id)
						.reduce((sum, r) => sum + r.rating, 0) / reviewCount
				).toFixed(1);
				logger.info(
					`  ✓ ${medicine.name}: ${reviewCount} reviews (avg: ${avgRating}★)`,
				);
			}
		}

		logger.success(`Reviews created: ${reviews.length} total`);

		// Log rating distribution
		const ratingCounts = reviews.reduce((acc, review) => {
			acc[review.rating] = (acc[review.rating] || 0) + 1;
			return acc;
		}, {} as Record<number, number>);

		logger.info('Rating distribution:');
		for (let i = 5; i >= 1; i--) {
			const count = ratingCounts[i] || 0;
			const percentage = ((count / reviews.length) * 100).toFixed(1);
			logger.info(`  • ${i}★: ${count} (${percentage}%)`);
		}

		const avgRating = (
			reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
		).toFixed(2);
		logger.info(`  Overall average: ${avgRating}★`);

		return reviews;
	} catch (error) {
		logger.error('Failed to seed reviews', error);
		throw error;
	}
}
