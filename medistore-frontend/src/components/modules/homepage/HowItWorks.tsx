'use client';

import { motion, Variants } from 'framer-motion';
import { Search, ShoppingCart, PackageCheck, Truck } from 'lucide-react';

const steps = [
	{
		id: 1,
		title: 'Search & Select',
		description:
			'Browse our extensive catalog of medicines and health products.',
		icon: Search,
	},
	{
		id: 2,
		title: 'Add to Cart',
		description:
			'Choose your quantity and add items to your secure shopping cart.',
		icon: ShoppingCart,
	},
	{
		id: 3,
		title: 'Secure Checkout',
		description: 'Complete your purchase with our encrypted payment gateway.',
		icon: PackageCheck,
	},
	{
		id: 4,
		title: 'Fast Delivery',
		description: 'Receive your order at your doorstep within 24-48 hours.',
		icon: Truck,
	},
];

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			stiffness: 80,
			damping: 20,
		},
	},
};

export function HowItWorks() {
	return (
		<section className='py-24 bg-muted/30 relative overflow-hidden'>
			{/* Background Pattern */}
			<div
				className='absolute inset-0 opacity-[0.03] pointer-events-none'
				style={{
					backgroundImage:
						'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
					backgroundSize: '40px 40px',
				}}
			/>

			<div className='container mx-auto px-4 relative z-10'>
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='text-3xl md:text-5xl font-bold mb-6'
					>
						Simple Steps to Better Health
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='text-lg text-muted-foreground'
					>
						We&apos;ve streamlined our process to ensure you get your medication
						as quickly and effortlessly as possible.
					</motion.p>
				</div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative'
				>
					{/* Connecting Line (Desktop) */}
					<div className='hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-transparent via-border to-transparent -z-10' />

					{steps.map((step) => {
						const Icon = step.icon;
						return (
							<motion.div
								key={step.id}
								variants={itemVariants}
								className='relative group'
							>
								<div className='flex flex-col items-center text-center'>
									<div className='relative mb-6'>
										<div className='w-24 h-24 rounded-2xl bg-background border-2 border-muted shadow-sm flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-md transition-all duration-300 z-10 relative'>
											<Icon
												className='w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors duration-300'
												strokeWidth={1.5}
											/>
										</div>
										<div className='absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-sm z-10'>
											{step.id}
										</div>
										{/* Decor blob */}
										<div className='absolute inset-0 bg-primary/5 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-50' />
									</div>

									<h3 className='text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300'>
										{step.title}
									</h3>
									<p className='text-muted-foreground leading-relaxed'>
										{step.description}
									</p>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
