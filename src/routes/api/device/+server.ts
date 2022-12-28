import log from '$lib/server/utils/logger';
import type { RequestHandler } from '../$types';
import { json } from '@sveltejs/kit';
import { updateDevicesSchema, type UpdateDevicesSchema } from '$lib/schemas/device.schema';
import { updateDevice } from '$lib/server/handlers/device.handler';

export const POST = (async ({ request }) => {
	log.info(`POST Req: /api/device/`);

	let data: UpdateDevicesSchema;
	try {
		data = updateDevicesSchema.parse(await request.json());
	} catch (e) {
		log.warn(`POST Req: /api/device/ - Bad input - ${e}`);
		return new Response('Bad input', { status: 400 });
	}

	const check = await updateDevice(data);

	if (check) return new Response('OK', { status: 200 });
	else return new Response('Some error', { status: 400 });
}) satisfies RequestHandler;
