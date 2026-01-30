'use client';

import { useState, ReactNode } from 'react';
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
import { ArrowLeft, Package, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AdminOrderDetailProps {
	order: IOrder;
	children: ReactNode; 
}

const statusColors: Record<OrderStatus, string> = {
	[OrderStatus.PLACED]: 'bg-blue-500 hover:bg-blue-600',
	[OrderStatus.PROCESSING]: 'bg-yellow-500 hover:bg-yellow-600',
	[OrderStatus.SHIPPED]: 'bg-purple-500 hover:bg-purple-600',
	[OrderStatus.DELIVERED]: 'bg-green-500 hover:bg-green-600',
	[OrderStatus.CANCELLED]: 'bg-red-500 hover:bg-red-600',
};

export function AdminOrderDetail({ order, children }: AdminOrderDetailProps) {
	const router = useRouter();
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);

	const handleStatusChange = async (newStatus: string): Promise<void> => {
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
			<div className='flex flex-col sm:flex-row sm:items-center gap-4'>
				<div className='flex items-center gap-3'>
					<Button
						variant='outline'
						size='icon'
						asChild
						className='rounded-full'
					>
						<Link href='/admin-dashboard/orders'>
							<ArrowLeft className='h-5 w-5' />
						</Link>
					</Button>
					<div>
						<h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
							Order Details
						</h1>
						<p className='text-sm text-muted-foreground font-mono'>
							#{order.orderNumber}
						</p>
					</div>
				</div>
				<div className='sm:ml-auto'>
					<Badge
						className={cn(
							statusColors[currentStatus],
							'text-white px-4 py-1.5 text-sm capitalize',
						)}
					>
						{currentStatus.toLowerCase()}
					</Badge>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Left Column: Items & Customer (Children) */}
				<div className='lg:col-span-2 space-y-6'>
					<Card className='overflow-hidden border-none shadow-sm bg-muted/30'>
						<CardHeader className='bg-background/50'>
							<CardTitle className='flex items-center gap-2'>
								<Package className='h-5 w-5 text-primary' />
								Order Items ({order.items.length})
							</CardTitle>
						</CardHeader>
						<CardContent className='divide-y divide-border p-0'>
							{order.items.map((item) => (
								<div
									key={item.id}
									className='flex gap-4 p-4 hover:bg-muted/50 transition-colors'
								>
									<div className='relative w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0 border'>
										{item.medicine?.imageUrl ? (
											<Image
												src={item.medicine.imageUrl}
												alt={item.medicine.name}
												fill
												className='object-contain p-1'
											/>
										) : (
											<div className='w-full h-full flex items-center justify-center text-2xl'>
												💊
											</div>
										)}
									</div>
									<div className='flex-1 flex flex-col justify-center'>
										<div className='flex justify-between items-start'>
											<div>
												<p className='font-bold text-base'>
													{item.medicine?.name}
												</p>
												<p className='text-xs text-muted-foreground'>
													ID: {item.medicineId.slice(-8)}
												</p>
											</div>
											<p className='font-bold'>
												${(item.price * item.quantity).toFixed(2)}
											</p>
										</div>
										<div className='flex justify-between items-center mt-2'>
											<p className='text-sm text-muted-foreground'>
												${item.price.toFixed(2)} × {item.quantity}
											</p>
										</div>
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					{/* The Streamed Customer Card renders here */}
					{children}
				</div>

				{/* Right Column: Summary & Actions */}
				<div className='space-y-6'>
					<Card className='shadow-sm border-primary/10'>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-3'>
								<div className='flex justify-between text-sm'>
									<span className='text-muted-foreground flex items-center gap-2'>
										<Calendar className='h-4 w-4' /> Date
									</span>
									<span className='font-medium'>
										{new Date(order.createdAt).toLocaleDateString()}
									</span>
								</div>
								<div className='flex justify-between text-sm'>
									<span className='text-muted-foreground flex items-center gap-2'>
										<Clock className='h-4 w-4' /> Updated
									</span>
									<span className='font-medium'>
										{new Date(order.updatedAt).toLocaleDateString()}
									</span>
								</div>
								<Separator />
								<div className='flex justify-between text-sm'>
									<span className='text-muted-foreground'>Subtotal</span>
									<span>${order.totalAmount.toFixed(2)}</span>
								</div>
								<div className='flex justify-between text-sm font-medium text-green-600'>
									<span>Shipping</span>
									<span>FREE</span>
								</div>
								<Separator className='h-0.5' />
								<div className='flex justify-between text-xl font-black pt-2'>
									<span>Total</span>
									<span className='text-primary'>
										${order.totalAmount.toFixed(2)}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{canUpdateStatus && (
						<Card className='border-2 border-primary/5 shadow-md'>
							<CardHeader>
								<CardTitle className='text-lg'>Status Management</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<Select
									value={currentStatus}
									onValueChange={handleStatusChange}
									disabled={isUpdating}
								>
									<SelectTrigger className='w-full h-12'>
										<SelectValue placeholder='Select status' />
									</SelectTrigger>
									<SelectContent>
										{Object.values(OrderStatus).map((status) => (
											<SelectItem key={status} value={status}>
												<div className='flex items-center gap-2'>
													<div
														className={cn(
															'h-2 w-2 rounded-full',
															statusColors[status],
														)}
													/>
													{status}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<p className='text-xs text-center text-muted-foreground italic'>
									Changing status triggers a customer notification.
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
