<script lang="ts">
	import type { CheckSerialNumber, ReadDeviceSchema } from '$lib/schemas/device.schema';
	import { onMount } from 'svelte';
	import Device from '$lib/components/device/device.svelte';
	import DeviceForm from '$lib/components/device/deviceForm.svelte';
	import Loading from '$lib/components/utils/loading.svelte';

	export let searchResult: CheckSerialNumber;
	let editor = false;

	let device: ReadDeviceSchema;
	let promise: Promise<void | Response>;

	onMount(loadData);

	function loadData() {
		promise = fetch(`/api/device/${searchResult.Id}`)
			.then((res) => res.json())
			.then((data) => {
				device = data;
			});
	}
</script>

<div class="flex flex-col rounded-md bg-dark-color-lighter p-4">
	{#if editor}
		<DeviceForm
			data={searchResult}
			formData={device}
			on:goBack={() => {
				editor = false;
				loadData();
			}}
		/>
	{:else}
		{#await promise}
			<Loading />
		{:then data}
			{#if device != undefined && device != null}
				<Device {device} />
				<button
					on:click={() => {
						editor = true;
					}}>Edit</button
				>
			{/if}
		{/await}
	{/if}
</div>
