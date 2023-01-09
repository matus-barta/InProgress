import { getUserInfoFromSessionId, updateAccessDate } from '$lib/server/handlers/user.handler';
import log from '$lib/server/utils/logger';
import { redirect, type Handle } from '@sveltejs/kit';
import pkg from 'lodash';
const { omit } = pkg;

const where = 'Hooks';

const privateUrls = [
	'/dashboard',
	'/api/device',
	'/api/search',
	'/api/serialnumber',
	'/api/status',
	'/api/user'
];

export const handle = (async ({ event, resolve }) => {
	let check = false;

	privateUrls.forEach((privateUrl) => {
		if (event.url.pathname.startsWith(privateUrl)) check = true;
	});

	if (check) {
		const sessionId = event.cookies.get('sessionid');
		if (sessionId == undefined) {
			log.info(where, 'undefined cookie');
			throw redirect(307, '/login');
		} else {
			const userInfo = await getUserInfoFromSessionId(sessionId);
			if (userInfo == null) {
				log.info(where, 'sessionid cookie exists but not in db');
				throw redirect(307, '/login');
			} else {
				event.locals.user = omit(userInfo, 'AccessToken');
				if (!(await updateAccessDate(userInfo))) log.warn(where, `Failed to update access Date`);
				log.info(where, `known sessionid - User:${event.locals.user.Username}`);
			}
		}
	}

	return await resolve(event);
}) satisfies Handle;
