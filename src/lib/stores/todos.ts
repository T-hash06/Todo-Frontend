import { HttpRequest, type Todo } from '$lib/util/http';
import { showToast } from '$lib/stores/toast';

import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

import cookies from 'js-cookie';

export const todosStore = writable<Todo[]>([] as Todo[]);

export function toggleTodoCompleted(id: number) {
	let backTodos = [] as Todo[];
	let changedValue = false;

	todosStore.update((todos) => {
		backTodos = JSON.parse(JSON.stringify(todos));

		const todo = todos.find((todo) => todo.id === id);
		if (todo) {
			todo.done = !todo.done;
			changedValue = todo.done;
		}
		return todos;
	});

	const request = new HttpRequest();
	const token = cookies.get('session-token') ?? '';

	request
		.setResource('todo')
		.setBearer(token)
		.setMethod('PATCH')
		.setBody({ id, done: changedValue });

	request.addResponse(null, (error) => {
		console.log(error);

		showToast('error', 'Error', 'Error while updating todo');

		todosStore.set(backTodos);
	});

	request.addResponse(401, () => {
		showToast('warning', 'Expired session', 'You need to login again');

		goto('/auth/login');
	});

	request.addResponse(200, () => null);

	request.execute();
}
