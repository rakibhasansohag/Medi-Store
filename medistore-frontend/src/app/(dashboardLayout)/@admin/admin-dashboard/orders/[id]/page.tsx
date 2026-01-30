import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { orderService } from '@/services/order.service';
import { AdminOrderDetail } from '@/components/modules/admin/AdminOrderDetail';
import { CustomerDataSection } from '@/components/modules/admin/CustomerDataSection';
import { CustomerInfoSkeleton } from '@/components/modules/admin/Skeletons';

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
	const { id } = await params;

	// Fetch Order first - this blocks the initial shell
	const { data: order, success } = await orderService.getOrderById(id);

	if (!success || !order) notFound();

	return (
		<div className='container mx-auto p-4 md:p-6 space-y-6'>
			<AdminOrderDetail order={order}>
				{/* We pass the CustomerSection as a child to keep the layout structure intact */}
				<Suspense fallback={<CustomerInfoSkeleton />}>
					<CustomerDataSection
						customerId={order.customerId}
						orderShippingAddress={order.shippingAddress}
					/>
				</Suspense>
			</AdminOrderDetail>
		</div>
	);
}
