<script lang="ts">
	import Button from '$components/+Button.svelte';
	import TextInput from '$components/+TextInput.svelte';
</script>

<div id="login-page" class="page-container">
	<form class="form">
		<div class="section">
			<TextInput placeholder="Username" name="username" icon="solar:user-bold" />
			<TextInput placeholder="Password" name="password" icon="solar:key-bold" />
		</div>

		<div class="buttons-section section">
			<Button type="secondary" href="register">Sign Up</Button>
			<Button>Login</Button>
		</div>
	</form>
</div>

<style lang="scss">
	#login-page {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 3rem;

		.form {
			width: 100%;
			height: 100%;

			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			gap: 8rem;

			.section {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				gap: 3rem;
			}

			.buttons-section {
				flex-direction: row;
			}
		}
	}
</style>
