export interface Medicine {
	id: string;
	name: string;
	description: string;
	manufacturer: string;
	price: number;
	stock: number;
	imageUrl?: string;
	categoryId: string;
	category?: {
		name: string;
	};
}

export interface Order {
	id: string;
	orderNumber: string;
	status: string;
	totalAmount: number;
	shippingAddress: string;
	items: OrderItem[];
}

export interface OrderItem {
	id: string;
	medicineId: string;
	medicine: Medicine;
	quantity: number;
	price: number;
}
