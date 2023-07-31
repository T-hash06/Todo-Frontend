<script lang="ts">
	import Button from '$components/+Button.svelte';
</script>

<div class="page-container" id="error-page">
	<div class="wrapper">
		<h1 class="title">404</h1>
		<h2 class="sub-title">Page not found</h2>
		<h3 class="explain">Oops! We couldn't find what you were looking for.</h3>
		<Button class="button" href="/home">Go back to home</Button>
	</div>
</div>

<style lang="scss">
	#error-page {
		display: flex;
		justify-content: center;
		align-items: center;

		.wrapper {
			display: grid;
			grid-template-rows: repeat(4, auto);

			justify-content: center;

			width: fit-content;

			.title {
				display: flex;
				justify-content: center;

				font-size: 16rem;
				font-weight: 600;
				text-align: center;
				letter-spacing: 0.8px;
				font-family: Arial, Helvetica, sans-serif;

				color: var(--primary-color);
			}

			.sub-title {
				font-size: 4rem;
				font-weight: 400;

				text-align: center;
				letter-spacing: 0.4px;
				word-spacing: 2px;

				margin-top: 4rem;

				color: var(--primary-color);
			}

			.explain {
				font-size: 2rem;
				font-weight: 500;
				text-align: center;
				margin-top: 2rem;

				color: var(--text-color-1);
				font-weight: 100;
			}

			:global(.button) {
				margin-top: 6rem;
				width: 220px;

				justify-self: center;
			}
		}
	}
</style>
