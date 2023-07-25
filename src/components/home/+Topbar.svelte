<script lang="ts">
	import { active } from '$lib/stores/sidebar';

	function toggle() {
		$active = !$active;
	}
</script>

<header id="topbar">
	<button class="sidebar-toggler" on:click={toggle}>
		<span class="decorator" />
		<span class="decorator" />
	</button>

	<div class="search-section">
		<input type="text" class="search-input" id="main-search-input" />
		<label class="icon search" for="main-search-input"
			><iconify-icon icon="solar:minimalistic-magnifer-broken" />
		</label>
	</div>
	<button class="icon bell"><iconify-icon icon="solar:bell-broken" /></button>
</header>

<style lang="scss">
	$toggler-height: 4rem;

	$topbar-height: var(--topbar-height);

	#topbar {
		$margin: calc(($topbar-height - $toggler-height) / 2);

		height: $topbar-height;
		width: 100%;

		display: grid;

		grid-template-columns: min-content auto min-content;

		border: 2px solid transparent;
		border-width: 0px 0px 2px 0px;

		transition-duration: var(--std-transition-time);

		&:has(.search-input:focus) {
			border-color: var(--primary-color);
		}

		.sidebar-toggler {
			align-self: center;
			display: flex;

			justify-content: center;
			align-content: space-around;
			flex-wrap: wrap;

			margin-left: $margin;

			height: $toggler-height;
			width: 4rem;

			border: none;
			outline: none;

			background-color: transparent;
			cursor: pointer;

			.decorator {
				display: block;

				height: 3px;
				border-radius: 1rem;
				width: 100%;

				background-color: var(--primary-color);
			}
		}

		.icon {
			display: flex;
			align-items: center;
			border: none;
			outline: none;

			background-color: transparent;
			font-size: 3.5rem;

			width: min-content;
			height: 100%;

			color: var(--primary-color);

			&.bell {
				margin-right: $margin;
			}

			&.search {
				margin-right: 3rem;
			}
		}

		.search-section {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.search-input {
				height: var(--std-height);
				width: 100%;

				border: none;
				outline: none;
				font-size: 2rem;

				background-color: transparent;
				color: var(--text-color-1);

				margin: 0 4rem;

				// TODO:
				// opacity: 0;
			}
		}
	}

	@media (min-width: 1000px) {
		#topbar {
			.sidebar-toggler {
				opacity: 0;
				pointer-events: none;
			}
		}
	}
</style>
