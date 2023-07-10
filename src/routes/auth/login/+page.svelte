<script lang="ts">
	import Button from '$components/+Button.svelte';
	import TextInput from '$components/+TextInput.svelte';

	import { fade } from 'svelte/transition';
</script>

<div id="login-page" in:fade={{ duration: 600 }}>
	<form class="form">
		<div class="section">
			<TextInput placeholder="Username" name="username" icon="solar:user-bold" />
			<TextInput placeholder="Password" name="password" type="password" icon="solar:key-bold" />
		</div>

		<div class="buttons-section section">
			<Button class="button" type="secondary" href="register">Sign Up</Button>
			<Button class="button">Login</Button>
		</div>
	</form>
</div>

<style lang="scss">
	#login-page {
		display: flex;
		justify-content: center;
		align-items: center;

		.buttons-section {
			flex-direction: row;
		}
	}
</style>
