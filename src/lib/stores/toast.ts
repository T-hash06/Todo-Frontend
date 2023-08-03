import { writable } from 'svelte/store';

let timeoutId = 0;

export const toastStore = writable<ToastData>({
	message: '',
	title: '',
	status: 'success',
	active: false
});

export function showToast(status: ToastStatus, title: string, message: string) {
	toastStore.set({ status, title, message, active: true });

	clearTimeout(timeoutId);
	timeoutId = setTimeout(hideToast, 7000);
}

export function hideToast() {
	clearTimeout(timeoutId);
	toastStore.update((data) => ({ ...data, active: false }));
}

export type ToastData = {
	title: string;
	message: string;
	status: ToastStatus;
	active: boolean;
};
export type ToastStatus = 'success' | 'error' | 'warning';
