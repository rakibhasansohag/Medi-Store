import { AlertCircle } from 'lucide-react';
import { IMedicine } from '@/types';

interface LowStockAlertProps {
	lowStockProducts: IMedicine[];
	lowStockCount: number;
}

export function LowStockAlert({
	lowStockProducts,
	lowStockCount,
}: LowStockAlertProps) {
	return (
		<div className='border border-orange-200 bg-orange-50 rounded-lg p-6'>
			<div className='flex items-center gap-2 mb-4'>
				<AlertCircle className='h-5 w-5 text-orange-600' />
				<h3 className='font-semibold text-orange-900'>Low Stock Alert</h3>
			</div>
			<p className='text-sm text-orange-700 mb-4'>
				{lowStockCount} product(s) are running low on stock (below 20 units)
			</p>
			<div className='space-y-2'>
				{lowStockProducts.slice(0, 5).map((item) => (
					<div
						key={item.id}
						className='flex justify-between items-center p-3 bg-white rounded border border-orange-100'
					>
						<div>
							<p className='font-medium text-sm'>{item.name}</p>
							<p className='text-xs text-muted-foreground'>
								${item.price.toFixed(2)}
							</p>
						</div>
						<div className='text-right'>
							<p className='text-sm font-semibold text-orange-600'>
								{item.stock} units
							</p>
							<p className='text-xs text-muted-foreground'>remaining</p>
						</div>
					</div>
				))}
				{lowStockProducts.length > 5 && (
					<p className='text-sm text-orange-600 text-center pt-2'>
						+{lowStockProducts.length - 5} more items
					</p>
				)}
			</div>
		</div>
	);
}
