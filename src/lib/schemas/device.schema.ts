import { object, string } from 'zod';
import type { TypeOf } from 'zod';

export const checkSerialNumberSchema = object({
	SerialNumber: string({ required_error: 'SN is missing' })
});

export type CheckSerialNumber = TypeOf<typeof checkSerialNumberSchema>;
