'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShopFilters } from './ShopFilters';
import { ShopContent } from './ShopContent';
import { ShopSearch } from './ShopSearch';
import { ProductGridSkeleton } from './ProductGridSkeleton';
import { ICategory, IMedicine, IPaginatedResponse } from '@/types';
import { medicineClientService } from '@/services/medicine.client.service';

interface ShopClientContainerProps {
	initialMedicines: IMedicine[];
	initialPagination: IPaginatedResponse<IMedicine>['pagination'];
	categories: ICategory[];
}

export function ShopClientContainer({
	initialMedicines,
	initialPagination,
	categories,
}: ShopClientContainerProps) {
	const searchParams = useSearchParams();

	// Local state to manage data
	const [medicines, setMedicines] = useState(initialMedicines);
	const [pagination, setPagination] = useState(initialPagination);
	const [loading, setLoading] = useState(false);

	// Manage filter state locally to bypass server nav
	const [filterState, setFilterState] = useState({
		search: searchParams.get('search') || '',
		categoryId: searchParams.get('categoryId') || '',
		minPrice: searchParams.get('minPrice') || '',
		maxPrice: searchParams.get('maxPrice') || '',
		page: searchParams.get('page') || '1',
		sortBy: searchParams.get('sortBy') || 'createdAt',
		sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
	});

	// Cache
	const cache = useRef<Map<string, { data: IMedicine[]; pagination: IPaginatedResponse<IMedicine>['pagination'] }>>(new Map());

	// Sync URL without reload
	const updateUrl = useCallback((newState: typeof filterState) => {
		const params = new URLSearchParams();
		Object.entries(newState).forEach(([key, value]) => {
			if (value) params.set(key, value);
		});
		const newUrl = `/shop?${params.toString()}`;
		window.history.pushState(null, '', newUrl);
	}, []);

	// Fetch data
	const fetchData = useCallback(async (newState: typeof filterState) => {
		const cacheKey = JSON.stringify(newState);

		if (cache.current.has(cacheKey)) {
			const cached = cache.current.get(cacheKey)!;
			setMedicines(cached.data);
			setPagination(cached.pagination);
			return;
		}

		setLoading(true);
		
		const res = await medicineClientService.getMedicines({
			...newState,
			limit: '12',
		});

		if (res.success && res.data) {
			setMedicines(res.data.data);
			setPagination(res.data.pagination);
			cache.current.set(cacheKey, {
				data: res.data.data,
				pagination: res.data.pagination,
			});
		}
		setLoading(false);
	}, []);

	// Handlers
	const handleFilterChange = (key: string, value: string) => {
		const newState = { ...filterState, [key]: value, page: '1' };
		setFilterState(newState);
		updateUrl(newState);
		fetchData(newState);
	};

	const handlePriceChange = (min: string, max: string) => {
		const newState = { ...filterState, minPrice: min, maxPrice: max, page: '1' };
		setFilterState(newState);
		updateUrl(newState);
		fetchData(newState);
	};

	const handleSearch = (value: string) => {
		const newState = { ...filterState, search: value, page: '1' };
		setFilterState(newState);
		updateUrl(newState);
		fetchData(newState);
	};

	const handleClearFilters = () => {
		const newState = {
			search: '',
			categoryId: '',
			minPrice: '',
			maxPrice: '',
			page: '1',
			sortBy: 'createdAt',
			sortOrder: 'desc' as const,
		};
		setFilterState(newState);
		updateUrl(newState);
		fetchData(newState);
	};

	const handlePageChange = (page: number) => {
		const newState = { ...filterState, page: page.toString() };
		setFilterState(newState);
		updateUrl(newState);
		fetchData(newState);
	};

	const hasFilters = !!(
		filterState.search ||
		filterState.categoryId ||
		filterState.minPrice ||
		filterState.maxPrice
	);

	// Initialize cache with initial props
	useEffect(() => {
		const initialKey = JSON.stringify({
			search: searchParams.get('search') || '',
			categoryId: searchParams.get('categoryId') || '',
			minPrice: searchParams.get('minPrice') || '',
			maxPrice: searchParams.get('maxPrice') || '',
			page: searchParams.get('page') || '1',
			sortBy: searchParams.get('sortBy') || 'createdAt',
			sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
		});
		if (!cache.current.has(initialKey)) {
			cache.current.set(initialKey, {
				data: initialMedicines,
				pagination: initialPagination,
			});
		}
	}, []); // Run once

	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-1 bg-muted/30'>
				<div className='container mx-auto px-4 py-8'>
					<div className='mb-8 text-center'>
						<h1 className='text-3xl md:text-4xl font-bold mb-2'>
							Shop Medicines
						</h1>
						<p className='text-muted-foreground mb-6'>
							Browse our wide range of quality medicines
						</p>
						<ShopSearch 
                            value={filterState.search} 
                            onSearch={handleSearch} 
                        />
					</div>

					<div className='grid lg:grid-cols-[280px_1fr] gap-8'>
						<aside>
							<ShopFilters
								categories={categories}
								onFilterChange={handleFilterChange}
								onPriceChange={handlePriceChange}
								onClearFilters={handleClearFilters}
								values={filterState}
							/>
						</aside>

						<div className='relative min-h-[500px]'>
							{loading ? (
								<div className='animate-in fade-in zoom-in-95 duration-300'>
									<ProductGridSkeleton />
								</div>
							) : (
								<div className='animate-in fade-in zoom-in-95 duration-300'>
									<ShopContent
										medicines={medicines}
										pagination={pagination}
										onPageChange={handlePageChange}
										onClearFilters={handleClearFilters}
										hasFilters={hasFilters}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
