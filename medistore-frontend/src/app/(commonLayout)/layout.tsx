import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { userService } from '@/services/user.service';

export async function CommonLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data } = await userService.getSession();
	const user = data?.user || null;

	return (
		<main>
			<Navbar user={user} />
			{children}
			<Footer />
		</main>
	);
}

export default CommonLayout;
