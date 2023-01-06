import type { UserSchema } from '$lib/schemas/user.schema';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	const userInfo = event.locals.user as UserSchema;
	return {
		userInfo
	};
}) satisfies LayoutServerLoad;
