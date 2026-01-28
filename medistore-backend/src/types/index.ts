import { ORDERSTATUS } from '../../generated/prisma/enums';

// ============= USER & AUTH TYPES =============
export enum UserRole {
	CUSTOMER = 'CUSTOMER',
	SELLER = 'SELLER',
	ADMIN = 'ADMIN',
}

export enum UserStatus {
	ACTIVE = 'ACTIVE',
	BANNED = 'BANNED',
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
	phone?: string;
	emailVerified: boolean;
}

// ============= CATEGORY TYPES =============
export interface ICategory {
	id: string;
	name: string;
	slug: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICreateCategoryInput {
	name: string;
	slug: string;
}

export interface IUpdateCategoryInput {
	name?: string;
	slug?: string;
}

// ============= MEDICINE TYPES =============
export interface IMedicine {
	id: string;
	name: string;
	description: string;
	manufacturer: string;
	price: number;
	stock: number;
	imageUrl?: string | null;
	categoryId: string;
	sellerId: string;
	category?: ICategory;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICreateMedicineInput {
	name: string;
	description: string;
	manufacturer: string;
	price: number;
	stock: number;
	imageUrl?: string;
	categoryId: string;
}

export interface IUpdateMedicineInput {
	name?: string;
	description?: string;
	manufacturer?: string;
	price?: number;
	stock?: number;
	imageUrl?: string;
	categoryId?: string;
}

export interface IGetMedicinesQuery {
	search?: string;
	categoryId?: string;
	minPrice?: number;
	maxPrice?: number;
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

// ============= PAGINATION TYPES =============
export interface IPaginationOptions {
	page?: number | string;
	limit?: number | string;
	sortOrder?: string;
	sortBy?: string;
}

export interface IPaginationResult {
	page: number;
	limit: number;
	skip: number;
	sortBy: string;
	sortOrder: string;
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

// ============= API RESPONSE TYPES =============
export interface ISuccessResponse<T = unknown> {
	success: true;
	message: string;
	data?: T;
}

export interface IErrorResponse {
	success: false;
	message: string;
	details?: unknown;
}

export type IApiResponse<T = unknown> = ISuccessResponse<T> | IErrorResponse;

// ============= REQUEST TYPES =============
export interface IAuthenticatedRequest extends Request {
	user?: IUser;
}

// ============= ORDER TYPES =============

export interface IOrder {
	id: string;
	orderNumber: string;
	customerId: string;
	shippingAddress: string;
	totalAmount: number;
	status: ORDERSTATUS;
	items: IOrderItem[];
	createdAt: Date;
	updatedAt: Date;
}

export interface IOrderItem {
	id: string;
	orderId: string;
	medicineId: string;
	quantity: number;
	price: number;
	medicine?: IMedicine;
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

export { ORDERSTATUS };
