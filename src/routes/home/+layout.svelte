<script lang="ts">
	import { active } from '$lib/stores/sidebar';

	import Sidebar from '$components/home/+Sidebar.svelte';
	import Topbar from '$components/home/+Topbar.svelte';
</script>

<div id="home-layout">
	<Sidebar />
	<Topbar />
	<slot />
</div>

<style lang="scss">
</style>
