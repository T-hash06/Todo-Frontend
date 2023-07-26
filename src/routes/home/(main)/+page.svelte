<script lang="ts">
	import CreateForm from '$components/home/+CreateForm.svelte';
	import Dialog from '$components/+Dialog.svelte';
	import Todos from '$components/home/+Todos.svelte';

	import { todosStore } from '$lib/stores/todos.js';

	export let data;
	let active = false;

	const name = data.session.name.split(' ').at(0);
	todosStore.set(data.todos);
</script>

<div id="home-page" class="page-container">
	<h2 class="greeting">{data.prefix}, {name}!</h2>

	<Todos todos={$todosStore} />

	{#if active}
		<Dialog bind:active sendText="create" title="create new task">
			<CreateForm />
		</Dialog>
	{/if}

	<button class="create-todo" on:click={() => (active = true)}>
		<p class="text">create</p>
		<span class="decorator" />
		<span class="decorator" />
	</button>
</div>

<style lang="scss">
	$create-todo-size: 6.5rem;

	#home-page {
		margin-top: 4rem;
		width: calc(100% - var(--home-margin-left) * 2);
		height: fit-content;

		justify-self: center;

		.greeting {
			font-size: 4.7rem;
			letter-spacing: 1px;

			color: var(--text-color-1);
		}

		.create-todo {
			position: fixed;
			display: flex;
			justify-content: center;
			align-items: center;

			width: $create-todo-size;
			height: $create-todo-size;

			border-radius: 50%;
			box-shadow: 0px 10px 10px 0px var(--shadow-color-1);
			border: none;
			cursor: pointer;

			right: 4rem;
			bottom: 4rem;

			background-color: var(--primary-color);

			transition-duration: var(--std-transition-time);
			.text {
				display: none;
			}

			.decorator {
				position: absolute;

				width: 2rem;
				height: 2px;
				border-radius: 0.25rem;

				background-color: var(--secondary-color);

				&:last-child {
					transform: rotate(90deg);
				}
			}

			&:hover,
			&:active {
				filter: brightness(1.1);
				box-shadow: 0px 0px 0px transparent;
			}
		}
	}

	@media screen and (min-width: 740px) {
		#home-page {
			.create-todo {
				display: flex;
				justify-content: left;

				width: $create-todo-size * 3;
				border-radius: 1rem;

				right: 7rem;
				bottom: 7rem;

				.text {
					display: flex;
					font-size: 2.2rem;
					color: var(--secondary-color);
					font-weight: 500;

					margin-left: calc($create-todo-size / 2);
					text-transform: capitalize;
				}

				.decorator {
					right: calc($create-todo-size / 2);
				}
			}
		}
	}
</style>