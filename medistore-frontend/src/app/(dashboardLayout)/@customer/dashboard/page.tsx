import { CustomerStatsCards } from '@/components/modules/customer/CustomerStatsCards';
import { RecentOrdersList } from '@/components/modules/customer/RecentOrdersList';
import { orderService } from '@/services/order.service';

export default async function CustomerDashboardPage() {
	// Fetch customer orders
	const ordersRes = await orderService.getMyOrders();
	const orders = ordersRes.data || [];

	// Calculate stats
	const totalOrders = orders.length;
	const pendingOrders = orders.filter(
		(order) => order.status === 'PLACED' || order.status === 'PROCESSING',
	).length;
	const completedOrders = orders.filter(
		(order) => order.status === 'DELIVERED',
	).length;
	const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

	const stats = {
		totalOrders,
		pendingOrders,
		completedOrders,
		totalSpent,
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>My Dashboard</h1>
				<p className='text-muted-foreground'>
					Welcome to your customer dashboard
				</p>
			</div>

			<CustomerStatsCards stats={stats} />

			{/* Recent Orders & Quick Stats */}
			<div className='grid gap-6 md:grid-cols-2'>
				<RecentOrdersList orders={orders.slice(0, 5)} />

				<div className='border rounded-lg p-6'>
					<h3 className='font-semibold mb-4'>Quick Stats</h3>
					{totalOrders > 0 ? (
						<div className='space-y-3'>
							<div className='flex items-center justify-between text-sm'>
								<span className='text-muted-foreground'>Completed Orders</span>
								<span className='font-semibold text-green-600'>
									{completedOrders}
								</span>
							</div>
							<div className='flex items-center justify-between text-sm'>
								<span className='text-muted-foreground'>
									Average Order Value
								</span>
								<span className='font-semibold'>
									${(totalSpent / (totalOrders || 1)).toFixed(2)}
								</span>
							</div>
							<div className='flex items-center justify-between text-sm'>
								<span className='text-muted-foreground'>Completion Rate</span>
								<span className='font-semibold text-green-600'>
									{((completedOrders / (totalOrders || 1)) * 100).toFixed(0)}%
								</span>
							</div>
						</div>
					) : (
						<p className='text-sm text-muted-foreground'>
							No orders yet. Start shopping!
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
