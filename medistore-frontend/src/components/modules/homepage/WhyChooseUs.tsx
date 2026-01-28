import { Shield, Truck, HeadphonesIcon, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

export function WhyChooseUs() {
	return (
		<section className='py-16 bg-muted/30'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>
						Why Choose MediStore?
					</h2>
					<p className='text-muted-foreground max-w-2xl mx-auto'>
						We&apos;re committed to providing the best service for your health
						needs
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<Card key={index}>
								<CardContent className='p-6 text-center space-y-4'>
									<div className='w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center'>
										<Icon className='h-8 w-8 text-primary' />
									</div>
									<h3 className='font-semibold text-lg'>{feature.title}</h3>
									<p className='text-sm text-muted-foreground'>
										{feature.description}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
