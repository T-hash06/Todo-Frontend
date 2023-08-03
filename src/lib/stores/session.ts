import { writable } from 'svelte/store';
import type { SessionPayload } from '$lib/util/http';

let created = false;

export const sessionStore = writable<SessionPayload>({} as SessionPayload);

export function createSessionStore(data: SessionPayload) {
	if (created) {
		return;
	}

	created = true;

	sessionStore.set(data);
}

export function deleteSessionStore() {
	sessionStore.set({} as SessionPayload);
	created = false;
}
