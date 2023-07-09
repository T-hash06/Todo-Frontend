<script lang="ts">
	import Button from '$components/+Button.svelte';
	import TextInput from '$components/+TextInput.svelte';
</script>

<div id="login-page" class="page-container">
	<TextInput placeholder="Username" name="username" />
	<Button href="home">Hola</Button>
	<Button href="home" type="secondary">Adios</Button>
</div>

<style lang="scss">
	#login-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		gap: 2rem;
	}
</style>
