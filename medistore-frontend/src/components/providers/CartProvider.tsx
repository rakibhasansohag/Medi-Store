'use client';

import { useEffect } from 'react';
import { cartStore } from '@/lib/cart-store';

interface CartProviderProps {
	children: React.ReactNode;
	userId: string | null;
}

export function CartProvider({ children, userId }: CartProviderProps) {
	useEffect(() => {
		cartStore.initialize(userId);
	}, [userId]);

	return <>{children}</>;
}
