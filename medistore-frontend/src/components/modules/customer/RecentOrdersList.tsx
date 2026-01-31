import { IOrder } from '@/types';

interface RecentOrdersListProps {
	orders: IOrder[];
}

export function RecentOrdersList({ orders }: RecentOrdersListProps) {
	return (
		<div className='border rounded-lg p-6'>
			<h3 className='font-semibold mb-4'>Recent Orders</h3>
			{orders.length > 0 ? (
				<div className='space-y-3'>
					{orders.map((order) => (
						<div
							key={order.id}
							className='flex items-center justify-between text-sm'
						>
							<div>
								<p className='font-medium'>{order.orderNumber}</p>
								<p className='text-xs text-muted-foreground'>
									{new Date(order.createdAt).toLocaleDateString()}
								</p>
							</div>
							<div className='text-right'>
								<p className='font-semibold'>${order.totalAmount.toFixed(2)}</p>
								<p
									className={`text-xs ${
										order.status === 'DELIVERED'
											? 'text-green-600'
											: order.status === 'CANCELLED'
											? 'text-red-600'
											: 'text-orange-600'
									}`}
								>
									{order.status}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className='text-sm text-muted-foreground'>
					No orders yet. Start shopping!
				</p>
			)}
		</div>
	);
}
