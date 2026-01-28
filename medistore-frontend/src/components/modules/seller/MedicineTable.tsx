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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteMedicine } from '@/actions/medicine.action';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteConfirmDialog } from '@/components/shared/DeleteConfirmDialog';

interface MedicineTableProps {
	medicines: IMedicine[];
}

export function MedicineTable({ medicines }: MedicineTableProps) {
	const [isDeleting, setIsDeleting] = useState<string | null>(null);
	const [deleteDialog, setDeleteDialog] = useState<{
		open: boolean;
		id: string;
		name: string;
	}>({
		open: false,
		id: '',
		name: '',
	});

	const handleDelete = async () => {
		setIsDeleting(deleteDialog.id);
		setDeleteDialog({ open: false, id: '', name: '' });
		const loadingToast = toast.loading('Deleting category...');

		const result = await deleteMedicine(deleteDialog.id);

		if (result.success) {
			toast.success(result.message, { id: loadingToast });
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setIsDeleting(null);
	};

	if (medicines.length === 0) {
		return (
			<div className='border rounded-lg p-8 text-center'>
				<p className='text-muted-foreground'>No medicines found</p>
				<Button asChild className='mt-4'>
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
											variant='destructive'
											size='icon'
											onClick={() =>
												setDeleteDialog({
													open: true,
													id: medicine.id,
													name: medicine.name,
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
				onOpenChange={(open) => setDeleteDialog({ open, id: '', name: '' })}
				onConfirm={handleDelete}
				itemName={deleteDialog.name}
				description='This will permanently delete this category. This action cannot be undone.'
			/>
		</>
	);
}
