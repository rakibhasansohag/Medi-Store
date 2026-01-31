import { SellerStatsCards } from '@/components/modules/seller/SellerStatsCards';
import { LowStockAlert } from '@/components/modules/seller/LowStockAlert';
import { OrderStatusBreakdown } from '@/components/modules/seller/OrderStatusBreakdown';
import { orderService } from '@/services/order.service';
import { medicineService } from '@/services/medicine.service';

export default async function SellerDashboard() {
	// Fetch data in parallel
	const [ordersRes, medicinesRes] = await Promise.all([
		orderService.getAllOrders(),
		medicineService.getMyMedicines(),
	]);

	const orders = ordersRes.data || [];
	const medicines = medicinesRes.data || [];

	// Calculate stats
	const totalProducts = medicines.length;
	const lowStockProducts = medicines.filter((med) => med.stock < 20);
	const lowStockCount = lowStockProducts.length;

	const totalOrders = orders.length;
	const pendingOrders = orders.filter(
		(order) => order.status === 'PLACED',
	).length;
	const processingOrders = orders.filter(
		(order) => order.status === 'PROCESSING',
	).length;
	const completedOrders = orders.filter(
		(order) => order.status === 'DELIVERED',
	).length;

	const totalRevenue = orders.reduce((sum, order) => {
		if (order.status === 'DELIVERED') {
			return sum + order.totalAmount;
		}
		return sum;
	}, 0);

	const averageOrderValue =
		completedOrders > 0 ? totalRevenue / completedOrders : 0;

	const stats = {
		totalProducts,
		lowStockCount,
		totalOrders,
		pendingOrders,
		processingOrders,
		completedOrders,
		totalRevenue,
		averageOrderValue,
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Seller Dashboard</h1>
				<p className='text-muted-foreground'>
					Overview of your store performance
				</p>
			</div>

			<SellerStatsCards stats={stats} />

			<OrderStatusBreakdown stats={stats} />

			{lowStockCount > 0 && (
				<LowStockAlert
					lowStockProducts={lowStockProducts}
					lowStockCount={lowStockCount}
				/>
			)}

			{/* Performance Metrics */}
			{totalOrders > 0 && (
				<div className='border rounded-lg p-6'>
					<h3 className='font-semibold mb-4 text-lg'>Performance Metrics</h3>
					<div className='grid gap-4 md:grid-cols-2'>
						<div className='p-4 bg-gray-50 rounded-lg'>
							<p className='text-sm text-muted-foreground mb-1'>
								Order Completion Rate
							</p>
							<div className='flex items-end gap-2'>
								<p className='text-3xl font-bold text-gray-900'>
									{((completedOrders / totalOrders) * 100).toFixed(1)}%
								</p>
								<p className='text-sm text-muted-foreground mb-1'>
									of all orders
								</p>
							</div>
						</div>
						<div className='p-4 bg-gray-50 rounded-lg'>
							<p className='text-sm text-muted-foreground mb-1'>
								Inventory Health
							</p>
							<div className='flex items-end gap-2'>
								<p className='text-3xl font-bold text-gray-900'>
									{totalProducts > 0
										? (
												((totalProducts - lowStockCount) / totalProducts) *
												100
										  ).toFixed(1)
										: 0}
									%
								</p>
								<p className='text-sm text-muted-foreground mb-1'>
									well stocked
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
