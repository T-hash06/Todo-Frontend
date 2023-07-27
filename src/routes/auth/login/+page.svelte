<script lang="ts">
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import { createFormContext } from '$lib/contexts/FormErrors';
	import { showToast } from '$lib/stores/toast';
	import { HttpRequest } from '$lib/util/http';

	import Button from '$components/+Button.svelte';
	import TextInput from '$components/+TextInput.svelte';

	import cookies from 'js-cookie';

	const { setError } = createFormContext({ username: '', password: '' });

	function submit(event: SubmitEvent) {
		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		const request = new HttpRequest();

		request.setResource('auth').setMethod('POST').setBody(data);

		request.addResponse(null, (error) => {
			showToast('error', 'Server Error', 'A server error has occurred. Please try again later.');
			console.log(error);
		});

		request.addResponse(404, (_) => {
			setError('username', 'Username not found');
		});

		request.addResponse(401, (_) => {
			setError('password', 'Incorrect password');
		});

		request.addResponse<string>(201, (text) => {
			cookies.set('session-token', text);
			showToast('success', 'Logged in', 'Logged in successfully!');
			goto('/home');
		});

		request.execute();
	}
</script>

<svelte:head>
	<title>Login | Todo App</title>
</svelte:head>

<div id="login-page" in:fade={{ duration: 600 }}>
	<form class="form" method="post" on:submit|preventDefault={submit}>
		<div class="section">
			<TextInput placeholder="Username" name="username" icon="solar:user-bold" />
			<TextInput placeholder="Password" name="password" type="password" icon="solar:key-bold" />
		</div>

		<div class="buttons-section section">
			<Button class="button" type="secondary" href="register" role="button">Sign Up</Button>
			<Button class="button">Login</Button>
		</div>
	</form>
</div>

<style lang="scss">
	#login-page {
		display: flex;
		justify-content: center;
		align-items: center;

		.section.buttons-section {
			flex-direction: row;
		}
	}
</style>
