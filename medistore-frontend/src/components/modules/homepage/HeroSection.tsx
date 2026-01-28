import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search } from 'lucide-react';
import { ICategory } from '@/types';

interface HeroSectionProps {
	categories: ICategory[];
}

export function HeroSection({ categories }: HeroSectionProps) {
	const topCategories = categories.slice(0, 6);

	return (
		<section className='relative gradient-warm'>
			<div className='container mx-auto px-4 py-20 md:py-32'>
				<div className='max-w-4xl mx-auto text-center space-y-8'>
					{/* Main Heading */}
					<div className='space-y-4'>
						<Badge variant='secondary' className='mb-4'>
							🏥 Your Trusted Medicine Partner
						</Badge>
						<h1 className='text-4xl md:text-6xl font-bold tracking-tight'>
							Quality Medicines
							<span className='text-primary block'>Delivered to Your Door</span>
						</h1>
						<p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
							Shop from a wide range of authentic medicines with guaranteed
							quality. Fast delivery, secure payments, and expert support.
						</p>
					</div>

					{/* Search Bar */}
					<div className='max-w-2xl mx-auto'>
						<div className='flex gap-2'>
							<div className='flex-1 relative'>
								<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
								<input
									type='text'
									placeholder='Search for medicines...'
									className='w-full h-12 pl-10 pr-4 rounded-lg border bg-background'
								/>
							</div>
							<Button size='lg' className='h-12'>
								Search
							</Button>
						</div>
					</div>

					{/* Quick Category Access */}
					<div className='space-y-4'>
						<p className='text-sm text-muted-foreground'>Browse by category:</p>
						<div className='flex flex-wrap justify-center gap-2'>
							{topCategories.map((category) => (
								<Button
									key={category.id}
									variant='outline'
									asChild
									className='rounded-full'
								>
									<Link href={`/shop?categoryId=${category.id}`}>
										{category.name}
									</Link>
								</Button>
							))}
						</div>
					</div>

					{/* CTA Buttons */}
					<div className='flex flex-wrap justify-center gap-4'>
						<Button size='lg' asChild>
							<Link href='/shop'>
								Shop Now
								<ArrowRight className='ml-2 h-5 w-5' />
							</Link>
						</Button>
						<Button size='lg' variant='outline' asChild>
							<Link href='/register'>Become a Seller</Link>
						</Button>
					</div>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className='absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background to-transparent' />
		</section>
	);
}
