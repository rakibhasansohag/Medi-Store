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
import { createCategory } from '@/actions/category.action';

const categorySchema = z.object({
	name: z.string().min(1, 'Name is required'),
	slug: z
		.string()
		.min(1, 'Slug is required')
		.regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
});

export function CategoryForm() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			name: '',
			slug: '',
		},
		validators: {
			onChange: categorySchema,
		},
		onSubmit: async ({ value }) => {
			const loadingToast = toast.loading('Creating category...');

			const result = await createCategory(value);

			if (result.success) {
				toast.success(result.message, { id: loadingToast });
				router.push('/admin-dashboard/categories');
			} else {
				toast.error(result.message, { id: loadingToast });
			}
		},
	});

	// Auto-generate slug from name
	const handleNameChange = (name: string) => {
		const slug = name
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-');
		form.setFieldValue('slug', slug);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Category Information</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field name='name'>
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched &&
									field.state.meta.errors.length > 0;
								return (
									<Field>
										<FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
										<Input
											type='text'
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => {
												field.handleChange(e.target.value);
												handleNameChange(e.target.value);
											}}
											placeholder='e.g., Pain Relief'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name='slug'>
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched &&
									field.state.meta.errors.length > 0;
								return (
									<Field>
										<FieldLabel htmlFor={field.name}>Slug</FieldLabel>
										<Input
											type='text'
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder='pain-relief'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<div className='flex gap-2'>
							<Button type='submit'>Create Category</Button>
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
