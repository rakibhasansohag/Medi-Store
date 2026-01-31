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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { updateMedicine } from '@/actions/medicine.action';
import { ICategory, IMedicine } from '@/types';

const medicineSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(10, 'Description must be at least 10 characters'),
	manufacturer: z.string().min(1, 'Manufacturer is required'),
	price: z.number().min(0.01, 'Price must be greater than 0'),
	stock: z.number().int().min(0, 'Stock must be 0 or greater'),
	categoryId: z.string().min(1, 'Category is required'),
	imageUrl: z.string(),
});

interface EditMedicineFormProps {
	medicine: IMedicine;
	categories: ICategory[];
}

export function EditMedicineForm({
	medicine,
	categories,
}: EditMedicineFormProps) {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			name: medicine.name,
			description: medicine.description,
			manufacturer: medicine.manufacturer,
			price: medicine.price,
			stock: medicine.stock,
			categoryId: medicine.categoryId,
			imageUrl: medicine.imageUrl || '',
		},
		validators: {
			onChange: medicineSchema,
		},
		onSubmit: async ({ value }) => {
			const loadingToast = toast.loading('Updating medicine...');

			const result = await updateMedicine(medicine.id, value);

			if (result.success) {
				toast.success(result.message, { id: loadingToast });
				router.push('/dashboard/medicines');
			} else {
				toast.error(result.message, { id: loadingToast });
			}
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Edit Medicine Information</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field name='imageUrl'>
							{(field) => (
								<Field>
									<FieldLabel>Medicine Image</FieldLabel>
									<ImageUpload
										value={field.state.value}
										onChange={(url) => field.handleChange(url)}
										onRemove={() => field.handleChange('')}
									/>
								</Field>
							)}
						</form.Field>

						<form.Field name='name'>
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched &&
									field.state.meta.errors.length > 0;
								return (
									<Field>
										<FieldLabel htmlFor={field.name}>Medicine Name</FieldLabel>
										<Input
											type='text'
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder='e.g., Aspirin 500mg'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name='description'>
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched &&
									field.state.meta.errors.length > 0;
								return (
									<Field>
										<FieldLabel htmlFor={field.name}>Description</FieldLabel>
										<Textarea
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder='Describe the medicine, its uses, and dosage'
											rows={4}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name='manufacturer'>
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched &&
									field.state.meta.errors.length > 0;
								return (
									<Field>
										<FieldLabel htmlFor={field.name}>Manufacturer</FieldLabel>
										<Input
											type='text'
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder='e.g., Pfizer'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<div className='grid grid-cols-2 gap-4'>
							<form.Field name='price'>
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched &&
										field.state.meta.errors.length > 0;
									return (
										<Field>
											<FieldLabel htmlFor={field.name}>Price ($)</FieldLabel>
											<Input
												type='number'
												step='0.01'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) =>
													field.handleChange(parseFloat(e.target.value) || 0)
												}
												placeholder='0.00'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<form.Field name='stock'>
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched &&
										field.state.meta.errors.length > 0;
									return (
										<Field>
											<FieldLabel htmlFor={field.name}>Stock</FieldLabel>
											<Input
												type='number'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) =>
													field.handleChange(parseInt(e.target.value) || 0)
												}
												placeholder='0'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
						</div>

						<form.Field name='categoryId'>
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched &&
									field.state.meta.errors.length > 0;
								return (
									<Field>
										<FieldLabel>Category</FieldLabel>
										<Select
											value={field.state.value}
											onValueChange={(value) => field.handleChange(value)}
										>
											<SelectTrigger>
												<SelectValue placeholder='Select a category' />
											</SelectTrigger>
											<SelectContent>
												{categories.map((category) => (
													<SelectItem key={category.id} value={category.id}>
														{category.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<div className='flex gap-2'>
							<Button type='submit'>Update Medicine</Button>
							<Button
								type='button'
								variant='outline'
								onClick={() => router.back()}
							>
								Cancel
							</Button>
						</div>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
