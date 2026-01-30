import { OrderDetail } from '@/components/modules/customer/OrderDetail';
import { orderService } from '@/services/order.service';
import { notFound } from 'next/navigation';

interface OrderDetailPageProps {
	params: Promise<{ id: string }>;
}

export default async function CustomerOrderDetailPage({
	params,
}: OrderDetailPageProps) {
	const { id } = await params;

	const { data, success } = await orderService.getOrderById(id);

	if (!success || !data) {
		notFound();
	}

	return (
		<div className='space-y-6'>
			<OrderDetail order={data} />
		</div>
	);
}
