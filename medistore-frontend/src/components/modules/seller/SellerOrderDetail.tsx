'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IOrder, OrderStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { updateOrderStatus } from '@/actions/order.action';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '../../../lib/utils';

interface SellerOrderDetailProps {
	order: IOrder;
}

const statusColors: Record<OrderStatus, string> = {
	[OrderStatus.PLACED]: 'bg-blue-500',
	[OrderStatus.PROCESSING]: 'bg-yellow-500',
	[OrderStatus.SHIPPED]: 'bg-purple-500',
	[OrderStatus.DELIVERED]: 'bg-green-500',
	[OrderStatus.CANCELLED]: 'bg-red-500',
};

export function SellerOrderDetail({ order }: SellerOrderDetailProps) {
	const router = useRouter();
	const [isUpdating, setIsUpdating] = useState(false);
	const [currentStatus, setCurrentStatus] = useState(order.status);

	const handleStatusChange = async (newStatus: string) => {
		setIsUpdating(true);
		const loadingToast = toast.loading('Updating order status...');

		const result = await updateOrderStatus(order.id, newStatus);

		if (result.success) {
			toast.success('Order status updated', { id: loadingToast });
			setCurrentStatus(newStatus as OrderStatus);
			router.refresh();
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setIsUpdating(false);
	};

	const canUpdateStatus =
		currentStatus !== OrderStatus.CANCELLED &&
		currentStatus !== OrderStatus.DELIVERED;

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex items-center gap-4'>
				<Button variant='ghost' size='icon' asChild>
					<Link href='/dashboard/orders'>
						<ArrowLeft className='h-5 w-5' />
					</Link>
				</Button>
				<div className='flex-1'>
					<h1 className='text-3xl font-bold'>Order Details</h1>
					<p className='text-muted-foreground'>Order #{order.orderNumber}</p>
				</div>
				<Badge
					className={cn(
						statusColors[currentStatus as OrderStatus],
						'text-base px-4 py-1',
					)}
				>
					{currentStatus}
				</Badge>
			</div>

			<div className='grid lg:grid-cols-3 gap-6'>
				{/* Order Items */}
				<div className='lg:col-span-2 space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Order Items</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							{order.items.map((item) => (
								<div key={item.id} className='flex gap-4'>
									<div className='relative w-20 h-20 rounded-md overflow-hidden bg-muted shrink-0'>
										{item.medicine?.imageUrl ? (
											<Image
												src={item.medicine.imageUrl}
												alt={item.medicine.name}
												fill
												className='object-cover'
											/>
										) : (
											<div className='w-full h-full flex items-center justify-center text-3xl'>
												💊
											</div>
										)}
									</div>
									<div className='flex-1'>
										<p className='font-semibold'>{item.medicine?.name}</p>
										<p className='text-sm text-muted-foreground'>
											Quantity: {item.quantity}
										</p>
										<p className='text-sm font-semibold mt-1'>
											${item.price.toFixed(2)} × {item.quantity} = $
											{(item.price * item.quantity).toFixed(2)}
										</p>
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Customer Info - Seller sees limited info */}
					<Card>
						<CardHeader>
							<CardTitle>Customer Information</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div>
								<p className='text-sm text-muted-foreground mb-1'>
									Customer ID
								</p>
								<p className='font-medium font-mono text-sm'>
									{order.customerId}
								</p>
							</div>
							<Separator />
							<div>
								<p className='text-sm text-muted-foreground mb-1'>
									Shipping Address
								</p>
								<p className='font-medium'>{order.shippingAddress}</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Order Summary & Actions */}
				<div className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<div className='flex justify-between text-sm'>
									<span className='text-muted-foreground'>Order Date</span>
									<span>{new Date(order.createdAt).toLocaleDateString()}</span>
								</div>
								<div className='flex justify-between text-sm'>
									<span className='text-muted-foreground'>Last Updated</span>
									<span>{new Date(order.updatedAt).toLocaleDateString()}</span>
								</div>
								<Separator />
								<div className='flex justify-between text-lg font-bold'>
									<span>Total</span>
									<span className='text-primary'>
										${order.totalAmount.toFixed(2)}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Status Management */}
					{canUpdateStatus && (
						<Card>
							<CardHeader>
								<CardTitle>Update Status</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<Select
									value={currentStatus}
									onValueChange={handleStatusChange}
									disabled={isUpdating}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={OrderStatus.PLACED}>
											<Badge className={statusColors[OrderStatus.PLACED]}>
												PLACED
											</Badge>
										</SelectItem>
										<SelectItem value={OrderStatus.PROCESSING}>
											<Badge className={statusColors[OrderStatus.PROCESSING]}>
												PROCESSING
											</Badge>
										</SelectItem>
										<SelectItem value={OrderStatus.SHIPPED}>
											<Badge className={statusColors[OrderStatus.SHIPPED]}>
												SHIPPED
											</Badge>
										</SelectItem>
										<SelectItem value={OrderStatus.DELIVERED}>
											<Badge className={statusColors[OrderStatus.DELIVERED]}>
												DELIVERED
											</Badge>
										</SelectItem>
									</SelectContent>
								</Select>
								<p className='text-xs text-muted-foreground'>
									Update the order status to keep customer informed
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
