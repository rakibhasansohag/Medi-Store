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
import { Pencil, Trash2, X } from 'lucide-react';
import { deleteCategory, updateCategory } from '@/actions/category.action';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/shared/DeleteConfirmDialog';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CategoryTableProps {
	categories: ICategory[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
	const [isDeleting, setIsDeleting] = useState<string | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState<{
		open: boolean;
		id: string;
		name: string;
	}>({
		open: false,
		id: '',
		name: '',
	});

	const [editDialog, setEditDialog] = useState<{
		open: boolean;
		id: string;
		name: string;
		slug: string;
	}>({
		open: false,
		id: '',
		name: '',
		slug: '',
	});

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

	const handleEdit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUpdating(true);
		const loadingToast = toast.loading('Updating category...');

		const result = await updateCategory(editDialog.id, {
			name: editDialog.name,
			slug: editDialog.slug,
		});

		if (result.success) {
			toast.success(result.message, { id: loadingToast });
			setEditDialog({ open: false, id: '', name: '', slug: '' });
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setIsUpdating(false);
	};

	const handleNameChange = (name: string) => {
		const slug = name
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-');
		setEditDialog((prev) => ({ ...prev, name, slug }));
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
										<Button
											variant='ghost'
											size='icon'
											onClick={() =>
												setEditDialog({
													open: true,
													id: category.id,
													name: category.name,
													slug: category.slug,
												})
											}
										>
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

			<Dialog
				open={editDialog.open}
				onOpenChange={(open) =>
					!open && setEditDialog({ open: false, id: '', name: '', slug: '' })
				}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Category</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleEdit} className='space-y-4 pt-4'>
						<div className='space-y-2'>
							<Label htmlFor='edit-name'>Category Name</Label>
							<Input
								id='edit-name'
								value={editDialog.name}
								onChange={(e) => handleNameChange(e.target.value)}
								placeholder='e.g., Pain Relief'
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='edit-slug'>Slug</Label>
							<Input
								id='edit-slug'
								value={editDialog.slug}
								onChange={(e) =>
									setEditDialog((prev) => ({ ...prev, slug: e.target.value }))
								}
								placeholder='pain-relief'
								required
							/>
						</div>
						<div className='flex justify-end gap-2 pt-4'>
							<Button
								type='button'
								variant='outline'
								onClick={() =>
									setEditDialog({ open: false, id: '', name: '', slug: '' })
								}
							>
								Cancel
							</Button>
							<Button type='submit' disabled={isUpdating}>
								{isUpdating ? 'Updating...' : 'Update Category'}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

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
