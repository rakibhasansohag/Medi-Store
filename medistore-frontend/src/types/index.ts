// ============= USER & AUTH =============
export interface IUser {
	id: string;
	name: string;
	email: string;
	role: 'CUSTOMER' | 'SELLER' | 'ADMIN';
	status: 'ACTIVE' | 'BANNED';
	emailVerified: boolean;
	phone?: string;
}

export interface ILoginInput {
	email: string;
	password: string;
}

export interface IRegisterInput {
	name: string;
	email: string;
	password: string;
	role: 'CUSTOMER' | 'SELLER';
	phone?: string;
}

// ============= CATEGORY =============
export interface ICategory {
	id: string;
	name: string;
	slug: string;
}

// ============= MEDICINE =============
export interface IMedicine {
	id: string;
	name: string;
	description: string;
	manufacturer: string;
	price: number;
	stock: number;
	imageUrl?: string;
	categoryId: string;
	category?: ICategory;
}

// ============= API RESPONSE =============
export interface IApiResponse<T = unknown> {
	success: boolean;
	message: string;
	data?: T;
	details?: unknown;
}

export interface IPaginatedResponse<T> {
	data: T[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

// ============= ROUTES =============
export interface IRoute {
	title: string;
	items: {
		title: string;
		url: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
}

// ============= ORDER =============

export enum OrderStatus {
	PLACED = 'PLACED',
	PROCESSING = 'PROCESSING',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED',
	CANCELLED = 'CANCELLED',
}

export interface IOrderItem {
	id: string;
	medicineId: string;
	medicine?: IMedicine;
	quantity: number;
	price: number;
}

export interface IOrder {
	id: string;
	orderNumber: string;
	customerId: string;
	shippingAddress: string;
	totalAmount: number;
	status: OrderStatus;
	items: IOrderItem[];
	createdAt: string;
	updatedAt: string;
}

export interface ICreateOrderInput {
	shippingAddress: string;
	phone: string;
	items: {
		medicineId: string;
		quantity: number;
		price: number;
	}[];
}

// ============= REVIEW =============
export interface IReview {
	id: string;
	rating: number;
	comment?: string;
	customerId: string;
	medicineId: string;
	medicine?: {
		id: string;
		name: string;
		imageUrl?: string;
	};
	createdAt: string;
	updatedAt: string;
}

export interface ICreateReviewInput {
	rating: number;
	comment?: string;
	medicineId: string;
}

export enum SellerRequestStatus {
	NONE = 'NONE',
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
}

// ============= USER SERVICE =============
export interface IUserProfile {
	id: string;
	name: string;
	email: string;
	phone?: string;
	image?: string;
	role: string;
	status: string;
	bio?: string;
	businessName?: string;
	businessAddress?: string;
	sellerRequestStatus?: SellerRequestStatus;
	emailVerified: boolean;
	createdAt: string;
}

export interface ISellerRequest {
	businessName: string;
	businessAddress: string;
	phone: string;
	bio?: string;
}
