import log from '$lib/server/utils/logger';
import type { RequestHandler } from '../$types';
import { json } from '@sveltejs/kit';
import { getListOfDeviceId } from '$lib/server/handlers/device.handler';

export const GET = (async (event) => {
	const slug = event.params.slug;
	log.info(`GET Req: /api/status/${slug}`);

	if (slug == '') {
		log.warn(`GET Req: /api/status/${slug} - Empty slug`);
		return new Response('Empty slug', { status: 400 });
	}

	if (slug == 'InQueue' || slug == 'InProgress' || slug == 'Done') {
		const res = await getListOfDeviceId(slug);
		return json(res);
	} else {
		log.warn(`GET Req: /api/status/${slug} - Wrong status`);
		return new Response('Wrong status', { status: 400 });
	}
}) satisfies RequestHandler;
