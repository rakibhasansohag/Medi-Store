import { SellerOrderTable } from '@/components/modules/seller/sellerOrderTables';
import { orderService } from '@/services/order.service';
import { medicineService } from '@/services/medicine.service';

export default async function SellerOrdersPage() {
	const [ordersRes, medicinesRes] = await Promise.all([
		orderService.getAllOrders(),
		medicineService.getMyMedicines(),
	]);

	const allOrders = ordersRes.data || [];
	const myMedicines = medicinesRes.data || [];

	// Get my medicine IDs
	const myMedicineIds = new Set(myMedicines.map((m) => m.id));

	// Filter orders that contain my medicines
	const myOrders = allOrders.filter((order) =>
		order.items.some((item) => myMedicineIds.has(item.medicineId)),
	);

	console.log({
		allOrders,
		myMedicines,
		myOrders,
	});

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>My Orders</h1>
				<p className='text-muted-foreground'>
					Orders containing your medicines ({myOrders.length} total)
				</p>
			</div>

			<SellerOrderTable orders={myOrders} />
		</div>
	);
}
