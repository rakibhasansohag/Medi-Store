import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'source.unsplash.com',
			},
			{ protocol: 'https', hostname: 'picsum.photos' },
		],
	},
	async rewrites() {
		return [
			{
				source: '/api/v1/auth/:path*',
				destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
			},
		];
	},
};

export default nextConfig;
