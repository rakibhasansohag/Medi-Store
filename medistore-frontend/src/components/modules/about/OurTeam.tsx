'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const team = [
	{
		name: 'Dr. Sarah Mitchell',
		role: 'Chief Medical Officer',
		image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
		bio: 'Over 20 years of clinical experience in pharmaceutical care and patient advocacy.',
	},
	{
		name: 'James Wilson',
		role: 'Head of Operations',
		image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
		bio: 'Expert in supply chain logistics ensuring your medicines arrive safely and on time.',
	},
	{
		name: 'Dr. Emily Chen',
		role: 'Lead Pharmacist',
		image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
		bio: 'Specializing in medication therapy management and patient education.',
	},
	{
		name: 'Michael Ross',
		role: 'Tech Lead',
		image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
		bio: 'Building the secure and user-friendly digital infrastructure of MediStore.',
	},
];

export function OurTeam() {
	return (
		<section className='py-20 bg-muted/30'>
			<div className='container mx-auto px-4'>
				<div className='text-center max-w-3xl mx-auto mb-16 space-y-4'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-3xl md:text-4xl font-bold'
					>
						Meet Our Experts
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='text-lg text-muted-foreground'
					>
						The dedicated professionals working behind the scenes to ensure your health is in good hands.
					</motion.p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{team.map((member, index) => (
						<motion.div
							key={member.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
						>
							<Card className='overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group'>
								<div className='relative h-64 overflow-hidden'>
									<Image
										src={member.image}
										alt={member.name}
										fill
										className='object-cover transition-transform duration-500 group-hover:scale-110'
									/>
									<div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4'>
										<Button size='icon' variant='secondary' className='rounded-full hover:bg-primary hover:text-white'>
											<Linkedin className='w-5 h-5' />
										</Button>
										<Button size='icon' variant='secondary' className='rounded-full hover:bg-primary hover:text-white'>
											<Twitter className='w-5 h-5' />
										</Button>
										<Button size='icon' variant='secondary' className='rounded-full hover:bg-primary hover:text-white'>
											<Mail className='w-5 h-5' />
										</Button>
									</div>
								</div>
								<CardContent className='p-6 text-center space-y-2'>
									<h3 className='font-bold text-lg'>{member.name}</h3>
									<p className='text-primary font-medium text-sm'>{member.role}</p>
									<p className='text-sm text-muted-foreground pt-2'>{member.bio}</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
