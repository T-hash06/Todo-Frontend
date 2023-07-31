import { HttpRequest, type Todo } from '$lib/util/http';
import { getSequentialColor } from '$lib/util/color.js';
import { redirect } from '@sveltejs/kit';

function getRandomPrefix() {
	const prefixes = ["What's up", 'Hey', 'Greetings', 'Hi there', 'Hello', 'Hiya', 'Howdy'];

	return prefixes[Math.floor(Math.random() * prefixes.length)];
}

function getUniqueLabels(todos: Todo[]) {
	const labels = new Set<string>();

	todos.forEach((todo) => labels.add(todo.label));

	return Array.from(labels);
}

function getLabelColors(todos: Todo[]) {
	const labels = getUniqueLabels(todos);

	const colors = {} as Record<string, string>;

	labels.forEach((label, index) => {
		colors[label] = getSequentialColor(index);
	});

	return colors;
}

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

	return { todos, prefix: getRandomPrefix(), labelColors: getLabelColors(todos) };
}
