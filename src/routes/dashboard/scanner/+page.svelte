<svelte:head>
    <title>InProgress - Scanner</title>
</svelte:head>

<script lang="ts">
    import Scanner from '$lib/components/scanner.svelte';
    import DeviceForm from '$lib/components/deviceForm.svelte';
    import type { CheckSerialNumber } from '$lib/schemas/device.schema';
    import Loading from '$lib/components/loading.svelte';

    let serialNumber: string;
    let promise: Promise<void | Response>;
    let resData: CheckSerialNumber;

    let showScanner = true;

    function handleSubmit() {
	    promise = fetch(`/api/serialnumber/${serialNumber}`).then((res) => res.json()).then((data) => {
            resData = data;
        });
        showScanner = false;
	}
    function goBack(){
        showScanner = true;
    }
</script>

{#if showScanner}
    <Scanner bind:serialNumber={serialNumber} on:submit={handleSubmit}/>
{:else}
    {#await promise}
        <Loading/>
    {:then data} 
        <DeviceForm data={resData} on:goBack={goBack}/>
    {/await}
{/if}

