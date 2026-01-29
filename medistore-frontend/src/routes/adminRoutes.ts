import { IRoute } from '@/types';
import {
	Users,
	Package,
	ShoppingBag,
	BarChart,
	FolderTree,
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
		],
	},

	{
		title: 'Settings',
		items: [
			{
				title: 'Profile',
				url: '/admin-dashboard/profile',
				icon: Users,
			},
		],
	},
];
