import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
	return (
		<footer className='border-t bg-muted/50'>
			<div className='container mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{/* Brand */}
					<div className='space-y-4'>
						<div className='flex items-center space-x-2'>
							<div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary'>
								<span className='text-2xl'>💊</span>
							</div>
							<span className='text-xl font-bold'>MediStore</span>
						</div>
						<p className='text-sm text-muted-foreground'>
							Your trusted online medicine shop. Quality medicines delivered to
							your doorstep.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='font-semibold mb-4'>Quick Links</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/shop'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									Shop
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									Contact
								</Link>
							</li>
							<li>
								<Link
									href='/login'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									Login
								</Link>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h3 className='font-semibold mb-4'>Customer Service</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/faq'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									FAQ
								</Link>
							</li>
							<li>
								<Link
									href='/shipping'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									Shipping Info
								</Link>
							</li>
							<li>
								<Link
									href='/returns'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									Returns
								</Link>
							</li>
							<li>
								<Link
									href='/privacy'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className='font-semibold mb-4'>Contact Us</h3>
						<ul className='space-y-3'>
							<li className='flex items-center gap-2 text-sm text-muted-foreground'>
								<Phone className='h-4 w-4' />
								+880 1234 5678
							</li>
							<li className='flex items-center gap-2 text-sm text-muted-foreground'>
								<Mail className='h-4 w-4' />
								support@medistore.com
							</li>
							<li className='flex items-center gap-2 text-sm text-muted-foreground'>
								<MapPin className='h-4 w-4' />
								123 Health St, Medical City
							</li>
						</ul>
					</div>
				</div>

				<div className='border-t mt-8 pt-8 text-center text-sm text-muted-foreground'>
					<p>
						&copy; {new Date().getFullYear()} MediStore. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
