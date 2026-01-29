import { IRoute } from '@/types';
import {
	Users,
	Package,
	ShoppingBag,
	BarChart,
	FolderTree,
	UserCog,
	Star,
	User,
} from 'lucide-react';

export const adminRoutes: IRoute[] = [
	{
		title: 'Management',
		items: [
			{
				title: 'Dashboard',
				url: '/admin-dashboard',
				icon: BarChart,
			},
			{
				title: 'Users',
				url: '/admin-dashboard/users',
				icon: Users,
			},
			{
				title: 'Seller Requests',
				url: '/admin-dashboard/seller-requests',
				icon: UserCog,
			},
			{
				title: 'Categories',
				url: '/admin-dashboard/categories',
				icon: FolderTree,
			},
			{
				title: 'Medicines',
				url: '/admin-dashboard/medicines',
				icon: Package,
			},
			{
				title: 'Orders',
				url: '/admin-dashboard/orders',
				icon: ShoppingBag,
			},
			{
				title: 'Reviews',
				url: '/admin-dashboard/reviews',
				icon: Star,
			},
		],
	},

	{
		title: 'Settings',
		items: [
			{
				title: 'Profile',
				url: '/admin-dashboard/profile',
				icon: User,
			},
		],
	},
];
