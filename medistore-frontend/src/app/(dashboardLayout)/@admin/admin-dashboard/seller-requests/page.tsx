import { SellerRequestsTable } from '@/components/modules/admin/SellerRequestsTable';
import { userService } from '@/services/user.service';

export default async function SellerRequestsPage() {
	const { data } = await userService.getPendingSellerRequests();

	const requests = data || [];

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Seller Requests</h1>
				<p className='text-muted-foreground'>
					Review and approve seller applications
				</p>
			</div>

			<SellerRequestsTable requests={requests} />
		</div>
	);
}
