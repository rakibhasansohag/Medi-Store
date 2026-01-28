'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/shared/ModeToggle';
import { useState } from 'react';

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
			<div className='container mx-auto px-4'>
				<div className='flex h-16 items-center justify-between'>
					{/* Logo */}
					<Link href='/' className='flex items-center space-x-2'>
						<div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary'>
							<span className='text-2xl'>💊</span>
						</div>
						<span className='text-xl font-bold hidden sm:block'>MediStore</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-6'>
						<Link
							href='/'
							className='text-sm font-medium hover:text-primary transition-colors'
						>
							Home
						</Link>
						<Link
							href='/shop'
							className='text-sm font-medium hover:text-primary transition-colors'
						>
							Shop
						</Link>
						<Link
							href='/about'
							className='text-sm font-medium hover:text-primary transition-colors'
						>
							About
						</Link>
						<Link
							href='/contact'
							className='text-sm font-medium hover:text-primary transition-colors'
						>
							Contact
						</Link>
					</nav>

					{/* Right Actions */}
					<div className='flex items-center space-x-2'>
						<Button variant='ghost' size='icon'>
							<Search className='h-5 w-5' />
						</Button>
						<Button variant='ghost' size='icon' asChild>
							<Link href='/dashboard/cart'>
								<ShoppingCart className='h-5 w-5' />
							</Link>
						</Button>
						<ModeToggle />
						<Button asChild>
							<Link href='/login'>
								<User className='h-5 w-5' />
								Login
							</Link>
						</Button>

						{/* Mobile Menu Button */}
						<Button
							variant='ghost'
							size='icon'
							className='md:hidden'
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<Menu className='h-5 w-5' />
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<nav className='md:hidden py-4 space-y-2'>
						<Link
							href='/'
							className='block px-4 py-2 hover:bg-accent rounded-md'
						>
							Home
						</Link>
						<Link
							href='/shop'
							className='block px-4 py-2 hover:bg-accent rounded-md'
						>
							Shop
						</Link>
						<Link
							href='/about'
							className='block px-4 py-2 hover:bg-accent rounded-md'
						>
							About
						</Link>
						<Link
							href='/contact'
							className='block px-4 py-2 hover:bg-accent rounded-md'
						>
							Contact
						</Link>
					</nav>
				)}
			</div>
		</header>
	);
}
