'use client';

import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';

export function CartContent() {
	const { items, updateQuantity, removeItem, totalPrice, clear } = useCart();

	if (items.length === 0) {
		return (
			<div className='text-center py-16'>
				<div className='text-6xl mb-4'>🛒</div>
				<h3 className='text-2xl font-semibold mb-2'>Your cart is empty</h3>
				<p className='text-muted-foreground mb-6'>
					Add some medicines to get started
				</p>
				<Button asChild>
					<Link href='/shop'>Start Shopping</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className='grid lg:grid-cols-[1fr_400px] gap-8'>
			{/* Cart Items */}
			<div className='space-y-4'>
				{items.map((item) => (
					<Card key={item.id}>
						<CardContent className='p-4'>
							<div className='flex gap-4'>
								{/* Image */}
								<div className='relative w-32 h-24 rounded-md overflow-hidden bg-muted shrink-0'>
									{item.imageUrl ? (
										<Image
											src={item.imageUrl}
											alt={item.name}
											fill
											className='object-cover'
										/>
									) : (
										<div className='w-full h-full flex items-center justify-center text-4xl'>
											💊
										</div>
									)}
								</div>

								{/* Details */}
								<div className='flex-1 space-y-2'>
									<div>
										<h3 className='font-semibold'>{item.name}</h3>
										<p className='text-sm text-muted-foreground'>
											{item.manufacturer}
										</p>
									</div>

									<div className='flex items-center justify-between'>
										<div className='flex items-center border rounded-md'>
											<Button
												variant='ghost'
												size='icon'
												className='h-8 w-8'
												onClick={() =>
													updateQuantity(item.id, item.quantity - 1)
												}
											>
												<Minus className='h-4 w-4' />
											</Button>
											<span className='w-12 text-center font-semibold'>
												{item.quantity}
											</span>
											<Button
												variant='ghost'
												size='icon'
												className='h-8 w-8'
												onClick={() =>
													updateQuantity(item.id, item.quantity + 1)
												}
												disabled={item.quantity >= item.stock}
											>
												<Plus className='h-4 w-4' />
											</Button>
										</div>

										<div className='text-right'>
											<p className='font-bold text-lg'>
												${(item.price * item.quantity).toFixed(2)}
											</p>
											<p className='text-sm text-muted-foreground'>
												${item.price.toFixed(2)} each
											</p>
										</div>
									</div>
								</div>

								{/* Remove Button */}
								<Button
									variant='ghost'
									size='icon'
									onClick={() => removeItem(item.id)}
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</CardContent>
					</Card>
				))}

				<Button variant='outline' onClick={clear} className='w-full'>
					Clear Cart
				</Button>
			</div>

			{/* Order Summary */}
			<div className='lg:sticky lg:top-4 h-fit'>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<h3 className='text-xl font-bold'>Order Summary</h3>
						<Separator />

						<div className='space-y-2'>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Subtotal</span>
								<span className='font-semibold'>${totalPrice.toFixed(2)}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Shipping</span>
								<span className='font-semibold'>FREE</span>
							</div>
							<Separator />
							<div className='flex justify-between text-lg'>
								<span className='font-bold'>Total</span>
								<span className='font-bold text-primary'>
									${totalPrice.toFixed(2)}
								</span>
							</div>
						</div>
						<Button className='w-full' size='lg' asChild>
							<Link href='/checkout'>Proceed to Checkout</Link>
						</Button>

						<Button variant='outline' className='w-full' asChild>
							<Link href='/shop'>Continue Shopping</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
