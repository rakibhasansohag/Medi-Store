import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IMedicine } from '@/types';
import { ShoppingCart } from 'lucide-react';

interface MedicineCardProps {
	medicine: IMedicine;
}

export function MedicineCard({ medicine }: MedicineCardProps) {
	return (
		<Card className='group h-full flex flex-col transition-all hover:shadow-lg pt-0'>
			<Link href={`/shop/${medicine.id}`}>
				<div className='relative w-full aspect-square overflow-hidden rounded-t-lg bg-muted'>
					{medicine.imageUrl ? (
						<Image
							src={medicine.imageUrl}
							alt={medicine.name}
							fill
							className='object-cover transition-transform group-hover:scale-105'
						/>
					) : (
						<div className='w-full h-full flex items-center justify-center text-6xl'>
							💊
						</div>
					)}
					{medicine.stock < 10 && (
						<Badge variant='destructive' className='absolute top-2 right-2'>
							Low Stock
						</Badge>
					)}
				</div>
			</Link>

			<CardContent className='flex-1 p-4 space-y-2'>
				<Link href={`/shop/${medicine.id}`}>
					<h3 className='font-semibold line-clamp-2 group-hover:text-primary transition-colors'>
						{medicine.name}
					</h3>
				</Link>
				<p className='text-sm text-muted-foreground line-clamp-2'>
					{medicine.description}
				</p>
				<div className='flex items-center justify-between'>
					<span className='text-2xl font-bold text-primary'>
						${medicine.price.toFixed(2)}
					</span>
					{medicine.category && (
						<Badge variant='secondary'>{medicine.category.name}</Badge>
					)}
				</div>
			</CardContent>

			<CardFooter className='p-4 pt-0'>
				<Button className='w-full' size='sm'>
					<ShoppingCart className='mr-2 h-4 w-4' />
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	);
}
