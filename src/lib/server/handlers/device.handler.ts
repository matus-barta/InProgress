import type {
	CheckSerialNumber,
	ReadDeviceSchema,
	UpdateDevicesSchema
} from '$lib/schemas/device.schema';
import type { Device } from '@prisma/client';
import prisma from '../db/prisma';
import log from '../utils/logger';

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

	return { Id: 0, SerialNumber: serialNumber };
}

export async function getDeviceData(id: number): Promise<ReadDeviceSchema | null> {
	const result = await prisma.device.findUnique({
		where: {
			Id: id
		},
		select: {
			Id: true,
			CreatedAt: true,
			UpdatedAt: true,
			SerialNumber: true,
			Status: true,
			User: true,
			Note: true,
			Company: true,
			Task: true
		}
	});

	return result;
}

export async function updateDevice(deviceData: UpdateDevicesSchema): Promise<boolean> {
	let result: Device;
	if (deviceData.Task != '' && deviceData.Task?.charAt(0) != '#')
		deviceData.Task = `#${deviceData.Task}`;

	try {
		if (
			deviceData.Status == 'InQueue' ||
			deviceData.Status == 'InProgress' ||
			deviceData.Status == 'Done'
		) {
			//compiler wasn't happy, so this madness bellow is the result (and I don't wanna to spend more time on this)
			result = await prisma.device.upsert({
				where: {
					SerialNumber: deviceData.SerialNumber
				},
				create: {
					SerialNumber: deviceData.SerialNumber,
					Status: deviceData.Status,
					User: deviceData.User,
					Note: deviceData.Note,
					Company: deviceData.Company,
					Task: deviceData.Task
				},
				update: {
					Status: deviceData.Status,
					User: deviceData.User,
					Note: deviceData.Note,
					Company: deviceData.Company,
					Task: deviceData.Task
				}
			});
		} else {
			result = await prisma.device.upsert({
				where: {
					SerialNumber: deviceData.SerialNumber
				},
				create: {
					SerialNumber: deviceData.SerialNumber,
					Status: 'InQueue',
					User: deviceData.User,
					Note: deviceData.Note,
					Company: deviceData.Company,
					Task: deviceData.Task
				},
				update: {
					Status: 'InQueue',
					User: deviceData.User,
					Note: deviceData.Note,
					Company: deviceData.Company,
					Task: deviceData.Task
				}
			});
		}
	} catch (e) {
		log.error(e);
		return false;
	}

	return result != null;
}

export async function getListOfDeviceId(status: string) {
	const result = await prisma.device.findMany({
		where: {
			Status: status
		},
		select: {
			Id: true
		}
	});

	const list: number[] = new Array<number>();
	result.forEach((element) => {
		list.push(element.Id);
	});

	return list;
}
