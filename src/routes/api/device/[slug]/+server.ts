import { getDeviceData } from '$lib/server/handlers/device.handler';
import log from '$lib/server/utils/logger';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

const where = 'GET: /api/device';

export const GET = (async (event) => {
	let id: number;
	try {
		id = Number.parseInt(event.params.slug);
	} catch (e) {
		log.warn(`${where}/[slug]`, `Parse error - did not get number`);
		return new Response('Provide number', { status: 400 });
	}
	log.info(`${where}/[slug]/${id}`, `Got good req`);

	const res = await getDeviceData(id);

	return json(res);
}) satisfies RequestHandler;
