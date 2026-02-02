'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const faqs = [
	{
		question: 'What are your operating hours?',
		answer:
			'Our online store is open 24/7. Our customer support team is available Monday through Friday from 8:00 AM to 5:00 PM, and Saturday from 9:00 AM to 2:00 PM.',
	},
	{
		question: 'Do you offer international shipping?',
		answer:
			'Currently, we primarily ship within Bangladesh. However, we are working on expanding our shipping capabilities to international locations in the near future.',
	},
	{
		question: 'How can I track my order?',
		answer:
			'Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number on our "Track Order" page to see the real-time status of your delivery.',
	},
	{
		question: 'What is your return policy?',
		answer:
			'We accept returns for unopened and unused products within 30 days of purchase. Please contact our support team to initiate a return process. Some restrictions apply to prescription medications.',
	},
	{
		question: 'Are your medicines authentic?',
		answer:
			'Yes, absolutely. We source all our medicines directly from licensed manufacturers and authorized distributors to ensure 100% authenticity and safety.',
	},
];

export function FAQSection() {
	return (
		<section className='py-16 bg-background'>
			<div className='container mx-auto px-4 max-w-4xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mb-12'
				>
					<h2 className='text-3xl font-bold mb-4'>Frequently Asked Questions</h2>
					<p className='text-muted-foreground'>
						Find answers to common questions about our services and products.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
				>
					<Accordion type='single' collapsible className='w-full'>
						{faqs.map((faq, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger className='text-left text-lg font-medium'>
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className='text-muted-foreground'>
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</motion.div>
			</div>
		</section>
	);
}
