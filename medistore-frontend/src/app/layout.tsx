import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import { CartProvider } from '@/components/providers/CartProvider';
import { userService } from '@/services/user.service';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Medistore',
	description:
		'Medistore is a full-stack e-commerce application built with Next.js, ' +
		'Prisma, and Tailwind CSS. It features a robust admin panel, ' +
		'customer management, order management, and a product catalog. ',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { data: session } = await userService.getSession();

	return (
		<html lang='en' className='scroll-smooth' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<CartProvider userId={session?.user?.id || null}>
						{children}
						<Toaster position='top-center' richColors />
					</CartProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
