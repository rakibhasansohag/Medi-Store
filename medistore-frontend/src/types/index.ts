// ============= USER & AUTH =============
export interface IUser {
	id: string;
	name: string;
	email: string;
	role: 'CUSTOMER' | 'SELLER' | 'ADMIN';
	status: 'ACTIVE' | 'BANNED';
	emailVerified: boolean;
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
