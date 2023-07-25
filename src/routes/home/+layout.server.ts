import { HttpRequest, type SessionPayload } from '$lib/util/http.js';
import { createSessionStore } from '$lib/stores/session.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, fetch }) {
	const sessionToken = cookies.get('session-token');

	if (sessionToken === undefined) {
		throw redirect(302, '/auth/login');
	}

	const request = new HttpRequest();
	let session = {} as SessionPayload;

	request.setResource('auth');

	request.setBearer(sessionToken);

	request.addResponse(null, (error) => {
		console.log(error);

		throw redirect(302, '/auth/login');
	});

	request.addResponse(401, () => {
		throw redirect(302, '/auth/login');
	});

	request.addResponse<SessionPayload>(200, (payload) => {
		session = payload;
	});

	await request.execute(fetch);

	return { session };
}
