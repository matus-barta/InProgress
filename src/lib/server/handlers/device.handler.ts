import prisma from '../db/prisma';

export async function checkIfExistsSerialNumber(serialNumber: string): Promise<string> {
	const result = await prisma.device.findUnique({
		where: {
			SerialNumber: serialNumber
		}
	});

	if (result == null) {
		return '';
	} else {
		result.SerialNumber;
	}
	return '';
}
