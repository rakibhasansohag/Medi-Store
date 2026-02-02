'use client';

import { Shield, Truck, HeadphonesIcon, BadgeCheck, Activity, Users, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const features = [
	{
		icon: Shield,
		title: 'Authentic Products',
		description: 'All medicines are sourced from verified manufacturers',
	},
	{
		icon: Truck,
		title: 'Fast Delivery',
		description: 'Get your medicines delivered within 24-48 hours',
	},
	{
		icon: HeadphonesIcon,
		title: '24/7 Support',
		description: 'Our expert team is always here to help you',
	},
	{
		icon: BadgeCheck,
		title: 'Secure Payment',
		description: 'Your transactions are safe and encrypted',
	},
];

const stats = [
	{ icon: Users, label: 'Happy Customers', value: 10000, suffix: '+' },
	{ icon: Activity, label: 'Medicines Available', value: 5000, suffix: '+' },
	{ icon: Truck, label: 'Cities Covered', value: 120, suffix: '+' },
	{ icon: Globe, label: 'Years of Service', value: 15, suffix: '+' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (isInView) {
			let start = 0;
			const end = value;
			const duration = 2000;
			const increment = end / (duration / 16);

			const timer = setInterval(() => {
				start += increment;
				if (start >= end) {
					setCount(end);
					clearInterval(timer);
				} else {
					setCount(Math.floor(start));
				}
			}, 16);

			return () => clearInterval(timer);
		}
	}, [isInView, value]);

	return (
		<span ref={ref} className='font-bold text-4xl md:text-5xl text-primary'>
			{count}
			{suffix}
		</span>
	);
}

export function WhyChooseUs() {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});

	const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
	const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

	return (
		<section
			ref={containerRef}
			className='py-24 relative overflow-hidden bg-muted/30'
		>
			{/* Decorative Background Elements with Parallax */}
			<motion.div
				style={{ y }}
				className='absolute top-0 left-0 w-full h-full pointer-events-none'
			>
				<div className='absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl' />
				<div className='absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl' />
			</motion.div>

			<div className='container mx-auto px-4 relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className='text-center mb-20'
				>
					<h2 className='text-3xl md:text-5xl font-bold mb-6'>
						Why Choose <span className='text-primary'>MediStore?</span>
					</h2>
					<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
						We&apos;re committed to providing the best service for your health
						needs with transparency, speed, and care.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24'>
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Card className='h-full bg-background/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 group'>
									<CardContent className='p-8 text-center space-y-6'>
										<motion.div
											whileHover={{ scale: 1.1, rotate: 360 }}
											transition={{ duration: 0.6 }}
											className='w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-inner'
										>
											<Icon className='h-10 w-10 text-primary' />
										</motion.div>
										<div className='space-y-3'>
											<h3 className='font-bold text-xl'>{feature.title}</h3>
											<p className='text-muted-foreground leading-relaxed'>
												{feature.description}
											</p>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						);
					})}
				</div>

				{/* Animated Stats Section */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border/50'>
					{stats.map((stat, index) => {
						const Icon = stat.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.5 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
									type: 'spring',
								}}
								className='text-center space-y-2'
							>
								<div className='flex justify-center mb-4'>
									<Icon className='h-8 w-8 text-muted-foreground/50' />
								</div>
								<Counter value={stat.value} suffix={stat.suffix} />
								<p className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
									{stat.label}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
