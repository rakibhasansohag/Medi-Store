import { auth } from '../lib/auth';
import { prisma } from '../lib/prisma';
import { fileURLToPath } from 'url';

interface Logger {
	info: (message: string) => void;
	success: (message: string) => void;
	error: (message: string, error?: any) => void;
	warning: (message: string) => void;
}

export async function seedAdmin(logger: Logger) {
	try {
		const adminEmail = 'admin@email.com';
		const adminPassword = '123456789';

		logger.info(`Creating admin user: ${adminEmail}`);

		// Check if the user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email: adminEmail },
		});

		if (existingUser) {
			logger.warning('Admin user already exists, skipping creation');
			return existingUser;
		}

		const newAdmin = await auth.api.signUpEmail({
			body: {
				email: adminEmail,
				password: adminPassword,
				name: 'Admin User',
			},
		});

		if (!newAdmin) {
			throw new Error('Failed to create admin user (sign-up returned empty)');
		}

		// Upgrade to ADMIN and verify email
		const updatedAdmin = await prisma.user.update({
			where: { email: adminEmail },
			data: {
				role: 'ADMIN',
				emailVerified: true,
				phone: '+1234567890',
				status: 'ACTIVE',
			},
		});

		logger.success(`Admin user created successfully: ${updatedAdmin.email}`);
		return updatedAdmin;
	} catch (error) {
		logger.error('Failed to seed admin', error);
		throw error;
	}
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
	const simpleLogger: Logger = {
		info: (msg) => console.log(`ℹ ${msg}`),
		success: (msg) => console.log(`✓ ${msg}`),
		error: (msg, err) => {
			console.error(`✗ ${msg}`);
			if (err) console.error(err);
		},
		warning: (msg) => console.log(`⚠ ${msg}`),
	};

	// run and exit
	seedAdmin(simpleLogger)
		.then(() => {
			console.log('seedAdmin finished');
			process.exit(0);
		})
		.catch((err) => {
			console.error('seedAdmin failed', err);
			process.exit(1);
		});
}
