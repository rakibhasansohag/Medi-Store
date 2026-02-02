import { Metadata } from 'next';
import { ContactForm } from '@/components/modules/contact/ContactForm';
import { ContactInfo } from '@/components/modules/contact/ContactInfo';
import { FAQSection } from '@/components/modules/contact/FAQSection';
import { MapSection } from '@/components/modules/contact/MapSection';

export const metadata: Metadata = {
	title: 'Contact Us | MediStore',
	description: 'Get in touch with MediStore team. We are here to help you with your healthcare needs.',
};

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-muted/30">
			{/* Header Section */}
			<section className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
				<div className="absolute inset-0 bg-black/10" />
				<div className="container mx-auto px-4 text-center relative z-10">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
					<p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
						Have questions about our products or services? We&apos;re here to help. 
						Reach out to our team and we&apos;ll get back to you shortly.
					</p>
				</div>
			</section>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-12 md:py-16 -mt-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{/* Contact Information Column */}
					<div className="lg:col-span-1">
						<ContactInfo />
					</div>

					{/* Contact Form Column */}
					<div className="lg:col-span-2">
						<ContactForm />
					</div>
				</div>
			</div>

			{/* FAQ Section */}
			<FAQSection />

			{/* Map Section */}
			<MapSection />
		</div>
	);
}
