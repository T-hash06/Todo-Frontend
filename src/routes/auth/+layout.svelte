<script lang="ts">
	export let data;
</script>

<div id="auth-layout" class="page-container">
	<div class="titles-container">
		<h1 class="title">{data.title}</h1>
		<h2 class="sub-title">{data.sub}</h2>
	</div>
	<div class="slot-container">
		<slot />
	</div>
</div>

<style lang="scss">
	$padding: 4rem;

	#auth-layout {
		padding: $padding;
		display: grid;

		grid-auto-rows: min-content;

		gap: 8rem;

		.titles-container {
			justify-self: left;
			align-self: center;

			display: flex;
			flex-wrap: wrap;

			width: 100%;

			gap: 1rem;

			margin-top: 4rem;
			.title {
				font-size: 6rem;
				font-weight: 500;

				width: 100%;
				color: var(--primary-color);
				text-align: center;
			}

			.sub-title {
				font-size: 2rem;
				font-weight: 100;

				width: 100%;
				color: var(--text-color);
				text-align: center;
			}
		}

		:global(.form) {
			width: 100%;
			height: 100%;

			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			gap: 8rem;

			:global(.section) {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				gap: 3rem;
			}
		}
	}
</style>
