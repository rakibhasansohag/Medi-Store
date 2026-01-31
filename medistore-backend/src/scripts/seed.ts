import { seedAdmin } from './seedAdmin';
import { seedCategories } from './seedCategories';
import { seedUsers } from './seedUsers';
import { seedMedicines } from './seedMedicines';
import { seedOrders } from './seedOrders';
import { seedReviews } from './seedReviews';
import { prisma } from '../lib/prisma';

// Color codes for console output
const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	red: '\x1b[31m',
	blue: '\x1b[34m',
	cyan: '\x1b[36m',
};

// Logging utilities
const logger = {
	info: (message: string) => {
		console.log(`${colors.blue}ℹ [INFO]${colors.reset} ${message}`);
	},
	success: (message: string) => {
		console.log(`${colors.green}✓ [SUCCESS]${colors.reset} ${message}`);
	},
	error: (message: string, error?: any) => {
		console.error(`${colors.red}✗ [ERROR]${colors.reset} ${message}`);
		if (error) {
			console.error(error);
		}
	},
	warning: (message: string) => {
		console.log(`${colors.yellow}⚠ [WARNING]${colors.reset} ${message}`);
	},
	step: (step: number, total: number, message: string) => {
		console.log(
			`${colors.cyan}[${step}/${total}]${colors.reset} ${colors.bright}${message}${colors.reset}`,
		);
	},
	section: (title: string) => {
		console.log(`\n${colors.bright}${'='.repeat(60)}${colors.reset}`);
		console.log(`${colors.bright}${colors.cyan}  ${title}${colors.reset}`);
		console.log(`${colors.bright}${'='.repeat(60)}${colors.reset}\n`);
	},
};

async function clearDatabase() {
	logger.section('CLEARING DATABASE');

	try {
		// Delete in correct order to respect foreign keys
		logger.info('Deleting reviews...');
		await prisma.review.deleteMany({});
		logger.success('Reviews deleted');

		logger.info('Deleting order items...');
		await prisma.orderItem.deleteMany({});
		logger.success('Order items deleted');

		logger.info('Deleting orders...');
		await prisma.order.deleteMany({});
		logger.success('Orders deleted');

		logger.info('Deleting medicines...');
		await prisma.medicine.deleteMany({});
		logger.success('Medicines deleted');

		logger.info('Deleting categories...');
		await prisma.category.deleteMany({});
		logger.success('Categories deleted');

		logger.info('Deleting sessions...');
		await prisma.session.deleteMany({});
		logger.success('Sessions deleted');

		logger.info('Deleting accounts...');
		await prisma.account.deleteMany({});
		logger.success('Accounts deleted');

		logger.info('Deleting users...');
		await prisma.user.deleteMany({});
		logger.success('Users deleted');

		logger.success('Database cleared successfully!\n');
	} catch (error) {
		logger.error('Failed to clear database', error);
		throw error;
	}
}

async function seed() {
	const startTime = Date.now();

	logger.section('MEDISTORE DATABASE SEEDING');
	logger.info(`Started at: ${new Date().toLocaleString()}\n`);

	try {
		// Step 1: Clear existing data
		logger.step(1, 7, 'Clearing existing data');
		await clearDatabase();

		// Step 2: Seed Admin
		logger.step(2, 7, 'Seeding Admin User');
		const admin = await seedAdmin(logger);
		logger.success(`Admin created: ${admin.email}\n`);

		// Step 3: Seed Categories
		logger.step(3, 7, 'Seeding Categories');
		const categories = await seedCategories(logger);
		logger.success(`${categories.length} categories created\n`);

		// Step 4: Seed Users (Customers & Sellers)
		logger.step(4, 7, 'Seeding Users');
		const users = await seedUsers(logger);
		logger.success(
			`${users.customers.length} customers and ${users.sellers.length} sellers created\n`,
		);

		// Step 5: Seed Medicines
		logger.step(5, 7, 'Seeding Medicines');
		const medicines = await seedMedicines(logger, categories, users.sellers);
		logger.success(`${medicines.length} medicines created\n`);

		// Step 6: Seed Orders
		logger.step(6, 7, 'Seeding Orders');
		const orders = await seedOrders(logger, users.customers, medicines);
		logger.success(`${orders.length} orders created\n`);

		// Step 7: Seed Reviews
		logger.step(7, 7, 'Seeding Reviews');
		const reviews = await seedReviews(logger, users.customers, medicines);
		logger.success(`${reviews.length} reviews created\n`);

		// Summary
		const endTime = Date.now();
		const duration = ((endTime - startTime) / 1000).toFixed(2);

		logger.section('SEEDING SUMMARY');
		console.log(`${colors.bright}Total Items Created:${colors.reset}`);
		console.log(`  • Admin:      1`);
		console.log(`  • Categories: ${categories.length}`);
		console.log(`  • Customers:  ${users.customers.length}`);
		console.log(`  • Sellers:    ${users.sellers.length}`);
		console.log(`  • Medicines:  ${medicines.length}`);
		console.log(`  • Orders:     ${orders.length}`);
		console.log(`  • Reviews:    ${reviews.length}`);
		console.log(`\n${colors.bright}Time Taken:${colors.reset} ${duration}s`);
		console.log(
			`${colors.green}${colors.bright}\n✓ Database seeded successfully!${colors.reset}\n`,
		);

		// Display login credentials
		logger.section('LOGIN CREDENTIALS');
		console.log(`${colors.bright}Admin:${colors.reset}`);
		console.log(`  Email:    admin@email.com`);
		console.log(`  Password: 123456789\n`);

		console.log(`${colors.bright}Sample Seller:${colors.reset}`);
		console.log(`  Email:    seller1@email.com`);
		console.log(`  Password: 123456789\n`);

		console.log(`${colors.bright}Sample Customer:${colors.reset}`);
		console.log(`  Email:    customer1@email.com`);
		console.log(`  Password: 123456789\n`);
	} catch (error) {
		logger.error('Seeding failed!', error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
		logger.info('Database connection closed');
	}
}

// Run the seed
seed();
