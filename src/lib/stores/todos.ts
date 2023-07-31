import { HttpRequest, type Todo, type CreateTodoData } from '$lib/util/http';
import { getSequentialColor } from '$lib/util/color';
import { showToast } from '$lib/stores/toast';

import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

import cookies from 'js-cookie';

let temporalId = 0;

function calculateSchema(todos: Todo[]) {
	const labelSet = new Set<string>();

	todos.forEach((todo) => labelSet.add(todo.label));

	const labels = Array.from(labelSet);

	const colors = {} as Record<string, string>;

	labels.forEach((label, index) => {
		colors[label] = getSequentialColor(index);
	});
	return colors;
}

export const colorStore = writable<Record<string, string>>();
export const todosStore = writable<Todo[]>([] as Todo[]);
export const filterStore = writable<string>('');

export function createTodo({ title, label, priority }: CreateTodoData) {
	const localId = --temporalId;
	let backTodos = [] as Todo[];

	todosStore.update((todos) => {
		backTodos = JSON.parse(JSON.stringify(todos));

		todos.push({ id: localId, title, label: label.toLowerCase(), priority, done: false });
		return todos;
	});

	const request = new HttpRequest();
	const token = cookies.get('session-token') ?? '';

	request
		.setResource('todo')
		.setBearer(token)
		.setMethod('POST')
		.setBody({ title, label, priority });

	request.addResponse(null, (error) => {
		console.log(error);

		showToast('error', 'Error', 'Error while creating todo');

		todosStore.set(backTodos);
	});

	request.addResponse(401, () => {
		showToast('warning', 'Expired session', 'You need to login again');

		todosStore.set([]);

		goto('/auth/login');
	});

	request.addResponse<string>(201, (id) => {
		todosStore.update((todos) => {
			const todo = todos.find((todo) => todo.id === localId);
			if (todo !== undefined) todo.id = parseInt(id);
			return todos;
		});
	});

	request.execute();
}

export function toggleTodoCompleted(id: number) {
	let backTodos = [] as Todo[];
	let changedValue = false;

	todosStore.update((todos) => {
		backTodos = JSON.parse(JSON.stringify(todos));

		const todo = todos.find((todo) => todo.id === id);
		if (todo !== undefined) {
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

		todosStore.set([]);

		goto('/auth/login');
	});

	request.addResponse(200, () => null);

	request.execute();
}

export function deleteTodo(id: number) {
	let backTodos = [] as Todo[];

	todosStore.update((todos) => {
		backTodos = JSON.parse(JSON.stringify(todos));

		const index = todos.findIndex((todo) => todo.id === id);
		if (index !== -1) todos.splice(index, 1);
		return todos;
	});

	const request = new HttpRequest();
	const token = cookies.get('session-token') ?? '';

	request.setResource(`todo/${id}`).setBearer(token).setMethod('DELETE');

	request.addResponse(null, (error) => {
		console.log(error);

		showToast('error', 'Error', 'Error while deleting todo');

		todosStore.set(backTodos);
	});

	request.addResponse(401, () => {
		showToast('warning', 'Expired session', 'You need to login again');

		todosStore.set([]);

		goto('/auth/login');
	});

	request.addResponse(200, () => null);

	request.execute();
}

todosStore.subscribe((todos) => {
	colorStore.set(calculateSchema(todos));
});
