import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

function CommonLayout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<Navbar />
			{children}
			<Footer />
		</main>
	);
}

export default CommonLayout;
