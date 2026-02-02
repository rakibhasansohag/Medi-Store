import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL:
		typeof window !== 'undefined'
			? `${window.location.origin}/v1`
			: process.env.NEXT_PUBLIC_AUTH_URL ?? '',
	fetchOptions: {
		credentials: 'include',
	},
});
