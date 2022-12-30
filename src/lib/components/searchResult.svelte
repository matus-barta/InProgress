<script lang="ts">
	import type { CheckSerialNumber, ReadDeviceSchema } from "$lib/schemas/device.schema";
	import { onMount } from "svelte";
	import DeviceForm from "./deviceForm.svelte";
    import Loading from "./loading.svelte";

    export let searchResult: CheckSerialNumber;
    let editor = false;

    let device: ReadDeviceSchema;
    let promise: Promise<void | Response>;

    onMount(loadData);

    function loadData(){
        promise = fetch(`/api/device/${searchResult.Id}`).then((res)=> res.json()).then((data)=>{
            device = data;
        }); 
    }
</script>

<div class="flex flex-col rounded-md bg-dark-color-lighter p-4">
    {#if editor}
        <DeviceForm data={searchResult} formData={device} on:goBack={() => {
            editor = false;
            loadData();
        }}/>
    {:else}
        {#await promise}
            <Loading/>
        {:then data}
            {#if device != undefined && device != null}
                <p class="text-sm pl-1">{device.SerialNumber}</p>
                <p class="text-sm pl-1">{device.Status}</p>
                <p class="text-sm pl-1">{device.User}</p>
                <p class="text-sm pl-1">{device.Company}</p>
                <p class="text-sm pl-1">{device.Task}</p>
                <div class="text-xs font-mono tracking-normal rounded border border-dark-color-even-more-lighter w-full p-1 mt-1 h-10 overflow-y-scroll">{device.Note}</div>
                <button on:click={() => { editor = true; }}>Edit</button>
            {/if}
        {/await}
    {/if}
</div>