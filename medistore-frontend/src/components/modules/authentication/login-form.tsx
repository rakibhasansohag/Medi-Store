/* LoginForm.tsx (fixed) */
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import * as z from 'zod';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import Link from 'next/link';

const loginSchema = z.object({
	email: z.string().email('Invalid email'),
	password: z.string().min(8, 'Minimum length is 8'),
});

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		defaultValues: { email: '', password: '' },
		validators: { onSubmit: loginSchema },
		onSubmit: async ({ value }) => {
			setIsSubmitting(true);
			toast('Signing in...');

			try {
				// Use signIn, not signUp
				const { data, error } = await authClient.signIn.email({
					email: value.email,
					password: value.password,
				});

				if (error) {
					toast.error(error.message || 'Failed to login');
					setIsSubmitting(false);
					return;
				}

				toast.success('Logged in successfully');

				// optionally redirect or refresh session
				window.location.href = '/dashboard';
			} catch (err) {
				console.error(err);
				toast.error('Something went wrong, please try again.');
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	const handleGoogleLogin = async () => {
		const result = await authClient.signIn.social({
			provider: 'google',
			callbackURL: 'http://localhost:3000',
		});

		console.log(result);
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className='overflow-hidden p-0'>
				<CardContent className='grid p-0 md:grid-cols-2'>
					<form
						className='p-6 md:p-8'
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<div className='flex flex-col items-center gap-2 text-center'>
								<h1 className='text-2xl font-bold'>Welcome back</h1>
								<p className='text-muted-foreground text-balance'>
									Login to your account
								</p>
							</div>

							<form.Field name='email'>
								{(field) => {
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
							</form.Field>

							<form.Field name='password'>
								{(field) => {
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
							</form.Field>

							<Field>
								<Button type='submit' disabled={isSubmitting}>
									{isSubmitting ? 'Signing in...' : 'Login'}
								</Button>
							</Field>

							<FieldSeparator>Or continue with</FieldSeparator>

							<Field className='flex'>
								<Button
									variant='default'
									type='button'
									onClick={handleGoogleLogin}
									className='w-full '
								>
									Login with Google
								</Button>
							</Field>

							<FieldDescription className='text-center'>
								Don&apos;t have an account?{' '}
								<Link href='/register'>Sign up</Link>
							</FieldDescription>
						</FieldGroup>
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
				By continuing you agree to our <a href='#'>Terms</a> and{' '}
				<a href='#'>Privacy</a>.
			</FieldDescription>
		</div>
	);
}
