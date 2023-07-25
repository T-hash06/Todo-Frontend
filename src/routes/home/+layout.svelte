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
	<slot />
</div>

<style lang="scss">
</style>
