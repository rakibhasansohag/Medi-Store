'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ICategory } from '@/types';
import { X } from 'lucide-react';
import { useState } from 'react';

interface ShopFiltersProps {
	categories: ICategory[];
	onFilterChange?: (key: string, value: string) => void;
	onPriceChange?: (min: string, max: string) => void;
	onClearFilters?: () => void;
	values?: {
		categoryId?: string;
		minPrice?: string;
		maxPrice?: string;
	};
}

export function ShopFilters({
	categories,
	onFilterChange,
	onPriceChange,
	onClearFilters,
	values,
}: ShopFiltersProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentCategoryId =
		(values?.categoryId !== undefined
			? values.categoryId
			: searchParams.get('categoryId')) || 'all';
	const currentMinPrice =
		values?.minPrice ?? searchParams.get('minPrice') ?? '';
	const currentMaxPrice =
		values?.maxPrice ?? searchParams.get('maxPrice') ?? '';

	const [minPrice, setMinPrice] = useState(currentMinPrice);
	const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

	const updateFilters = (key: string, value: string) => {
		if (onFilterChange) {
			onFilterChange(key, value);
			return;
		}

		const params = new URLSearchParams(searchParams.toString());

		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		// Reset to page 1 when filters change
		params.set('page', '1');

		router.push(`/shop?${params.toString()}`);
	};

	const clearFilters = () => {
		if (onClearFilters) {
			onClearFilters();
			setMinPrice('');
			setMaxPrice('');
			return;
		}

		router.push('/shop');
		setMinPrice('');
		setMaxPrice('');
	};

	const applyPriceFilter = () => {
		if (onPriceChange) {
			onPriceChange(minPrice, maxPrice);
			return;
		}

		const params = new URLSearchParams(searchParams.toString());

		if (minPrice) params.set('minPrice', minPrice);
		else params.delete('minPrice');

		if (maxPrice) params.set('maxPrice', maxPrice);
		else params.delete('maxPrice');

		params.set('page', '1');

		router.push(`/shop?${params.toString()}`);
	};

	const hasFilters = values
		? !!(values.categoryId || values.minPrice || values.maxPrice)
		: !!(
				searchParams.get('categoryId') ||
				searchParams.get('minPrice') ||
				searchParams.get('maxPrice')
			);

	return (
		<aside className='space-y-6'>
			{/* Clear Filters */}
			{hasFilters && (
				<Button variant='outline' className='w-full' onClick={clearFilters}>
					<X className='mr-2 h-4 w-4' />
					Clear All Filters
				</Button>
			)}

			{/* Categories */}
			<Card>
				<CardHeader>
					<CardTitle>Categories</CardTitle>
				</CardHeader>
				<CardContent>
					<RadioGroup
						value={currentCategoryId}
						onValueChange={(value) =>
							updateFilters('categoryId', value === 'all' ? '' : value)
						}
					>
						<div className='flex items-center space-x-2 mb-2'>
							<RadioGroupItem value='all' id='all' />
							<Label htmlFor='all' className='cursor-pointer'>
								All Categories
							</Label>
						</div>
						{categories.map((category) => (
							<div
								key={category.id}
								className='flex items-center space-x-2 mb-2'
							>
								<RadioGroupItem value={category.id} id={category.id} />
								<Label htmlFor={category.id} className='cursor-pointer'>
									{category.name}
								</Label>
							</div>
						))}
					</RadioGroup>
				</CardContent>
			</Card>

			{/* Price Range */}
			<Card>
				<CardHeader>
					<CardTitle>Price Range</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex gap-2'>
						<div className='grid w-full items-center gap-1.5'>
							<Label htmlFor='minPrice'>Min</Label>
							<Input
								type='number'
								id='minPrice'
								placeholder='0'
								value={minPrice}
								onChange={(e) => setMinPrice(e.target.value)}
							/>
						</div>
						<div className='grid w-full items-center gap-1.5'>
							<Label htmlFor='maxPrice'>Max</Label>
							<Input
								type='number'
								id='maxPrice'
								placeholder='1000'
								value={maxPrice}
								onChange={(e) => setMaxPrice(e.target.value)}
							/>
						</div>
					</div>
					<Button className='w-full' onClick={applyPriceFilter}>
						Apply
					</Button>
				</CardContent>
			</Card>
		</aside>
	);
}
