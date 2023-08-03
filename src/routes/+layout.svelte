<script lang="ts">
	import '../global.css';
	import 'iconify-icon';

	import Toast from '$components/+Toast.svelte';

	import { HttpRequest } from '$lib/util/http';

	import { onMount } from 'svelte';
	import { showToast } from '$lib/stores/toast';

	onMount(() => {
		const request = new HttpRequest();

		request.setResource('ping');

		request.addResponse(null, () => {
			showToast('warning', 'Server is starting', 'Server is starting, please wait a few seconds');
		});

		request.addResponse(200, () => null);

		request.execute();
	});
</script>

<Toast />
<slot />
