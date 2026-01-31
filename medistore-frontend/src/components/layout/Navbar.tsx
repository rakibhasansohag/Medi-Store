'use client';

import Link from 'next/link';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/shared/ModeToggle';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { cartStore } from '@/lib/cart-store';

interface NavbarProps {
	user?: {
		name: string;
		email: string;
		image?: string;
		role: string;
	} | null;
}

export function Navbar({ user }: NavbarProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { totalItems } = useCart();
	const router = useRouter();

	const handleLogout = async () => {
		// Clear user-specific cart
		cartStore.clearUserCart();

		// Sign out
		await authClient.signOut();

		router.push('/');
		router.refresh();
	};

	const getDashboardUrl = () => {
		if (!user) return '/dashboard';
		if (user.role === 'ADMIN') return '/admin-dashboard';
		if (user.role === 'SELLER') return '/dashboard';
		return '/dashboard';
	};

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
						{/* Cart */}
						<Button variant='ghost' size='icon' asChild className='relative'>
							<Link href='/cart'>
								<ShoppingCart className='h-5 w-5' />
								{totalItems > 0 && (
									<Badge
										variant='destructive'
										className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs'
									>
										{totalItems}
									</Badge>
								)}
							</Link>
						</Button>

						{/* Theme Toggle */}
						<ModeToggle />

						{/* User Menu or Login */}
						{user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										className='relative h-9 w-9 rounded-full'
									>
										<Avatar className='h-9 w-9'>
											<AvatarImage src={user.image} alt={user.name} />
											<AvatarFallback>
												{user.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end' className='w-56'>
									<DropdownMenuLabel>
										<div className='flex flex-col space-y-1'>
											<p className='text-sm font-medium leading-none'>
												{user.name}
											</p>
											<p className='text-xs leading-none text-muted-foreground'>
												{user.email}
											</p>
											<Badge variant='outline' className='w-fit mt-1'>
												{user.role}
											</Badge>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href={getDashboardUrl()}>
											<LayoutDashboard className='mr-2 h-4 w-4' />
											Dashboard
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={handleLogout}
										className='text-red-600'
									>
										<LogOut className='mr-2 h-4 w-4' />
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button asChild>
								<Link href='/login'>
									<User className='h-5 w-5 mr-2' />
									Login
								</Link>
							</Button>
						)}

						{/* Mobile Menu Button with Animation */}
						<Button
							variant='ghost'
							size='icon'
							className='md:hidden relative'
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<div className='relative w-5 h-5'>
								<span
									className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-all duration-300 ${
										mobileMenuOpen ? 'rotate-45 top-2' : ''
									}`}
								/>
								<span
									className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-all duration-300 ${
										mobileMenuOpen ? 'opacity-0' : ''
									}`}
								/>
								<span
									className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition-all duration-300 ${
										mobileMenuOpen ? '-rotate-45 top-2' : ''
									}`}
								/>
							</div>
						</Button>
					</div>
				</div>

				{/* Mobile Menu with Animation */}
				<div
					className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
						mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
					}`}
				>
					<nav className='py-4 space-y-2'>
						<Link
							href='/'
							className='block px-4 py-2 hover:bg-accent rounded-md transition-colors'
							onClick={() => setMobileMenuOpen(false)}
						>
							Home
						</Link>
						<Link
							href='/shop'
							className='block px-4 py-2 hover:bg-accent rounded-md transition-colors'
							onClick={() => setMobileMenuOpen(false)}
						>
							Shop
						</Link>
						<Link
							href='/about'
							className='block px-4 py-2 hover:bg-accent rounded-md transition-colors'
							onClick={() => setMobileMenuOpen(false)}
						>
							About
						</Link>
						<Link
							href='/contact'
							className='block px-4 py-2 hover:bg-accent rounded-md transition-colors'
							onClick={() => setMobileMenuOpen(false)}
						>
							Contact
						</Link>
						{user && (
							<>
								<div className='border-t my-2' />
								<Link
									href={getDashboardUrl()}
									className='block px-4 py-2 hover:bg-accent rounded-md transition-colors'
									onClick={() => setMobileMenuOpen(false)}
								>
									Dashboard
								</Link>
								<button
									onClick={() => {
										handleLogout();
										setMobileMenuOpen(false);
									}}
									className='w-full text-left px-4 py-2 hover:bg-accent rounded-md transition-colors text-red-600'
								>
									Log out
								</button>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
}
