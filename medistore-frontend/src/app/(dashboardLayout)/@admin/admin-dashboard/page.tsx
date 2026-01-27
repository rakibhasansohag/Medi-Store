import { StatsCards } from '@/components/modules/admin/StatsCards';
import { categoryService } from '@/services/category.service';
import { medicineService } from '@/services/medicine.service';

export default async function AdminDashboardPage() {
	// Fetch data in parallel
	const [categoriesRes, medicinesRes] = await Promise.all([
		categoryService.getCategories(),
		medicineService.getMedicines({ limit: '1' }),
	]);

	const totalCategories = categoriesRes.data?.data?.length || 0;
	const totalMedicines = medicinesRes.data?.pagination?.total || 0;

	const stats = [
		{
			title: 'Total Categories',
			value: totalCategories,
			description: 'Active medicine categories',
		},
		{
			title: 'Total Medicines',
			value: totalMedicines,
			description: 'Listed medicines',
		},
		{
			title: 'Total Orders',
			value: 0,
			description: 'All time orders',
		},
		{
			title: 'Total Users',
			value: 0,
			description: 'Registered users',
		},
	];

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Admin Dashboard</h1>
				<p className='text-muted-foreground'>Manage your MediStore platform</p>
			</div>

			<StatsCards stats={stats} />
		</div>
	);
}
