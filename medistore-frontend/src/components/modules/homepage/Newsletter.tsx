import { Button } from '@/components/ui/button';

export function Newsletters() {
	return (
		<section className='py-16'>
			<div className='container mx-auto px-4'>
				<div className='max-w-2xl mx-auto text-center space-y-4'>
					<h2 className='text-3xl font-bold'>Subscribe to Our Newsletter</h2>
					<p className='text-muted-foreground'>
						Get updates on new products and special offers
					</p>
					<div className='flex gap-2'>
						<input
							type='email'
							placeholder='Enter your email'
							className='flex-1 h-12 px-4 rounded-lg border'
						/>
						<Button size='lg'>Subscribe</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
