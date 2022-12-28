<script lang="ts">
	import type { ReadDeviceSchema } from "$lib/schemas/device.schema";
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
        @apply font-light text-sm;
    }
    .small{
        @apply text-xs text-zinc-400;
    }
</style>

<div class="flex flex-col bg-dark-color-more-lighter rounded-xl mx-1 mb-4 py-2 px-2 shadow-lg">
    {#await promise}
        <h2>please wait..</h2>
    {:then data}
        {#if device != undefined || device != null}
            <p class="text-accent-color">{device.SerialNumber}</p>
            <p>{device.User}</p>
            <p>{device.Note}</p>
            <p class="small">{device.CreatedAt}</p>
            <p class="small">{device.UpdatedAt}</p>
        {/if}
    {/await}
</div>