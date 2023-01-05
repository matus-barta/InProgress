import * as msal from '@azure/msal-node';
import type { PageServerLoad, RequestEvent } from './$types';
import { url, clientId, authority, clientSecret } from '$lib/server/utils/config';
import log from '$lib/server/utils/logger';
import {
	getUserInfoFromUsername,
	updateLoginDate,
	updateUser
} from '$lib/server/handlers/user.handler';
import type { UserSchema } from '$lib/schemas/user.schema';
import { generateSessionId } from '$lib/server/utils/session';

const where = 'Login';

const clientConfig = {
	auth: {
		clientId,
		authority,
		clientSecret
	}
};

const authCodeUrlParameters = {
	scopes: ['User.Read'],
	redirectUri: `${url}/login`
};

const tokenRequest = {
	code: 'authorization_code',
	redirectUri: `${url}/login`,
	scopes: ['User.Read']
};

export const load = (async (event) => {
	const code = event.url.searchParams.get('code');
	let redirect: string | undefined;

	const cca = new msal.ConfidentialClientApplication(clientConfig);

	if (code == null) {
		// get url to sign user in and consent to scopes needed for application
		const res = await cca.getAuthCodeUrl(authCodeUrlParameters).catch((error) => {
			log.error(where, `getAuthCode() - ${error}`);
		});

		res != undefined ? (redirect = res) : (redirect = returnError('MSAL empty response'));
		log.info(where, `sending redirect ${redirect} to login`);
		return {
			redirect
		};
	} else {
		// acquire a token by exchanging the code
		tokenRequest.code = code;
		const msalRes = await cca.acquireTokenByCode(tokenRequest).catch((error) => {
			log.error(where, `MSAL token error - ${error}`);
		});

		if (msalRes == undefined) return { redirect: returnError('MSAL getting token error') };

		const sessionId = await checkIfExistsAndAllowedAndLogin(msalRes, event);
		if (sessionId == '') redirect = returnError('User Not Allowed - Contact Admin to get access.');
		else {
			redirect = '/dashboard';
			log.info(where, `Saving sessionID: "${sessionId}" going to ${redirect}`);
		}
		return {
			redirect
		};
	}
}) satisfies PageServerLoad;

async function checkIfExistsAndAllowedAndLogin(
	response: msal.AuthenticationResult,
	event: RequestEvent
): Promise<string> {
	let userInfo: UserSchema | null;
	if (response.account?.username != undefined) {
		userInfo = await getUserInfoFromUsername(response.account?.username);
		log.info(where, `Is logging in - ${response.account?.username}`);

		if (userInfo == null) {
			log.warn(where, `User does not exist - ${response.account?.username}`);
			return '';
		} else if (userInfo.Allowed) {
			const sessionId = generateSessionId();
			userInfo.SessionId = sessionId;
			userInfo.AccessToken = response.accessToken;
			userInfo.Name = response.account.name;
			userInfo.Image = await getUserImg(event, userInfo);
			if (await updateUser(userInfo)) {
				event.cookies.set('sessionid', sessionId);
				if (!(await updateLoginDate(userInfo))) log.warn(where, 'Issue updating login date');
				return sessionId;
			} else {
				log.error(where, `Session id update fail`);
				return '';
			}
		} else {
			log.warn(where, `Not allowed - ${userInfo.Username}`);
			return '';
		}
	} else {
		log.error(where, `Got Undefined account info`);
		return '';
	}
}

function returnError(message: string) {
	return `/error?error=${encodeURIComponent(message)}`;
}

async function getUserImg(event: RequestEvent, user: UserSchema) {
	const imageBlob = await event
		.fetch('https://graph.microsoft.com/v1.0/me/photos/48x48/$value', {
			headers: {
				Authorization: `Bearer ${user.AccessToken}`
			}
		})
		.then((response) => {
			return response.blob();
		});

	const imageBase64 = Buffer.from(await imageBlob.text()).toString('base64');
	console.log(imageBase64);

	return imageBase64;
}
