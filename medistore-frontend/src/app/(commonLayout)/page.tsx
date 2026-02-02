import { HeroSection } from '@/components/modules/homepage/HeroSection';
import { CategoriesSection } from '@/components/modules/homepage/CategoriesSection';
import { FeaturedMedicines } from '@/components/modules/homepage/FeaturedMedicines';
import { HowItWorks } from '@/components/modules/homepage/HowItWorks';
import { ReviewsSectionContainer } from '@/components/modules/homepage/ReviewsSectionContainer';
import { ReviewsSkeleton } from '@/components/modules/homepage/ReviewsSkeleton';
import { categoryService } from '@/services/category.service';
import { medicineService } from '@/services/medicine.service';
import { Newsletters } from '@/components/modules/homepage/Newsletter';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const WhyChooseUs = dynamic(
	() =>
		import('@/components/modules/homepage/WhyChooseUs').then(
			(mod) => mod.WhyChooseUs,
		),
	{
		loading: () => <div className='h-96 bg-muted/30 animate-pulse' />,
	},
);

export default async function HomePage() {
	const [categoriesRes, medicinesRes] = await Promise.all([
		categoryService.getCategories(),
		medicineService.getMedicines({ limit: '8' }),
	]);

	const categories = categoriesRes.data?.data || [];
	const medicines = medicinesRes.data?.data || [];

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Pharmacy',
		name: 'MediStore',
		image: 'https://medistore.com/logo.png',
		description: 'Your trusted online pharmacy for quality medicines.',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '123 Health St',
			addressLocality: 'MediCity',
			addressRegion: 'CA',
			postalCode: '90210',
			addressCountry: 'US',
		},
		openingHours: 'Mo-Su 00:00-23:59',
		sameAs: [
			'https://www.facebook.com/rakibhasansohag',
			'https://twitter.com/rakibhasansohag',
		],
	};

	return (
		<div className='flex flex-col min-h-screen'>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<main className='flex-1'>
				<HeroSection />
				<CategoriesSection categories={categories} />
				<FeaturedMedicines medicines={medicines} />
				<WhyChooseUs />
				<HowItWorks />
				<Suspense fallback={<ReviewsSkeleton />}>
					<ReviewsSectionContainer />
				</Suspense>
				<Newsletters />
			</main>
		</div>
	);
}
