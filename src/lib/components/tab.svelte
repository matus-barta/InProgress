<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
    import Loading from '$lib/components/loading.svelte';
    import Device from '$lib/components/device.svelte'
    export let name: string;

    const dispatch = createEventDispatcher();
    const reloadData = () => dispatch('reloadData');

    let idsList: number[];
    let promise: Promise<void | Response>;

    onMount(()=>{loadData()});

    function loadData(){
        promise = fetch(`/api/status/${name}`).then((res)=> res.json()).then((data)=>{
            idsList = data;
        }); 
    }
</script>

<div class="flex flex-col h-fit bg-dark-color-lighter px-2 rounded-lg shadow-lg w-80 xl:w-96">
    <p class="text-lg font-semibold tracking-tight text-accent-2-color-lighter p-0 pt-1 m-0 mb-3 border-b border-accent-color">{name}</p>
    {#await promise}
    <Loading/>
    {:then data}
        {#if idsList != undefined && idsList != null}
            {#each idsList as id_num}
                <Device id={id_num} on:reloadData={reloadData}/>
            {/each} 
        {/if}
    {/await}
</div>