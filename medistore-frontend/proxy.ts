import { NextRequest, NextResponse } from 'next/server';
import { userService } from './src/services/user.service';
import { Roles } from './src/constants/roles';



export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	let isAuthenticated = false;
	let userRole: string | null = null;

	const { data } = await userService.getSession();

	if (data?.user) {
		isAuthenticated = true;
		userRole = data.user.role;
	}

	// Not authenticated - redirect to login
	if (!isAuthenticated) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// Admin trying to access non-admin routes
	if (userRole === Roles.admin && pathname.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/admin-dashboard', request.url));
	}

	// Non-admin trying to access admin routes
	if (userRole !== Roles.admin && pathname.startsWith('/admin-dashboard')) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*', '/admin-dashboard/:path*'],
};
