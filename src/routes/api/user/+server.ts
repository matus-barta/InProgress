import type { UserSchema } from '$lib/schemas/user.schema';
import { createUser, getAllUsers, updateUser } from '$lib/server/handlers/user.handler';
import log from '$lib/server/utils/logger';
import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

const where = '/api/user';

export const GET = (async () => {
	log.info(`GET: ${where}`, `Got req`);

	try {
		return json(await getAllUsers());
	} catch (e) {
		log.error(`${where}`, `${e}`);
		return new Response('Server error', { status: 500 });
	}
}) satisfies RequestHandler;

export const PUT = (async (event: RequestEvent) => {
	log.info(`PUT: ${where}`, `Got req`);

	try {
		const req = (await event.request.json()) as UserSchema;

		if (await createUser(req)) return new Response('OK', { status: 200 });
		else return new Response('Server error', { status: 500 });
	} catch (e) {
		log.error(`${where}`, `${e}`);
		return new Response('Server error', { status: 500 });
	}
}) satisfies RequestHandler;

export const POST = (async (event: RequestEvent) => {
	log.info(`POST: ${where}`, `Got req`);

	try {
		const req = (await event.request.json()) as UserSchema;

		if (await updateUser(req)) return new Response('OK', { status: 200 });
		else return new Response('Server error', { status: 500 });
	} catch (e) {
		log.error(`${where}`, `${e}`);
		return new Response('Server error', { status: 500 });
	}
}) satisfies RequestHandler;
