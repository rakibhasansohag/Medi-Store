'use client';

import { useState } from 'react';
import { IReview } from '@/types';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { deleteReviewByAdmin } from '@/actions/review.action';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/shared/DeleteConfirmDialog';
import Link from 'next/link';

interface AdminReviewsTableProps {
	reviews: IReview[];
}

export function AdminReviewsTable({ reviews }: AdminReviewsTableProps) {
	const [isDeleting, setIsDeleting] = useState<string | null>(null);
	const [deleteDialog, setDeleteDialog] = useState({
		open: false,
		reviewId: '',
		medicineName: '',
	});

	const handleDelete = async () => {
		setIsDeleting(deleteDialog.reviewId);
		setDeleteDialog({ open: false, reviewId: '', medicineName: '' });
		const loadingToast = toast.loading('Deleting review...');

		const result = await deleteReviewByAdmin(deleteDialog.reviewId);

		if (result.success) {
			toast.success('Review deleted', { id: loadingToast });
		} else {
			toast.error(result.message, { id: loadingToast });
		}

		setIsDeleting(null);
	};

	if (reviews.length === 0) {
		return (
			<div className='border rounded-lg p-8 text-center'>
				<p className='text-muted-foreground'>No reviews found</p>
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
							<TableHead>Rating</TableHead>
							<TableHead>Comment</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className='text-right'>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{reviews.map((review) => (
							<TableRow key={review.id}>
								<TableCell>
									{review.medicine && (
										<div className='flex items-center gap-3'>
											<div className='relative w-12 h-12 rounded-md overflow-hidden bg-muted'>
												{review.medicine.imageUrl ? (
													<Image
														src={review.medicine.imageUrl}
														alt={review.medicine.name}
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
												<Link
													href={`/shop/${review.medicine.id}`}
													className='font-medium'
												>
													{review.medicine.name}
												</Link>
												<p className='text-xs text-muted-foreground'>
													ID: {review.medicineId.slice(0, 8)}...
												</p>
											</div>
										</div>
									)}
								</TableCell>
								<TableCell>
									<div className='flex gap-1'>
										{Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												className={`h-4 w-4 ${
													i < review.rating
														? 'fill-yellow-400 text-yellow-400'
														: 'text-gray-300'
												}`}
											/>
										))}
									</div>
								</TableCell>
								<TableCell>
									<p className='text-sm line-clamp-2 max-w-md'>
										{review.comment || 'No comment'}
									</p>
								</TableCell>
								<TableCell className='text-sm'>
									{new Date(review.createdAt).toLocaleDateString()}
								</TableCell>
								<TableCell className='text-right'>
									<Button
										variant='ghost'
										size='icon'
										onClick={() =>
											setDeleteDialog({
												open: true,
												reviewId: review.id,
												medicineName: review.medicine?.name || 'this review',
											})
										}
										disabled={isDeleting === review.id}
									>
										<Trash2 className='h-4 w-4' />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<DeleteConfirmDialog
				open={deleteDialog.open}
				onOpenChange={(open) =>
					setDeleteDialog({ open, reviewId: '', medicineName: '' })
				}
				onConfirm={handleDelete}
				title='Delete Review?'
				description='Are you sure you want to delete this review? This action cannot be undone.'
				itemName={deleteDialog.medicineName}
			/>
		</>
	);
}
