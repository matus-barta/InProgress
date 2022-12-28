<svelte:head>
    <title>InProgress - Scanner</title>
</svelte:head>

<script lang="ts">
    export const ssr = true; 
    import Scanner from '$lib/components/scanner.svelte';
    import DeviceForm from '$lib/components/deviceForm.svelte';
    import type { CheckSerialNumber } from '$lib/schemas/device.schema';

    let serialNumber: string;
    let promise: Promise<void | Response>;
    let resData: CheckSerialNumber;

    function handleSubmit() {
	    promise = fetch(`/api/serialnumber/${serialNumber}`).then((res) => res.json()).then((data) => {
            resData = data;
        });
	}
</script>

{#if promise==null}
    <Scanner bind:serialNumber={serialNumber} on:submit={handleSubmit}/>
{:else}
    {#await promise}
        <h2>please wait...</h2>
    {:then data} 
        <DeviceForm data={resData}/>
    {/await}
{/if}

