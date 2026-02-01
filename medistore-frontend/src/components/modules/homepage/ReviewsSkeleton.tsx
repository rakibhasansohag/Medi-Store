import { Skeleton } from '@/components/ui/skeleton';

export function ReviewsSkeleton() {
	return (
		<section className='py-16 overflow-hidden bg-muted/30'>
			<div className='container mx-auto px-4 mb-8'>
				<div className='text-center space-y-4'>
					<Skeleton className='h-10 w-64 mx-auto' />
					<Skeleton className='h-5 w-96 mx-auto' />
				</div>
			</div>

			<div className='relative'>
				<div className='flex gap-6 overflow-hidden'>
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className='shrink-0 w-80 h-48 rounded-xl border bg-card p-6 space-y-4'
						>
							<div className='flex gap-1'>
								{Array.from({ length: 5 }).map((_, j) => (
									<Skeleton key={j} className='h-5 w-5 rounded-full' />
								))}
							</div>
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-3/4' />
							<div className='flex items-center gap-3 pt-3 border-t'>
								<Skeleton className='w-12 h-12 rounded-md' />
								<div className='space-y-2 flex-1'>
									<Skeleton className='h-4 w-20' />
									<Skeleton className='h-3 w-16' />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
