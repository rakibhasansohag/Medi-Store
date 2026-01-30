'use client';

import { IOrder, OrderStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { cancelOrder } from '@/actions/order.action';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { DeleteConfirmDialog } from '@/components/shared/DeleteConfirmDialog';
import { cn } from '@/lib/utils';

interface OrderDetailProps {
	order: IOrder;
}

const statusColors: Record<OrderStatus, string> = {
	[OrderStatus.PLACED]: 'bg-blue-500',
	[OrderStatus.PROCESSING]: 'bg-yellow-500',
	[OrderStatus.SHIPPED]: 'bg-purple-500',
	[OrderStatus.DELIVERED]: 'bg-green-500',
	[OrderStatus.CANCELLED]: 'bg-red-500',
};

export function OrderDetail({ order }: OrderDetailProps) {
	const router = useRouter();
	const [isCancelling, setIsCancelling] = useState(false);
	const [cancelDialog, setCancelDialog] = useState(false);

	const handleCancel = async () => {
		setIsCancelling(true);
		setCancelDialog(false);
		const loadingToast = toast.loading('Cancelling order...');

		const result = await cancelOrder(order.id);

		if (result.success) {
			toast.success('Order cancelled successfully. Stock has been restored.', {
				id: loadingToast,
			});
			router.refresh();
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setIsCancelling(false);
	};

	const canCancel = order.status === OrderStatus.PLACED;
	const currentStatus = order.status as OrderStatus;

	// Order status timeline
	const statusTimeline = [
		{
			status: OrderStatus.PLACED,
			icon: Package,
			label: 'Order Placed',
			active: true,
		},
		{
			status: OrderStatus.PROCESSING,
			icon: Package,
			label: 'Processing',
			active:
				currentStatus === OrderStatus.PROCESSING ||
				currentStatus === OrderStatus.SHIPPED ||
				currentStatus === OrderStatus.DELIVERED,
		},
		{
			status: OrderStatus.SHIPPED,
			icon: Truck,
			label: 'Shipped',
			active:
				currentStatus === OrderStatus.SHIPPED ||
				currentStatus === OrderStatus.DELIVERED,
		},
		{
			status: OrderStatus.DELIVERED,
			icon: CheckCircle,
			label: 'Delivered',
			active: currentStatus === OrderStatus.DELIVERED,
		},
	];

	return (
		<>
			<div className='space-y-6'>
				{/* Header */}
				<div className='flex items-start justify-between'>
					<div className='flex items-center gap-4'>
						<Button variant='ghost' size='icon' asChild>
							<Link href='/dashboard/orders'>
								<ArrowLeft className='h-5 w-5' />
							</Link>
						</Button>
						<div>
							<h1 className='text-3xl font-bold'>Order Details</h1>
							<p className='text-muted-foreground'>
								Order #{order.orderNumber}
							</p>
						</div>
					</div>
					<div className='flex items-center gap-3'>
						<Badge
							className={cn(
								statusColors[currentStatus as OrderStatus],
								'text-base px-4 py-1',
							)}
						>
							{currentStatus}
						</Badge>
						{canCancel && (
							<Button
								variant='destructive'
								onClick={() => setCancelDialog(true)}
								disabled={isCancelling}
							>
								{isCancelling ? 'Cancelling...' : 'Cancel Order'}
							</Button>
						)}
					</div>
				</div>

				{/* Status Timeline - Only show if not cancelled */}
				{currentStatus !== OrderStatus.CANCELLED && (
					<Card>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								{statusTimeline.map((step, index) => {
									const Icon = step.icon;
									return (
										<div key={step.status} className='flex items-center flex-1'>
											<div className='flex flex-col items-center'>
												<div
													className={`w-12 h-12 rounded-full flex items-center justify-center ${
														step.active
															? 'bg-primary text-primary-foreground'
															: 'bg-muted text-muted-foreground'
													}`}
												>
													<Icon className='h-6 w-6' />
												</div>
												<p
													className={`text-sm mt-2 font-medium ${
														step.active
															? 'text-foreground'
															: 'text-muted-foreground'
													}`}
												>
													{step.label}
												</p>
											</div>
											{index < statusTimeline.length - 1 && (
												<div
													className={`flex-1 h-1 mx-4 ${
														step.active ? 'bg-primary' : 'bg-muted'
													}`}
												/>
											)}
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				)}

				{/* Cancelled Notice */}
				{currentStatus === OrderStatus.CANCELLED && (
					<Card className='border-destructive'>
						<CardContent className='p-6'>
							<div className='flex items-center gap-3 text-destructive'>
								<XCircle className='h-6 w-6' />
								<div>
									<p className='font-semibold text-lg'>Order Cancelled</p>
									<p className='text-sm text-muted-foreground'>
										This order was cancelled on{' '}
										{new Date(order.updatedAt).toLocaleString()}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				<div className='grid lg:grid-cols-3 gap-6'>
					{/* Order Items */}
					<div className='lg:col-span-2 space-y-4'>
						<Card>
							<CardHeader>
								<CardTitle>Order Items</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								{order.items.map((item) => (
									<div
										key={item.id}
										className='flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors'
									>
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
											<p className='font-semibold text-lg'>
												{item.medicine?.name}
											</p>
											<p className='text-sm text-muted-foreground mb-2'>
												Quantity: {item.quantity}{' '}
												{item.quantity > 1 ? 'units' : 'unit'}
											</p>
											<div className='flex items-center justify-between'>
												<p className='text-sm text-muted-foreground'>
													${item.price.toFixed(2)} per unit
												</p>
												<p className='text-lg font-bold text-primary'>
													${(item.price * item.quantity).toFixed(2)}
												</p>
											</div>
										</div>
									</div>
								))}
							</CardContent>
						</Card>

						{/* Shipping Address */}
						<Card>
							<CardHeader>
								<CardTitle>Shipping Address</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='bg-muted p-4 rounded-lg'>
									<p className='font-medium'>{order.shippingAddress}</p>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Order Summary */}
					<div className='space-y-4'>
						<Card>
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-3'>
									<div className='flex justify-between text-sm'>
										<span className='text-muted-foreground'>Order Date</span>
										<span className='font-medium'>
											{new Date(order.createdAt).toLocaleDateString()}
										</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-muted-foreground'>Order Time</span>
										<span className='font-medium'>
											{new Date(order.createdAt).toLocaleTimeString()}
										</span>
									</div>
									<Separator />
									<div className='flex justify-between text-sm'>
										<span className='text-muted-foreground'>Subtotal</span>
										<span className='font-medium'>
											${order.totalAmount.toFixed(2)}
										</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-muted-foreground'>Shipping</span>
										<span className='font-medium text-green-600'>FREE</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-muted-foreground'>Tax</span>
										<span className='font-medium'>$0.00</span>
									</div>
									<Separator />
									<div className='flex justify-between items-center'>
										<span className='font-bold text-lg'>Total</span>
										<span className='font-bold text-2xl text-primary'>
											${order.totalAmount.toFixed(2)}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Payment Method</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='bg-muted p-4 rounded-lg'>
									<p className='font-semibold mb-1'>Cash on Delivery (COD)</p>
									<p className='text-sm text-muted-foreground'>
										Pay when you receive your order
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Order Actions */}
						<Card>
							<CardHeader>
								<CardTitle>Need Help?</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2'>
								{canCancel && (
									<div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg'>
										<p className='text-sm text-yellow-800 dark:text-yellow-200'>
											You can cancel this order before it's processed.
										</p>
									</div>
								)}
								<Button variant='outline' className='w-full' asChild>
									<Link href='/contact'>Contact Support</Link>
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<DeleteConfirmDialog
				open={cancelDialog}
				onOpenChange={setCancelDialog}
				onConfirm={handleCancel}
				title='Cancel Order?'
				description='Are you sure you want to cancel this order? The items will be returned to stock and you will not be charged.'
				itemName={`Order #${order.orderNumber}`}
			/>
		</>
	);
}
