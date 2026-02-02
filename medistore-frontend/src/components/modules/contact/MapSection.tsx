'use client';

import { motion } from 'framer-motion';

export function MapSection() {
	return (
		<section className='py-16 bg-muted/30'>
			<div className='container mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mb-12'
				>
					<h2 className='text-3xl font-bold mb-4'>Find Us</h2>
					<p className='text-muted-foreground'>
						Visit our headquarters in the heart of Dhaka, Bangladesh.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='rounded-2xl overflow-hidden shadow-xl border border-border h-112.5 w-full'
				>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.8223924372!2d90.27923775747219!3d23.780887456211758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1709500000000!5m2!1sen!2sus'
						width='100%'
						height='100%'
						style={{ border: 0 }}
						allowFullScreen
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
						title='MediStore Location Map'
						className='w-full h-full'
					></iframe>
				</motion.div>
			</div>
		</section>
	);
}
