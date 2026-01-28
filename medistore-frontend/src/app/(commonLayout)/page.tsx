import { HeroSection } from '@/components/modules/homepage/HeroSection';
import { CategoriesSection } from '@/components/modules/homepage/CategoriesSection';
import { FeaturedMedicines } from '@/components/modules/homepage/FeaturedMedicines';
import { WhyChooseUs } from '@/components/modules/homepage/WhyChooseUs';
import { HowItWorks } from '@/components/modules/homepage/HowItWorks';
import { Testimonials } from '@/components/modules/homepage/Testimonials';
import { Newsletters } from '@/components/modules/homepage/Newsletters';
import { categoryService } from '@/services/category.service';
import { medicineService } from '@/services/medicine.service';

export default async function HomePage() {
	const [categoriesRes, medicinesRes] = await Promise.all([
		categoryService.getCategories(),
		medicineService.getMedicines({ limit: '8' }),
	]);

	const categories = categoriesRes.data?.data || [];
	const medicines = medicinesRes.data?.data || [];

	return (
		<main className='flex flex-col min-h-screen'>
			<section className='flex-1'>
				<HeroSection categories={categories} />
				<CategoriesSection categories={categories} />
				<FeaturedMedicines medicines={medicines} />
				<WhyChooseUs />
				<HowItWorks />
				<Testimonials />
				<Newsletters />
			</section>
		</main>
	);
}
