import { search } from '$lib/server/handlers/search.handler';
import log from '$lib/server/utils/logger';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET = (async ({ url }) => {
	const q = url.searchParams.get('q');
	log.info(`GET Req: /api/search?q=${q}`);

	if (q != null && q != undefined && q != '') {
		try {
			return json(await search(q));
		} catch (e) {
			log.error(`GET Req: /api/search?q=${q}\n${e}`);
		}
	}

	return new Response('OK', { status: 200 });
}) satisfies RequestHandler;
