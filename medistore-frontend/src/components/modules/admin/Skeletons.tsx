import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CustomerInfoSkeleton() {
	return (
		<Card className='shadow-sm animate-pulse'>
			<CardHeader>
				<Skeleton className='h-6 w-40' />
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='flex items-center gap-4'>
					<Skeleton className='h-14 w-14 rounded-full' />
					<div className='space-y-2'>
						<Skeleton className='h-5 w-32' />
						<Skeleton className='h-4 w-48' />
					</div>
				</div>
				<div className='grid sm:grid-cols-2 gap-6'>
					<div className='space-y-2'>
						<Skeleton className='h-3 w-20' />
						<Skeleton className='h-4 w-full' />
					</div>
					<div className='space-y-2'>
						<Skeleton className='h-3 w-20' />
						<Skeleton className='h-4 w-full' />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
