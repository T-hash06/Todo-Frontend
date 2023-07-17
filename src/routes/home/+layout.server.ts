import { HttpRequest, type SessionPayload } from '$lib/http.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
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
		console.log('User is logged in');
		session = payload;
	});

	await request.execute();

	return { session };
}
