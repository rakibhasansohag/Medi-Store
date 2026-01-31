'use client';

import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Props = { children: React.ReactNode };

const beamVariants: Variants = {
	initial: {
		x: '-310%', // Updated to your preferred 310%
		skewX: -45,
	},
	hover: {
		x: '310%',
		transition: {
			duration: 1,
			ease: 'easeInOut',
		},
	},
} as const;

const emojiVariants: Variants = {
	initial: { scale: 1, filter: 'drop-shadow(0 0 0px rgba(59, 130, 246, 0))' },
	hover: {
		scale: 1.1,
		filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.5))',
		transition: { duration: 0.3 },
	},
} as const;

/**
 * LightBeam now uses theme-aware colors:
 * - Light Mode: A soft primary blue tint (via-primary/20)
 * - Dark Mode: A crisp white shimmer (dark:via-white/20)
 */
const LightBeam = (): React.ReactNode => (
	<div className='pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl'>
		<motion.div
			variants={beamVariants}
			className='absolute top-[-50%] h-[200%] w-[40%] bg-linear-to-r from-transparent via-primary/20 dark:via-white/20 to-transparent'
		/>
	</div>
);

export default function AuthMotionWrapper({ children }: Props) {
	const pathname = usePathname() || '';

	useEffect(() => {
		const shouldLock = () => window.matchMedia('(min-width: 768px)').matches;
		if (shouldLock()) {
			document.documentElement.style.overflow = 'hidden';
			document.body.style.overflow = 'hidden';
			return () => {
				document.documentElement.style.overflow = '';
				document.body.style.overflow = '';
			};
		}
	}, [pathname]);

	return (
		<div className='min-h-screen w-full flex items-center justify-center bg-muted px-4 md:px-8 transition-colors duration-300'>
			<div className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-0 bg-card text-card-foreground rounded-2xl shadow-2xl overflow-hidden md:h-[750px] items-stretch border border-border'>
				{/* Left Column: Form */}
				<motion.div
					initial='initial'
					whileHover='hover'
					className='relative p-8 md:p-12 overflow-y-auto flex flex-col justify-center bg-background border-r border-border'
				>
					<LightBeam />
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className='relative z-0 w-full'
					>
						{children}
					</motion.div>
				</motion.div>

				{/* Right Column: Promo 
				    Changed hardcoded slate-950 to be theme-responsive.
				*/}
				<motion.div
					initial='initial'
					whileHover='hover'
					className='relative hidden md:flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300'
				>
					<LightBeam />
					<div className='max-w-md text-center space-y-6'>
						<motion.div
							variants={emojiVariants}
							className='inline-flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 w-24 h-24 shadow-inner'
						>
							<span className='text-5xl'>💊</span>
						</motion.div>
						<div className='space-y-2'>
							<h2 className='text-4xl font-black tracking-tight text-foreground'>
								MediStore
							</h2>
							<p className='text-muted-foreground text-lg'>
								Your trusted online medicine shop — authentic products, fast
								delivery.
							</p>
						</div>
						<ul className='text-left space-y-4 inline-block'>
							{['Genuine medicines', 'Next day dispatch', '24/7 Support'].map(
								(item) => (
									<li
										key={item}
										className='flex items-center gap-3 text-muted-foreground'
									>
										<span className='flex-none w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold'>
											✓
										</span>
										{item}
									</li>
								),
							)}
						</ul>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
