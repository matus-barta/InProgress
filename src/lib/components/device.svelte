<script lang="ts">
	import type { ReadDeviceSchema } from "$lib/schemas/device.schema";
    import Loading from '$lib/components/loading.svelte';
    import Time from '$lib/components/time.svelte'
	import { createEventDispatcher, onMount } from "svelte";
    import { options } from '$lib/options';

    const dispatch = createEventDispatcher();
    const reloadData = () => dispatch('reloadData');

    export let id: number = 0;
    export let device: ReadDeviceSchema = {
                Id: 0,
                SerialNumber: '',
                Status: 'InQueue',
                CreatedAt: new Date(),
                UpdatedAt: new Date(),
                User: '',
                Note: '',
                Company: '',
                Task: ''
            };

    let promise: Promise<void | Response>;
    const isSearchResult = id==0;
    
    onMount(()=>{
        if(!isSearchResult){
            promise = fetch(`/api/device/${id}`).then((res)=> res.json()).then((data)=>{
                device = data;
            }); 
        }
    });

    function statusChanged(){
        try{
            promise = fetch(`/api/device`,{
                method: 'POST',
                body: JSON.stringify(device)
                }).then((res) => {
                    console.log(res.statusText);
                    reloadData();
                });
        }catch(e){
            console.log(e);
        }
    }
</script>

<style>
    p{
        @apply font-light;
    }
    select{
        @apply bg-transparent w-fit rounded-md p-1 pr-2 text-xs text-dark-color-2-even-more-lighter outline-none h-fit m-0 border-none;
    }
    .time{
        @apply text-xs text-white pr-2 pl-1 mt-2 rounded-md max-w-fit;
    }
</style>

<div class="flex flex-col bg-dark-color-more-lighter rounded-xl mb-4 py-2 px-2 shadow-lg">
    {#await promise}
        <Loading/>
    {:then data}
        {#if device != undefined && device != null}
            <div class="flex flex-row justify-between items-center">
                <p class="text-accent-color tracking-tighter pl-1 text-lg">{device.SerialNumber}</p>
                {#if !isSearchResult}
                    <select class="hover:bg-dark-color-lighter" bind:value={device.Status} on:change={statusChanged}>
                        {#each options as option}
                            <option value={option}>
                                {option}
                            </option>
                        {/each}
                    </select>
                {/if}
            </div>
            <p class="text-sm pl-1">{device.User}</p>
            <p class="text-sm pl-1">{device.Company}</p>
            <p class="text-sm pl-1">{device.Task}</p>
            <div class="text-xs font-mono tracking-normal rounded border border-dark-color-even-more-lighter w-full p-1 mt-1 h-20 overflow-y-scroll">{device.Note}</div>
            <div class="flex flex-row gap-2">
                <div class="time bg-green-600">
                    <Time time={device.CreatedAt}/>
                </div>
                <div class="time bg-yellow-600">
                    <Time time={device.UpdatedAt}/>
                </div>
            </div>
        {/if}
    {/await}
</div>