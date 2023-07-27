<script>
	import ColorInput from '$components/+ColorInput.svelte';
	import TextInput from '$components/+TextInput.svelte';
</script>

<div class="create-form">
	<TextInput name="title" placeholder="Title" focus />
	<TextInput name="label" placeholder="Label" />
	<ColorInput name="color" />
</div>

<style lang="scss">
	.create-form {
		display: flex;
		flex-direction: column;

		gap: 3rem;
	}
</style>
