import type { CheckSerialNumber } from '$lib/schemas/device.schema';
import prisma from '../db/prisma';

export async function checkIfExistsSerialNumber(serialNumber: string): Promise<CheckSerialNumber> {
	const result = await prisma.device.findUnique({
		where: {
			SerialNumber: serialNumber
		},
		select: {
			Id: true,
			SerialNumber: true
		}
	});

	if (result != null) return result;

	return { Id: 0, SerialNumber: '' };
}
