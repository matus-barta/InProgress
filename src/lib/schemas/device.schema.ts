import { date, number, object, string } from 'zod';
import type { TypeOf } from 'zod';

export const checkSerialNumberSchema = object({
	Id: number({ required_error: 'Id is missing' }),
	SerialNumber: string({ required_error: 'SN is missing' })
});

export type CheckSerialNumber = TypeOf<typeof checkSerialNumberSchema>;

export const readDeviceSchema = object({
	Id: number({ required_error: 'Id is missing' }),
	CreatedAt: date({ required_error: 'CreatedAt is missing' }),
	UpdatedAt: date({ required_error: 'UpdatedAt is missing' }),
	SerialNumber: string({ required_error: 'SerialNumber is missing' }),
	Status: string({ required_error: 'Status is missing' }),
	User: string().nullable().optional(),
	Note: string().nullable().optional(),
	Company: string().nullable().optional(),
	Task: string().nullable().optional()
});

export type ReadDeviceSchema = TypeOf<typeof readDeviceSchema>;

export const updateDevicesSchema = object({
	SerialNumber: string({ required_error: 'SerialNumber is missing' }),
	Status: string().nullable().optional(),
	User: string().nullable().optional(),
	Note: string().nullable().optional(),
	Company: string().nullable().optional(),
	Task: string().nullable().optional()
});

export type UpdateDevicesSchema = TypeOf<typeof updateDevicesSchema>;
