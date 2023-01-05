import { search } from '$lib/server/handlers/search.handler';
import log from '$lib/server/utils/logger';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

const where = 'GET: /api/search';

export const GET = (async ({ url }) => {
	const q = url.searchParams.get('q');
	log.info(`${where}?q=${q}`, `Got req`);

	if (q != null && q != undefined && q != '') {
		try {
			return json(await search(q));
		} catch (e) {
			log.error(`${where}?q=${q}`, `${e}`);
		}
	}

	return new Response('OK', { status: 200 });
}) satisfies RequestHandler;
