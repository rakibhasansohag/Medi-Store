export const Roles = {
	admin: 'ADMIN',
	seller: 'SELLER',
	customer: 'CUSTOMER',
} as const;

export type UserRole = (typeof Roles)[keyof typeof Roles];
