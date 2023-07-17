import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export function createFormContext(context: Record<string, string>) {
	const store = writable(context);
	setContext('form-errors', store);

	const clearErrors = () => {
		store.update((state) => {
			Object.keys(state).forEach((key) => {
				state[key] = '';
			});

			return state;
		});
	};

	const setError = (key: string, value: string) => {
		clearErrors();

		store.update((state) => {
			state[key] = value;
			return state;
		});
	};

	return { setError, clearErrors };
}

export function getErrorContext() {
	return getContext<Writable<Record<string, string>>>('form-errors');
}
