<script lang="ts">
	import { toggleTodoCompleted, filterStore, deleteTodo } from '$lib/stores/todos';
	import { fade } from 'svelte/transition';
	import type { Todo } from '$lib/util/http';

	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';

	export let todos: Todo[];

	const schema = getContext('schema') as Writable<Record<string, string>>;

	$: sortedTodos = () => {
		const matching = todos.filter((t) => t.label === $filterStore);
		const notMatching = todos.filter((t) => t.label !== $filterStore);

		return [...matching, ...notMatching];
	};
</script>

<section id="todos-section">
	<h3 class="section-title">today's tasks</h3>

	<ul class="todos-list section-content">
		{#each sortedTodos() as todo (todo.id)}
			<li style="--label-color: {$schema[todo.label]};">
				<button
					class="todo-item"
					class:done={todo.done}
					on:click={() => toggleTodoCompleted(todo.id)}
				>
					<span class="checkbox icon-container">
						<iconify-icon icon="pajamas:check" class="icon" />
					</span>
					<h4 class="todo-title">{todo.title}</h4>
					<span
						class="delete icon-container"
						aria-label="delete todo"
						on:click|stopPropagation={() => deleteTodo(todo.id)}
						on:keypress|stopPropagation={() => deleteTodo(todo.id)}
						role="button"
						tabindex="0"
					>
						<iconify-icon icon="solar:trash-bin-2-bold" class="icon" />
					</span>
				</button>
			</li>
		{:else}
			<li class="fallback" in:fade>
				<iconify-icon icon="solar:adhesive-plaster-bold-duotone" class="icon" />
				<h2 class="title">Still empty</h2>
				<p class="text">Nothing here yet… Start creating!</p>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	#todos-section {
		--label-color: var(--primary-color);

		margin-top: 3rem;
		width: 100%;

		.todos-list {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(42rem, 1fr));

			list-style: none;

			margin-top: 4rem;
			padding-bottom: 12rem;

			.fallback {
				width: 100%;
				height: min-content;

				grid-column: 1 / -1;

				display: grid;
				grid-template-rows: 10rem repeat(2, min-content);
				place-items: center;
				gap: 2rem;

				margin-top: 2rem;

				.icon {
					font-size: 10rem;
					color: var(--primary-color);
				}

				.title {
					color: var(--text-color-1);
					letter-spacing: 1px;
					font-size: 4rem;
					font-weight: 500;
					text-transform: capitalize;

					margin-top: 2rem;
				}

				.text {
					font-size: 2rem;
					color: var(--disabled-color);
				}
			}

			.todo-item {
				$todo-height: 8rem;

				display: grid;
				grid-template-columns: $todo-height auto $todo-height;

				border-radius: 1rem;

				background-color: var(--background-2);

				height: $todo-height;
				width: 100%;
				border: none;

				transition-duration: var(--std-transition-time);

				cursor: pointer;
				overflow: hidden;

				.icon-container {
					place-self: center;

					display: flex;
					justify-content: center;
					align-items: center;

					width: 3.5rem;
					aspect-ratio: 1/1;

					transition-duration: inherit;

					font-size: 3rem;
					cursor: pointer;
				}

				.checkbox {
					border-radius: 50%;
					border: 2px solid var(--label-color);

					.icon {
						color: var(--background-2);
						transition-duration: inherit;
						opacity: 0;
					}
				}

				.delete {
					color: var(--disabled-color);
					background-color: transparent;
					border: none;
					outline: none;
					width: fit-content;

					.icon {
						pointer-events: none;
					}

					&:hover {
						color: var(--error-color);
					}
				}

				.todo-title {
					position: relative;

					place-self: center start;
					font-size: 2rem;
					font-weight: 400;
					text-align: left;

					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					color: var(--text-color-1);

					max-width: 100%;

					transition-duration: inherit;
					user-select: none;

					&::first-letter {
						text-transform: capitalize;
					}

					&::after {
						content: '';

						position: absolute;
						height: 1px;

						width: 0px;
						padding: 0px;

						top: 0.7em;
						left: -0.25rem;

						background-color: var(--text-color-2);
						transition-duration: inherit;
					}
				}

				&.done {
					.checkbox {
						background-color: var(--label-color);

						.icon {
							opacity: 1;
						}
					}

					.todo-title {
						color: var(--disabled-color);

						&::after {
							width: 100%;
							padding: 0 0.5rem;
						}
					}
				}
			}
		}
	}

	@media screen and (max-width: 468px) {
		#todos-section {
			.todos-list {
				grid-template-columns: 1fr;
			}
		}
	}
</style>
