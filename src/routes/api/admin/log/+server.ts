import type { LogSchema } from '$lib/schemas/log.schema';
import { getLogs } from '$lib/server/handlers/log.handler';
import log from '$lib/server/utils/logger';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const where = '/api/admin/log';

export const GET = (async (event) => {
	let limit: string | null | number | undefined = event.url.searchParams.get('limit');
	let level: string | null | undefined = event.url.searchParams.get('level');
	let result: undefined | LogSchema[];

	log.info(`GET: ${where}`, `Return logs from db - limit: ${limit}, level: ${level}`);

	if (level == null) level = undefined;

	if (limit != null && limit != '') {
		if (limit.toLowerCase() == 'all') {
			result = await getLogs(undefined, level);
		} else {
			try {
				limit = Number.parseInt(limit);
				result = await getLogs(limit, level);
			} catch (e) {
				return new Response('Provide valid number or all', { status: 400 });
			}
		}
	} else {
		result = await getLogs(50, level);
	}

	if (result == undefined) return new Response('Server error', { status: 500 });

	try {
		return json(result);
	} catch (e) {
		log.error(`${where}`, `${e}`);
		return new Response('Server error', { status: 500 });
	}
}) satisfies RequestHandler;
