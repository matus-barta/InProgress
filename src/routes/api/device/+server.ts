import log from '$lib/server/utils/logger';
import type { RequestHandler } from '../$types';
import { updateDevicesSchema, type UpdateDevicesSchema } from '$lib/schemas/device.schema';
import { updateDevice } from '$lib/server/handlers/device.handler';

const where = 'POST: /api/device';

export const POST = (async ({ request }) => {
	log.info(where, `Got req`);

	let data: UpdateDevicesSchema;
	try {
		data = updateDevicesSchema.parse(await request.json());
	} catch (e) {
		log.warn(where, `Bad input - ${e}`);
		return new Response('Bad input', { status: 400 });
	}

	const check = await updateDevice(data);

	if (check) return new Response('OK', { status: 200 });
	else return new Response('DB error', { status: 400 });
}) satisfies RequestHandler;
