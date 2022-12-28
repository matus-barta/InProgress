import type { CheckSerialNumber } from '$lib/schemas/device.schema';
import { checkIfExistsSerialNumber } from '$lib/server/handlers/device.handler';
import log from '$lib/server/utils/logger';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET = (async ({ event }) => {
	log.info(`GET Req: /api/serialnumber/${event.params.slug}`);
	if (event.params.slug == '') {
		log.warn(`GET Req: /api/serialnumber/${event.params.slug} - Empty slug`);
		return new Response('Empty slug', { status: 400 });
	}

	const check = await checkIfExistsSerialNumber(event.params.slug);
	const res: CheckSerialNumber = { SerialNumber: check };

	return json(res);
}) satisfies RequestHandler;
