import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function DashboardNotFound() {
	return (
		<div className='flex items-center justify-center min-h-[60vh]'>
			<div className='text-center space-y-6 px-4'>
				<div className='space-y-2'>
					<h1 className='text-6xl font-bold text-primary'>404</h1>
					<h2 className='text-2xl font-semibold'>Page Not Found</h2>
					<p className='text-muted-foreground'>
						This dashboard page doesn&apos;t exist.
					</p>
				</div>

				<div className='flex gap-4 justify-center'>
					<Button asChild>
						<Link href='/dashboard'>
							<Home className='mr-2 h-4 w-4' />
							Dashboard Home
						</Link>
					</Button>
					<Button
						asChild
						variant='outline'
						onClick={() => window.history.back()}
					>
						<span>
							<ArrowLeft className='mr-2 h-4 w-4' />
							Go Back
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
