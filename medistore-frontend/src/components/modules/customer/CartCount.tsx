'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export function CartCount() {
	const { items } = useCart();

	const cartItemsCount = items?.items?.length || 0;
	const cartTotal =
		cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
		0;

	return (
		<div className='border rounded-lg p-6 hover:shadow-md transition-shadow'>
			<div className='flex items-center justify-between mb-2'>
				<h3 className='font-semibold text-gray-700'>Cart Items</h3>
				<ShoppingCart className='h-5 w-5 text-green-600' />
			</div>
			<p className='text-3xl font-bold text-gray-900'>{cartItemsCount}</p>
			<p className='text-sm text-muted-foreground mt-1'>
				${cartTotal.toFixed(2)} total
			</p>
		</div>
	);
}
