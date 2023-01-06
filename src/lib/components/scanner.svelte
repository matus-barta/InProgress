<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let serialNumber = '';
	const dispatch = createEventDispatcher();
	const submit = () => dispatch('submit');

	let scanning = false;

	let html5Qrcode: Html5Qrcode;

	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}

	function start() {
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 350, height: 80 },
				aspectRatio: 1.0
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	}

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
	}

	function onScanSuccess(decodedText: string, decodedResult: any) {
		console.log(decodedResult);
		serialNumber = decodedText;
		stop();
		submit();
	}

	function onScanFailure(error: any) {
		//console.warn(`Code scan error = ${error}`)
	}
</script>

<div class="flex flex-col w-full items-center gap-5">
	<reader id="reader" class="w-full max-w-xl bg-black" />
	{#if scanning}
		<button class="max-w-sm" on:click={stop}>stop</button>
	{:else}
		<button class="max-w-sm" on:click={start}>start</button>
	{/if}
</div>
