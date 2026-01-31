import { AlertCircle, Package, CheckCircle } from 'lucide-react';

interface OrderStatusBreakdownProps {
	stats: {
		pendingOrders: number;
		processingOrders: number;
		completedOrders: number;
	};
}

export function OrderStatusBreakdown({ stats }: OrderStatusBreakdownProps) {
	return (
		<div className='border rounded-lg p-6'>
			<h3 className='font-semibold mb-4 text-lg'>Order Status Overview</h3>
			<div className='grid gap-4 md:grid-cols-3'>
				<div className='flex items-center justify-between p-4 bg-yellow-50 rounded-lg'>
					<div>
						<p className='text-2xl font-bold text-yellow-700'>
							{stats.pendingOrders}
						</p>
						<p className='text-sm text-yellow-600'>Pending Orders</p>
					</div>
					<AlertCircle className='h-8 w-8 text-yellow-600' />
				</div>
				<div className='flex items-center justify-between p-4 bg-blue-50 rounded-lg'>
					<div>
						<p className='text-2xl font-bold text-blue-700'>
							{stats.processingOrders}
						</p>
						<p className='text-sm text-blue-600'>Processing</p>
					</div>
					<Package className='h-8 w-8 text-blue-600' />
				</div>
				<div className='flex items-center justify-between p-4 bg-green-50 rounded-lg'>
					<div>
						<p className='text-2xl font-bold text-green-700'>
							{stats.completedOrders}
						</p>
						<p className='text-sm text-green-600'>Completed</p>
					</div>
					<CheckCircle className='h-8 w-8 text-green-600' />
				</div>
			</div>
		</div>
	);
}
