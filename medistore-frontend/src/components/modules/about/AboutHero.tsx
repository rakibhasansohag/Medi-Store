'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AboutHero() {
	const scrollToContent = () => {
		const element = document.getElementById('our-story');
		element?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section className='relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-background'>
			{/* Background Pattern */}
			<div className='absolute inset-0 z-0 bg-primary/5'>
				<div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]' />
				<div className='absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl' />
				<div className='absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl' />
			</div>

			<div className='container relative z-10 mx-auto px-4 text-center'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='max-w-3xl mx-auto space-y-6'
				>
					<motion.span
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className='inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4'
					>
						About MediStore
					</motion.span>
					
					<h1 className='text-4xl md:text-6xl font-bold tracking-tight'>
						Revolutionizing <span className='text-primary'>Healthcare</span> Access
					</h1>
					
					<p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
						We are on a mission to make quality healthcare accessible, affordable, and convenient for everyone, everywhere.
					</p>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						className='pt-8'
					>
						<Button
							variant='ghost'
							size='icon'
							onClick={scrollToContent}
							className='animate-bounce rounded-full w-12 h-12 border border-border'
						>
							<ArrowDown className='w-6 h-6' />
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
