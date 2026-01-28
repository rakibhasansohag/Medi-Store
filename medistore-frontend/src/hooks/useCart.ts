'use client';

import { useSyncExternalStore, useMemo } from 'react';
import { cartStore, CartItem } from '@/lib/cart-store';
import { IMedicine } from '@/types';

const EMPTY_CART: CartItem[] = [];

export function useCart() {
	const items = useSyncExternalStore<CartItem[]>(
		(callback) => cartStore.subscribe(callback),
		() => cartStore.getItems(),
		() => EMPTY_CART,
	);

	const totalItems = useMemo(
		() => items.reduce((acc, item) => acc + item.quantity, 0),
		[items],
	);

	const totalPrice = useMemo(
		() => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
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
