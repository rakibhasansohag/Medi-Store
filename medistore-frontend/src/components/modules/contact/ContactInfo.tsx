'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail,  Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ContactInfo() {
	const contactDetails = [
		{
			icon: MapPin,
			title: 'Visit Us',
			content: '123 Healthcare Avenue, Medical District, NY 10001, United States',
			action: 'Get Directions',
			link: 'https://maps.google.com',
		},
		{
			icon: Phone,
			title: 'Call Us',
			content: '+1 (555) 123-4567',
			subContent: 'Mon-Fri from 8am to 5pm',
			action: 'Call Now',
			link: 'tel:+15551234567',
		},
		{
			icon: Mail,
			title: 'Email Us',
			content: 'support@medistore.com',
			subContent: 'We reply within 24 hours',
			action: 'Send Email',
			link: 'mailto:support@medistore.com',
		},
	];

	const socialLinks = [
		{ icon: Facebook, href: '#', label: 'Facebook' },
		{ icon: Twitter, href: '#', label: 'Twitter' },
		{ icon: Instagram, href: '#', label: 'Instagram' },
		{ icon: Linkedin, href: '#', label: 'LinkedIn' },
	];

	return (
		<div className="space-y-6">
			{contactDetails.map((item, index) => (
				<motion.div
					key={item.title}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1, duration: 0.5 }}
				>
					<Card className="hover:shadow-md transition-shadow duration-300">
						<CardContent className="p-6 flex items-start gap-4">
							<div className="p-3 bg-primary/10 rounded-lg text-primary">
								<item.icon className="w-6 h-6" />
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-lg mb-1">{item.title}</h3>
								<p className="text-muted-foreground mb-1">{item.content}</p>
								{item.subContent && (
									<p className="text-sm text-muted-foreground/80 mb-3">{item.subContent}</p>
								)}
								<Button variant="link" className="p-0 h-auto font-semibold text-primary" asChild>
									<a href={item.link} target="_blank" rel="noopener noreferrer">
										{item.action} &rarr;
									</a>
								</Button>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			))}

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.5 }}
			>
				<Card className="bg-primary text-primary-foreground">
					<CardHeader>
						<CardTitle className="text-xl">Connect With Us</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="mb-6 text-primary-foreground/90">
							Stay updated with our latest news, health tips, and exclusive offers by following us on social media.
						</p>
						<div className="flex gap-4">
							{socialLinks.map((social) => (
								<Button
									key={social.label}
									size="icon"
									variant="secondary"
									className="rounded-full hover:bg-white hover:text-primary transition-colors"
									asChild
								>
									<Link href={social.href} aria-label={social.label}>
										<social.icon className="w-5 h-5" />
									</Link>
								</Button>
							))}
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
