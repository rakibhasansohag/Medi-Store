import { DollarSign, Package, ShoppingBag, TrendingUp } from 'lucide-react';

interface SellerStatsCardsProps {
	stats: {
		totalRevenue: number;
		completedOrders: number;
		totalOrders: number;
		pendingOrders: number;
		totalProducts: number;
		lowStockCount: number;
		averageOrderValue: number;
	};
}

export function SellerStatsCards({ stats }: SellerStatsCardsProps) {
	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
			<div className='border rounded-lg p-6 hover:shadow-md transition-shadow'>
				<div className='flex items-center justify-between mb-2'>
					<h3 className='font-semibold text-gray-700'>Total Revenue</h3>
					<DollarSign className='h-5 w-5 text-green-600' />
				</div>
				<p className='text-3xl font-bold text-gray-900'>
					${stats.totalRevenue.toFixed(2)}
				</p>
				<p className='text-sm text-muted-foreground mt-1'>
					From {stats.completedOrders} completed orders
				</p>
			</div>

			<div className='border rounded-lg p-6 hover:shadow-md transition-shadow'>
				<div className='flex items-center justify-between mb-2'>
					<h3 className='font-semibold text-gray-700'>Total Orders</h3>
					<Package className='h-5 w-5 text-blue-600' />
				</div>
				<p className='text-3xl font-bold text-gray-900'>{stats.totalOrders}</p>
				<p className='text-sm text-muted-foreground mt-1'>
					{stats.pendingOrders} pending
				</p>
			</div>

			<div className='border rounded-lg p-6 hover:shadow-md transition-shadow'>
				<div className='flex items-center justify-between mb-2'>
					<h3 className='font-semibold text-gray-700'>Products</h3>
					<ShoppingBag className='h-5 w-5 text-purple-600' />
				</div>
				<p className='text-3xl font-bold text-gray-900'>
					{stats.totalProducts}
				</p>
				<p className='text-sm text-muted-foreground mt-1'>
					{stats.lowStockCount} low stock
				</p>
			</div>

			<div className='border rounded-lg p-6 hover:shadow-md transition-shadow'>
				<div className='flex items-center justify-between mb-2'>
					<h3 className='font-semibold text-gray-700'>Avg Order Value</h3>
					<TrendingUp className='h-5 w-5 text-orange-600' />
				</div>
				<p className='text-3xl font-bold text-gray-900'>
					${stats.averageOrderValue.toFixed(2)}
				</p>
				<p className='text-sm text-muted-foreground mt-1'>
					Per completed order
				</p>
			</div>
		</div>
	);
}
