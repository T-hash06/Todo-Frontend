<script lang="ts">
	import { getErrorContext } from '$lib/contexts/FormErrors';
	import { hasContext } from 'svelte';
	import Icon from '@iconify/svelte';

	let classes: string = '';
	export { classes as class };

	export let placeholder: string = '';
	export let type: 'text' | 'password' | 'email' = 'text';
	export let value: string = '';
	export let icon: string = '';
	export let name: string;

	export let optional: boolean = false;

	let filled: boolean = value !== '';
	let validMessage: string = '';

	const context = getErrorContext();

	$: filled = value !== '';
	$: {
		if (hasContext('form-errors')) {
			validMessage = $context[name];
		}
	}

	function setType(node: HTMLInputElement) {
		node.type = type;
	}

	function checkValidity(event: Event) {
		const target = event.target as HTMLInputElement;
		const isValid = target.validity.valid;

		if (isValid) {
			validMessage = '';
			return;
		}

		validMessage = target.validationMessage;
	}

	function invalid(event: Event) {
		event.preventDefault();

		const target = event.target as HTMLInputElement;

		if (target.validity.valid) {
			return;
		}

		validMessage = target.validationMessage;
	}
</script>

<div
	id="input-{name}"
	class="text-input-container {classes}"
	class:filled
	class:iconned={icon}
	class:error={validMessage}
	{placeholder}
>
	{#if icon}
		<span class="icon">
			<Icon {icon} />
		</span>
	{/if}
	<input
		class="input"
		use:setType
		bind:value
		on:change={checkValidity}
		on:invalid={invalid}
		required={!optional}
		{name}
	/>
	{#key validMessage}
		<span class="message">{validMessage}</span>
	{/key}
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

		.message {
			position: absolute;
			bottom: -2.5rem;
			left: 2rem;

			height: 2rem;
			width: calc(100% - 4rem);

			font-size: 1.5rem;
			color: var(--error-color);

			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;

			animation: var(--std-transition-time) shake-x;
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

		&.error {
			border-color: var(--error-color);

			.icon,
			&::after {
				color: var(--error-color);
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
