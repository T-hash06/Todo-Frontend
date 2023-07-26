<script lang="ts">
	import { fade } from 'svelte/transition';
	import { setContext } from 'svelte';

	import Button from '$components/+Button.svelte';

	export let active = true;
	export let sendText = 'Send';
	export let title = 'Dialog';

	function close() {
		active = false;
	}

	function handleKeyPress(e: KeyboardEvent) {
		e.key === 'Escape' && close();
	}

	setContext('close-dialog', close);
</script>

<div
	class="dialog-container"
	transition:fade={{ duration: 200 }}
	on:click={close}
	on:keydown={handleKeyPress}
	role="none"
>
	<form
		class="wrapper"
		on:click|stopPropagation
		on:keydown={handleKeyPress}
		on:submit|preventDefault={close}
		role="none"
	>
		<h3 class="title">{title}</h3>

		<div class="slot-container">
			<slot />
		</div>

		<div class="buttons">
			<Button type="secondary" on:click={close} role="reset">cancel</Button>
			<Button>{sendText}</Button>
		</div>
	</form>
</div>

<style lang="scss">
	$spacing: 3rem;

	.dialog-container {
		// background-color: color-mix(in srgb, var(--background), transparent 20%);
		backdrop-filter: blur(3px);

		display: grid;
		place-items: center;

		position: fixed;

		width: 100svw;
		height: 100svh;

		top: 0;
		left: 0;

		z-index: 2;

		.title {
			color: var(--text-color-2);
			font-weight: 400;
			font-size: 2.5rem;
			letter-spacing: 0.6px;

			&::first-letter {
				text-transform: uppercase;
			}
		}

		.wrapper {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			width: calc(100% - 8rem);
			height: max-content;

			max-width: 52rem;

			padding: $spacing;

			background-color: var(--background);

			border-radius: 1rem;
			box-shadow: 0px 0px 8px var(--shadow-color-2);

			gap: $spacing;

			.buttons {
				display: flex;
				justify-content: flex-end;
				gap: $spacing;
			}
		}
	}
</style>
