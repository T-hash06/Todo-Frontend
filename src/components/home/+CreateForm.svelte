<script lang="ts">
	import ColorInput from '$components/+ColorInput.svelte';
	import TextInput from '$components/+TextInput.svelte';

	import { getSequentialColor } from '$lib/util/color';

	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';

	const schema = getContext('schema') as Writable<Record<string, string>>;
	const color = getSequentialColor(Object.keys($schema).length);
</script>

<div class="create-form">
	<TextInput name="title" placeholder="Title" focus />
	<TextInput name="label" placeholder="Label" />
	<ColorInput name="color" value={color} disabled />
</div>

<style lang="scss">
	.create-form {
		display: flex;
		flex-direction: column;

		gap: 3rem;
	}
</style>
