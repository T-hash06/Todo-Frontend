<script lang="ts">
	import Todos from '$components/home/+Todos.svelte';
	import { todosStore } from '$lib/stores/todos.js';

	export let data;

	const name = data.session.name.split(' ').at(0);
	todosStore.set(data.todos);
</script>

<div id="home-page" class="page-container">
	<h2 class="greeting">{data.prefix}, {name}!</h2>

	<Todos todos={$todosStore} />
</div>

<style lang="scss">
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
	}
</style>
