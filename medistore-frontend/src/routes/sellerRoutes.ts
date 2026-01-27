import { IRoute } from '@/types';
import { Package, ShoppingBag, TrendingUp } from 'lucide-react';

export const sellerRoutes: IRoute[] = [
	{
		title: 'Inventory',
		items: [
			{
				title: 'My Medicines',
				url: '/dashboard/medicines',
				icon: Package,
			},
			{
				title: 'Add Medicine',
				url: '/dashboard/medicines/add',
				icon: ShoppingBag,
			},
		],
	},
	{
		title: 'Sales',
		items: [
			{
				title: 'Orders',
				url: '/dashboard/orders',
				icon: TrendingUp,
			},
		],
	},
];
