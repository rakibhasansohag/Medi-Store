import { auth } from '../lib/auth';
import { prisma } from '../lib/prisma';
import { User } from '../../generated/prisma/client';

interface Logger {
	info: (message: string) => void;
	success: (message: string) => void;
	error: (message: string, error?: any) => void;
	warning: (message: string) => void;
}

const customersData = [
	{
		name: 'John Doe',
		email: 'customer1@email.com',
		phone: '+1234567891',
	},
	{
		name: 'Jane Smith',
		email: 'customer2@email.com',
		phone: '+1234567892',
	},
	{
		name: 'Michael Johnson',
		email: 'customer3@email.com',
		phone: '+1234567893',
	},
	{
		name: 'Emily Brown',
		email: 'customer4@email.com',
		phone: '+1234567894',
	},
	{
		name: 'David Wilson',
		email: 'customer5@email.com',
		phone: '+1234567895',
	},
];

const sellersData = [
	{
		name: 'MediPharm Inc',
		email: 'seller1@email.com',
		phone: '+1234567896',
		businessName: 'MediPharm Inc',
		businessAddress: '123 Pharma Street, Medical City, MC 12345',
		bio: 'Leading pharmaceutical supplier with 20+ years of experience',
	},
	{
		name: 'HealthCare Supplies',
		email: 'seller2@email.com',
		phone: '+1234567897',
		businessName: 'HealthCare Supplies Co.',
		businessAddress: '456 Health Avenue, Wellness Town, WT 67890',
		bio: 'Your trusted source for quality healthcare products',
	},
	{
		name: 'Global Medicines',
		email: 'seller3@email.com',
		phone: '+1234567898',
		businessName: 'Global Medicines Ltd',
		businessAddress: '789 Medical Boulevard, Pharma City, PC 11223',
		bio: 'International supplier of certified medicines and supplements',
	},
	{
		name: 'Wellness Pharmacy',
		email: 'seller4@email.com',
		phone: '+1234567899',
		businessName: 'Wellness Pharmacy Chain',
		businessAddress: '321 Care Street, Health District, HD 44556',
		bio: 'Community-focused pharmacy serving you since 1995',
	},
];

const defaultPassword = '123456789';

export async function seedUsers(logger: Logger): Promise<{
	customers: User[];
	sellers: User[];
}> {
	const customers: User[] = [];
	const sellers: User[] = [];

	try {
		// Seed Customers
		logger.info(`Creating ${customersData.length} customers...`);
		for (const customerData of customersData) {
			try {
				const existingUser = await prisma.user.findUnique({
					where: { email: customerData.email },
				});

				if (existingUser) {
					logger.warning(`  • Customer already exists: ${customerData.email}`);
					customers.push(existingUser);
					continue;
				}

				const newUser = await auth.api.signUpEmail({
					body: {
						email: customerData.email,
						password: defaultPassword,
						name: customerData.name,
					},
				});

				if (newUser) {
					const updatedUser = await prisma.user.update({
						where: { email: customerData.email },
						data: {
							role: 'CUSTOMER',
							emailVerified: true,
							phone: customerData.phone,
							status: 'ACTIVE',
						},
					});
					customers.push(updatedUser);
					logger.info(`  ✓ Created customer: ${updatedUser.name}`);
				}
			} catch (error: any) {
				logger.error(
					`  ✗ Failed to create customer: ${customerData.email}`,
					error,
				);
			}
		}

		// Seed Sellers
		logger.info(`Creating ${sellersData.length} sellers...`);
		for (const sellerData of sellersData) {
			try {
				const existingUser = await prisma.user.findUnique({
					where: { email: sellerData.email },
				});

				if (existingUser) {
					logger.warning(`  • Seller already exists: ${sellerData.email}`);
					sellers.push(existingUser);
					continue;
				}

				const newUser = await auth.api.signUpEmail({
					body: {
						email: sellerData.email,
						password: defaultPassword,
						name: sellerData.name,
					},
				});

				if (newUser) {
					const updatedUser = await prisma.user.update({
						where: { email: sellerData.email },
						data: {
							role: 'SELLER',
							emailVerified: true,
							phone: sellerData.phone,
							status: 'ACTIVE',
							businessName: sellerData.businessName,
							businessAddress: sellerData.businessAddress,
							bio: sellerData.bio,
							sellerRequestStatus: 'APPROVED',
						},
					});
					sellers.push(updatedUser);
					logger.info(`  ✓ Created seller: ${updatedUser.businessName}`);
				}
			} catch (error: any) {
				logger.error(`  ✗ Failed to create seller: ${sellerData.email}`, error);
			}
		}

		logger.success(
			`Users created: ${customers.length} customers, ${sellers.length} sellers`,
		);
		return { customers, sellers };
	} catch (error) {
		logger.error('Failed to seed users', error);
		throw error;
	}
}
