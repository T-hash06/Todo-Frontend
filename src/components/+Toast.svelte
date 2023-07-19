<script lang="ts">
	import { toastStore, hideToast } from '$lib/stores/toast';

	let icon = 'solar:check-square-bold';

	$: {
		switch ($toastStore.status) {
			case 'success':
				icon = 'solar:check-square-bold';
				break;
			case 'warning':
				icon = 'solar:info-square-bold';
				break;
			case 'error':
				icon = 'solar:close-square-bold';
				break;
		}
	}
</script>

<div id="toast-container" class:active={$toastStore.active} class={$toastStore.status}>
	<button class="wrapper" on:click={hideToast}>
		<span class="icon">
			<iconify-icon {icon} />
		</span>
		<h2 class="title">{$toastStore.title}</h2>
		<p class="text">{$toastStore.message}</p>
	</button>
</div>

<style lang="scss">
	$margin-top: 8rem;
	$height: 90px;
	$text-indent: 1rem;

	#toast-container {
		position: fixed;
		display: flex;

		justify-content: center;

		width: 100%;
		height: $height;
		background-color: transparent;

		pointer-events: none;

		top: calc($margin-top / 2);

		transition-duration: var(--std-transition-time);

		& > * {
			pointer-events: auto;
		}

		&.success {
			--status-color: var(--success-color);
		}
		&.warning {
			--status-color: var(--warning-color);
		}
		&.error {
			--status-color: var(--error-color);
		}

		.wrapper {
			position: absolute;
			display: grid;

			grid-template-columns: 8rem 1fr;
			grid-template-rows: 6rem auto;

			backdrop-filter: blur(1rem);
			background-color: rgba(65, 65, 65, 0.5);

			box-shadow: 0px 10px 10px var(--shadow-color-1);

			width: calc(100% - $margin-top);
			max-width: 460px;
			min-height: $height;
			height: auto;

			top: calc(-100% - $margin-top);
			border: none;
			outline: none;

			border-radius: 1rem;

			transition-duration: calc(var(--std-transition-time) * 2);

			overflow: hidden;
			opacity: 0;

			cursor: pointer;

			.icon {
				position: relative;
				grid-row: 1/3;
				height: 100%;
				width: 100%;

				display: flex;
				justify-content: center;
				align-items: center;

				font-size: 5rem;

				color: var(--status-color);

				transition-duration: var(--std-transition-time);
			}

			.title {
				align-self: flex-end;
				text-align: left;

				margin-left: $text-indent;
				margin-bottom: 0.5rem;
				font-size: 2.7rem;

				color: var(--status-color);
				font-weight: 500;
				letter-spacing: 0.5px;
			}

			.text {
				align-self: flex-start;
				text-align: left;

				margin-left: $text-indent;
				margin-bottom: 2rem;
				font-size: 2rem;

				color: var(--text-color-2);

				user-select: none;
			}
		}

		&.active {
			.wrapper {
				top: 0%;
				opacity: 1;

				&:active {
					transition-duration: 100ms;
					box-shadow: 0px 0px 2px var(--shadow-color-1);
					transform: scale(0.97);
				}
			}
		}
	}
</style>
