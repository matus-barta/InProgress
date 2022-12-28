import { getDeviceData } from '$lib/server/handlers/device.handler';
import log from '$lib/server/utils/logger';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET = (async (event) => {
	let id: number;
	try {
		id = Number.parseInt(event.params.slug);
	} catch (e) {
		log.warn(`GET Req: /api/device/[slug] - Parse error`);
		return new Response('Provide number', { status: 400 });
	}
	log.info(`GET Req: /api/device/${id}`);

	const res = await getDeviceData(id);

	return json(res);
}) satisfies RequestHandler;
