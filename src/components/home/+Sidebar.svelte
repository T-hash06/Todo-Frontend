<script lang="ts">
	import { active } from '$lib/stores/sidebar';
</script>

<aside id="sidebar" class:active={$active}>
	<h1>todo</h1>
</aside>

<style lang="scss">
	#sidebar {
		position: fixed;
		top: 0;
		left: -100svw;

		width: 100svw;
		height: 100svh;

		backdrop-filter: blur(1rem);

		transition-duration: calc(var(--std-transition-time) * 2);

		&.active {
			left: 0;
		}
	}
</style>
