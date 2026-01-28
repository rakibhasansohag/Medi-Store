'use client';

import { IMedicine } from '@/types';

export interface CartItem extends IMedicine {
	quantity: number;
}

class CartStore {
	private items: CartItem[] = [];
	private listeners: (() => void)[] = [];

	constructor() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('cart');
			if (stored) {
				this.items = JSON.parse(stored);
			}
		}
	}

	subscribe(listener: () => void) {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener);
		};
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
		const existingIndex = this.items.findIndex(
			(item) => item.id === medicine.id,
		);

		if (existingIndex > -1) {
			this.items[existingIndex].quantity += quantity;
		} else {
			this.items.push({ ...medicine, quantity });
		}

		this.notify();
	}

	updateQuantity(id: string, quantity: number) {
		const index = this.items.findIndex((item) => item.id === id);
		if (index > -1) {
			if (quantity <= 0) {
				this.items.splice(index, 1);
			} else {
				this.items[index].quantity = quantity;
			}
			this.notify();
		}
	}

	removeItem(id: string) {
		this.items = this.items.filter((item) => item.id !== id);
		this.notify();
	}

	clear() {
		this.items = [];
		this.notify();
	}

	getTotalItems(): number {
		return this.items.reduce((sum, item) => sum + item.quantity, 0);
	}

	getTotalPrice(): number {
		return this.items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		);
	}
}

export const cartStore = new CartStore();
