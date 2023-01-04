import * as msal from '@azure/msal-node';
import type { PageServerLoad } from './$types';
import { url, clientId, authority, clientSecret } from '$lib/server/utils/config';
import log from '$lib/server/utils/logger';
import { getUserInfoFromUsername, updateUser } from '$lib/server/handlers/user.handler';
import type { UserSchema } from '$lib/schemas/user.schema';
import { generateSessionId } from '$lib/server/utils/session';

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
			log.error(error);
		});

		res != undefined ? (redirect = res) : (redirect = returnError('MSAL empty response'));
		log.info(`Login: sending redirect ${redirect} to login`);
		return {
			redirect
		};
	} else {
		// acquire a token by exchanging the code
		tokenRequest.code = code;
		const msalRes = await cca.acquireTokenByCode(tokenRequest).catch((error) => {
			log.error(`Login: MSAL token ${error}`);
		});

		if (msalRes == undefined) return { redirect: returnError('MSAL getting token error') };

		const sessionId = await checkIfExistsAndAllowedAndLogin(msalRes);
		if (sessionId == '') redirect = returnError('User Not Allowed - Contact Admin to get access.');
		else {
			event.cookies.set('sessionid', sessionId);
			redirect = '/dashboard';
			log.info(`Login: saving sessionID: "${sessionId}" going to ${redirect}`);
		}
		return {
			redirect
		};
	}
}) satisfies PageServerLoad;

async function checkIfExistsAndAllowedAndLogin(
	response: msal.AuthenticationResult
): Promise<string> {
	let userInfo: UserSchema | null;
	if (response.account?.username != undefined) {
		userInfo = await getUserInfoFromUsername(response.account?.username);
		log.info(`Login: Is logging in - ${response.account?.username}`);

		if (userInfo == null) {
			log.warn(`Login: User does not exist - ${response.account?.username}`);
			return '';
		} else if (userInfo.Allowed) {
			const sessionId = generateSessionId();
			userInfo.SessionId = sessionId;
			userInfo.AccessToken = response.accessToken;
			userInfo.Name = response.account.name;
			if (await updateUser(userInfo)) return sessionId;
			else {
				log.error(`Login: Session id fail`);
				return '';
			}
		} else {
			log.warn(`Login: Not allowed - ${userInfo.Username}`);
			return '';
		}
	} else {
		log.error(`Login: Got Undefined account info`);
		return '';
	}
}

function returnError(message: string) {
	return `/error?error=${encodeURIComponent(message)}`;
}
