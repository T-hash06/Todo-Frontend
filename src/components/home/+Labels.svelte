<script lang="ts">
	import { todosStore } from '$lib/stores/todos';

	let labels: Record<string, { total: number; done: number }> = {};

	$: {
		const categories: typeof labels = {};

		for (const todo of $todosStore) {
			if (categories[todo.label] === undefined) {
				categories[todo.label] = { total: 1, done: todo.done ? 1 : 0 };
			} else {
				categories[todo.label].total++;
				categories[todo.label].done += todo.done ? 1 : 0;
			}
		}

		labels = { ...categories };
	}
</script>

<section class="labels-section">
	<h3 class="section-title">your workspaces</h3>

	<ul class="list-container section-content">
		{#each Object.entries(labels) as [name, { total, done }]}
			{@const pendants = total - done}
			{@const percentage = (done / total) * 100}

			<li>
				<button class="label-container" class:complete={pendants === 0}>
					<iconify-icon icon="solar:medal-star-circle-bold" class="medal-icon" />
					<span class="todos-count">{pendants} pendants</span>
					<h4 class="label-title">{name}</h4>
					<div class="progress-bar" style="--progress: {percentage}%" />
				</button>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	.labels-section {
		margin-top: 4rem;

		width: 100%;
		overflow: hidden;

		.list-container {
			display: flex;

			overflow-y: hidden;
			overflow-x: auto;

			list-style: none;

			padding: 1rem 1rem 2rem 0;
			margin-top: 4rem;

			-ms-overflow-style: none;
			scrollbar-width: none;

			&::-webkit-scrollbar {
				display: none;
			}

			.label-container {
				position: relative;

				display: grid;
				grid-template-rows: repeat(2, min-content);

				width: 18rem;
				height: 12rem;

				backdrop-filter: contrast(80%);
				background-color: transparent;
				box-shadow: 5px 5px 10px var(--shadow-color-1);

				border: none;
				border-radius: 1.5rem;
				cursor: pointer;

				gap: 1rem;
				padding: 1.5rem;

				transition-duration: var(--std-transition-time);

				.todos-count {
					color: var(--disabled-color);
					text-transform: capitalize;
					text-align: left;
				}

				.label-title {
					font-size: 2.3rem;
					font-weight: 400;
					text-transform: capitalize;

					text-align: left;
					letter-spacing: 0.5px;

					color: var(--text-color-1);
				}

				.progress-bar {
					position: relative;
					transition-duration: inherit;

					background-color: var(--disabled-color);
					width: 100%;
					height: 5px;

					height: 4px;
					border-radius: 2px;
					overflow: hidden;

					align-self: center;

					&::before {
						content: '';
						position: absolute;
						left: 0;

						transition-duration: inherit;

						width: var(--progress);
						height: 100%;

						border-radius: inherit;
						background-color: var(--primary-color);
					}
				}

				.medal-icon {
					position: absolute;
					right: 1rem;
					top: 1rem;

					font-size: 4rem;
					color: var(--primary-color);

					opacity: 0;
					transition-duration: inherit;
				}

				&.complete {
					.medal-icon {
						opacity: 1;
						animation: spawn 0.3s backwards;
					}
				}
			}
		}
	}

	@keyframes spawn {
		0% {
			opacity: 0;
			transform: rotate(-540deg) scale(2);
		}

		100% {
			opacity: 1;
			transform: rotate(0) scale(1);
		}
	}
</style>
