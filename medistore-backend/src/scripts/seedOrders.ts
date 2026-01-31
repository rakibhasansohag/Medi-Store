import { prisma } from '../lib/prisma';
import { Medicine, Order, User } from '../../generated/prisma/client';

interface Logger {
	info: (message: string) => void;
	success: (message: string) => void;
	error: (message: string, error?: any) => void;
}

const ORDER_STATUSES = [
	'PLACED',
	'PROCESSING',
	'SHIPPED',
	'DELIVERED',
	'CANCELLED',
];

const addresses = [
	'123 Main Street, New York, NY 10001',
	'456 Oak Avenue, Los Angeles, CA 90001',
	'789 Pine Road, Chicago, IL 60601',
	'321 Maple Drive, Houston, TX 77001',
	'654 Elm Street, Phoenix, AZ 85001',
	'987 Cedar Lane, Philadelphia, PA 19101',
	'147 Birch Court, San Antonio, TX 78201',
	'258 Spruce Way, San Diego, CA 92101',
];

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItems<T>(array: T[], count: number): T[] {
	const shuffled = [...array].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, Math.min(count, array.length));
}

function getRandomStatus(): string {
	const weights = [0.15, 0.2, 0.15, 0.45, 0.05]; // Weighted towards DELIVERED
	const random = Math.random();
	let sum = 0;

	for (let i = 0; i < weights.length; i++) {
		sum += weights[i];
		if (random <= sum) {
			return ORDER_STATUSES[i];
		}
	}
	return 'DELIVERED';
}

export async function seedOrders(
	logger: Logger,
	customers: User[],
	medicines: Medicine[],
): Promise<Order[]> {
	const orders: Order[] = [];

	try {
		if (customers.length === 0) {
			throw new Error('No customers available for seeding orders');
		}

		if (medicines.length === 0) {
			throw new Error('No medicines available for seeding orders');
		}

		const ordersPerCustomer = getRandomInt(2, 5);
		const totalOrders = customers.length * ordersPerCustomer;

		logger.info(
			`Creating ${totalOrders} orders (${ordersPerCustomer} per customer)...`,
		);

		for (const customer of customers) {
			const customerOrderCount = getRandomInt(2, ordersPerCustomer);

			for (let i = 0; i < customerOrderCount; i++) {
				try {
					// Select random medicines for this order (1-4 items)
					const itemCount = getRandomInt(1, 4);
					const orderMedicines = getRandomItems(medicines, itemCount);

					// Calculate total amount
					const items = orderMedicines.map((medicine) => {
						const quantity = getRandomInt(1, 3);
						return {
							medicineId: medicine.id,
							quantity,
							price: medicine.price,
						};
					});

					const totalAmount = items.reduce(
						(sum, item) => sum + item.price * item.quantity,
						0,
					);

					// Generate order number
					const orderNumber = `ORD-${Date.now()}-${Math.random()
						.toString(36)
						.substr(2, 9)
						.toUpperCase()}`;

					// Random status
					const status = getRandomStatus();

					// Random address
					const shippingAddress =
						addresses[Math.floor(Math.random() * addresses.length)];

					// Create order with items
					const order = await prisma.order.create({
						data: {
							orderNumber,
							customerId: customer.id,
							shippingAddress,
							totalAmount,
							status: status as any,
							items: {
								create: items,
							},
						},
						include: {
							items: {
								include: {
									medicine: true,
								},
							},
						},
					});

					orders.push(order);
					logger.info(
						`  ✓ Order ${order.orderNumber}: ${
							customer.name
						} - $${totalAmount.toFixed(2)} (${status})`,
					);

					// Add small delay to ensure unique timestamps
					await new Promise((resolve) => setTimeout(resolve, 10));
				} catch (error: any) {
					logger.error(
						`  ✗ Failed to create order for customer: ${customer.name}`,
						error,
					);
				}
			}
		}

		logger.success(`Orders created: ${orders.length} total`);

		// Log status breakdown
		const statusCounts = orders.reduce((acc, order) => {
			acc[order.status] = (acc[order.status] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

		logger.info('Order status breakdown:');
		Object.entries(statusCounts).forEach(([status, count]) => {
			logger.info(`  • ${status}: ${count}`);
		});

		return orders;
	} catch (error) {
		logger.error('Failed to seed orders', error);
		throw error;
	}
}
