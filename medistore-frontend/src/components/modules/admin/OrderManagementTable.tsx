'use client';

import { useState } from 'react';
import { IOrder, OrderStatus } from '@/types';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { updateOrderStatus } from '@/actions/order.action';
import { toast } from 'sonner';

interface OrderManagementTableProps {
	orders: IOrder[];
}

const statusColors: Record<OrderStatus, string> = {
	[OrderStatus.PLACED]: 'bg-blue-500',
	[OrderStatus.PROCESSING]: 'bg-yellow-500',
	[OrderStatus.SHIPPED]: 'bg-purple-500',
	[OrderStatus.DELIVERED]: 'bg-green-500',
	[OrderStatus.CANCELLED]: 'bg-red-500',
};

export function OrderManagementTable({ orders }: OrderManagementTableProps) {
	const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

	const handleStatusChange = async (orderId: string, newStatus: string) => {
		setUpdatingOrder(orderId);
		const loadingToast = toast.loading('Updating order status...');

		const result = await updateOrderStatus(orderId, newStatus);

		if (result.success) {
			toast.success('Order status updated', { id: loadingToast });
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setUpdatingOrder(null);
	};

	if (orders.length === 0) {
		return (
			<div className='border rounded-lg p-8 text-center'>
				<p className='text-muted-foreground'>No orders found</p>
			</div>
		);
	}

	return (
		<div className='border rounded-lg'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Order Number</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Customer</TableHead>
						<TableHead>Items</TableHead>
						<TableHead>Total</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.map((order) => (
						<TableRow key={order.id}>
							<TableCell className='font-medium'>{order.orderNumber}</TableCell>
							<TableCell>
								{new Date(order.createdAt).toLocaleDateString()}
							</TableCell>
							<TableCell className='text-sm text-muted-foreground'>
								{order.customerId.slice(0, 8)}...
							</TableCell>
							<TableCell>{order.items.length} items</TableCell>
							<TableCell className='font-semibold'>
								${order.totalAmount.toFixed(2)}
							</TableCell>
							<TableCell>
								<Select
									value={order.status}
									onValueChange={(value) => handleStatusChange(order.id, value)}
									disabled={
										updatingOrder === order.id ||
										order.status === OrderStatus.CANCELLED ||
										order.status === OrderStatus.DELIVERED
									}
								>
									<SelectTrigger className='w-35'>
										<SelectValue>
											<Badge
												className={statusColors[order.status as OrderStatus]}
											>
												{order.status}
											</Badge>
										</SelectValue>
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
										<SelectItem value={OrderStatus.CANCELLED}>
											<Badge className={statusColors[OrderStatus.CANCELLED]}>
												CANCELLED
											</Badge>
										</SelectItem>
									</SelectContent>
								</Select>
							</TableCell>
							<TableCell className='text-right'>
								<Button variant='ghost' size='icon' asChild>
									<Link href={`/admin-dashboard/orders/${order.id}`}>
										<Eye className='h-4 w-4' />
									</Link>
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
