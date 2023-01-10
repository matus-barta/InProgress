import { date, object, string } from 'zod';
import type { TypeOf } from 'zod';

export const LogSchema = object({
	CreatedAt: date(),
	Level: string(),
	Where: string(),
	Message: string()
});

export type LogSchema = TypeOf<typeof LogSchema>;
