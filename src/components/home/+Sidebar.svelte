<script lang="ts">
	import { deleteSessionStore, sessionStore } from '$lib/stores/session';
	import { active } from '$lib/stores/sidebar';
	import { page } from '$app/stores';

	import cookies from 'js-cookie';

	function toggle() {
		$active = !$active;
	}

	function checkActive(path: string) {
		return $page.url.pathname === path;
	}

	function logout() {
		cookies.remove('session-token');
		deleteSessionStore();
	}
</script>

<aside id="sidebar" class:active={$active}>
	<div class="head-container">
		<div class="image-container">
			<span class="default-profile">
				<iconify-icon icon="solar:bolt-outline" />
			</span>
		</div>
		<button class="sidebar-toggler" on:click={toggle} aria-label="sidebar toggler">
			<iconify-icon icon="solar:double-alt-arrow-left-line-duotone" />
		</button>
	</div>

	<h2 class="title">{$sessionStore.name}</h2>

	<ul class="links-container">
		<li>
			<a class="link" href="/home" class:active={checkActive('/home')}>
				<span class="icon"><iconify-icon icon="solar:home-smile-bold" /></span>
				<span class="text">Home</span>
			</a>
		</li>
		<li>
			<a class="link" href="/home" class:active={checkActive('/calendar')}>
				<span class="icon"><iconify-icon icon="solar:calendar-bold" /></span>
				<span class="text">Calendar</span>
			</a>
		</li>
		<li>
			<a class="link" href="/home" class:active={checkActive('/analytics')}>
				<span class="icon"><iconify-icon icon="solar:pie-chart-2-bold" /></span>
				<span class="text">Analytics</span>
			</a>
		</li>
		<li>
			<a class="link" href="/home" class:active={checkActive('/settings')}>
				<span class="icon"><iconify-icon icon="solar:settings-bold" /></span>
				<span class="text">Settings</span>
			</a>
		</li>
		<li>
			<a class="link" href="/auth/login" on:click={logout}>
				<span class="icon"><iconify-icon icon="solar:logout-2-bold" /></span>
				<span class="text">Logout</span>
			</a>
		</li>
	</ul>
</aside>

<style lang="scss">
	$margin-left: 6rem;

	$link-height: 6rem;
	$sidebar-width: var(--sidebar-width);

	#sidebar {
		--spacing: clamp(4rem, 10vw, 7rem);

		display: grid;
		grid-template-rows: min-content min-content auto;

		position: fixed;
		top: 0;
		left: calc(-1 * min(100vw, $sidebar-width));

		width: 100svw;
		height: 100svh;

		max-width: $sidebar-width;

		background-color: var(--background-1);
		transition-duration: calc(var(--std-transition-time) * 2);

		box-shadow: none;
		z-index: 2;

		&.active {
			left: 0;
			box-shadow: 0px 0px 10px var(--shadow-color-1);
		}

		.head-container {
			display: grid;
			grid-template-columns: 2fr 1fr;

			.image-container {
				display: flex;

				justify-self: left;
				align-self: center;

				justify-content: center;
				align-items: center;

				height: 16rem;
				aspect-ratio: 1/1;

				border-radius: 50%;
				border: 4px solid var(--primary-color);
				margin-left: $margin-left;
				margin-top: calc(var(--spacing) * 1.5);

				overflow: hidden;

				.default-profile {
					display: flex;
					justify-content: center;
					align-items: center;

					width: 50%;
					height: 50%;

					font-size: 8rem;
					color: var(--primary-color);
				}
			}

			.sidebar-toggler {
				display: flex;
				justify-content: center;
				align-items: center;

				margin-top: calc(var(--spacing) * 2);

				width: 5rem;
				aspect-ratio: 1/1;
				overflow: hidden;

				border-radius: 50%;
				background-color: transparent;

				color: var(--primary-color);
				border: 2px solid var(--primary-color);
				font-size: 3.5rem;

				cursor: pointer;
			}
		}

		.title {
			color: var(--text-color-1);
			font-size: 5rem;

			width: 60%;

			margin-left: $margin-left;
			letter-spacing: 2px;

			margin-top: var(--spacing);
		}

		.links-container {
			display: flex;
			flex-direction: column;

			margin-left: $margin-left;
			margin-top: var(--spacing);
			list-style: none;

			gap: 2rem;

			.link {
				display: grid;
				grid-template-columns: $link-height + 1rem auto;
				height: $link-height;
				width: calc(100% - $margin-left);

				font-size: 2.5rem;
				font-weight: 100;
				text-decoration: none;

				border-radius: 1rem;
				transition-duration: var(--std-transition-time);

				color: var(--text-color-2);

				.icon {
					display: flex;
					align-items: center;

					font-size: 3.5rem;
					color: var(--disabled-color);

					transition-duration: inherit;
				}

				.text {
					text-decoration: none;
					align-self: center;

					letter-spacing: 0.6px;
				}

				&.active {
					color: var(--primary-color);
					font-weight: 400;

					.icon {
						color: var(--primary-color);
					}
				}
			}
		}
	}

	@media (min-width: 1000px) {
		#sidebar {
			position: initial;
			grid-row: 1/3;

			box-shadow: 0px 0px 10px var(--shadow-color-1);

			.head-container .sidebar-toggler {
				display: none;
			}

			.links-container .link {
				&:hover {
					color: var(--primary-color);

					.icon {
						color: var(--primary-color);
					}
				}

				.text {
					letter-spacing: 1px;
					font-size: 2.3rem;
				}
			}
		}
	}
</style>
