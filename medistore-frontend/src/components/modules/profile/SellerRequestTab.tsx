'use client';

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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { requestSellerRole } from '@/actions/user.action';
import { IUserProfile, SellerRequestStatus } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Clock, XCircle, Store } from 'lucide-react';

const sellerRequestSchema = z.object({
	businessName: z
		.string()
		.min(3, 'Business name must be at least 3 characters'),
	businessAddress: z
		.string()
		.min(10, 'Business address must be at least 10 characters'),
	phone: z.string().min(10, 'Valid phone number is required'),
	bio: z.string(),
});

interface SellerRequestTabProps {
	profile: IUserProfile;
}

export function SellerRequestTab({ profile }: SellerRequestTabProps) {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			businessName: profile.businessName || '',
			businessAddress: profile.businessAddress || '',
			phone: profile.phone || '',
			bio: profile.bio || '',
		},
		validators: {
			onChange: sellerRequestSchema,
		},
		onSubmit: async ({ value }) => {
			const loadingToast = toast.loading('Submitting request...');

			const result = await requestSellerRole(value);

			if (result.success) {
				toast.success(result.message, { id: loadingToast });
				router.refresh();
			} else {
				toast.error(result.message, { id: loadingToast });
			}
		},
	});

	// Show status if request exists
	if (
		profile.sellerRequestStatus &&
		profile.sellerRequestStatus !== SellerRequestStatus.NONE
	) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Seller Request Status</CardTitle>
				</CardHeader>
				<CardContent>
					{profile.sellerRequestStatus === SellerRequestStatus.PENDING && (
						<Alert>
							<Clock className='h-4 w-4' />
							<AlertTitle>Request Pending</AlertTitle>
							<AlertDescription>
								Your seller request is being reviewed by our team. We&apos;ll
								notify you once it&apos;s processed.
							</AlertDescription>
						</Alert>
					)}

					{profile.sellerRequestStatus === SellerRequestStatus.APPROVED && (
						<Alert className='border-green-500'>
							<CheckCircle className='h-4 w-4 text-green-500' />
							<AlertTitle>Request Approved</AlertTitle>
							<AlertDescription>
								Congratulations! Your seller request has been approved. You can
								now start listing medicines.
							</AlertDescription>
						</Alert>
					)}

					{profile.sellerRequestStatus === SellerRequestStatus.REJECTED && (
						<Alert variant='destructive'>
							<XCircle className='h-4 w-4' />
							<AlertTitle>Request Rejected</AlertTitle>
							<AlertDescription>
								Unfortunately, your seller request was rejected. Please contact
								support for more information.
							</AlertDescription>
						</Alert>
					)}
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<Store className='h-5 w-5' />
					Become a Seller
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-6'>
					<Alert>
						<AlertTitle>Why become a seller?</AlertTitle>
						<AlertDescription>
							<ul className='list-disc list-inside space-y-1 mt-2'>
								<li>Reach thousands of customers</li>
								<li>Manage your inventory easily</li>
								<li>Track orders in real-time</li>
								<li>Grow your pharmaceutical business</li>
							</ul>
						</AlertDescription>
					</Alert>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field name='businessName'>
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched &&
										field.state.meta.errors.length > 0;
									return (
										<Field>
											<FieldLabel htmlFor={field.name}>
												Business Name
											</FieldLabel>
											<Input
												type='text'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder='ABC Pharmacy'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<form.Field name='businessAddress'>
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched &&
										field.state.meta.errors.length > 0;
									return (
										<Field>
											<FieldLabel htmlFor={field.name}>
												Business Address
											</FieldLabel>
											<Textarea
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder='123 Main St, City, State, ZIP'
												rows={3}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<form.Field name='phone'>
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched &&
										field.state.meta.errors.length > 0;
									return (
										<Field>
											<FieldLabel htmlFor={field.name}>
												Contact Phone
											</FieldLabel>
											<Input
												type='tel'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder='+1 (555) 000-0000'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<form.Field name='bio'>
								{(field) => (
									<Field>
										<FieldLabel htmlFor={field.name}>
											Business Description (Optional)
										</FieldLabel>
										<Textarea
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder='Tell us about your business...'
											rows={4}
										/>
									</Field>
								)}
							</form.Field>

							<Button type='submit' className='w-full'>
								Submit Seller Request
							</Button>
						</FieldGroup>
					</form>
				</div>
			</CardContent>
		</Card>
	);
}
