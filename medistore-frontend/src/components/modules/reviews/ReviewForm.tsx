'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';

import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { createReview } from '@/actions/review.action';
import { Star } from 'lucide-react';

const reviewSchema = z.object({
	rating: z.number().min(1, 'Please select a rating').max(5),
	comment: z.string(),
});

interface ReviewFormProps {
	medicineId: string;
	medicineName: string;
}

export function ReviewForm({ medicineId, medicineName }: ReviewFormProps) {
	const router = useRouter();
	const [hoveredRating, setHoveredRating] = useState(0);

	const form = useForm({
		defaultValues: {
			rating: 0,
			comment: '',
		},
		validators: {
			onChange: reviewSchema,
		},
		onSubmit: async ({ value }) => {
			const loadingToast = toast.loading('Submitting review...');

			const result = await createReview({
				medicineId,
				rating: value.rating,
				comment: value.comment || undefined,
			});

			if (result.success) {
				toast.success(result.message, { id: loadingToast });
				router.refresh();
				form.reset();
			} else {
				toast.error(result.message, { id: loadingToast });
			}
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Write a Review for {medicineName}</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field name='rating'>
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched &&
									field.state.meta.errors.length > 0;
								return (
									<Field>
										<FieldLabel>Rating</FieldLabel>
										<div className='flex gap-1'>
											{[1, 2, 3, 4, 5].map((star) => (
												<button
													key={star}
													type='button'
													onClick={() => field.handleChange(star)}
													onMouseEnter={() => setHoveredRating(star)}
													onMouseLeave={() => setHoveredRating(0)}
													className='transition-transform hover:scale-110'
												>
													<Star
														className={`h-8 w-8 ${
															star <= (hoveredRating || field.state.value)
																? 'fill-yellow-400 text-yellow-400'
																: 'text-gray-300'
														}`}
													/>
												</button>
											))}
										</div>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name='comment'>
							{(field) => (
								<Field>
									<FieldLabel htmlFor={field.name}>
										Comment (Optional)
									</FieldLabel>
									<Textarea
										id={field.name}
										name={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder='Share your experience with this medicine...'
										rows={4}
									/>
								</Field>
							)}
						</form.Field>

						<Button type='submit'>Submit Review</Button>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
