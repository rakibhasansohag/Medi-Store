'use client';

import { IMedicine } from '@/types';

export interface CartItem extends IMedicine {
	quantity: number;
}

class CartStore {
	private items: CartItem[] = [];
	private listeners: Set<() => void> = new Set();

	constructor() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('cart');
			if (stored) {
				try {
					this.items = JSON.parse(stored);
				} catch {
					this.items = [];
				}
			}
		}
	}

	subscribe(listener: () => void) {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	private notify() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('cart', JSON.stringify(this.items));
		}
		this.listeners.forEach((listener) => listener());
	}

	getItems(): CartItem[] {
		return this.items;
	}

	addItem(medicine: IMedicine, quantity: number = 1) {
		const existingItem = this.items.find((item) => item.id === medicine.id);

		if (existingItem) {
			this.items = this.items.map((item) =>
				item.id === medicine.id
					? { ...item, quantity: item.quantity + quantity }
					: item,
			);
		} else {
			this.items = [...this.items, { ...medicine, quantity }];
		}

		this.notify();
	}

	updateQuantity(id: string, quantity: number) {
		if (quantity <= 0) {
			this.removeItem(id);
			return;
		}

		this.items = this.items.map((item) =>
			item.id === id ? { ...item, quantity } : item,
		);

		this.notify();
	}

	removeItem(id: string) {
		// filter already returns a NEW array reference
		this.items = this.items.filter((item) => item.id !== id);
		this.notify();
	}

	clear() {
		this.items = [];
		this.notify();
	}
}

export const cartStore = new CartStore();
