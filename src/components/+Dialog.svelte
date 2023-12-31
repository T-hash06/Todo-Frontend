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
	on:submit|preventDefault={close}
	on:keydown={handleKeyPress}
	role="none"
>
	<form
		class="wrapper"
		on:click|stopPropagation
		on:keydown={handleKeyPress}
		on:submit|preventDefault
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
		backdrop-filter: blur(5px);

		display: grid;
		grid-template-rows: repeat(3, 1fr);
		place-items: center;

		position: fixed;

		width: 100svw;
		height: 100%;

		top: 0;
		left: 0;

		z-index: 2;

		.title {
			color: var(--text-color-1);
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

			background-color: var(--background-1);

			border-radius: 1rem;
			box-shadow: 0px 0px 10px var(--shadow-color-1);

			gap: $spacing;
			grid-row: 1/3;

			.buttons {
				display: flex;
				justify-content: flex-end;
				gap: $spacing;
			}
		}
	}

	@media screen and (min-width: 1024px) {
		.dialog-container {
			.wrapper {
				grid-row: 1/-1;
			}
		}
	}
</style>
