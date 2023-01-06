import { getAllUsers } from '$lib/server/handlers/user.handler';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const allUsers = await getAllUsers();
	return {
		allUsers
	};
}) satisfies PageServerLoad;
