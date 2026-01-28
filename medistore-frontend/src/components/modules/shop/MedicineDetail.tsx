'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IMedicine } from '@/types';
import {
	ShoppingCart,
	Minus,
	Plus,
	Package,
	Shield,
	Truck,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface MedicineDetailProps {
	medicine: IMedicine;
}

export function MedicineDetail({ medicine }: MedicineDetailProps) {
	const [quantity, setQuantity] = useState(1);

	const handleAddToCart = () => {
		// TODO: Implement cart functionality
		toast.success(`Added ${quantity} ${medicine.name} to cart`);
	};

	const incrementQuantity = () => {
		if (quantity < medicine.stock) {
			setQuantity(quantity + 1);
		}
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid lg:grid-cols-2 gap-8'>
				{/* Image Section */}
				<div className='space-y-4'>
					<div className='relative aspect-square rounded-lg overflow-hidden bg-muted'>
						{medicine.imageUrl ? (
							<Image
								src={medicine.imageUrl}
								alt={medicine.name}
								fill
								className='object-cover'
								priority
							/>
						) : (
							<div className='w-full h-full flex items-center justify-center'>
								<span className='text-9xl'>💊</span>
							</div>
						)}
					</div>
				</div>

				{/* Details Section */}
				<div className='space-y-6'>
					{/* Category Badge */}
					{medicine.category && (
						<Badge variant='secondary' className='text-sm'>
							{medicine.category.name}
						</Badge>
					)}

					{/* Title & Price */}
					<div>
						<h1 className='text-3xl md:text-4xl font-bold mb-2'>
							{medicine.name}
						</h1>
						<p className='text-sm text-muted-foreground mb-4'>
							by {medicine.manufacturer}
						</p>
						<div className='flex items-baseline gap-2'>
							<span className='text-4xl font-bold text-primary'>
								${medicine.price.toFixed(2)}
							</span>
						</div>
					</div>

					<Separator />

					{/* Stock Info */}
					<div className='flex items-center gap-2'>
						<Package className='h-5 w-5 text-muted-foreground' />
						{medicine.stock > 0 ? (
							<span
								className={
									medicine.stock < 10 ? 'text-destructive' : 'text-success'
								}
							>
								{medicine.stock} units in stock
							</span>
						) : (
							<span className='text-destructive'>Out of stock</span>
						)}
					</div>

					{/* Description */}
					<div>
						<h3 className='font-semibold mb-2'>Description</h3>
						<p className='text-muted-foreground leading-relaxed'>
							{medicine.description}
						</p>
					</div>

					<Separator />

					{/* Quantity Selector */}
					{medicine.stock > 0 && (
						<div className='space-y-4'>
							<div className='flex items-center gap-4'>
								<span className='font-semibold'>Quantity:</span>
								<div className='flex items-center border rounded-md'>
									<Button
										variant='ghost'
										size='icon'
										onClick={decrementQuantity}
										disabled={quantity <= 1}
									>
										<Minus className='h-4 w-4' />
									</Button>
									<span className='w-12 text-center font-semibold'>
										{quantity}
									</span>
									<Button
										variant='ghost'
										size='icon'
										onClick={incrementQuantity}
										disabled={quantity >= medicine.stock}
									>
										<Plus className='h-4 w-4' />
									</Button>
								</div>
							</div>

							{/* Add to Cart Button */}
							<Button size='lg' className='w-full' onClick={handleAddToCart}>
								<ShoppingCart className='mr-2 h-5 w-5' />
								Add to Cart
							</Button>
						</div>
					)}

					{/* Features */}
					<Card>
						<CardContent className='p-4 space-y-3'>
							<div className='flex items-center gap-3'>
								<Shield className='h-5 w-5 text-primary' />
								<div>
									<p className='font-semibold text-sm'>Authentic Product</p>
									<p className='text-xs text-muted-foreground'>
										100% genuine medicine
									</p>
								</div>
							</div>
							<Separator />
							<div className='flex items-center gap-3'>
								<Truck className='h-5 w-5 text-primary' />
								<div>
									<p className='font-semibold text-sm'>Fast Delivery</p>
									<p className='text-xs text-muted-foreground'>
										Delivered in 24-48 hours
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
