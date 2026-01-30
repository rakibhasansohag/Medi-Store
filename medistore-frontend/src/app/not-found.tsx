import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
	return (
		<div className='flex items-center justify-center min-h-screen bg-linear-to-b from-background to-muted'>
			<div className='text-center space-y-6 px-4'>
				<div className='space-y-2'>
					<h1 className='text-9xl font-bold text-primary'>404</h1>
					<h2 className='text-3xl font-semibold'>Page Not Found</h2>
					<p className='text-muted-foreground max-w-md mx-auto'>
						Oops! The page you&apos;re looking for doesn&apos;t exist. It might
						have been moved or deleted.
					</p>
				</div>

				<div className='flex gap-4 justify-center flex-wrap'>
					<Button asChild size='lg'>
						<Link href='/'>
							<Home className='mr-2 h-5 w-5' />
							Go Home
						</Link>
					</Button>
					<Button asChild variant='outline' size='lg'>
						<Link href='/shop'>
							<Search className='mr-2 h-5 w-5' />
							Browse Shop
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
