import type { UserSchema } from '$lib/schemas/user.schema';
import prisma from '../db/prisma';
import log from '../utils/logger';

export async function getUserInfoFromSessionId(sessionId: string): Promise<UserSchema | null> {
	const result = await prisma.user.findUnique({
		where: {
			SessionId: sessionId
		},
		select: {
			Name: true,
			Username: true,
			AccessToken: true,
			SessionId: true,
			Allowed: true,
			Admin: true
		}
	});

	if (result != null) return result as UserSchema;
	return null;
}

export async function getUserInfoFromUsername(username: string): Promise<UserSchema | null> {
	const result = await prisma.user.findUnique({
		where: {
			Username: username
		},
		select: {
			Name: true,
			Username: true,
			AccessToken: true,
			SessionId: true,
			Allowed: true,
			Admin: true
		}
	});

	if (result != null) return result as UserSchema;
	return null;
}

export async function updateUser(user: UserSchema): Promise<boolean> {
	try {
		const result = await prisma.user.update({
			where: {
				Username: user.Username
			},
			data: {
				SessionId: user.SessionId,
				AccessToken: user.AccessToken,
				Name: user.Name
			}
		});

		if (result != null && result.Username != user.Username) {
			log.error(`setSessionId: Something got wrong - result Username != input username`);
			return false;
		}
	} catch (e) {
		log.error(`setSessionId: ${e}`);
		return false;
	}
	return true;
}

export async function checkIfAllowed(user: UserSchema): Promise<boolean> {
	const result = await prisma.user.findUnique({
		where: {
			Username: user.Username
		},
		select: {
			Allowed: true
		}
	});

	if (result != null) return result.Allowed;
	return false;
}

export async function checkIfAdmin(user: UserSchema): Promise<boolean> {
	const result = await prisma.user.findUnique({
		where: {
			Username: user.Username
		},
		select: {
			Admin: true
		}
	});

	if (result != null) return result.Admin;
	return false;
}
