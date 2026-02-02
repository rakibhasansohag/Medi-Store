'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ICategory } from '@/types';
import {
	ArrowRight,
	Pill,
	Activity,
	Heart,
	Stethoscope,
	Thermometer,
	Syringe,
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface CategoriesSectionProps {
	categories: ICategory[];
}

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 15,
		},
	},
};

// Map of icons to cycle through
const ICONS = [Pill, Activity, Heart, Stethoscope, Thermometer, Syringe];

// Gradients for cards
const GRADIENTS = [
	'from-blue-500/20 to-cyan-400/20',
	'from-emerald-500/20 to-teal-400/20',
	'from-orange-500/20 to-amber-400/20',
	'from-purple-500/20 to-pink-400/20',
	'from-indigo-500/20 to-violet-400/20',
	'from-rose-500/20 to-red-400/20',
];

export function CategoriesSection({ categories }: CategoriesSectionProps) {
	// If no categories, return null or empty state
	if (!categories || categories.length === 0) return null;

	return (
		<section className='py-24 relative overflow-hidden bg-background'>
			{/* Decorative Background Elements */}
			<div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
				<div className='absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl' />
				<div className='absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl' />
			</div>

			<div className='container mx-auto px-4 relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='flex flex-col md:flex-row justify-between items-end mb-12 gap-6'
				>
					<div className='max-w-2xl'>
						<h2 className='text-3xl md:text-5xl font-bold mb-4 tracking-tight'>
							Browse by <span className='text-primary'>Category</span>
						</h2>
						<p className='text-muted-foreground text-lg'>
							Explore our comprehensive collection of healthcare products
							organized for your convenience.
						</p>
					</div>
					<Link
						href='/shop'
						className='hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all'
					>
						View All Categories <ArrowRight className='w-5 h-5' />
					</Link>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-50px' }}
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
				>
					{categories.slice(0, 8).map((category, index) => {
						const Icon = ICONS[index % ICONS.length];
						const gradient = GRADIENTS[index % GRADIENTS.length];
						// Make the first item span 2 columns and 2 rows on large screens for visual interest
						const isFeatured = index === 0;

						return (
							<motion.div
								key={category.id}
								variants={itemVariants}
								className={`${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''} group`}
							>
								<Link
									href={`/shop?categoryId=${category.id}`}
									className='block h-full'
								>
									<Card className='h-full overflow-hidden border-border/40 bg-card/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative group'>
										<CardContent
											className={`p-8 h-full flex flex-col ${isFeatured ? 'justify-end' : 'justify-center items-center text-center'}`}
										>
											{/* Gradient Overlay */}
											<div
												className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
											/>

											{/* Icon Background Blob */}
											<div
												className={`absolute ${isFeatured ? 'top-8 right-8' : 'inset-0 flex items-center justify-center'} transition-transform duration-500 group-hover:scale-110`}
											>
												<div
													className={`rounded-full bg-primary/5 ${isFeatured ? 'w-32 h-32' : 'w-24 h-24'} blur-2xl group-hover:bg-primary/10 transition-colors`}
												/>
											</div>

											{/* Icon */}
											<div
												className={`relative z-10 mb-6 ${isFeatured ? 'bg-background/80 p-4 rounded-2xl w-fit backdrop-blur-md shadow-sm' : ''}`}
											>
												<Icon
													className={`${isFeatured ? 'w-10 h-10' : 'w-12 h-12'} text-primary`}
													strokeWidth={1.5}
												/>
											</div>

											{/* Content */}
											<div className='relative z-10'>
												<h3
													className={`font-bold ${isFeatured ? 'text-3xl mb-2' : 'text-xl mb-1'} group-hover:text-primary transition-colors`}
												>
													{category.name}
												</h3>
												{isFeatured && (
													<p className='text-muted-foreground mb-6 max-w-sm'>
														Discover our most popular collection of{' '}
														{category.name.toLowerCase()} products trusted by
														thousands.
													</p>
												)}
												<div
													className={`flex items-center ${isFeatured ? 'justify-start' : 'justify-center'} text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors mt-2`}
												>
													Explore Now{' '}
													<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
												</div>
											</div>
										</CardContent>
									</Card>
								</Link>
							</motion.div>
						);
					})}
				</motion.div>

				<div className='mt-12 text-center md:hidden'>
					<Link
						href='/shop'
						className='inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all'
					>
						View All Categories <ArrowRight className='w-5 h-5' />
					</Link>
				</div>
			</div>
		</section>
	);
}
