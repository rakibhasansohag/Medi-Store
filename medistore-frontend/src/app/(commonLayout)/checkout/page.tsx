export const dynamic = 'force-dynamic';

import { CheckoutForm } from '@/components/modules/checkout/CheckoutForm';
import { redirect } from 'next/navigation';
import { userService } from '@/services/user.service';

export default async function CheckoutPage() {
	// Check if user is authenticated
	const { data } = await userService.getSession();

	if (!data?.user) {
		redirect('/login?redirect=/checkout');
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-1 bg-muted/30'>
				<div className='container mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-8'>Checkout</h1>
					<CheckoutForm user={data.user} />
				</div>
			</main>
		</div>
	);
}
