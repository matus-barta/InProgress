import { boolean, date, object, string } from 'zod';
import type { TypeOf } from 'zod';

export const UserSchema = object({
	Name: string().optional(),
	Username: string({ required_error: 'Username is missing' }).email(),
	AccessToken: string().optional(),
	SessionId: string().optional(),
	Allowed: boolean(),
	Admin: boolean(),
	Image: string().optional(),
	LastLoginAt: date().optional(),
	LastAccessAt: date().optional()
});

export type UserSchema = TypeOf<typeof UserSchema>;
