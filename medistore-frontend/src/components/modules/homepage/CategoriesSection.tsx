import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ICategory } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
	categories: ICategory[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
	return (
		<section className='py-16 bg-muted/30'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>
						Shop by Category
					</h2>
					<p className='text-muted-foreground max-w-2xl mx-auto'>
						Find exactly what you need from our wide range of medicine
						categories
					</p>
				</div>

				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{categories.map((category) => (
						<Link
							key={category.id}
							href={`/shop?categoryId=${category.id}`}
							className='group'
						>
							<Card className='h-full transition-all hover:shadow-lg hover:-translate-y-1'>
								<CardContent className='p-6 text-center space-y-2'>
									<div className='w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-4'>
										💊
									</div>
									<h3 className='font-semibold group-hover:text-primary transition-colors'>
										{category.name}
									</h3>
									<div className='flex items-center justify-center text-sm text-muted-foreground group-hover:text-primary transition-colors'>
										Browse
										<ArrowRight className='ml-1 h-4 w-4' />
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
