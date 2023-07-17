<script lang="ts">
	import Button from '$components/+Button.svelte';
	import TextInput from '$components/+TextInput.svelte';
	import { createFormContext } from '$lib/contexts/FormErrors';

	import { fade } from 'svelte/transition';

	const { setError } = createFormContext({ name: '', email: '', username: '', password: '' });
</script>

<div id="register-page" in:fade={{ duration: 600 }}>
	<form class="form">
		<div class="section">
			<TextInput placeholder="Name" name="name" icon="solar:user-bold" />
			<TextInput placeholder="Email" name="email" type="email" icon="solar:letter-bold" />
			<TextInput placeholder="Username" name="username" icon="solar:user-id-bold" />
			<TextInput placeholder="Password" name="password" type="password" icon="solar:key-bold" />
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
