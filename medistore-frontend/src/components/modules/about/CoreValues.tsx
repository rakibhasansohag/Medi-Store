'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShieldCheck, Zap, Users, Leaf, Globe } from 'lucide-react';

const values = [
	{
		icon: Heart,
		title: 'Patient First',
		description: 'Every decision we make is guided by the well-being and safety of our customers.',
		color: 'text-red-500',
		bg: 'bg-red-500/10',
	},
	{
		icon: ShieldCheck,
		title: 'Integrity',
		description: 'We adhere to the highest ethical standards, ensuring authenticity in every product.',
		color: 'text-primary',
		bg: 'bg-primary/10',
	},
	{
		icon: Zap,
		title: 'Innovation',
		description: 'Constantly evolving our technology to provide a seamless and efficient experience.',
		color: 'text-yellow-500',
		bg: 'bg-yellow-500/10',
	},
	{
		icon: Users,
		title: 'Inclusivity',
		description: 'Healthcare for everyone, regardless of location, background, or economic status.',
		color: 'text-blue-500',
		bg: 'bg-blue-500/10',
	},
	{
		icon: Leaf,
		title: 'Sustainability',
		description: 'Committed to eco-friendly practices in packaging and logistics.',
		color: 'text-green-500',
		bg: 'bg-green-500/10',
	},
	{
		icon: Globe,
		title: 'Global Standards',
		description: 'Bringing world-class pharmaceutical standards to your local doorstep.',
		color: 'text-purple-500',
		bg: 'bg-purple-500/10',
	},
];

export function CoreValues() {
	return (
		<section className='py-20 bg-background'>
			<div className='container mx-auto px-4'>
				<div className='text-center max-w-3xl mx-auto mb-16 space-y-4'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-3xl md:text-4xl font-bold'
					>
						Our Core Values
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='text-lg text-muted-foreground'
					>
						The principles that guide our work and define our culture.
					</motion.p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{values.map((value, index) => (
						<motion.div
							key={value.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
						>
							<Card className='h-full border-border/50 hover:border-primary/50 transition-colors duration-300 group'>
								<CardContent className='p-8 space-y-4'>
									<div className={`w-14 h-14 rounded-2xl ${value.bg} flex items-center justify-center ${value.color} group-hover:scale-110 transition-transform duration-300`}>
										<value.icon className='w-7 h-7' />
									</div>
									<h3 className='text-xl font-bold'>{value.title}</h3>
									<p className='text-muted-foreground leading-relaxed'>
										{value.description}
									</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
