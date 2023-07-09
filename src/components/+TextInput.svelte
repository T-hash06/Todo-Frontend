<script lang="ts">
	import Icon from '@iconify/svelte';

	let classes: string = '';
	export { classes as class };

	export let placeholder: string = '';
	export let value: string = '';
	export let icon: string = '';
	export let name: string;

	let filled: boolean = value !== '';

	$: filled = value !== '';
</script>

<div
	id="input-{name}"
	class="text-input-container {classes}"
	class:filled
	class:iconned={icon}
	{placeholder}
>
	{#if icon}
		<span class="icon">
			<Icon {icon} />
		</span>
	{/if}
	<input class="input" type="text" bind:value {name} />
</div>

<style lang="scss">
	.text-input-container {
		--border-slice-color: var(--background);

		position: relative;

		height: var(--std-height);
		width: 100%;

		border-radius: 1rem;
		border: 2px solid var(--disabled-color);

		transition-duration: var(--std-transition-time);

		display: flex;
		justify-content: center;
		align-items: center;

		.icon {
			display: flex;
			justify-self: center;
			align-self: center;
			color: var(--disabled-color);

			font-size: 3rem;

			transition-property: inherit;
		}

		.input {
			height: 100%;
			width: 100%;

			background-color: transparent;
			color: var(--text-color);

			border-radius: inherit;
			border: none;
			outline: none;

			padding: 0 2rem;
			letter-spacing: 0.5px;

			font-size: 2rem;
			z-index: 1;
		}

		&::after {
			position: absolute;
			content: attr(placeholder);

			font-size: 2rem;
			background-color: transparent;
			color: var(--disabled-color);

			display: flex;
			justify-content: center;
			align-items: center;

			height: 2px;
			left: 2rem;
			top: calc(50% - 2px);

			transition-duration: inherit;
		}

		&::before {
			content: attr(placeholder);

			position: absolute;
			top: -2px;
			left: 2rem;

			height: 2px;
			font-size: 2rem;
			padding: 0 2rem;

			color: transparent;
			background: var(--border-slice-color);
			background-attachment: fixed;

			transform: scaleX(0);
			transition-duration: inherit;
		}

		&.iconned {
			display: grid;
			grid-template-columns: var(--std-height) 1fr;

			.input {
				padding: 0;
			}

			&::after {
				left: 6rem;
			}
		}

		&:focus-within {
			border-color: var(--primary-color);

			&::after,
			.icon {
				color: var(--primary-color);
			}
		}

		&.filled,
		&:focus-within {
			&::after {
				left: 2rem;
				top: -4px;
				padding: 0 2rem;
			}
			&::before {
				max-width: 100%;
				transform: unset;
			}
		}
	}
</style>
