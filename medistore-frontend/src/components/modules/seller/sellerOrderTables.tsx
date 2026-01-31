'use client';

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
import { Eye } from 'lucide-react';
import Link from 'next/link';

interface SellerOrderTableProps {
	orders: IOrder[];
}

const statusColors: Record<OrderStatus, string> = {
	[OrderStatus.PLACED]: 'bg-blue-500',
	[OrderStatus.PROCESSING]: 'bg-yellow-500',
	[OrderStatus.SHIPPED]: 'bg-purple-500',
	[OrderStatus.DELIVERED]: 'bg-green-500',
	[OrderStatus.CANCELLED]: 'bg-red-500',
};

export function SellerOrderTable({ orders }: SellerOrderTableProps) {
	if (orders.length === 0) {
		return (
			<div className='border rounded-lg p-8 text-center'>
				<p className='text-muted-foreground'>
					No orders containing your medicines yet
				</p>
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
							<TableCell>{order.items.length} items</TableCell>
							<TableCell className='font-semibold'>
								${order.totalAmount.toFixed(2)}
							</TableCell>
							<TableCell>
								<Badge className={statusColors[order.status as OrderStatus]}>
									{order.status}
								</Badge>
							</TableCell>
							<TableCell className='text-right'>
								<Button variant='ghost' size='icon' asChild>
									<Link href={`/dashboard/orders/${order.id}`}>
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
