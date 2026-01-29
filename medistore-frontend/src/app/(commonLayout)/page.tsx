import { HeroSection } from '@/components/modules/homepage/HeroSection';
import { CategoriesSection } from '@/components/modules/homepage/CategoriesSection';
import { FeaturedMedicines } from '@/components/modules/homepage/FeaturedMedicines';
import { WhyChooseUs } from '@/components/modules/homepage/WhyChooseUs';
import { HowItWorks } from '@/components/modules/homepage/HowItWorks';
import { ReviewsMarquee } from '@/components/modules/homepage/ReviewsMarquee';
import { categoryService } from '@/services/category.service';
import { medicineService } from '@/services/medicine.service';
import { reviewService } from '@/services/review.service';
import { Newsletters } from '@/components/modules/homepage/Newsletter';

export default async function HomePage() {
	const [categoriesRes, medicinesRes, reviewsRes] = await Promise.all([
		categoryService.getCategories(),
		medicineService.getMedicines({ limit: '8' }),
		reviewService.getTopReviews(20),
	]);

	const categories = categoriesRes.data?.data || [];
	const medicines = medicinesRes.data?.data || [];
	const reviews = reviewsRes.data || [];

	console.log(reviewsRes);

	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-1'>
				<HeroSection categories={categories} />
				<CategoriesSection categories={categories} />
				<FeaturedMedicines medicines={medicines} />
				<WhyChooseUs />
				<HowItWorks />
				{reviews.length > 0 && <ReviewsMarquee reviews={reviews} />}
				<Newsletters />
			</main>
		</div>
	);
}
