import { number, object, string } from 'zod';
import type { TypeOf } from 'zod';

export const checkSerialNumberSchema = object({
	Id: number({ required_error: 'Id is missing' }),
	SerialNumber: string({ required_error: 'SN is missing' })
});

export type CheckSerialNumber = TypeOf<typeof checkSerialNumberSchema>;
