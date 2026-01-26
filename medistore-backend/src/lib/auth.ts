import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false, // Use true for port 465, false for port 587
	auth: {
		user: process.env.APP_USER!,
		pass: process.env.APP_PASSWORD!,
	},
});

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql', // or "mysql", "postgresql",
	}),
	trustedOrigins: [process.env.APP_URL!],
	user: {
		additionalFields: {
			role: {
				type: 'string',
				defaultValue: 'USER',
				required: false,
			},
			phone: {
				type: 'string',
				defaultValue: null,
				required: false,
			},
			status: {
				type: 'string',
				defaultValue: 'ACTIVE',
				required: false,
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: true,
	},

	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			try {
				const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

				const html = `
				
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Verify your email address</h2>

    <p>Hi ${user.name ?? 'there'},</p>

    <p>
      Thanks for signing up for <strong>Prisma Blog</strong>.
      Please confirm your email address by clicking the button below.
    </p>

    <p style="margin: 24px 0;">
      <a
        href="${verificationUrl}"
        style="
          background-color: #4f46e5;
          color: #ffffff;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
        "
      >
        Verify Email
      </a>
    </p>

    <p>
      If the button doesn’t work, copy and paste this link into your browser:
    </p>

    <p style="word-break: break-all;">
      ${verificationUrl}
    </p>

    <p>
      This link will expire soon for security reasons.
      If you didn’t create an account, you can safely ignore this email.
    </p>

    <br />

    <p>
      — Prisma Blog Team
    </p>
  </div>
`;

				const text = `
Verify your email address

Hi ${user.name ?? 'there'},

Thanks for signing up for Prisma Blog.
Please verify your email by visiting the link below:

${verificationUrl}

This link will expire soon.
If you didn’t create an account, ignore this email.

— Prisma Blog Team
`;

				const info = await transporter.sendMail({
					from: '"Prisma Blog" <prismabLog@gmail.email>',
					to: user.email,
					subject: 'Verify your email address',
					text: text,
					html: html,
				});

				console.log('Message sent:', info.messageId);
			} catch (error) {
				console.error(error);
				throw new Error('Failed to send verification email');
			}
		},
	},
	socialProviders: {
		google: {
			prompt: 'select_account consent',
			accessType: 'offline',
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
});
