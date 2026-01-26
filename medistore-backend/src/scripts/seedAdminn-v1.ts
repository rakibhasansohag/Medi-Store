import { prisma } from '../lib/prisma';
import { UserRole } from '../middleware/auth';

async function seedAdmin() {
	try {
		const adminData = {
			name: 'Admin User',
			email: 'admin@medistore.com',
			role: 'ADMIN',
			password: 'admin123456',
			// emailVerified: true,
		};

		// check if the user exist on the db or not
		const existingUser = await prisma.user.findUnique({
			where: {
				email: adminData.email,
			},
		});

		if (existingUser) {
			throw new Error('User already exist');
		}

		const signUpAdmin = await fetch(
			'http://localhost:5000/api/auth/sign-up/email',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(adminData),
			},
		);

		if (signUpAdmin.ok) {
			await prisma.user.update({
				where: {
					email: adminData.email,
				},
				data: {
					emailVerified: true,
				},
			});
		}

		console.log(signUpAdmin);

		// email Verified need to be set to true
	} catch (error) {
		console.error(error);
	}
}

seedAdmin();
