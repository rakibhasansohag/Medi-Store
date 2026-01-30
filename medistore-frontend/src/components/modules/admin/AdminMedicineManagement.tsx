'use client';

import { useState } from 'react';
import { IMedicineWithSeller } from '@/types';
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
import { Input } from '@/components/ui/input';
import { Eye, Trash2, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteMedicine } from '@/actions/medicine.action';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/shared/DeleteConfirmDialog';

interface AdminMedicineManagementProps {
	medicines: IMedicineWithSeller[];
}

export function AdminMedicineManagement({
	medicines,
}: AdminMedicineManagementProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [isDeleting, setIsDeleting] = useState<string | null>(null);
	const [deleteDialog, setDeleteDialog] = useState({
		open: false,
		medicineId: '',
		medicineName: '',
	});

	const handleDelete = async () => {
		setIsDeleting(deleteDialog.medicineId);
		setDeleteDialog({ open: false, medicineId: '', medicineName: '' });
		const loadingToast = toast.loading('Deleting medicine...');

		const result = await deleteMedicine(deleteDialog.medicineId);

		if (result.success) {
			toast.success('Medicine deleted successfully', { id: loadingToast });
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setIsDeleting(null);
	};

	// Filter medicines based on search
	const filteredMedicines = medicines.filter(
		(medicine) =>
			medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
			medicine.category?.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	if (medicines.length === 0) {
		return (
			<div className='border rounded-lg p-8 text-center'>
				<p className='text-muted-foreground'>No medicines found</p>
			</div>
		);
	}

	return (
		<>
			<div className='space-y-4'>
				{/* Search Bar */}
				<div className='flex items-center gap-2'>
					<div className='relative flex-1 max-w-md'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
						<Input
							placeholder='Search medicines...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='pl-10'
						/>
					</div>
					<div className='text-sm text-muted-foreground'>
						Showing {filteredMedicines.length} of {medicines.length} medicines
					</div>
				</div>

				{/* Table */}
				<div className='border rounded-lg'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Medicine</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Manufacturer</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Stock</TableHead>
								<TableHead>Seller ID</TableHead>
								<TableHead className='text-right'>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredMedicines.map((medicine) => (
								<TableRow key={medicine.id}>
									<TableCell>
										<div className='flex items-center gap-3'>
											<div className='relative w-12 h-12 rounded-md overflow-hidden bg-muted'>
												{medicine.imageUrl ? (
													<Image
														src={medicine.imageUrl}
														alt={medicine.name}
														fill
														className='object-cover'
													/>
												) : (
													<div className='w-full h-full flex items-center justify-center text-2xl'>
														💊
													</div>
												)}
											</div>
											<div>
												<p className='font-medium line-clamp-1'>
													{medicine.name}
												</p>
												<p className='text-xs text-muted-foreground'>
													ID: {medicine.id.slice(0, 8)}...
												</p>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<Badge variant='secondary'>
											{medicine.category?.name || 'N/A'}
										</Badge>
									</TableCell>
									<TableCell className='text-sm'>
										{medicine.manufacturer}
									</TableCell>
									<TableCell className='font-semibold'>
										${medicine.price.toFixed(2)}
									</TableCell>
									<TableCell>
										<Badge
											variant={medicine.stock > 10 ? 'default' : 'destructive'}
										>
											{medicine.stock} units
										</Badge>
									</TableCell>
									<TableCell className='font-mono text-xs'>
										{medicine.sellerId.slice(0, 8)}...
									</TableCell>
									<TableCell className='text-right'>
										<div className='flex justify-end gap-2'>
											<Button variant='ghost' size='icon' asChild>
												<Link href={`/shop/${medicine.id}`}>
													<Eye className='h-4 w-4' />
												</Link>
											</Button>
											<Button
												variant='ghost'
												size='icon'
												onClick={() =>
													setDeleteDialog({
														open: true,
														medicineId: medicine.id,
														medicineName: medicine.name,
													})
												}
												disabled={isDeleting === medicine.id}
											>
												<Trash2 className='h-4 w-4' />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				{filteredMedicines.length === 0 && searchTerm && (
					<div className='text-center py-8'>
						<p className='text-muted-foreground'>
							No medicines found matching &quot;{searchTerm}&quot;
						</p>
					</div>
				)}
			</div>

			<DeleteConfirmDialog
				open={deleteDialog.open}
				onOpenChange={(open) =>
					setDeleteDialog({ open, medicineId: '', medicineName: '' })
				}
				onConfirm={handleDelete}
				title='Delete Medicine?'
				description='Are you sure you want to delete this medicine? This action cannot be undone and will remove it from all listings.'
				itemName={deleteDialog.medicineName}
			/>
		</>
	);
}
