'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, ShoppingBag, Truck, Award } from 'lucide-react';

const stats = [
	{
		id: 1,
		label: 'Satisfied Customers',
		value: 50000,
		suffix: '+',
		icon: Users,
	},
	{
		id: 2,
		label: 'Orders Delivered',
		value: 120000,
		suffix: '+',
		icon: ShoppingBag,
	},
	{
		id: 3,
		label: 'Cities Covered',
		value: 150,
		suffix: '+',
		icon: Truck,
	},
	{
		id: 4,
		label: 'Awards Won',
		value: 25,
		suffix: '',
		icon: Award,
	},
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
		<span ref={ref}>
			{count.toLocaleString()}
			{suffix}
		</span>
	);
}

export function Achievements() {
	return (
		<section className='py-20 bg-primary text-primary-foreground relative overflow-hidden'>
			{/* Decorative Circles */}
			<div className='absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl' />
			<div className='absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl' />

			<div className='container mx-auto px-4 relative z-10'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
					{stats.map((stat, index) => (
						<motion.div
							key={stat.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className='text-center space-y-2'
						>
							<div className='mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm'>
								<stat.icon className='w-6 h-6' />
							</div>
							<div className='text-3xl md:text-5xl font-bold'>
								<Counter value={stat.value} suffix={stat.suffix} />
							</div>
							<div className='text-primary-foreground/80 font-medium'>
								{stat.label}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
