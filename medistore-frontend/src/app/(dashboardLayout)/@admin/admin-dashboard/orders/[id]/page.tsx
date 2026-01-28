import { AdminOrderDetail } from '@/components/modules/admin/AdminOrderDetail';
import { orderService } from '@/services/order.service';
import { notFound } from 'next/navigation';

interface AdminOrderDetailPageProps {
	params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({
	params,
}: AdminOrderDetailPageProps) {
	const { id } = await params;

	const { data, success } = await orderService.getOrderById(id);

	if (!success || !data) {
		notFound();
	}

	return (
		<div className='space-y-6'>
			<AdminOrderDetail order={data} />
		</div>
	);
}
