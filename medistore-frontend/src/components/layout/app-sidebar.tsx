import * as React from 'react';
import Link from 'next/link';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar';
import { adminRoutes } from '@/routes/adminRoutes';
import { sellerRoutes } from '@/routes/sellerRoutes';
import { customerRoutes } from '@/routes/customerRoutes';
import { IRoute, IUser } from '@/types';
import { Roles } from '@/constants/roles';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	user: IUser;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
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

	return (
		<Sidebar {...props}>
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
			<SidebarRail />
		</Sidebar>
	);
}
