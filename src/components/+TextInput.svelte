<script lang="ts">
	import { getErrorContext } from '$lib/contexts/FormErrors';
	import { hasContext } from 'svelte';

	let classes: string = '';
	export { classes as class };

	export let placeholder: string = '';
	export let type: 'text' | 'password' | 'email' = 'text';
	export let value: string = '';
	export let icon: string = '';
	export let pattern: string | null = null;
	export let minlength: number | null = null;
	export let name: string;

	export let optional: boolean = false;

	let filled: boolean = value !== '';
	let showing: boolean = false;
	let validMessage: string = '';
	let inputElement: HTMLInputElement | null;

	const context = getErrorContext();

	$: filled = value !== '';
	$: {
		if (hasContext('form-errors')) {
			validMessage = $context[name];
		}
	}

	function setType(node: HTMLInputElement) {
		node.type = type;

		inputElement = node;
	}

	function checkValidity(event: Event) {
		const target = event.target as HTMLInputElement;
		const isValid = target.validity.valid;

		if (isValid) {
			validMessage = '';
			return;
		}

		if (target.validity.tooShort) {
			validMessage = `Must be at least ${minlength} characters long`;
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

		if (target.validity.tooShort) {
			validMessage = `Must be at least ${minlength} characters long`;
			return;
		}

		validMessage = target.validationMessage;
	}

	function switchVisible(event: Event) {
		event.preventDefault();

		if (inputElement === null) {
			return;
		}

		showing = !showing;

		if (inputElement.type === 'password') {
			inputElement.type = 'text';
			return;
		}

		inputElement.type = 'password';
	}
</script>

<div
	class="text-input-container {classes}"
	class:filled
	class:iconned={icon}
	class:password={type === 'password'}
	class:error={validMessage}
	{placeholder}
>
	{#if icon}
		<span class="icon">
			<iconify-icon {icon} />
		</span>
	{/if}
	<label class="label" for="input-{name}">{name}</label>
	<input
		id="input-{name}"
		class="input"
		use:setType
		bind:value
		on:change={checkValidity}
		on:invalid={invalid}
		required={!optional}
		{name}
		{pattern}
		{minlength}
	/>
	{#key validMessage}
		<sub class="message">{validMessage}</sub>
	{/key}

	<button
		class="password-icon"
		class:showing
		on:mousedown={switchVisible}
		type="button"
		aria-label="switch hidden password"
	>
		<iconify-icon icon="ri:eye-fill" />
	</button>
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

		.label {
			position: absolute;
			color: transparent;

			height: 100%;
			width: 6rem;
		}

		.input {
			height: 100%;
			width: 100%;

			background-color: transparent;
			color: var(--text-color-1);

			border-radius: inherit;
			border: none;
			outline: none;

			padding: 0 2rem;
			letter-spacing: 0.5px;

			font-size: 2rem;
			z-index: 1;
		}

		.password-icon {
			display: none;
			position: absolute;

			color: var(--disabled-color);
			font-size: 3.5rem;

			right: 0;
			padding-right: 2rem;

			height: 100%;
			align-items: center;

			background-color: transparent;
			border: none;
			outline: none;

			transition-duration: inherit;
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

			&::first-letter {
				text-transform: uppercase;
			}
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

		&.password {
			.password-icon {
				display: flex;
				cursor: pointer;
				z-index: 4;

				&::after {
					position: absolute;
					content: '';

					width: 4rem;
					height: 4px;

					left: -0.2rem;

					background-color: var(--disabled-color);

					transform: rotate(-30deg) scaleX(0);
					transition-duration: inherit;
				}

				&.showing::after {
					transform: rotate(-30deg) scaleX(1);
				}
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

			.password-icon::after {
				background-color: var(--primary-color);
			}

			&::after,
			.password-icon,
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
