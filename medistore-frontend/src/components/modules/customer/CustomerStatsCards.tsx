'use client';

import { Package, Clock, DollarSign } from 'lucide-react';
import { CartCount } from './CartCount';

interface CustomerStatsCardsProps {
	stats: {
		totalOrders: number;
		pendingOrders: number;
		completedOrders: number;
		totalSpent: number;
	};
}

export function CustomerStatsCards({ stats }: CustomerStatsCardsProps) {
	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
			<div className='border rounded-lg p-6 hover:shadow-md transition-shadow'>
				<div className='flex items-center justify-between mb-2'>
					<h3 className='font-semibold text-gray-700'>Total Orders</h3>
					<Package className='h-5 w-5 text-blue-600' />
				</div>
				<p className='text-3xl font-bold text-gray-900'>{stats.totalOrders}</p>
				<p className='text-sm text-muted-foreground mt-1'>All time orders</p>
			</div>

			<div className='border rounded-lg p-6 hover:shadow-md transition-shadow'>
				<div className='flex items-center justify-between mb-2'>
					<h3 className='font-semibold text-gray-700'>Pending Orders</h3>
					<Clock className='h-5 w-5 text-orange-600' />
				</div>
				<p className='text-3xl font-bold text-gray-900'>
					{stats.pendingOrders}
				</p>
				<p className='text-sm text-muted-foreground mt-1'>In progress</p>
			</div>

			<CartCount />

			<div className='border rounded-lg p-6 hover:shadow-md transition-shadow'>
				<div className='flex items-center justify-between mb-2'>
					<h3 className='font-semibold text-gray-700'>Total Spent</h3>
					<DollarSign className='h-5 w-5 text-purple-600' />
				</div>
				<p className='text-3xl font-bold text-gray-900'>
					${stats.totalSpent.toFixed(2)}
				</p>
				<p className='text-sm text-muted-foreground mt-1'>All time purchases</p>
			</div>
		</div>
	);
}
