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

interface CategoryTableProps {
	categories: ICategory[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
	const [isDeleting, setIsDeleting] = useState<string | null>(null);

	console.log(categories);

	const handleDelete = async (id: string, name: string) => {
		if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

		setIsDeleting(id);
		const loadingToast = toast.loading('Deleting category...');

		const result = await deleteCategory(id);

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
										variant='ghost'
										size='icon'
										onClick={() => handleDelete(category.id, category.name)}
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
	);
}
