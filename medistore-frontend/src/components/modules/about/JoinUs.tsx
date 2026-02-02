'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function JoinUs() {
	return (
		<section className='py-20 md:py-32 bg-background'>
			<div className='container mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					className='max-w-4xl mx-auto bg-muted/30 rounded-3xl p-8 md:p-16 text-center space-y-8 border border-border/50 shadow-2xl relative overflow-hidden'
				>
					{/* Background Decoration */}
					<div className='absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl' />
					<div className='absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl' />

					<h2 className='text-3xl md:text-5xl font-bold relative z-10'>
						Ready to Experience Better Healthcare?
					</h2>
					<p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto relative z-10'>
						Join thousands of satisfied customers who trust MediStore for their pharmaceutical needs. Fast, secure, and reliable.
					</p>
					
					<div className='flex flex-col sm:flex-row gap-4 justify-center relative z-10 pt-4'>
						<Button size='lg' className='h-14 px-8 text-lg rounded-full' asChild>
							<Link href='/shop'>
								Shop Now <ArrowRight className='ml-2 w-5 h-5' />
							</Link>
						</Button>
						<Button size='lg' variant='outline' className='h-14 px-8 text-lg rounded-full' asChild>
							<Link href='/contact'>
								Contact Support
							</Link>
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
