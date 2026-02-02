'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function OurStory() {
	return (
		<section id='our-story' className='py-20 md:py-32 bg-background'>
			<div className='container mx-auto px-4'>
				<div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
					{/* Image Grid */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='relative'
					>
						<div className='relative h-100 md:h-125 w-full rounded-2xl overflow-hidden shadow-2xl'>
							<Image
								src='https://plus.unsplash.com/premium_photo-1681843042287-4240248634b5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								alt='Medical Team Meeting'
								fill
								className='object-cover'
							/>
						</div>
						{/* Floating Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.3 }}
							className='absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-card p-6 rounded-xl shadow-xl border border-border/50 max-w-xs'
						>
							<div className='flex items-center gap-4 mb-3'>
								<div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl'>
									📅
								</div>
								<div>
									<div className='text-sm text-muted-foreground'>
										Established
									</div>
									<div className='font-bold text-lg'>2008</div>
								</div>
							</div>
							<p className='text-sm text-muted-foreground'>
								Over 15 years of excellence in pharmaceutical care and service.
							</p>
						</motion.div>
					</motion.div>

					{/* Content */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='space-y-6'
					>
						<h2 className='text-3xl md:text-4xl font-bold'>Our Journey</h2>
						<div className='space-y-4 text-lg text-muted-foreground'>
							<p>
								Founded with a simple yet powerful vision, MediStore began as a
								small community pharmacy dedicated to personal care. We
								recognized early on that access to essential medicines
								shouldn&apos;t be complicated or expensive.
							</p>
							<p>
								As the digital landscape evolved, so did we. We transformed into
								a comprehensive digital health platform, bridging the gap
								between patients and quality healthcare products. Today, we
								serve thousands of customers daily, maintaining the same trust
								and personal touch that defined our humble beginnings.
							</p>
							<p>
								Our commitment goes beyond just selling medicine; it&apos;s
								about building a healthier community through education,
								accessibility, and unwavering quality standards.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
