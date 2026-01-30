/* eslint-disable react/no-children-prop */
/* eslint-disable @next/next/no-img-element */
'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import * as z from 'zod';
import Link from 'next/link';

const formSchema = z.object({
	name: z.string().min(1, 'This field is required'),
	password: z.string().min(8, 'Minimum length is 8'),
	email: z.email(),
});

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<typeof Card>) {
	const handleGoogleLogin = async () => {
		const data = authClient.signIn.social({
			provider: 'google',
			callbackURL: 'http://localhost:3000',
		});

		console.log(data);
	};

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			const toastId = toast.loading('Creating user');

			try {
				const { data, error } = await authClient.signUp.email(value);

				if (error) {
					toast.error(error.message, { id: toastId });
					return;
				}

				toast.success('User Created Successfully', { id: toastId });
			} catch (err) {
				toast.error('Something went wrong, please try again.', {
					id: toastId,
				});
			}
		},
	});

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className='overflow-hidden p-0'>
				<CardContent className='grid p-0 md:grid-cols-2'>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
						className='space-y-4 px-6 py-8'
					>
						<FieldGroup>
							<form.Field
								name='name'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Name</FieldLabel>
											<Input
												type='text'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
							<form.Field
								name='email'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field>
											<FieldLabel htmlFor={field.name}>Email</FieldLabel>
											<Input
												type='email'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
							<form.Field
								name='password'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field>
											<FieldLabel htmlFor={field.name}>Password</FieldLabel>
											<Input
												type='password'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
						</FieldGroup>

						<Button type='submit' className='w-full'>
							Create Account
						</Button>

						<div className='relative text-center text-sm text-muted-foreground'>
							<span className='bg-background px-2'>or</span>
						</div>

						<Button
							variant='outline'
							type='button'
							onClick={handleGoogleLogin}
							className='w-full py-2'
						>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
								<path
									d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
									fill='currentColor'
								/>
							</svg>
							<span className='sr-only'>Login with Google</span>
						</Button>
					</form>
					<div className='bg-muted relative hidden md:block'>
						<img
							src='/placeholder.svg'
							alt='Image'
							className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
						/>
					</div>
				</CardContent>
			</Card>
			<FieldDescription className='px-6 text-center'>
				By clicking continue, you agree to our{' '}
				<Link href='#'>Terms of Service</Link> and{' '}
				<Link href='#'>Privacy Policy</Link>.
			</FieldDescription>
		</div>
	);
}
