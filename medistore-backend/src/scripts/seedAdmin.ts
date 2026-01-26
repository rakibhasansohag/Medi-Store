import { auth } from '../lib/auth';
import { prisma } from '../lib/prisma';

async function seedAdmin() {
	try {
		// const adminEmail = 'admin@medistore.com';
		const adminEmail = 'admin@email.com';

		// 1. Check if the user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email: adminEmail },
		});

		if (existingUser) {
			console.log('Admin user already exists.');
			return;
		}

		// 2. Create the admin user
		const newAdmin = await auth.api.signUpEmail({
			body: {
				email: adminEmail,
				// password: 'admin123456',
				password: '123456789',
				name: 'Admin User',
				// Note: We don't pass 'role' here because Better Auth
				// usually ignores it in the body for security.
			},
		});

		if (newAdmin) {
			// 3. Manually upgrade the user to ADMIN and verify email
			await prisma.user.update({
				where: { email: adminEmail },
				data: {
					role: 'ADMIN',
					emailVerified: true,
				},
			});
			console.log('Admin seeded successfully!');
		}
	} catch (error) {
		console.error('Seeding error:', error);
	}
}

seedAdmin();
