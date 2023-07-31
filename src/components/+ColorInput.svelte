<script lang="ts">
	import { getRandomColor } from '$lib/util/color';

	export let value: string = '';
	export let name: string;
	export let disabled: boolean = false;
	let element: HTMLButtonElement;

	function init(node: HTMLButtonElement) {
		if (value === '') value = getRandomColor();
		element = node;

		element.style.setProperty('--picked-color', value);
	}

	function randomValue() {
		if (disabled) return;

		value = getRandomColor();
		element.style.setProperty('--picked-color', value);
	}
</script>

<button class="color-input" use:init on:click={randomValue} type="button">
	<input bind:value class="input" {name} />

	<span class="demo" />
	<p class="description">
		{value}
	</p>
</button>

<style lang="scss">
	$spacing: 3rem;

	.color-input {
		--picked-color: var(--primary-color);

		display: grid;
		grid-template-columns: min-content auto;
		height: var(--std-height);

		border: 2px solid var(--picked-color);
		border-radius: 1rem;

		outline: none;
		background-color: transparent;
		cursor: pointer;

		transition-duration: var(--std-transition-time);

		.input {
			display: none;
		}

		.demo {
			width: calc(var(--std-height) - $spacing);
			height: calc(var(--std-height) - $spacing);

			background-color: var(--picked-color);
			align-self: center;

			margin-left: calc((var(--std-height) - $spacing) / 2);
			margin-right: $spacing;

			border-radius: 0.5rem;

			transition-duration: inherit;
		}

		.description {
			font-size: 2rem;
			letter-spacing: 1px;
			word-spacing: 1px;

			color: var(--picked-color);

			align-self: center;
			text-align: left;

			transition-duration: inherit;
		}
	}
</style>
