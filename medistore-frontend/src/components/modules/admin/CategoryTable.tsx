'use client';

import { useState } from 'react';
import { ICategory } from '@/types';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteCategory } from '@/actions/category.action';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/shared/DeleteConfirmDialog';

interface CategoryTableProps {
	categories: ICategory[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
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

	console.log(categories);

	// TODO : NEED TO ADDED EDIT CATEGORY

	const handleDelete = async () => {
		setIsDeleting(deleteDialog.id);
		setDeleteDialog({ open: false, id: '', name: '' });
		const loadingToast = toast.loading('Deleting category...');

		const result = await deleteCategory(deleteDialog.id);

		if (result.success) {
			toast.success(result.message, { id: loadingToast });
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setIsDeleting(null);
	};

	if (categories.length === 0) {
		return (
			<div className='border rounded-lg p-8 text-center'>
				<p className='text-muted-foreground'>No categories found</p>
			</div>
		);
	}

	return (
		<>
			<div className='border rounded-lg'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Slug</TableHead>
							<TableHead className='text-right'>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories?.map((category) => (
							<TableRow key={category.id}>
								<TableCell className='font-medium'>{category.name}</TableCell>
								<TableCell className='text-muted-foreground'>
									{category.slug}
								</TableCell>
								<TableCell className='text-right'>
									<div className='flex justify-end gap-2'>
										<Button variant='ghost' size='icon'>
											<Pencil className='h-4 w-4' />
										</Button>
										<Button
											variant='destructive'
											size='icon'
											onClick={() =>
												setDeleteDialog({
													open: true,
													id: category.id,
													name: category.name,
												})
											}
											disabled={isDeleting === category.id}
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
