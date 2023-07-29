<script lang="ts">
	export let data;
</script>

<div id="auth-layout" class="page-container">
	<div class="flex-wrapper">
		<div class="titles-container">
			<h1 class="title">{data.title}</h1>
			<h2 class="sub-title">{data.sub}</h2>
		</div>
		<div class="slot-container">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	$padding: 4rem;

	#auth-layout {
		display: flex;
		justify-content: center;

		overflow: auto;

		.flex-wrapper {
			padding: $padding;
			display: grid;

			grid-auto-rows: min-content;

			width: 100%;
			max-width: 480px;

			gap: 8rem;
		}

		.titles-container {
			justify-self: left;
			align-self: center;

			display: flex;
			flex-wrap: wrap;

			width: 100%;

			gap: 1rem;

			margin-top: 2rem;
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
				color: var(--text-color-1);
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

				gap: 4rem;
			}
		}
	}

	@media screen and (min-width: 580px) {
		#auth-layout {
			display: grid;
			place-items: center;

			.flex-wrapper {
				height: min-content;
				margin: 8rem 0;

				min-width: 480px;

				box-shadow: 0px 0px 1.5rem var(--shadow-color-1);
				background-color: var(--background-1);

				border-radius: 2rem;
			}
		}
	}
</style>
