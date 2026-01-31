import { prisma } from '../lib/prisma';
import { Category, Medicine, User } from '../../generated/prisma/client';

interface Logger {
	info: (message: string) => void;
	success: (message: string) => void;
	error: (message: string, error?: any) => void;
	warning: (message: string) => void;
}

// Unsplash fallback images for medicines
const getUnsplashImage = (seed: string): string => {
	return `https://source.unsplash.com/400x400/?medicine,pharmacy,pills&sig=${seed}`;
};

// Medicine data mapped to categories
const medicinesDataByCategorySlug: Record<
	string,
	Array<{
		name: string;
		description: string;
		manufacturer: string;
		price: number;
		stock: number;
	}>
> = {
	'pain-relief': [
		{
			name: 'Ibuprofen 200mg',
			description:
				'Effective pain relief and fever reducer. Reduces inflammation and treats mild to moderate pain.',
			manufacturer: 'PharmaCorp',
			price: 9.99,
			stock: 150,
		},
		{
			name: 'Acetaminophen 500mg',
			description:
				'Fast-acting pain reliever and fever reducer. Safe for most adults and children.',
			manufacturer: 'HealthPlus',
			price: 7.99,
			stock: 200,
		},
		{
			name: 'Aspirin 325mg',
			description:
				'Multi-purpose pain reliever, fever reducer, and anti-inflammatory medication.',
			manufacturer: 'MediCare',
			price: 6.99,
			stock: 175,
		},
	],
	'cold-flu': [
		{
			name: 'Cold & Flu Relief',
			description:
				'Complete relief from cold and flu symptoms including congestion, fever, and body aches.',
			manufacturer: 'WellnessCo',
			price: 12.99,
			stock: 120,
		},
		{
			name: 'Cough Syrup',
			description:
				'Soothes cough and throat irritation. Non-drowsy formula for daytime use.',
			manufacturer: 'HealthFirst',
			price: 8.99,
			stock: 100,
		},
		{
			name: 'Decongestant Spray',
			description:
				'Fast-acting nasal decongestant spray. Provides quick relief from stuffy nose.',
			manufacturer: 'BreatheEasy',
			price: 11.99,
			stock: 90,
		},
	],
	'digestive-health': [
		{
			name: 'Probiotic Capsules',
			description:
				'Supports digestive health and immune system. Contains 10 billion CFU per capsule.',
			manufacturer: 'GutHealth',
			price: 24.99,
			stock: 80,
		},
		{
			name: 'Antacid Tablets',
			description:
				'Fast relief from heartburn, acid indigestion, and upset stomach.',
			manufacturer: 'DigestWell',
			price: 9.99,
			stock: 140,
		},
		{
			name: 'Laxative Gentle',
			description:
				'Gentle overnight relief from occasional constipation. Natural ingredients.',
			manufacturer: 'RegularPlus',
			price: 13.99,
			stock: 70,
		},
	],
	'vitamins-supplements': [
		{
			name: 'Multivitamin Daily',
			description:
				'Complete daily multivitamin with essential vitamins and minerals for overall health.',
			manufacturer: 'VitaLife',
			price: 19.99,
			stock: 200,
		},
		{
			name: 'Vitamin D3 5000 IU',
			description:
				'Supports bone health, immune function, and mood. High-potency formula.',
			manufacturer: 'SunnyHealth',
			price: 14.99,
			stock: 150,
		},
		{
			name: 'Omega-3 Fish Oil',
			description:
				'Premium fish oil rich in EPA and DHA. Supports heart and brain health.',
			manufacturer: 'OceanPure',
			price: 22.99,
			stock: 110,
		},
		{
			name: 'Vitamin C 1000mg',
			description:
				'Immune support with powerful antioxidant properties. Time-release formula.',
			manufacturer: 'ImmunoBoost',
			price: 16.99,
			stock: 130,
		},
	],
	'first-aid': [
		{
			name: 'Adhesive Bandages Pack',
			description:
				'Assorted sizes of sterile adhesive bandages. Essential for minor cuts and scrapes.',
			manufacturer: 'SafeCare',
			price: 5.99,
			stock: 250,
		},
		{
			name: 'Antiseptic Solution',
			description:
				'Kills germs and prevents infection. For cleaning wounds and minor cuts.',
			manufacturer: 'CleanCare',
			price: 7.99,
			stock: 100,
		},
		{
			name: 'Gauze Pads Sterile',
			description:
				'Highly absorbent sterile gauze pads. Perfect for wound care and first aid.',
			manufacturer: 'MedSupply',
			price: 8.99,
			stock: 180,
		},
	],
	skincare: [
		{
			name: 'Hydrating Face Cream',
			description:
				'Deep moisturizing cream for dry skin. Contains hyaluronic acid and vitamins.',
			manufacturer: 'DermaGlow',
			price: 29.99,
			stock: 90,
		},
		{
			name: 'Acne Treatment Gel',
			description:
				'Fast-acting acne treatment with benzoyl peroxide. Clears blemishes quickly.',
			manufacturer: 'ClearSkin',
			price: 18.99,
			stock: 75,
		},
		{
			name: 'Anti-Aging Serum',
			description:
				'Advanced anti-aging serum with retinol and peptides. Reduces fine lines.',
			manufacturer: 'YouthRenew',
			price: 44.99,
			stock: 60,
		},
	],
	'allergy-relief': [
		{
			name: 'Antihistamine 10mg',
			description:
				'24-hour allergy relief. Non-drowsy formula for indoor and outdoor allergies.',
			manufacturer: 'AllergyFree',
			price: 15.99,
			stock: 140,
		},
		{
			name: 'Nasal Allergy Spray',
			description:
				'Prescription-strength allergy relief nasal spray. Fast-acting formula.',
			manufacturer: 'BreatheClear',
			price: 19.99,
			stock: 85,
		},
	],
	'heart-health': [
		{
			name: 'CoQ10 100mg',
			description:
				'Supports heart health and cellular energy production. Powerful antioxidant.',
			manufacturer: 'CardioWell',
			price: 26.99,
			stock: 95,
		},
		{
			name: 'Blood Pressure Support',
			description:
				'Natural formula to support healthy blood pressure levels. Contains hawthorn extract.',
			manufacturer: 'HeartStrong',
			price: 32.99,
			stock: 70,
		},
	],
	'diabetes-care': [
		{
			name: 'Blood Glucose Monitor Kit',
			description:
				'Complete glucose monitoring system with test strips and lancets.',
			manufacturer: 'GlucoCheck',
			price: 49.99,
			stock: 50,
		},
		{
			name: 'Diabetic Foot Cream',
			description:
				'Specially formulated for diabetic skin. Provides intense moisturization.',
			manufacturer: 'DiabeticCare',
			price: 16.99,
			stock: 65,
		},
	],
	'eye-care': [
		{
			name: 'Lubricating Eye Drops',
			description: 'Relief for dry, irritated eyes. Preservative-free formula.',
			manufacturer: 'ClearVision',
			price: 12.99,
			stock: 110,
		},
		{
			name: 'Eye Vitamin Complex',
			description:
				'Comprehensive eye health formula with lutein, zeaxanthin, and vitamins.',
			manufacturer: 'VisionPlus',
			price: 28.99,
			stock: 80,
		},
	],
};

export async function seedMedicines(
	logger: Logger,
	categories: Category[],
	sellers: User[],
): Promise<Medicine[]> {
	const medicines: Medicine[] = [];

	try {
		if (categories.length === 0) {
			throw new Error('No categories available for seeding medicines');
		}

		if (sellers.length === 0) {
			throw new Error('No sellers available for seeding medicines');
		}

		logger.info('Creating medicines with images...');

		let medicineCount = 0;

		for (const category of categories) {
			const categoryMedicines =
				medicinesDataByCategorySlug[category.slug] || [];

			if (categoryMedicines.length === 0) {
				logger.warning(
					`  • No medicines defined for category: ${category.name}`,
				);
				continue;
			}

			logger.info(`  Processing category: ${category.name}`);

			for (const medicineData of categoryMedicines) {
				try {
					// Rotate through sellers
					const seller = sellers[medicineCount % sellers.length];

					// Generate unique image for each medicine
					const imageUrl = getUnsplashImage(
						`${category.slug}-${medicineData.name}`,
					);

					const medicine = await prisma.medicine.create({
						data: {
							...medicineData,
							categoryId: category.id,
							sellerId: seller.id,
							imageUrl,
						},
					});

					medicines.push(medicine);
					medicineCount++;
					logger.info(
						`    ✓ Created: ${medicine.name} (${
							seller.businessName || seller.name
						})`,
					);
				} catch (error: any) {
					logger.error(
						`    ✗ Failed to create medicine: ${medicineData.name}`,
						error,
					);
				}
			}
		}

		logger.success(
			`All medicines created: ${medicines.length} across ${categories.length} categories`,
		);
		return medicines;
	} catch (error) {
		logger.error('Failed to seed medicines', error);
		throw error;
	}
}
