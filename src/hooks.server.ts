import { getUserInfoFromSessionId, updateAccessDate } from '$lib/server/handlers/user.handler';
import log from '$lib/server/utils/logger';
import { redirect, type Handle } from '@sveltejs/kit';
import pkg from 'lodash';
const { omit } = pkg;

const where = 'Hooks';

export const handle = (async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/dashboard')) {
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
				log.info(where, `known sessionid ${JSON.stringify(omit(event.locals.user, 'Image'))}`);
			}
		}
	}

	return await resolve(event);
}) satisfies Handle;
