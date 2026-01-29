import { prisma } from '../../lib/prisma';
import { ISellerRequest, IUpdateProfileInput, UserRole } from '../../types';

const getProfile = async (userId: string) => {
	return await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
			image: true,
			role: true,
			status: true,
			bio: true,
			businessName: true,
			businessAddress: true,
			sellerRequestStatus: true,
			emailVerified: true,
			createdAt: true,
		},
	});
};

const updateProfile = async (userId: string, data: IUpdateProfileInput) => {
	return await prisma.user.update({
		where: { id: userId },
		data,
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
			image: true,
			bio: true,
		},
	});
};

const requestSellerRole = async (userId: string, data: ISellerRequest) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: { id: userId },
		select: { sellerRequestStatus: true, role: true },
	});

	if (user.role === UserRole.SELLER || user.role === UserRole.ADMIN) {
		throw new Error('You are already a seller or admin');
	}

	if (user.sellerRequestStatus === 'PENDING') {
		throw new Error('You already have a pending seller request');
	}

	if (user.sellerRequestStatus === 'APPROVED') {
		throw new Error('Your seller request has already been approved');
	}

	return await prisma.user.update({
		where: { id: userId },
		data: {
			businessName: data.businessName,
			businessAddress: data.businessAddress,
			phone: data.phone,
			bio: data.bio,
			sellerRequestStatus: 'PENDING',
		},
	});
};

const getPendingSellerRequests = async () => {
	return await prisma.user.findMany({
		where: {
			sellerRequestStatus: 'PENDING',
		},
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
			image: true,
			businessName: true,
			businessAddress: true,
			bio: true,
			sellerRequestStatus: true,
			createdAt: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
};

const approveSellerRequest = async (userId: string) => {
	return await prisma.user.update({
		where: { id: userId },
		data: {
			role: UserRole.SELLER,
			sellerRequestStatus: 'APPROVED',
		},
	});
};

const rejectSellerRequest = async (userId: string) => {
	return await prisma.user.update({
		where: { id: userId },
		data: {
			sellerRequestStatus: 'REJECTED',
		},
	});
};

const getAllUsers = async () => {
	return await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
			image: true,
			role: true,
			status: true,
			emailVerified: true,
			createdAt: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
};

const getUserById = async (userId: string) => {
	return await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
			image: true,
			role: true,
			status: true,
			emailVerified: true,
			createdAt: true,
		},
	});
};

const updateUserStatus = async (userId: string, status: string) => {
	return await prisma.user.update({
		where: { id: userId },
		data: { status },
	});
};

export const UserService = {
	getProfile,
	updateProfile,
	requestSellerRole,
	getPendingSellerRequests,
	approveSellerRequest,
	rejectSellerRequest,
	getAllUsers,
	getUserById,
	updateUserStatus,
};
