import type { CheckSerialNumber } from '$lib/schemas/device.schema';
import prisma from '../db/prisma';

export async function search(query: string) {
	const result = await prisma.device.findMany({
		where: {
			OR: [
				{
					User: {
						search: query
					}
				},
				{
					SerialNumber: {
						search: query
					}
				},
				{
					Task: {
						search: query
					}
				},
				{
					Company: {
						search: query
					}
				}
			]
		},
		select: {
			Id: true,
			SerialNumber: true
		}
	});
	return result as CheckSerialNumber[];
}
