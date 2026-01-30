'use client';

import { useState } from 'react';
import { IMedicine } from '@/types';
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
import { Pencil, Trash2, Plus, Minus } from 'lucide-react';
import { deleteMedicine } from '@/actions/medicine.action';
import { updateMedicineStock } from '@/actions/medicine.action';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteConfirmDialog } from '@/components/shared/DeleteConfirmDialog';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

interface MedicineTableProps {
	medicines: IMedicine[];
}

export function MedicineTable({ medicines }: MedicineTableProps) {
	const [isDeleting, setIsDeleting] = useState<string | null>(null);
	const [deleteDialog, setDeleteDialog] = useState({
		open: false,
		medicineId: '',
		medicineName: '',
	});
	const [stockDialog, setStockDialog] = useState<{
		open: boolean;
		medicine: IMedicine | null;
	}>({ open: false, medicine: null });
	const [stockQuantity, setStockQuantity] = useState(0);
	const [isUpdatingStock, setIsUpdatingStock] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(deleteDialog.medicineId);
		setDeleteDialog({ open: false, medicineId: '', medicineName: '' });
		const loadingToast = toast.loading('Deleting medicine...');

		const result = await deleteMedicine(deleteDialog.medicineId);

		if (result.success) {
			toast.success(result.message, { id: loadingToast });
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setIsDeleting(null);
	};

	const handleStockUpdate = async () => {
		if (!stockDialog.medicine || stockQuantity === 0) return;

		setIsUpdatingStock(true);
		const loadingToast = toast.loading('Updating stock...');

		const result = await updateMedicineStock(
			stockDialog.medicine.id,
			stockQuantity,
		);

		if (result.success) {
			toast.success(
				`Stock ${stockQuantity > 0 ? 'increased' : 'decreased'} successfully`,
				{ id: loadingToast },
			);
			setStockDialog({ open: false, medicine: null });
			setStockQuantity(0);
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setIsUpdatingStock(false);
	};

	if (medicines.length === 0) {
		return (
			<div className='border rounded-lg p-8 text-center'>
				<p className='text-muted-foreground mb-4'>No medicines found</p>
				<Button asChild>
					<Link href='/dashboard/medicines/add'>Add Your First Medicine</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<div className='border rounded-lg'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Medicine</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Stock</TableHead>
							<TableHead className='text-right'>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{medicines.map((medicine) => (
							<TableRow key={medicine.id}>
								<TableCell>
									<div className='flex items-center gap-3'>
										{medicine.imageUrl && (
											<div className='relative w-10 h-10 rounded-md overflow-hidden'>
												<Image
													src={medicine.imageUrl}
													alt={medicine.name}
													fill
													className='object-cover'
												/>
											</div>
										)}
										<div>
											<p className='font-medium'>{medicine.name}</p>
											<p className='text-sm text-muted-foreground'>
												{medicine.manufacturer}
											</p>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<Badge variant='secondary'>{medicine.category?.name}</Badge>
								</TableCell>
								<TableCell>${medicine.price.toFixed(2)}</TableCell>
								<TableCell>
									<Badge
										variant={medicine.stock > 10 ? 'default' : 'destructive'}
										className='cursor-pointer'
										onClick={() => setStockDialog({ open: true, medicine })}
									>
										{medicine.stock} units
									</Badge>
								</TableCell>
								<TableCell className='text-right'>
									<div className='flex justify-end gap-2'>
										<Button asChild variant='ghost' size='icon'>
											<Link href={`/dashboard/medicines/${medicine.id}/edit`}>
												<Pencil className='h-4 w-4' />
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

			<DeleteConfirmDialog
				open={deleteDialog.open}
				onOpenChange={(open) =>
					setDeleteDialog({ open, medicineId: '', medicineName: '' })
				}
				onConfirm={handleDelete}
				title='Delete Medicine?'
				description='Are you sure you want to delete this medicine? This action cannot be undone.'
				itemName={deleteDialog.medicineName}
			/>

			{/* Stock Update Dialog */}
			<Dialog
				open={stockDialog.open}
				onOpenChange={(open) => {
					setStockDialog({ open, medicine: null });
					setStockQuantity(0);
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Update Stock</DialogTitle>
						<DialogDescription>
							{stockDialog.medicine?.name} - Current stock:{' '}
							{stockDialog.medicine?.stock} units
						</DialogDescription>
					</DialogHeader>
					<div className='space-y-4'>
						<div className='flex items-center gap-2'>
							<Button
								variant='outline'
								size='icon'
								onClick={() =>
									setStockQuantity(
										Math.max(-stockDialog.medicine!.stock, stockQuantity - 1),
									)
								}
							>
								<Minus className='h-4 w-4' />
							</Button>
							<Input
								type='number'
								value={stockQuantity}
								onChange={(e) =>
									setStockQuantity(parseInt(e.target.value) || 0)
								}
								className='text-center'
							/>
							<Button
								variant='outline'
								size='icon'
								onClick={() => setStockQuantity(stockQuantity + 1)}
							>
								<Plus className='h-4 w-4' />
							</Button>
						</div>
						<p className='text-sm text-muted-foreground'>
							New stock will be:{' '}
							<span className='font-semibold'>
								{(stockDialog.medicine?.stock || 0) + stockQuantity} units
							</span>
						</p>
						<div className='flex gap-2'>
							<Button
								onClick={handleStockUpdate}
								disabled={stockQuantity === 0 || isUpdatingStock}
								className='flex-1'
							>
								{isUpdatingStock ? 'Updating...' : 'Update Stock'}
							</Button>
							<Button
								variant='outline'
								onClick={() => {
									setStockDialog({ open: false, medicine: null });
									setStockQuantity(0);
								}}
							>
								Cancel
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
