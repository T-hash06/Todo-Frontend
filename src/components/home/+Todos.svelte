<script lang="ts">
	import { toggleTodoCompleted } from '$lib/stores/todos';
	import type { Todo } from '$lib/util/http';

	export let todos: Todo[];
</script>

<section id="todos-section">
	<h3 class="section-title">today's tasks</h3>

	<ul class="todos-list section-content">
		{#each todos as todo}
			<li>
				<button
					class="todo-item"
					class:done={todo.done}
					on:click={() => toggleTodoCompleted(todo.id)}
				>
					<span class="checkbox">
						<iconify-icon icon="pajamas:check" class="icon" />
					</span>
					<h4 class="todo-title">{todo.title}</h4>
				</button>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	#todos-section {
		margin-top: 3rem;
		width: 100%;

		.todos-list {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(42rem, 1fr));

			list-style: none;

			margin-top: 4rem;
			padding-bottom: 12rem;

			.todo-item {
				$todo-height: 8rem;

				display: grid;
				grid-template-columns: $todo-height auto;

				border-radius: 1rem;

				backdrop-filter: contrast(80%);
				background-color: transparent;

				height: $todo-height;
				width: 100%;
				border: none;

				transition-duration: var(--std-transition-time);

				cursor: pointer;

				.checkbox {
					place-self: center;

					display: flex;
					justify-content: center;
					align-items: center;

					border-radius: 50%;
					border: 2px solid var(--primary-color);

					width: 3.5rem;
					aspect-ratio: 1/1;

					transition-duration: inherit;

					font-size: 3rem;

					.icon {
						color: var(--secondary-color);
						transition-duration: inherit;
						opacity: 0;
					}
				}

				.todo-title {
					position: relative;

					place-self: center start;
					font-size: 2rem;
					font-weight: 400;

					color: var(--text-color-1);

					transition-duration: inherit;

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
						background-color: var(--primary-color);

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
