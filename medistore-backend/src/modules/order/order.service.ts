import { prisma } from '../../lib/prisma';
import { ICreateOrderInput, IOrder, ORDERSTATUS } from '../../types';

const createOrder = async (
	data: ICreateOrderInput,
	customerId: string,
): Promise<IOrder> => {
	// Validate all medicines exist and have sufficient stock
	for (const item of data.items) {
		const medicine = await prisma.medicine.findUnique({
			where: { id: item.medicineId },
			select: { stock: true, price: true },
		});

		if (!medicine) {
			throw new Error(`Medicine ${item.medicineId} not found`);
		}

		if (medicine.stock < item.quantity) {
			throw new Error(`Insufficient stock for medicine ${item.medicineId}`);
		}
	}

	// Calculate total amount
	const totalAmount = data.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	// Generate order number
	const orderNumber = `ORD-${Date.now()}-${Math.random()
		.toString(36)
		.substr(2, 9)
		.toUpperCase()}`;

	// Create order with items in a transaction
	const order = await prisma.$transaction(async (tx) => {
		// Create order
		const newOrder = await tx.order.create({
			data: {
				orderNumber,
				customerId,
				shippingAddress: data.shippingAddress,
				totalAmount,
				status: ORDERSTATUS.PLACED,
				items: {
					create: data.items.map((item) => ({
						medicineId: item.medicineId,
						quantity: item.quantity,
						price: item.price,
					})),
				},
			},
			include: {
				items: {
					include: {
						medicine: {
							include: {
								category: true,
							},
						},
					},
				},
			},
		});

		// Update medicine stock
		for (const item of data.items) {
			await tx.medicine.update({
				where: { id: item.medicineId },
				data: {
					stock: {
						decrement: item.quantity,
					},
				},
			});
		}

		return newOrder;
	});

	return order;
};

const getOrderById = async (orderId: string): Promise<IOrder | null> => {
	return await prisma.order.findUnique({
		where: { id: orderId },
		include: {
			items: {
				include: {
					medicine: {
						include: {
							category: true,
						},
					},
				},
			},
		},
	});
};

const getMyOrders = async (customerId: string): Promise<IOrder[]> => {
	return await prisma.order.findMany({
		where: { customerId },
		orderBy: { createdAt: 'desc' },
		include: {
			items: {
				include: {
					medicine: true,
				},
			},
		},
	});
};

const getAllOrders = async (
	userId?: string,
	userRole?: string,
): Promise<IOrder[]> => {
	// If user is a SELLER, only return orders containing their medicines
	if (userRole === 'SELLER' && userId) {
		return await prisma.order.findMany({
			where: {
				items: {
					some: {
						medicine: {
							sellerId: userId,
						},
					},
				},
			},
			orderBy: { createdAt: 'desc' },
			include: {
				items: {
					include: {
						medicine: true,
					},
				},
			},
		});
	}

	// For ADMIN, return all orders
	return await prisma.order.findMany({
		orderBy: { createdAt: 'desc' },
		include: {
			items: {
				include: {
					medicine: true,
				},
			},
		},
	});
};

const updateOrderStatus = async (
	orderId: string,
	status: ORDERSTATUS,
): Promise<IOrder> => {
	const order = await prisma.order.findUniqueOrThrow({
		where: { id: orderId },
	});

	// Business rules
	if (order.status === ORDERSTATUS.CANCELLED) {
		throw new Error('Cannot update status of cancelled order');
	}

	if (order.status === ORDERSTATUS.DELIVERED) {
		throw new Error('Cannot update status of delivered order');
	}

	return await prisma.order.update({
		where: { id: orderId },
		data: { status },
		include: {
			items: {
				include: {
					medicine: true,
				},
			},
		},
	});
};

const cancelOrder = async (
	orderId: string,
	customerId: string,
): Promise<IOrder> => {
	const order = await prisma.order.findUniqueOrThrow({
		where: { id: orderId },
		select: {
			id: true,
			customerId: true,
			status: true,
			items: {
				select: {
					medicineId: true,
					quantity: true,
				},
			},
		},
	});

	if (order.customerId !== customerId) {
		throw new Error('Unauthorized access');
	}

	if (order.status !== ORDERSTATUS.PLACED) {
		throw new Error('Can only cancel orders with PLACED status');
	}

	// Cancel order and restore stock in transaction
	return await prisma.$transaction(async (tx) => {
		// Restore stock for each item
		for (const item of order.items) {
			await tx.medicine.update({
				where: { id: item.medicineId },
				data: {
					stock: {
						increment: item.quantity,
					},
				},
			});
		}

		// Update order status
		return await tx.order.update({
			where: { id: orderId },
			data: { status: ORDERSTATUS.CANCELLED },
			include: {
				items: {
					include: {
						medicine: true,
					},
				},
			},
		});
	});
};

export const OrderService = {
	createOrder,
	getOrderById,
	getMyOrders,
	getAllOrders,
	updateOrderStatus,
	cancelOrder,
};
