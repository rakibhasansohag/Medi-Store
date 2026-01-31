import { prisma } from '../lib/prisma';
import { Category } from '../../generated/prisma/client';

interface Logger {
	info: (message: string) => void;
	success: (message: string) => void;
	error: (message: string, error?: any) => void;
}

const categoriesData = [
	{ name: 'Pain Relief', slug: 'pain-relief' },
	{ name: 'Cold & Flu', slug: 'cold-flu' },
	{ name: 'Digestive Health', slug: 'digestive-health' },
	{ name: 'Vitamins & Supplements', slug: 'vitamins-supplements' },
	{ name: 'First Aid', slug: 'first-aid' },
	{ name: 'Skincare', slug: 'skincare' },
	{ name: 'Allergy Relief', slug: 'allergy-relief' },
	{ name: 'Heart Health', slug: 'heart-health' },
	{ name: 'Diabetes Care', slug: 'diabetes-care' },
	{ name: 'Eye Care', slug: 'eye-care' },
	{ name: "Women's Health", slug: 'womens-health' },
	{ name: "Men's Health", slug: 'mens-health' },
	{ name: 'Baby & Child Care', slug: 'baby-child-care' },
	{ name: 'Antibiotics', slug: 'antibiotics' },
	{ name: 'Mental Health', slug: 'mental-health' },
];

export async function seedCategories(logger: Logger): Promise<Category[]> {
	const categories: Category[] = [];

	try {
		logger.info(`Creating ${categoriesData.length} categories...`);

		for (const categoryData of categoriesData) {
			try {
				const category = await prisma.category.create({
					data: categoryData,
				});
				categories.push(category);
				logger.info(`  ✓ Created category: ${category.name}`);
			} catch (error: any) {
				if (error.code === 'P2002') {
					logger.info(`  • Category already exists: ${categoryData.name}`);
					const existing = await prisma.category.findUnique({
						where: { slug: categoryData.slug },
					});
					if (existing) categories.push(existing);
				} else {
					throw error;
				}
			}
		}

		logger.success(`All categories created: ${categories.length} total`);
		return categories;
	} catch (error) {
		logger.error('Failed to seed categories', error);
		throw error;
	}
}
