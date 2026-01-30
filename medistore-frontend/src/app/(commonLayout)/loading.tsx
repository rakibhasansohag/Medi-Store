import { Loader2 } from 'lucide-react';

export default function PublicLoading() {
	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-1 flex items-center justify-center'>
				<div className='text-center space-y-4'>
					<Loader2 className='h-12 w-12 animate-spin mx-auto text-primary' />
					<p className='text-muted-foreground'>Loading...</p>
				</div>
			</main>
		</div>
	);
}
