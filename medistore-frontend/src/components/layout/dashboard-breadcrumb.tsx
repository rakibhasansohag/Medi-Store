'use client';

import React from 'react';
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

	const segments = pathname.split('/').filter(Boolean);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{/* Home link */}
				<BreadcrumbItem>
					<BreadcrumbLink href='/'>Home</BreadcrumbLink>
				</BreadcrumbItem>

				{/* Dynamic segments */}
				{segments.map((segment, index) => {
					const href = '/' + segments.slice(0, index + 1).join('/');
					const isLast = index === segments.length - 1;
					const label = segment.replace(/-/g, ' ');

					return (
						<React.Fragment key={href}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage className='capitalize'>
										{label}
									</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={href} className='capitalize'>
										{label}
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
