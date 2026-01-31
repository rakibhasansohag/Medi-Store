'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { adminRoutes } from '@/routes/adminRoutes';
import { sellerRoutes } from '@/routes/sellerRoutes';
import { customerRoutes } from '@/routes/customerRoutes';
import { IRoute, IUser } from '@/types';
import { Roles } from '@/constants/roles';
import { authClient } from '@/lib/auth-client';
import { cartStore } from '@/lib/cart-store';
import { ModeToggle } from '../shared/ModeToggle';
import { SidebarThemeToggle } from './SidebarThemeToggle';

interface IUuserWithImage extends IUser {
	image?: string;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	user: IUuserWithImage;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
	const router = useRouter();

	let routes: IRoute[] = [];

	switch (user.role) {
		case Roles.admin:
			routes = adminRoutes;
			break;
		case Roles.seller:
			routes = sellerRoutes;
			break;
		case Roles.customer:
			routes = customerRoutes;
			break;
		default:
			routes = [];
			break;
	}

	const handleLogout = async () => {
		// Clear user-specific cart
		cartStore.clearUserCart();

		// Sign out
		await authClient.signOut();

		router.push('/');
		router.refresh();
	};

	return (
		<Sidebar {...props}>
			{/* Header with Logo */}
			<SidebarHeader className='border-b px-6 py-4'>
				<Link href='/' className='flex items-center space-x-2'>
					<div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary'>
						<span className='text-2xl'>💊</span>
					</div>
					<div className='flex flex-col'>
						<span className='text-lg font-bold'>MediStore</span>
						<span className='text-xs text-muted-foreground capitalize'>
							{user.role.toLowerCase()} Panel
						</span>
					</div>
				</Link>
			</SidebarHeader>

			{/* Main Navigation */}
			<SidebarContent>
				{routes.map((section) => (
					<SidebarGroup key={section.title}>
						<SidebarGroupLabel>{section.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{section.items.map((item) => {
									const Icon = item.icon;
									return (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton asChild>
												<Link href={item.url}>
													{Icon && <Icon className='w-4 h-4' />}
													<span>{item.title}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>

			{/* User Info & Logout at Bottom */}
			<SidebarFooter className='gap-2 border-t p-2'>
				<SidebarMenu>
					{/* Modular Theme Toggle */}
					<SidebarThemeToggle />

					{/* User Profile Dropdown */}
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size='lg'
									className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
								>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarImage src={user?.image} alt={user.name} />
										<AvatarFallback className='rounded-lg'>
											{user.name.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-semibold'>{user.name}</span>
										<span className='truncate text-xs text-muted-foreground'>
											{user.email}
										</span>
									</div>
								</SidebarMenuButton>
							</DropdownMenuTrigger>

							<DropdownMenuContent
								className='w-56'
								align='end'
								side='top'
								sideOffset={4}
							>
								<DropdownMenuLabel className='font-normal'>
									<div className='flex flex-col space-y-1'>
										<p className='text-sm font-medium leading-none'>
											{user.name}
										</p>
										<p className='text-xs leading-none text-muted-foreground'>
											{user.email}
										</p>
										<p className='text-xs text-muted-foreground mt-1'>
											Role:{' '}
											<span className='capitalize'>
												{user.role.toLowerCase()}
											</span>
										</p>
									</div>
								</DropdownMenuLabel>
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
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
