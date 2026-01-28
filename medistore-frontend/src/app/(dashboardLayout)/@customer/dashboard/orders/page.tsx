import { OrderTable } from '@/components/modules/customer/OrderTable';
import { orderService } from '@/services/order.service';

export default async function CustomerOrdersPage() {
	const { data } = await orderService.getMyOrders();

	const orders = data || [];

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>My Orders</h1>
				<p className='text-muted-foreground'>Track and manage your orders</p>
			</div>

			<OrderTable orders={orders} />
		</div>
	);
}
