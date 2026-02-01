'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { updateProfile, changePassword } from '@/actions/user.action';
import { IUserProfile } from '@/types';

const profileSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	phone: z.string(),
	bio: z.string(),
	image: z.string(),
});

const passwordSchema = z
	.object({
		currentPassword: z.string().min(1, 'Current password is required'),
		newPassword: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string().min(1, 'Please confirm your password'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

interface ProfileContentProps {
	profile: IUserProfile;
}

export function ProfileContent({ profile }: ProfileContentProps) {
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);

	const isGoogleUser = !profile.accounts?.some(
		(account) => account.providerId === 'credential',
	);

	const profileForm = useForm({
		defaultValues: {
			name: profile.name,
			phone: profile.phone || '',
			bio: profile.bio || '',
			image: profile.image || '',
		},
		validators: {
			onChange: profileSchema,
		},
		onSubmit: async ({ value }) => {
			const loadingToast = toast.loading('Updating profile...');

			const result = await updateProfile(value);

			if (result.success) {
				toast.success(result.message, { id: loadingToast });
				setIsEditing(false);
				router.refresh();
			} else {
				toast.error(result.message, { id: loadingToast });
			}
		},
	});

	const passwordForm = useForm({
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		validators: {
			onChange: passwordSchema,
		},
		onSubmit: async ({ value }) => {
			const loadingToast = toast.loading('Changing password...');

			const result = await changePassword(
				value.currentPassword,
				value.newPassword,
			);

			if (result.success) {
				toast.success(result.message, { id: loadingToast });
				passwordForm.reset();
			} else {
				toast.error(result.message, { id: loadingToast });
			}
		},
	});

	return (
		<div className='grid lg:grid-cols-[300px_1fr] gap-6'>
			{/* Profile Summary */}
			<Card>
				<CardContent className='p-6 space-y-6'>
					<div className='flex flex-col items-center text-center space-y-4'>
						<Avatar className='w-32 h-32'>
							<AvatarImage src={profile.image} alt={profile.name} />
							<AvatarFallback className='text-3xl'>
								{profile.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className='font-bold text-xl'>{profile.name}</h3>
							<p className='text-sm text-muted-foreground'>{profile.email}</p>
						</div>
						<div className='w-full space-y-2 text-sm'>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Role</span>
								<span className='font-medium capitalize'>{profile.role}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Status</span>
								<span className='font-medium'>{profile.status}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Member Since</span>
								<span className='font-medium'>
									{new Date(profile.createdAt).toLocaleDateString()}
								</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Tabs for Profile & Security */}
			<Card>
				<CardHeader>
					<CardTitle>Account Settings</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue='profile'>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='profile'>Profile</TabsTrigger>
							<TabsTrigger value='security'>Security</TabsTrigger>
						</TabsList>

						{/* Profile Tab */}
						<TabsContent value='profile' className='space-y-4 mt-6'>
							<div className='flex items-center justify-between mb-4'>
								<h3 className='text-lg font-semibold'>Profile Information</h3>
								{!isEditing && (
									<Button
										onClick={() => setIsEditing(true)}
										variant='outline'
										size='sm'
									>
										Edit Profile
									</Button>
								)}
							</div>

							{isEditing ? (
								<form
									onSubmit={(e) => {
										e.preventDefault();
										profileForm.handleSubmit();
									}}
								>
									<FieldGroup>
										<profileForm.Field name='image'>
											{(field) => (
												<Field>
													<FieldLabel>Profile Picture</FieldLabel>
													<ImageUpload
														value={field.state.value}
														onChange={(url) => field.handleChange(url)}
														onRemove={() => field.handleChange('')}
													/>
												</Field>
											)}
										</profileForm.Field>

										<profileForm.Field name='name'>
											{(field) => {
												const isInvalid =
													field.state.meta.isTouched &&
													field.state.meta.errors.length > 0;
												return (
													<Field>
														<FieldLabel htmlFor={field.name}>
															Full Name
														</FieldLabel>
														<Input
															type='text'
															id={field.name}
															name={field.name}
															value={field.state.value}
															onChange={(e) =>
																field.handleChange(e.target.value)
															}
														/>
														{isInvalid && (
															<FieldError errors={field.state.meta.errors} />
														)}
													</Field>
												);
											}}
										</profileForm.Field>

										<Field>
											<FieldLabel>Email</FieldLabel>
											<Input type='email' value={profile.email} disabled />
											<p className='text-xs text-muted-foreground mt-1'>
												Email cannot be changed
											</p>
										</Field>

										<profileForm.Field name='phone'>
											{(field) => (
												<Field>
													<FieldLabel htmlFor={field.name}>
														Phone Number
													</FieldLabel>
													<Input
														type='tel'
														id={field.name}
														name={field.name}
														value={field.state.value}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder='+1 (555) 000-0000'
													/>
												</Field>
											)}
										</profileForm.Field>

										<profileForm.Field name='bio'>
											{(field) => (
												<Field>
													<FieldLabel htmlFor={field.name}>Bio</FieldLabel>
													<Textarea
														id={field.name}
														name={field.name}
														value={field.state.value}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder='Tell us about yourself...'
														rows={4}
													/>
												</Field>
											)}
										</profileForm.Field>

										<div className='flex gap-2'>
											<Button type='submit'>Save Changes</Button>
											<Button
												type='button'
												variant='outline'
												onClick={() => {
													setIsEditing(false);
													profileForm.reset();
												}}
											>
												Cancel
											</Button>
										</div>
									</FieldGroup>
								</form>
							) : (
								<div className='space-y-4'>
									<div>
										<p className='text-sm text-muted-foreground mb-1'>
											Full Name
										</p>
										<p className='font-medium'>{profile.name}</p>
									</div>
									<div>
										<p className='text-sm text-muted-foreground mb-1'>Email</p>
										<p className='font-medium'>{profile.email}</p>
									</div>
									<div>
										<p className='text-sm text-muted-foreground mb-1'>
											Phone Number
										</p>
										<p className='font-medium'>
											{profile.phone || 'Not provided'}
										</p>
									</div>
									<div>
										<p className='text-sm text-muted-foreground mb-1'>Bio</p>
										<p className='font-medium'>
											{profile.bio || 'No bio added yet'}
										</p>
									</div>
								</div>
							)}
						</TabsContent>

						{/* Security Tab */}
						<TabsContent value='security' className='space-y-4 mt-6'>
							<h3 className='text-lg font-semibold mb-4'>Change Password</h3>

							{isGoogleUser ? (
								<div className='border rounded-lg p-6 text-center space-y-2'>
									<p className='text-muted-foreground'>
										You signed in with Google. Password changes are not
										available for social login accounts.
									</p>
									<p className='text-sm text-muted-foreground'>
										Manage your password through your Google account settings.
									</p>
								</div>
							) : (
								<form
									onSubmit={(e) => {
										e.preventDefault();
										passwordForm.handleSubmit();
									}}
								>
									<FieldGroup>
										<passwordForm.Field name='currentPassword'>
											{(field) => {
												const isInvalid =
													field.state.meta.isTouched &&
													field.state.meta.errors.length > 0;
												return (
													<Field>
														<FieldLabel htmlFor={field.name}>
															Current Password
														</FieldLabel>
														<Input
															type='password'
															id={field.name}
															name={field.name}
															value={field.state.value}
															onChange={(e) =>
																field.handleChange(e.target.value)
															}
															placeholder='Enter current password'
														/>
														{isInvalid && (
															<FieldError errors={field.state.meta.errors} />
														)}
													</Field>
												);
											}}
										</passwordForm.Field>

										<passwordForm.Field name='newPassword'>
											{(field) => {
												const isInvalid =
													field.state.meta.isTouched &&
													field.state.meta.errors.length > 0;
												return (
													<Field>
														<FieldLabel htmlFor={field.name}>
															New Password
														</FieldLabel>
														<Input
															type='password'
															id={field.name}
															name={field.name}
															value={field.state.value}
															onChange={(e) =>
																field.handleChange(e.target.value)
															}
															placeholder='Enter new password (min 8 characters)'
														/>
														{isInvalid && (
															<FieldError errors={field.state.meta.errors} />
														)}
													</Field>
												);
											}}
										</passwordForm.Field>

										<passwordForm.Field name='confirmPassword'>
											{(field) => {
												const isInvalid =
													field.state.meta.isTouched &&
													field.state.meta.errors.length > 0;
												return (
													<Field>
														<FieldLabel htmlFor={field.name}>
															Confirm New Password
														</FieldLabel>
														<Input
															type='password'
															id={field.name}
															name={field.name}
															value={field.state.value}
															onChange={(e) =>
																field.handleChange(e.target.value)
															}
															placeholder='Confirm new password'
														/>
														{isInvalid && (
															<FieldError errors={field.state.meta.errors} />
														)}
													</Field>
												);
											}}
										</passwordForm.Field>

										<Button type='submit'>Change Password</Button>
									</FieldGroup>
								</form>
							)}
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
