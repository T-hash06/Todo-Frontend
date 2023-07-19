<script lang="ts">
	type formData = {
		name: string;
		email: string;
		username: string;
		password: string;
	};

	import { fade } from 'svelte/transition';

	import { createFormContext } from '$lib/contexts/FormErrors';
	import { showToast } from '$lib/stores/toast';
	import { HttpRequest } from '$lib/util/http';
	import { goto } from '$app/navigation';

	import Button from '$components/+Button.svelte';
	import TextInput from '$components/+TextInput.svelte';

	const { setError } = createFormContext({ name: '', email: '', username: '', password: '' });

	function submit(event: SubmitEvent) {
		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		const request = new HttpRequest();

		request.setResource('user').setMethod('POST').setBody(data);

		request.addResponse(null, (error) => {
			showToast('error', 'Server Error', 'A server error has occurred. Please try again later.');
			console.log(error);
		});

		request.addResponse<Array<keyof formData>>(409, (errors) => {
			errors.forEach((error) => {
				setError(error, `${error} already exists`);
			});
		});

		request.addResponse(201, (_) => {
			showToast('success', 'Welcome!', 'Your account has been created successfully!');
			goto('/auth/login');
		});

		request.execute();
	}
</script>

<div id="register-page" in:fade={{ duration: 600 }}>
	<form class="form" method="post" on:submit|preventDefault={submit}>
		<div class="section">
			<TextInput placeholder="Name" name="name" icon="solar:user-bold" />
			<TextInput placeholder="Email" name="email" type="email" icon="solar:letter-bold" />
			<TextInput placeholder="Username" name="username" icon="solar:user-id-bold" />
			<TextInput
				placeholder="Password"
				name="password"
				type="password"
				icon="solar:key-bold"
				minlength={8}
			/>
		</div>
		<div class="section buttons-section">
			<Button href="login" type="secondary">Login</Button>
			<Button>Sign up</Button>
		</div>
	</form>
</div>

<style lang="scss">
	#register-page {
		display: flex;
		justify-content: center;
		align-items: center;

		.section.buttons-section {
			flex-direction: row;
		}
	}
</style>
