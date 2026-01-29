'use client';

import { IReview } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface ReviewsMarqueeProps {
	reviews: IReview[];
}

export function ReviewsMarquee({ reviews }: ReviewsMarqueeProps) {
	// Duplicate reviews for seamless loop
	const duplicatedReviews = [...reviews, ...reviews];

	console.log(reviews);

	return (
		<section className='py-16 overflow-hidden bg-muted/30'>
			<div className='container mx-auto px-4 mb-8'>
				<div className='text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>
						What Our Customers Say
					</h2>
					<p className='text-muted-foreground max-w-2xl mx-auto'>
						Real reviews from real customers who trust MediStore
					</p>
				</div>
			</div>

			{/* Marquee Container */}
			<div className='relative'>
				{/* Gradient Overlays */}
				<div className='absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-muted/30 to-transparent z-10' />
				<div className='absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-muted/30 to-transparent z-10' />

				{/* Scrolling Content */}
				<div className='flex gap-6 animate-marquee hover:pause-marquee'>
					{duplicatedReviews.map((review, index) => (
						<Card
							key={`${review.id}-${index}`}
							className='shrink-0 w-80 hover:shadow-lg transition-shadow'
						>
							<CardContent className='p-6 space-y-4'>
								{/* Rating */}
								<div className='flex gap-1'>
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className={`h-5 w-5 ${
												i < review.rating
													? 'fill-yellow-400 text-yellow-400'
													: 'text-gray-300'
											}`}
										/>
									))}
								</div>

								{/* Review Text */}
								<p className='text-sm line-clamp-3'>
									{review.comment || 'Great product! Highly recommended.'}
								</p>

								{/* Medicine Info */}
								{review.medicine && (
									<div className='flex items-center gap-3 pt-3 border-t'>
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
										<div className='flex-1 min-w-0'>
											<p className='font-medium text-sm truncate'>
												{review.medicine.name}
											</p>
											<p className='text-xs text-muted-foreground'>
												Verified Purchase
											</p>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
