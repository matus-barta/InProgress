import log from '$lib/server/utils/logger';
import type { RequestHandler } from '../$types';

export const GET = (async ({ url }) => {
	log.info('GET: /logout ', `got req`);

	return new Response('OK', { status: 200 });
}) satisfies RequestHandler;
