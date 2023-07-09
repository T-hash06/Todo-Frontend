<script lang="ts">
	let classes: string = '';
	export { classes as class };

	export let type: 'primary' | 'secondary' = 'primary';
	export let href: string = '';
</script>

<button class="button-container {type} {classes}">
	<svelte:element this={href !== '' ? 'a' : 'span'} class="text" {href}><slot /></svelte:element>
</button>

<style lang="scss">
	.button-container {
		position: relative;

		border-radius: 1rem;
		border: none;

		height: var(--std-height);
		width: 100%;

		transition-duration: var(--std-transition-time);
		cursor: pointer;

		.text {
			transition-duration: inherit;

			display: flex;
			justify-content: center;
			align-items: center;

			height: 100%;
			width: 100%;

			border-radius: inherit;
			text-decoration: none;
			text-transform: capitalize;

			font-size: 2rem;
		}

		&.primary {
			background-color: var(--primary-color);
			color: var(--secondary-color);

			&:hover,
			&:active {
				filter: brightness(1.1);
			}
		}

		&.secondary {
			background-color: transparent;
			color: var(--primary-color);

			border: 2px solid var(--primary-color);

			.text {
				color: var(--primary-color);
			}

			&:hover,
			&:active {
				background-color: var(--primary-color);

				.text {
					color: var(--secondary-color);
				}
			}
		}
	}
</style>
