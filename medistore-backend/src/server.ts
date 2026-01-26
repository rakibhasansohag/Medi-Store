import app from './app';
import { prisma } from './lib/prisma.ts';

const PORT = process.env.PORT || 4000;

async function main() {
	try {
		await prisma.$connect();
		console.log('Connected to the database Successfully');

		app.listen(PORT, () => {
			console.log(
				`Server is listening on port ${PORT} ✅ Live on http://localhost:${PORT}`,
			);
		});
	} catch (error) {
		console.error('An Error happened : ', error);
	}
}

main();
