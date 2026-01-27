export const dynamic = 'force-dynamic';

import { AppSidebar } from '@/components/layout/app-sidebar';
import { DashboardBreadcrumb } from '@/components/layout/dashboard-breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { Roles } from '@/constants/roles';
import { userService } from '@/services/user.service';

export default async function DashboardLayout({
	admin,
	seller,
	customer,
}: {
	children: React.ReactNode;
	admin: React.ReactNode;
	seller: React.ReactNode;
	customer: React.ReactNode;
}) {
	const { data } = await userService.getSession();

	if (!data?.user) {
		return <div>Not Authenticated</div>;
	}

	// Determine which content to show based on role
	let content;
	switch (data.user.role) {
		case Roles.admin:
			content = admin;
			break;
		case Roles.seller:
			content = seller;
			break;
		case Roles.customer:
			content = customer;
			break;
		default:
			content = <div>Invalid role</div>;
	}

	return (
		<SidebarProvider>
			<AppSidebar user={data.user} />
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
					<SidebarTrigger className='-ml-1' />
					<Separator
						orientation='vertical'
						className='mr-2 data-[orientation=vertical]:h-4'
					/>
					<DashboardBreadcrumb />
				</header>
				<div className='flex flex-1 flex-col gap-4 p-4'>{content}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
