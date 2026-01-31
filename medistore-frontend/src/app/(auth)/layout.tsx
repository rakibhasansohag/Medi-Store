import { NavbarServer } from '@/components/shared/NavbarServer';
import AuthMotionWrapper from '@/components/auth/AuthMotionWrapper';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<NavbarServer />

			<div className='w-full'>
				<AuthMotionWrapper>{children}</AuthMotionWrapper>
			</div>
		</main>
	);
}
