import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export function ProductGridSkeleton() {
	return (
		<div className='space-y-6'>
			{/* Results Info Skeleton */}
			<div className='flex items-center justify-between'>
				<Skeleton className='h-5 w-48' />
			</div>

			{/* Grid Skeleton */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{Array.from({ length: 6 }).map((_, i) => (
					<Card key={i} className='h-full flex flex-col pt-0 overflow-hidden'>
						<div className='w-full aspect-4/2 bg-muted animate-pulse' />
						<CardContent className='flex-1 p-4 space-y-3'>
							<Skeleton className='h-6 w-3/4' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-2/3' />
							<div className='flex items-center justify-between pt-2'>
								<Skeleton className='h-8 w-24' />
								<Skeleton className='h-6 w-20' />
							</div>
						</CardContent>
						<CardFooter className='p-4 pt-0'>
							<Skeleton className='h-10 w-full rounded-md' />
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
