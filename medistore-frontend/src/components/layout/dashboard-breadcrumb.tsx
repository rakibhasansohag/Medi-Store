'use client';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

export function DashboardBreadcrumb() {
	const pathname = usePathname();

	const segments = pathname
		.split('/')
		.filter(Boolean)
		.filter((seg) => seg !== 'dashboard');

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{/*  HARD CODED HOME */}
				<BreadcrumbItem>
					<BreadcrumbLink href='/'>Home</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				{/*  DASHBOARD (always shown) */}
				<BreadcrumbItem>
					<BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
				</BreadcrumbItem>

				{/*  Dynamic children */}
				{segments.map((segment, index) => {
					const href = '/dashboard/' + segments.slice(0, index + 1).join('/');
					const label = segment.replace(/-/g, ' ');

					return (
						<div key={href} className='flex items-center'>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{index === segments.length - 1 ? (
									<BreadcrumbPage className='capitalize'>
										{label}
									</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={href} className='capitalize'>
										{label}
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</div>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
