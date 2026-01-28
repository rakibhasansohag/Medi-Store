import { CartContent } from '@/components/modules/cart/CartContent';

export default function CartPage() {
	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-1 bg-muted/30'>
				<div className='container mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-8'>Shopping Cart</h1>
					<CartContent />
				</div>
			</main>
		</div>
	);
}
