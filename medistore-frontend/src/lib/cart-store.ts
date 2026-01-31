'use client';

import { IMedicine } from '@/types';

export interface CartItem extends IMedicine {
	quantity: number;
}

class CartStore {
	private items: CartItem[] = [];
	private listeners: Set<() => void> = new Set();
	private currentUserId: string | null = null;

	constructor() {
		// Don't load cart in constructor - wait for user initialization
	}

	// Initialize cart for specific user
	initialize(userId: string | null) {
		// If user changed, clear and reload
		if (this.currentUserId !== userId) {
			this.currentUserId = userId;
			this.loadCart();
		}
	}

	private getStorageKey(): string {
		return this.currentUserId ? `cart_${this.currentUserId}` : 'cart_guest';
	}

	private loadCart() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(this.getStorageKey());
			if (stored) {
				try {
					this.items = JSON.parse(stored);
				} catch {
					this.items = [];
				}
			} else {
				this.items = [];
			}
			this.notify();
		}
	}

	subscribe(listener: () => void) {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	private notify() {
		if (typeof window !== 'undefined') {
			localStorage.setItem(this.getStorageKey(), JSON.stringify(this.items));
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
		this.items = this.items.filter((item) => item.id !== id);
		this.notify();
	}

	clear() {
		this.items = [];
		this.notify();
	}

	// Clear cart when user logs out
	clearUserCart() {
		if (typeof window !== 'undefined' && this.currentUserId) {
			localStorage.removeItem(this.getStorageKey());
		}
		this.items = [];
		this.currentUserId = null;
		this.notify();
	}
}

export const cartStore = new CartStore();
