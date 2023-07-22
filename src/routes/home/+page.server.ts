import { HttpRequest, type Todo } from '$lib/util/http';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, fetch }) {
	const sessionToken = cookies.get('session-token');

	if (sessionToken === undefined) {
		throw redirect(302, '/auth/login');
	}

	const request = new HttpRequest();
	let todos = [] as Todo[];

	request.setResource('todo');

	request.setBearer(sessionToken);

	request.addResponse(null, (error) => {
		console.log(error);

		throw redirect(302, '/auth/login');
	});

	request.addResponse(401, () => {
		throw redirect(302, '/auth/login');
	});

	request.addResponse<Todo[]>(200, (payload) => {
		todos = payload;
	});

	await request.execute(fetch);

	return { todos };
}
