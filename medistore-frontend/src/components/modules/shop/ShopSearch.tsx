'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShopSearchProps<T extends string = string> {
	onSearch?: (value: T) => void;
	value?: T;
}

export function ShopSearch<T extends string>({
	onSearch,
	value: externalValue,
}: ShopSearchProps<T>) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [inputValue, setInputValue] = useState<string>(
		externalValue ?? searchParams.get('search') ?? '',
	);

	const [prevExternalValue, setPrevExternalValue] = useState<T | undefined>(
		externalValue,
	);

	const [isPending, startTransition] = useTransition();
	const [isFocused, setIsFocused] = useState(false);

	if (externalValue !== prevExternalValue) {
		setInputValue(externalValue ?? '');
		setPrevExternalValue(externalValue);
	}

	// Debounce search logic
	useEffect(() => {
		const timer = setTimeout(() => {
			const currentSearch = searchParams.get('search') || '';

			// Trigger onSearch if provided and value is different
			if (onSearch && inputValue !== (externalValue ?? '')) {
				onSearch(inputValue as T);
			}
			// Otherwise, update the URL if the value changed relative to the URL
			else if (!onSearch && inputValue !== currentSearch) {
				startTransition(() => {
					const params = new URLSearchParams(searchParams.toString());
					if (inputValue) {
						params.set('search', inputValue);
					} else {
						params.delete('search');
					}
					params.set('page', '1');
					router.push(`/shop?${params.toString()}`);
				});
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [inputValue, router, searchParams, onSearch, externalValue]);

	return (
		<div className='relative mb-8 max-w-2xl mx-auto'>
			<motion.div
				animate={{
					scale: isFocused ? 1.01 : 1,
					boxShadow: isFocused
						? '0 10px 30px -10px rgba(0, 0, 0, 0.1)'
						: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
				}}
				className='relative'
			>
				<div className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'>
					{isPending ? (
						<Loader2 className='h-5 w-5 animate-spin text-primary' />
					) : (
						<Search className='h-5 w-5' />
					)}
				</div>
				<Input
					type='text'
					placeholder='Search medicines...'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className='h-14 pl-12 pr-12 text-lg rounded-2xl border-muted-foreground/20 bg-card focus-visible:ring-primary/20 focus-visible:border-primary'
				/>
				<AnimatePresence>
					{inputValue && (
						<motion.button
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							onClick={() => setInputValue('')}
							className='absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full'
						>
							<X className='h-4 w-4 text-muted-foreground' />
						</motion.button>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
