import prisma from '../db/prisma';

export async function logToDB(level: string, where: string, message: string) {
	try {
		await prisma.log.create({
			data: {
				Level: level,
				Where: where,
				Message: message
			}
		});
	} catch (e) {
		console.log(`Log handler: Got error saving log to DB (god help us) - ${e}`);
	}
}
