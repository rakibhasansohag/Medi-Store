'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Lightbulb } from 'lucide-react';

export function MissionVision() {
	return (
		<section className='py-20 bg-muted/30'>
			<div className='container mx-auto px-4'>
				<div className='grid md:grid-cols-2 gap-8'>
					{/* Mission */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<Card className='h-full overflow-hidden border-none shadow-lg bg-linear-to-br from-primary/5 to-transparent hover:shadow-xl transition-shadow duration-300'>
							<CardContent className='p-8 md:p-10 space-y-6'>
								<div className='w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary'>
									<Target className='w-8 h-8' />
								</div>
								<h3 className='text-2xl md:text-3xl font-bold'>Our Mission</h3>
								<p className='text-lg text-muted-foreground leading-relaxed'>
									To empower individuals by providing accessible, affordable, and authentic healthcare solutions. We strive to simplify the pharmacy experience through technology while maintaining the human connection that is vital to healing and wellness.
								</p>
							</CardContent>
						</Card>
					</motion.div>

					{/* Vision */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Card className='h-full overflow-hidden border-none shadow-lg bg-linear-to-br from-blue-500/5 to-transparent hover:shadow-xl transition-shadow duration-300'>
							<CardContent className='p-8 md:p-10 space-y-6'>
								<div className='w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600'>
									<Lightbulb className='w-8 h-8' />
								</div>
								<h3 className='text-2xl md:text-3xl font-bold'>Our Vision</h3>
								<p className='text-lg text-muted-foreground leading-relaxed'>
									To be the world&apos;s most trusted digital healthcare partner, where every person has immediate access to the medicines and health advice they need. We envision a future where geographical and economic barriers to health are eliminated.
								</p>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
