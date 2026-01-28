'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { toast } from 'sonner';
import { IMedicine } from '@/types';

interface AddToCartButtonProps {
	medicine: IMedicine;
}

export function AddToCartButton({ medicine }: AddToCartButtonProps) {
	const { addItem } = useCart();
	const isMounted = useHasMounted();

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();

		// If the JS isn't ready yet, we just ignore the click
		if (!isMounted) return;

		addItem(medicine, 1);
		toast.success(`Added ${medicine.name} to cart`);
	};

	return (
		<Button
			className='w-full'
			size='sm'
			onClick={handleAddToCart}
			// Disable until hydrated to prevent state updates on unmounted components
			disabled={!isMounted || medicine.stock === 0}
		>
			<ShoppingCart className='mr-2 h-4 w-4' />
			{!isMounted
				? 'Loading...'
				: medicine.stock === 0
				? 'Out of Stock'
				: 'Add to Cart'}
		</Button>
	);
}
