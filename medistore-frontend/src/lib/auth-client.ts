import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
		? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth`
		: 'http://localhost:5000/api/v1/auth',
	fetchOptions: { credentials: 'include' },
});
