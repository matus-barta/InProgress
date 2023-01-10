import type { LogSchema } from '$lib/schemas/log.schema';
import prisma from '../db/prisma';
import log from '../utils/logger';

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

export async function getLogs(limit?: number, level?: string) {
	let result;
	try {
		result = await prisma.log.findMany({
			take: limit,
			where: {
				Level: level
			},
			select: {
				CreatedAt: true,
				Level: true,
				Where: true,
				Message: true
			},
			orderBy: {
				CreatedAt: 'desc'
			}
		});
	} catch (e) {
		log.error('Log handler', `Unable to get logs - ${e}`);
	}

	if (result != undefined && result != null) return result as LogSchema[];
}
