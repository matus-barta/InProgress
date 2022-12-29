<script lang="ts">
	import type { ReadDeviceSchema } from "$lib/schemas/device.schema";
    import Time from '$lib/components/time.svelte'
	import { onMount } from "svelte";

    export let id:number;

    let device: ReadDeviceSchema;
    let promise: Promise<void | Response>;

    onMount(()=>{
        promise = fetch(`/api/device/${id}`).then((res)=> res.json()).then((data)=>{
            device = data;
        }); 
    });
</script>

<style>
    p{
        @apply font-light;
    }
</style>

<div class="flex flex-col bg-dark-color-more-lighter hover:bg-dark-color-even-more-lighter rounded-xl mx-1 mb-4 py-2 px-2 shadow-lg">
    {#await promise}
        <h2>please wait..</h2>
    {:then data}
        {#if device != undefined || device != null}
            <p class="text-accent-color text-base">{device.SerialNumber}</p>
            <p class="text-sm">{device.User}</p>
            <div class="text-sm rounded bg-accent-2-color-lighter w-full p-1 h-20">{device.Note}</div>
            <div class="flex flex-row gap-2">
                <div class="pr-2 pl-1 mt-2  rounded-md max-w-fit bg-green-600 text-xs text-white">
                    <Time time={device.CreatedAt}/>
                </div>
                <div class="pr-2 pl-1 mt-2  rounded-md max-w-fit bg-yellow-500 text-xs text-white">
                    <Time time={device.UpdatedAt}/>
                </div>
            </div>
        {/if}
    {/await}
</div>