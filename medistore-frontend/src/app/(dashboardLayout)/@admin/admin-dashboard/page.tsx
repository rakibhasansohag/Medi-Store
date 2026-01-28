import { StatsCards } from '@/components/modules/admin/StatsCards';
import { categoryService } from '@/services/category.service';
import { medicineService } from '@/services/medicine.service';
import { orderService } from '@/services/order.service';

export default async function AdminDashboardPage() {
	// Fetch data in parallel
	const [categoriesRes, medicinesRes, ordersRes] = await Promise.all([
		categoryService.getCategories(),
		medicineService.getMedicines({ limit: '1' }),
		orderService.getAllOrders(),
	]);

	const totalCategories = categoriesRes.data?.data?.length || 0;
	const totalMedicines = medicinesRes.data?.pagination?.total || 0;
	const totalOrders = ordersRes.data?.length || 0;

	// Calculate total revenue
	const totalRevenue =
		ordersRes.data?.reduce((sum, order) => sum + order.totalAmount, 0) || 0;

	const stats = [
		{
			title: 'Total Categories',
			value: totalCategories,
			description: 'Active medicine categories',
		},
		{
			title: 'Total Medicines',
			value: totalMedicines,
			description: 'Listed medicines',
		},
		{
			title: 'Total Orders',
			value: totalOrders,
			description: 'All time orders',
		},
		{
			title: 'Total Revenue',
			value: `$${totalRevenue.toFixed(2)}`,
			description: 'All time revenue',
		},
	];

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Admin Dashboard</h1>
				<p className='text-muted-foreground'>Manage your MediStore platform</p>
			</div>

			<StatsCards stats={stats} />

			{/* Recent Orders Preview */}
			<div className='grid gap-6 md:grid-cols-2'>
				<div className='border rounded-lg p-6'>
					<h3 className='font-semibold mb-4'>Recent Orders</h3>
					{ordersRes.data && ordersRes.data.length > 0 ? (
						<div className='space-y-3'>
							{ordersRes.data.slice(0, 5).map((order) => (
								<div
									key={order.id}
									className='flex items-center justify-between text-sm'
								>
									<span className='text-muted-foreground'>
										{order.orderNumber}
									</span>
									<span className='font-semibold'>
										${order.totalAmount.toFixed(2)}
									</span>
								</div>
							))}
						</div>
					) : (
						<p className='text-sm text-muted-foreground'>No orders yet</p>
					)}
				</div>

				<div className='border rounded-lg p-6'>
					<h3 className='font-semibold mb-4'>Quick Stats</h3>
					<div className='space-y-3'>
						<div className='flex items-center justify-between text-sm'>
							<span className='text-muted-foreground'>Pending Orders</span>
							<span className='font-semibold'>
								{ordersRes.data?.filter((o) => o.status === 'PLACED').length ||
									0}
							</span>
						</div>
						<div className='flex items-center justify-between text-sm'>
							<span className='text-muted-foreground'>Processing</span>
							<span className='font-semibold'>
								{ordersRes.data?.filter((o) => o.status === 'PROCESSING')
									.length || 0}
							</span>
						</div>
						<div className='flex items-center justify-between text-sm'>
							<span className='text-muted-foreground'>Delivered</span>
							<span className='font-semibold'>
								{ordersRes.data?.filter((o) => o.status === 'DELIVERED')
									.length || 0}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
