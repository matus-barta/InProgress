import { options } from '$lib/options';
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
		let check = false;
		options.forEach((option) => {
			if (option == deviceData.Status) check = true;
		});

		let status = 'InQueue';

		if (check && deviceData.Status != null && deviceData.Status != undefined)
			status = deviceData.Status;

		result = await prisma.device.upsert({
			where: {
				SerialNumber: deviceData.SerialNumber
			},
			create: {
				SerialNumber: deviceData.SerialNumber,
				Status: status,
				User: deviceData.User,
				Note: deviceData.Note,
				Company: deviceData.Company,
				Task: deviceData.Task
			},
			update: {
				Status: status,
				User: deviceData.User,
				Note: deviceData.Note,
				Company: deviceData.Company,
				Task: deviceData.Task
			}
		});
	} catch (e) {
		log.error('Device Handler - updateDevice', `Update device: ${e}`);
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
	result.forEach((element: { Id: number }) => {
		list.push(element.Id);
	});

	return list;
}
