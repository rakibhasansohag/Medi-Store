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
}

export function ShopFilters({ categories }: ShopFiltersProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
	const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

	const updateFilters = (key: string, value: string) => {
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
		router.push('/shop');
		setMinPrice('');
		setMaxPrice('');
	};

	const applyPriceFilter = () => {
		const params = new URLSearchParams(searchParams.toString());

		if (minPrice) params.set('minPrice', minPrice);
		else params.delete('minPrice');

		if (maxPrice) params.set('maxPrice', maxPrice);
		else params.delete('maxPrice');

		params.set('page', '1');

		router.push(`/shop?${params.toString()}`);
	};

	const hasFilters =
		searchParams.get('categoryId') ||
		searchParams.get('minPrice') ||
		searchParams.get('maxPrice');

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
						value={searchParams.get('categoryId') || 'all'}
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
					<div className='space-y-2'>
						<Label>Min Price ($)</Label>
						<Input
							type='number'
							placeholder='0.00'
							value={minPrice}
							onChange={(e) => setMinPrice(e.target.value)}
						/>
					</div>
					<div className='space-y-2'>
						<Label>Max Price ($)</Label>
						<Input
							type='number'
							placeholder='999.99'
							value={maxPrice}
							onChange={(e) => setMaxPrice(e.target.value)}
						/>
					</div>
					<Button onClick={applyPriceFilter} className='w-full'>
						Apply
					</Button>
				</CardContent>
			</Card>

			{/* Sort By */}
			<Card>
				<CardHeader>
					<CardTitle>Sort By</CardTitle>
				</CardHeader>
				<CardContent>
					<RadioGroup
						value={searchParams.get('sortBy') || 'createdAt'}
						onValueChange={(value) => updateFilters('sortBy', value)}
					>
						<div className='flex items-center space-x-2 mb-2'>
							<RadioGroupItem value='createdAt' id='newest' />
							<Label htmlFor='newest' className='cursor-pointer'>
								Newest First
							</Label>
						</div>
						<div className='flex items-center space-x-2 mb-2'>
							<RadioGroupItem value='price' id='price-low' />
							<Label htmlFor='price-low' className='cursor-pointer'>
								Price: Low to High
							</Label>
						</div>
						<div className='flex items-center space-x-2 mb-2'>
							<RadioGroupItem value='name' id='name' />
							<Label htmlFor='name' className='cursor-pointer'>
								Name: A to Z
							</Label>
						</div>
					</RadioGroup>
				</CardContent>
			</Card>
		</aside>
	);
}
