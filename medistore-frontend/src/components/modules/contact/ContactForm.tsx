'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
	Send,
	User,
	Mail,
	MessageSquare,
	FileText,
	Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Define the validation schema
const contactSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	subject: z.string().min(5, 'Subject must be at least 5 characters'),
	message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			subject: '',
			message: '',
		} as ContactFormValues,
		validators: {
			onChange: contactSchema,
		},
		onSubmit: async ({ value }) => {
			setIsSubmitting(true);
			const loadingToast = toast.loading('Sending your message...');

			try {
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 1500));

				console.log('Form submitted:', value);

				toast.success(
					'Message sent successfully! We will get back to you soon.',
					{
						id: loadingToast,
					},
				);

				form.reset();
			} catch (error) {
				toast.error('Failed to send message. Please try again.', {
					id: loadingToast,
				});
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
		>
			<Card className='w-full shadow-xl border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 pt-0'>
				<CardHeader className='bg-primary/5 border-b border-border/50 p-6 md:p-8'>
					<CardTitle className='text-2xl font-bold flex items-center gap-3'>
						<div className='p-2 bg-primary/10 rounded-lg text-primary'>
							<MessageSquare className='w-6 h-6' />
						</div>
						Send us a Message
					</CardTitle>
					<CardDescription className='text-base mt-2'>
						Fill out the form below and our team will respond within 24 hours.
					</CardDescription>
				</CardHeader>
				<CardContent className='p-6 md:p-8'>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className='space-y-6'
					>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<form.Field name='name'>
								{(field) => (
									<Field className='w-full space-y-2 group'>
										<FieldLabel
											htmlFor='name'
											className='text-sm font-medium flex items-center gap-2 group-focus-within:text-primary transition-colors'
										>
											<User className='w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
											Full Name
										</FieldLabel>
										<motion.div
											whileTap={{ scale: 0.995 }}
											className='relative'
										>
											<Input
												id='name'
												placeholder='John Doe'
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className={cn(
													'transition-all duration-200 focus:ring-2 h-12',
													field.state.meta.errors.length > 0
														? 'border-destructive focus:ring-destructive/20'
														: 'focus:ring-primary/20 hover:border-primary/50',
												)}
											/>
										</motion.div>
										{field.state.meta.isTouched &&
											field.state.meta.errors.length > 0 && (
												<motion.div
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
												>
													<FieldError>
														{field.state.meta.errors[0]?.message}
													</FieldError>
												</motion.div>
											)}
									</Field>
								)}
							</form.Field>

							<form.Field name='email'>
								{(field) => (
									<Field className='w-full space-y-2 group'>
										<FieldLabel
											htmlFor='email'
											className='text-sm font-medium flex items-center gap-2 group-focus-within:text-primary transition-colors'
										>
											<Mail className='w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
											Email Address
										</FieldLabel>
										<motion.div
											whileTap={{ scale: 0.995 }}
											className='relative'
										>
											<Input
												id='email'
												type='email'
												placeholder='john@example.com'
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className={cn(
													'transition-all duration-200 focus:ring-2 h-12',
													field.state.meta.errors.length > 0
														? 'border-destructive focus:ring-destructive/20'
														: 'focus:ring-primary/20 hover:border-primary/50',
												)}
											/>
										</motion.div>
										{field.state.meta.isTouched &&
											field.state.meta.errors.length > 0 && (
												<motion.div
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
												>
													<FieldError>
														{field.state.meta.errors[0]?.message}
													</FieldError>
												</motion.div>
											)}
									</Field>
								)}
							</form.Field>
						</div>

						<form.Field name='subject'>
							{(field) => (
								<Field className='w-full space-y-2 group'>
									<FieldLabel
										htmlFor='subject'
										className='text-sm font-medium flex items-center gap-2 group-focus-within:text-primary transition-colors'
									>
										<FileText className='w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
										Subject
									</FieldLabel>
									<motion.div whileTap={{ scale: 0.995 }} className='relative'>
										<Input
											id='subject'
											placeholder='How can we help you?'
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className={cn(
												'transition-all duration-200 focus:ring-2 h-12',
												field.state.meta.errors.length > 0
													? 'border-destructive focus:ring-destructive/20'
													: 'focus:ring-primary/20 hover:border-primary/50',
											)}
										/>
									</motion.div>
									{field.state.meta.isTouched &&
										field.state.meta.errors.length > 0 && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
											>
												<FieldError>
													{field.state.meta.errors[0]?.message}
												</FieldError>
											</motion.div>
										)}
								</Field>
							)}
						</form.Field>

						<form.Field name='message'>
							{(field) => (
								<Field className='w-full space-y-2 group'>
									<FieldLabel
										htmlFor='message'
										className='text-sm font-medium flex items-center gap-2 group-focus-within:text-primary transition-colors'
									>
										<MessageSquare className='w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
										Message
									</FieldLabel>
									<motion.div whileTap={{ scale: 0.995 }} className='relative'>
										<Textarea
											id='message'
											placeholder='Type your message here...'
											rows={5}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className={cn(
												'resize-none transition-all duration-200 focus:ring-2 h-40',
												field.state.meta.errors.length > 0
													? 'border-destructive focus:ring-destructive/20'
													: 'focus:ring-primary/20 hover:border-primary/50',
											)}
										/>
									</motion.div>
									{field.state.meta.isTouched &&
										field.state.meta.errors.length > 0 && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
											>
												<FieldError>
													{field.state.meta.errors[0]?.message}
												</FieldError>
											</motion.div>
										)}
								</Field>
							)}
						</form.Field>

						<div className='pt-2'>
							<Button
								type='submit'
								className='w-full md:w-auto min-w-[150px] h-11 text-base'
								disabled={isSubmitting}
								size='lg'
							>
								{isSubmitting ? (
									<>
										<Loader2 className='mr-2 w-4 h-4 animate-spin' />
										Sending...
									</>
								) : (
									<>
										Send Message
										<Send className='ml-2 w-4 h-4' />
									</>
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</motion.div>
	);
}
