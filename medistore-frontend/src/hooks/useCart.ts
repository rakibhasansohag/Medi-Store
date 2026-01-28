'use client';

import { useSyncExternalStore, useMemo } from 'react';
import { cartStore, CartItem } from '@/lib/cart-store';
import { IMedicine } from '@/types';

export function useCart() {
	const items = useSyncExternalStore<CartItem[]>(
		(callback) => cartStore.subscribe(callback),
		() => cartStore.getItems(),
	);

	// Calculate totals based on your flattened CartItem structure
	const totalItems = useMemo(
		() => items.reduce((acc, item) => acc + item.quantity, 0),
		[items],
	);

	const totalPrice = useMemo(
		() =>
			// Changed item.medicine.price to item.price
			items.reduce((acc, item) => acc + item.price * item.quantity, 0),
		[items],
	);

	return {
		items,
		addItem: (medicine: IMedicine, quantity?: number) =>
			cartStore.addItem(medicine, quantity),
		updateQuantity: (id: string, quantity: number) =>
			cartStore.updateQuantity(id, quantity),
		removeItem: (id: string) => cartStore.removeItem(id),
		clear: () => cartStore.clear(),
		totalItems,
		totalPrice,
	};
}
