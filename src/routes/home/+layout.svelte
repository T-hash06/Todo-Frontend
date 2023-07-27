<script lang="ts">
	import { createSessionStore } from '$lib/stores/session';

	import Sidebar from '$components/home/+Sidebar.svelte';
	import Topbar from '$components/home/+Topbar.svelte';

	export let data;

	createSessionStore(data.session);
</script>

<div id="home-layout">
	<Sidebar />
	<Topbar />
	<div class="slot-container">
		<slot />
	</div>
</div>

<style lang="scss">
	#home-layout {
		--topbar-height: 10rem;
		--sidebar-width: 52rem;

		--home-margin-left: 3rem;

		display: grid;
		grid-template-rows: var(--topbar-height) auto;

		height: 100%;

		overflow: hidden;

		.slot-container {
			width: 100%;
			height: 100%;

			overflow-y: hidden;
			overflow: auto;

			display: flex;

			justify-content: center;
		}
	}

	@media (min-width: 1000px) {
		#home-layout {
			grid-template-columns: var(--sidebar-width) auto;
		}
	}
</style>
