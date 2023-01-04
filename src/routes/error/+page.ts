import type { PageLoad } from './$types';

export const load = (({ url }) => {
	const errorMessage = url.searchParams.get('error');

	return {
		errorMessage
	};
}) satisfies PageLoad;
