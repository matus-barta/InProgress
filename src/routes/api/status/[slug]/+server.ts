import log from '$lib/server/utils/logger';
import type { RequestHandler } from '../$types';
import { json } from '@sveltejs/kit';
import { getListOfDeviceId } from '$lib/server/handlers/device.handler';
import { options } from '$lib/options';

const where = 'GET: /api/status';

export const GET = (async (event) => {
	const slug = event.params.slug;
	log.info(`${where}/${slug}`, `Got req`);

	if (slug == '') {
		log.warn(`${where}/${slug}`, `Empty slug`);
		return new Response('Empty slug', { status: 400 });
	}

	let check = false;
	options.forEach((option) => {
		if (option == slug) check = true;
	});

	if (check) {
		const res = await getListOfDeviceId(slug);
		return json(res);
	} else {
		log.warn(`${where}/${slug}`, `Wrong status`);
		return new Response('Wrong status', { status: 400 });
	}
}) satisfies RequestHandler;
