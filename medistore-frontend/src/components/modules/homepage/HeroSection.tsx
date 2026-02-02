'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Star, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState('');

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchValue.trim()) {
			router.push(`/shop?search=${encodeURIComponent(searchValue)}`);
		}
	};

	return (
		<section className='relative w-full min-h-150 lg:min-h-200 flex items-center overflow-hidden bg-background'>
			{/* Background Image with Overlay */}
			<div className='absolute inset-0 z-0'>
				<Image
					src='https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1920&auto=format&fit=crop'
					alt='Medical Professional with Medicine'
					fill
					priority
					className='object-cover opacity-20 dark:opacity-10'
				/>
				<div className='absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/20' />
			</div>

			<div className='container relative z-10 mx-auto px-4 py-12 md:py-20'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					{/* Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className='space-y-8 max-w-2xl'
					>
						{/* Trust Badge */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-sm'
						>
							<Star className='w-4 h-4 fill-primary' />
							<span>Trusted by 50,000+ Customers</span>
						</motion.div>

						<div className='space-y-4'>
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]'
							>
								Your Health, <br />
								<span className='text-primary'>Our Priority</span>
							</motion.h1>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
								className='text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg'
							>
								Experience the future of pharmacy with instant access to
								top-quality medicines, expert care, and seamless delivery right
								to your doorstep.
							</motion.p>
						</div>

						{/* Search Bar */}
						<motion.form
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							onSubmit={handleSearch}
							className='relative max-w-md w-full group'
						>
							<div className='relative flex items-center shadow-lg rounded-full overflow-hidden transition-shadow duration-300 group-hover:shadow-xl group-focus-within:shadow-2xl group-focus-within:ring-2 ring-primary/20'>
								<Search className='absolute left-5 w-5 h-5 text-muted-foreground' />
								<input
									type='text'
									placeholder='Search medicines, health products...'
									className='w-full h-16 pl-12 pr-14 rounded-full border-2 border-border/50 bg-background/80 backdrop-blur-md focus:border-primary focus:bg-background transition-all outline-none text-lg'
									value={searchValue}
									onChange={(e) => setSearchValue(e.target.value)}
								/>
								<Button
									type='submit'
									size='icon'
									className='absolute right-2 h-12 w-12 rounded-full transition-transform hover:scale-105 active:scale-95'
								>
									<ArrowRight className='w-6 h-6' />
									<span className='sr-only'>Search</span>
								</Button>
							</div>
						</motion.form>

						{/* Trust Indicators */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.6 }}
							className='flex flex-wrap gap-8 pt-4 border-t border-border/50'
						>
							<div className='flex items-center gap-3 group cursor-default'>
								<div className='p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform'>
									<ShieldCheck className='w-6 h-6' />
								</div>
								<div className='text-sm'>
									<div className='font-bold'>100% Secure</div>
									<div className='text-muted-foreground'>Payments</div>
								</div>
							</div>
							<div className='flex items-center gap-3 group cursor-default'>
								<div className='p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform'>
									<Clock className='w-6 h-6' />
								</div>
								<div className='text-sm'>
									<div className='font-bold'>24/7 Support</div>
									<div className='text-muted-foreground'>Dedicated Care</div>
								</div>
							</div>
						</motion.div>
					</motion.div>

					{/* Floating Elements / Visuals */}
					<div className='relative hidden lg:block h-150 w-full'>
						{/* Main Abstract Visual */}
						<div className='absolute inset-0 bg-linear-to-tr from-primary/20 to-blue-500/20 rounded-full blur-3xl opacity-30 animate-pulse' />

						<motion.div
							animate={{ y: [0, -20, 0] }}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
							className='absolute top-20 right-10 z-20'
						>
							<div className='p-4 rounded-2xl bg-card/80 backdrop-blur-md shadow-2xl border border-border/50 w-64 transform rotate-6 hover:rotate-0 transition-all duration-500'>
								<div className='flex items-center gap-4'>
									<div className='w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl'>
										💊
									</div>
									<div>
										<div className='font-bold text-base'>Daily Essentials</div>
										<div className='text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full inline-block mt-1'>
											In Stock
										</div>
									</div>
								</div>
							</div>
						</motion.div>

						<motion.div
							animate={{ y: [0, 30, 0] }}
							transition={{
								duration: 5,
								repeat: Infinity,
								ease: 'easeInOut',
								delay: 1,
							}}
							className='absolute bottom-40 left-10 z-20'
						>
							<div className='p-4 rounded-2xl bg-card/80 backdrop-blur-md shadow-2xl border border-border/50 w-72 transform -rotate-3 hover:rotate-0 transition-all duration-500'>
								<div className='flex items-center gap-4'>
									<div className='w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 relative'>
										<Image
											src='https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop'
											alt='Doctor'
											fill
											className='object-cover'
										/>
									</div>
									<div>
										<div className='font-bold text-base'>
											Expert Pharmacists
										</div>
										<div className='text-xs text-muted-foreground'>
											Verified Specialists
										</div>
										<div className='flex text-yellow-400 text-xs mt-1 space-x-0.5'>
											<Star className='w-3 h-3 fill-current' />
											<Star className='w-3 h-3 fill-current' />
											<Star className='w-3 h-3 fill-current' />
											<Star className='w-3 h-3 fill-current' />
											<Star className='w-3 h-3 fill-current' />
										</div>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Floating 3D Element Placeholders using CSS/Divs */}
						<motion.div
							animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
							transition={{ duration: 3, repeat: Infinity }}
							className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10'
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
