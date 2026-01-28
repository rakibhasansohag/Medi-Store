import { OrderManagementTable } from '@/components/modules/admin/OrderManagementTable';
import { orderService } from '@/services/order.service';

export default async function SellerOrdersPage() {
	const { data } = await orderService.getAllOrders();

	const orders = data || [];

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Order Management</h1>
				<p className='text-muted-foreground'>
					Manage orders containing your medicines
				</p>
			</div>

			<OrderManagementTable orders={orders} />
		</div>
	);
}
