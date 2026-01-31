import { OrderManagementTable } from '@/components/modules/admin/OrderManagementTable';
import { orderService } from '@/services/order.service';

export default async function AdminOrdersPage() {
	const { data } = await orderService.getAllOrders();

	const orders = data || [];

	console.log(orders);

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Order Management</h1>
				<p className='text-muted-foreground'>
					Manage all orders across the platform
				</p>
			</div>

			<OrderManagementTable orders={orders} />
		</div>
	);
}
