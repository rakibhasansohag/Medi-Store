import { IReview } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface ReviewListProps {
	reviews: IReview[];
}

export function ReviewList({ reviews }: ReviewListProps) {
	if (reviews.length === 0) {
		return (
			<div className='text-center py-8'>
				<p className='text-muted-foreground'>
					No reviews yet. Be the first to review!
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			{reviews.map((review) => (
				<Card key={review.id}>
					<CardContent className='p-4'>
						<div className='flex items-start justify-between mb-2'>
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
							<span className='text-sm text-muted-foreground'>
								{new Date(review.createdAt).toLocaleDateString()}
							</span>
						</div>
						{review.comment && (
							<p className='text-sm text-muted-foreground'>{review.comment}</p>
						)}
					</CardContent>
				</Card>
			))}
		</div>
	);
}
