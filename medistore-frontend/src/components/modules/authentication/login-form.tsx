// src/components/modules/authentication/login-form.tsx
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
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
			const loadingToast = toast.loading('Signing in...');

			try {
				const { data, error } = await authClient.signIn.email({
					email: value.email,
					password: value.password,
				});

				if (error) {
					toast.error(error.message || 'Failed to login', { id: loadingToast });
					setIsSubmitting(false);
					return;
				}

				toast.success('Logged in successfully', { id: loadingToast });
				window.location.href = '/dashboard';
			} catch (err) {
				console.error(err);
				toast.error('Something went wrong', { id: loadingToast });
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	const handleGoogleLogin = async () => {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: 'http://localhost:3000',
		});
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className='overflow-hidden rounded-2xl shadow-lg'>
				<CardContent className='p-6 md:p-8'>
					<motion.form
						className='space-y-4 max-w-xl mx-auto'
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.34 }}
					>
						<div className='mb-2 text-center md:text-left'>
							<div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0 mb-3'>
								<span className='text-2xl'>💊</span>
							</div>

							<h1 className='text-2xl md:text-3xl font-extrabold'>
								Welcome back
							</h1>
							<p className='text-muted-foreground mt-1'>
								Login to your MediStore account
							</p>
						</div>

						<FieldGroup>
							<form.Field name='email'>
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<div>
											<FieldLabel
												htmlFor={field.name}
												className='flex items-center gap-2'
											>
												<Mail className='w-4 h-4' />
												<span className='text-sm font-medium'>Email</span>
											</FieldLabel>
											<Input
												type='email'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder='your@email.com'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</div>
									);
								}}
							</form.Field>

							<form.Field name='password'>
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<div>
											<FieldLabel
												htmlFor={field.name}
												className='flex items-center gap-2'
											>
												<Lock className='w-4 h-4' />
												<span className='text-sm font-medium'>Password</span>
											</FieldLabel>
											<Input
												type='password'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder='••••••••'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</div>
									);
								}}
							</form.Field>

							<div className='pt-2'>
								<motion.div whileTap={{ scale: 0.985 }}>
									<Button
										type='submit'
										disabled={isSubmitting}
										className='w-full'
									>
										{isSubmitting ? 'Signing in...' : 'Login'}
										<ArrowRight className='ml-2 h-4 w-4' />
									</Button>
								</motion.div>
							</div>

							<FieldSeparator>Or continue with</FieldSeparator>

							<div>
								<motion.div whileTap={{ scale: 0.98 }}>
									<Button
										variant='outline'
										type='button'
										onClick={handleGoogleLogin}
										className='w-full'
									>
										<svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
											<path
												fill='currentColor'
												d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
											/>
										</svg>
										Login with Google
									</Button>
								</motion.div>
							</div>

							<div className='text-sm text-muted-foreground text-center md:text-left'>
								<FieldDescription>
									Don&apos;t have an account?{' '}
									<Link
										href='/register'
										className='text-primary hover:underline font-medium'
									>
										Sign up →
									</Link>
								</FieldDescription>
							</div>
						</FieldGroup>
					</motion.form>
				</CardContent>
			</Card>
		</div>
	);
}
