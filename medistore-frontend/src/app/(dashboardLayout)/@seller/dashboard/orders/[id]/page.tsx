import { SellerOrderDetail } from '@/components/modules/seller/SellerOrderDetail';
import { orderService } from '@/services/order.service';
import { notFound } from 'next/navigation';

interface SellerOrderDetailPageProps {
	params: Promise<{ id: string }>;
}

export default async function SellerOrderDetailPage({
	params,
}: SellerOrderDetailPageProps) {
	const { id } = await params;

	const { data, success } = await orderService.getOrderById(id);

	if (!success || !data) {
		notFound();
	}

	return (
		<div className='space-y-6'>
			<SellerOrderDetail order={data} />
		</div>
	);
}
