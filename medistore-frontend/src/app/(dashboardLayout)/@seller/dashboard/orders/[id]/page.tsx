import { SellerOrderTable } from '@/components/modules/seller/sellerOrderTables';
import { orderService } from '@/services/order.service';

export default async function SellerOrdersPage() {
	const ordersRes = await orderService.getAllOrders();
	const orders = ordersRes.data || [];

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>My Orders</h1>
				<p className='text-muted-foreground'>
					Orders containing your medicines ({orders.length} total)
				</p>
			</div>

			<SellerOrderTable orders={orders} />
		</div>
	);
}
