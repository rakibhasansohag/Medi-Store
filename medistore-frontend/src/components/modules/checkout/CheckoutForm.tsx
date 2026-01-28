'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { createOrder } from '@/actions/order.action';
import { IUser } from '@/types';
import Image from 'next/image';

const checkoutSchema = z.object({
	shippingAddress: z.string().min(10, 'Address must be at least 10 characters'),
	city: z.string().min(2, 'City is required'),
	postalCode: z.string().min(4, 'Postal code is required'),
	phone: z.string().min(10, 'Valid phone number is required'),
});

interface CheckoutFormProps {
	user: IUser;
}

export function CheckoutForm({ user }: CheckoutFormProps) {
	const router = useRouter();
	const { items, totalPrice, clear } = useCart();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		defaultValues: {
			shippingAddress: '',
			city: '',
			postalCode: '',
			phone: user.phone || '',
		},
		validators: {
			onChange: checkoutSchema,
		},
		onSubmit: async ({ value }) => {
			if (items.length === 0) {
				toast.error('Your cart is empty');
				return;
			}

			setIsSubmitting(true);
			const loadingToast = toast.loading('Creating order...');

			const fullAddress = `${value.shippingAddress}, ${value.city}, ${value.postalCode}`;

			const orderData = {
				shippingAddress: fullAddress,
				phone: value.phone,
				items: items.map((item) => ({
					medicineId: item.id,
					quantity: item.quantity,
					price: item.price,
				})),
			};

			const result = await createOrder(orderData);

			if (result.success) {
				toast.success('Order placed successfully!', { id: loadingToast });
				clear(); // Clear cart
				router.push(`/dashboard/orders/${result.data?.id}`);
			} else {
				toast.error(result.message, { id: loadingToast });
				setIsSubmitting(false);
			}
		},
	});

	if (items.length === 0) {
		return (
			<div className='text-center py-16'>
				<div className='text-6xl mb-4'>🛒</div>
				<h3 className='text-2xl font-semibold mb-2'>Your cart is empty</h3>
				<p className='text-muted-foreground mb-6'>
					Add some medicines before checkout
				</p>
				<Button onClick={() => router.push('/shop')}>Go to Shop</Button>
			</div>
		);
	}

	return (
		<div className='grid lg:grid-cols-[1fr_400px] gap-8'>
			{/* Shipping Form */}
			<Card>
				<CardHeader>
					<CardTitle>Shipping Information</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field name='shippingAddress'>
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched &&
										field.state.meta.errors.length > 0;
									return (
										<Field>
											<FieldLabel htmlFor={field.name}>
												Street Address
											</FieldLabel>
											<Textarea
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder='123 Main Street, Apt 4B'
												rows={3}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<div className='grid md:grid-cols-2 gap-4'>
								<form.Field name='city'>
									{(field) => {
										const isInvalid =
											field.state.meta.isTouched &&
											field.state.meta.errors.length > 0;
										return (
											<Field>
												<FieldLabel htmlFor={field.name}>City</FieldLabel>
												<Input
													type='text'
													id={field.name}
													name={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder='New York'
												/>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										);
									}}
								</form.Field>

								<form.Field name='postalCode'>
									{(field) => {
										const isInvalid =
											field.state.meta.isTouched &&
											field.state.meta.errors.length > 0;
										return (
											<Field>
												<FieldLabel htmlFor={field.name}>
													Postal Code
												</FieldLabel>
												<Input
													type='text'
													id={field.name}
													name={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder='10001'
												/>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										);
									}}
								</form.Field>
							</div>

							<form.Field name='phone'>
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched &&
										field.state.meta.errors.length > 0;
									return (
										<Field>
											<FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
											<Input
												type='tel'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder='+1 (555) 000-0000'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<Button type='submit' size='lg' disabled={isSubmitting}>
								{isSubmitting ? 'Processing...' : 'Place Order'}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>

			{/* Order Summary */}
			<div className='space-y-4'>
				<Card>
					<CardHeader>
						<CardTitle>Order Summary</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-3'>
							{items.map((item) => (
								<div key={item.id} className='flex gap-3'>
									<div className='relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0'>
										{item.imageUrl ? (
											<Image
												src={item.imageUrl}
												alt={item.name}
												fill
												className='object-cover'
											/>
										) : (
											<div className='w-full h-full flex items-center justify-center text-2xl'>
												💊
											</div>
										)}
									</div>
									<div className='flex-1'>
										<p className='font-medium text-sm line-clamp-1'>
											{item.name}
										</p>
										<p className='text-xs text-muted-foreground'>
											Qty: {item.quantity}
										</p>
										<p className='text-sm font-semibold'>
											${(item.price * item.quantity).toFixed(2)}
										</p>
									</div>
								</div>
							))}
						</div>

						<Separator />

						<div className='space-y-2'>
							<div className='flex justify-between text-sm'>
								<span className='text-muted-foreground'>Subtotal</span>
								<span className='font-semibold'>${totalPrice.toFixed(2)}</span>
							</div>
							<div className='flex justify-between text-sm'>
								<span className='text-muted-foreground'>Shipping</span>
								<span className='font-semibold'>FREE</span>
							</div>
							<div className='flex justify-between text-sm'>
								<span className='text-muted-foreground'>Tax</span>
								<span className='font-semibold'>$0.00</span>
							</div>
							<Separator />
							<div className='flex justify-between text-lg'>
								<span className='font-bold'>Total</span>
								<span className='font-bold text-primary'>
									${totalPrice.toFixed(2)}
								</span>
							</div>
						</div>

						<div className='bg-muted p-3 rounded-md text-sm'>
							<p className='font-semibold mb-1'>Payment Method</p>
							<p className='text-muted-foreground'>Cash on Delivery (COD)</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
