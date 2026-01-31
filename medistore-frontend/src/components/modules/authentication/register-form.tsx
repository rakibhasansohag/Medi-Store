'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { toast } from 'sonner';
import Link from 'next/link';
import { User, Mail, Lock, Phone, UserCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	FieldError,
	FieldLabel,
	FieldDescription,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { IRegisterInput } from '@/types';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';

const registerSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	role: z.enum(['CUSTOMER', 'SELLER'], {}),
	phone: z.string().optional(),
});

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			role: 'CUSTOMER',
			phone: '',
		} as IRegisterInput,
		validators: {
			onChange: registerSchema,
		},
		onSubmit: async ({ value }) => {
			setIsSubmitting(true);
			const loadingToast = toast.loading('Creating account...');

			try {
				const { data, error } = await authClient.signUp.email({
					name: value.name,
					email: value.email,
					password: value.password,
					...{
						role: value.role,
						phone: value.phone,
					},
				});

				if (error) {
					toast.error(error.message || 'Failed to create account', {
						id: loadingToast,
					});
					setIsSubmitting(false);
					return;
				}

				toast.success('Account created! Please check your email to verify.', {
					id: loadingToast,
				});

				setTimeout(() => {
					window.location.href = '/login';
				}, 1400);
			} catch (err) {
				console.error(err);
				toast.error('Something went wrong', { id: loadingToast });
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	// helper class for form item wrapper
	const itemClass = 'w-full';

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className='overflow-hidden rounded-2xl shadow-lg'>
				<CardContent className='p-6 md:p-8'>
					<motion.form
						className='space-y-6'
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.38 }}
					>
						<div className='mb-2 text-center md:text-left'>
							<div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0 mb-3'>
								<span className='text-2xl'>💊</span>
							</div>
							<h1 className='text-2xl md:text-3xl font-extrabold'>
								Create an account
							</h1>
							<p className='text-muted-foreground mt-1'>Join MediStore today</p>
						</div>

						{/* Grid: 2 columns on md+ */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							{/* Name */}
							<div className={itemClass}>
								<form.Field name='name'>
									{(field) => {
										const isInvalid =
											field.state.meta.isTouched &&
											field.state.meta.errors.length > 0;
										return (
											<div>
												<FieldLabel
													htmlFor={field.name}
													className='flex items-center gap-2'
												>
													<User className='w-4 h-4' />
													<span className='text-sm font-medium'>Full Name</span>
												</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder='John Doe'
												/>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</div>
										);
									}}
								</form.Field>
							</div>

							{/* Email */}
							<div className={itemClass}>
								<form.Field name='email'>
									{(field) => {
										const isInvalid =
											field.state.meta.isTouched &&
											field.state.meta.errors.length > 0;
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
							</div>

							{/* Password */}
							<div className={itemClass}>
								<form.Field name='password'>
									{(field) => {
										const isInvalid =
											field.state.meta.isTouched &&
											field.state.meta.errors.length > 0;
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
							</div>

							{/* Role */}
							<div className={itemClass}>
								<form.Field name='role'>
									{(field) => {
										const isInvalid =
											field.state.meta.isTouched &&
											field.state.meta.errors.length > 0;
										return (
											<div>
												<FieldLabel
													htmlFor={field.name}
													className='flex items-center gap-2'
												>
													<UserCircle className='w-4 h-4' />
													<span className='text-sm font-medium'>I am a</span>
												</FieldLabel>

												<Select
													value={field.state.value}
													onValueChange={(value: IRegisterInput['role']) =>
														field.handleChange(value)
													}
												>
													<SelectTrigger
														className='w-full'
														aria-label='Select role'
													>
														<SelectValue placeholder='Select role' />
													</SelectTrigger>

													<SelectContent>
														<SelectItem value='CUSTOMER'>Customer</SelectItem>
														<SelectItem value='SELLER'>Seller</SelectItem>
													</SelectContent>
												</Select>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</div>
										);
									}}
								</form.Field>
							</div>

							{/* Phone (span 2 columns) */}
							<div className='col-span-1 md:col-span-2'>
								<form.Field name='phone'>
									{(field) => (
										<div>
											<FieldLabel
												htmlFor={field.name}
												className='flex items-center gap-2'
											>
												<Phone className='w-4 h-4' />
												<span className='text-sm font-medium'>
													Phone (Optional)
												</span>
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder='+1 (555) 000-0000'
											/>
										</div>
									)}
								</form.Field>
							</div>
						</div>

						{/* submit + helper */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center '>
							<motion.div whileTap={{ scale: 0.98 }} className='md:col-span-2'>
								<Button
									type='submit'
									disabled={isSubmitting}
									className='w-full'
									aria-label='Create account'
								>
									{isSubmitting ? 'Creating account...' : 'Create Account'}
								</Button>
							</motion.div>

							<div className='text-sm text-muted-foreground md:col-span-2 text-center md:text-left'>
								<FieldDescription>
									Already have an account?{' '}
									<Link href='/login' className='text-primary hover:underline'>
										Sign in
									</Link>
								</FieldDescription>
							</div>
						</div>
					</motion.form>
				</CardContent>
			</Card>

			<div className='text-xs text-muted-foreground text-center'>
				By continuing, you agree to our Terms of Service and Privacy Policy.
			</div>
		</div>
	);
}
