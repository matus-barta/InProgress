import { getUserInfoFromSessionId } from '$lib/server/handlers/user.handler';
import log from '$lib/server/utils/logger';
import { redirect, type Handle } from '@sveltejs/kit';
import { omit } from 'lodash';

export const handle = (async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/dashboard')) {
		const sessionId = event.cookies.get('sessionid');
		if (sessionId == undefined) {
			log.info('Hooks: undefined cookie');
			throw redirect(307, '/login');
		} else {
			const userInfo = await getUserInfoFromSessionId(sessionId);
			if (userInfo == null) {
				log.info('Hooks: sessionid cookie exists but not in db');
				throw redirect(307, '/login');
			} else {
				event.locals.user = userInfo;
				log.info(
					`Hooks: known sessionid ${JSON.stringify(omit(event.locals.user, 'AccessToken'))}`
				);
			}
		}
	}

	return await resolve(event);
}) satisfies Handle;
