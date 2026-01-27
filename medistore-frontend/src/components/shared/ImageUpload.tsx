'use client';

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { toast } from 'sonner';
import { env } from '../../env';

interface ImageUploadProps {
	value?: string;
	onChange: (url: string) => void;
	onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Validate file type
		if (!file.type.startsWith('image/')) {
			toast.error('Please upload an image file');
			return;
		}

		// Validate file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			toast.error('Image size should be less than 5MB');
			return;
		}

		setIsUploading(true);
		const loadingToast = toast.loading('Uploading image...');

		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append(
				'upload_preset',
				env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
			);
			formData.append('cloud_name', env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

			const res = await fetch(
				`https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
				{
					method: 'POST',
					body: formData,
				},
			);

			const data = await res.json();

			if (data.secure_url) {
				onChange(data.secure_url);
				toast.success('Image uploaded successfully', { id: loadingToast });
			} else {
				throw new Error('Upload failed');
			}
		} catch (error) {
			console.error(error);
			toast.error('Failed to upload image', { id: loadingToast });
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className='space-y-4'>
			{value ? (
				<div className='relative w-full h-48 rounded-md overflow-hidden border'>
					<Image
						src={value}
						alt='Uploaded image'
						fill
						className='object-cover'
					/>
					<Button
						type='button'
						variant='destructive'
						size='icon'
						className='absolute top-2 right-2'
						onClick={onRemove}
					>
						<X className='h-4 w-4' />
					</Button>
				</div>
			) : (
				<div className='border-2 border-dashed rounded-md p-8 text-center'>
					<input
						type='file'
						accept='image/*'
						onChange={handleUpload}
						disabled={isUploading}
						className='hidden'
						id='image-upload'
					/>
					<label
						htmlFor='image-upload'
						className='cursor-pointer flex flex-col items-center gap-2'
					>
						{isUploading ? (
							<Loader2 className='h-10 w-10 animate-spin text-muted-foreground' />
						) : (
							<Upload className='h-10 w-10 text-muted-foreground' />
						)}
						<p className='text-sm text-muted-foreground'>
							{isUploading ? 'Uploading...' : 'Click to upload image'}
						</p>
						<p className='text-xs text-muted-foreground'>
							PNG, JPG, WEBP (max 5MB)
						</p>
					</label>
				</div>
			)}
		</div>
	);
}
