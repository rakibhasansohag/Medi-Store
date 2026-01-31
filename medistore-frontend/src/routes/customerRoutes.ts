import { IRoute } from '@/types';
import { ShoppingCart, Package, User, BarChart } from 'lucide-react';

export const customerRoutes: IRoute[] = [
	{
		title: 'Shopping',
		items: [
			{
				title: 'Dashboard',
				url: '/dashboard',
				icon: BarChart,
			},
			{
				title: 'My Cart',
				url: '/cart',
				icon: ShoppingCart,
			},
			{
				title: 'My Orders',
				url: '/dashboard/orders',
				icon: Package,
			},
			{
				title: 'Profile',
				url: '/dashboard/profile',
				icon: User,
			},
		],
	},
];
