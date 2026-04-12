import { SellerOrderDetail } from '@/components/modules/seller/SellerOrderDetail';
import { orderService } from '@/services/order.service';
import { notFound } from 'next/navigation';

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function SellerOrderDetailPage({ params }: PageProps) {
	const { id } = await params;

	const { data: order, success } = await orderService.getOrderById(id);

	if (!success || !order) notFound();

	return (
		<div className='container mx-auto p-4 md:p-6 space-y-6'>
			<SellerOrderDetail order={order} />
		</div>
	);
}
