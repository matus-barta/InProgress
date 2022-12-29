<script lang="ts">
	import { onMount } from "svelte";
    import Device from '$lib/components/device.svelte'
    export let name:string;

    let idsList: number[];
    let promise: Promise<void | Response>;

    onMount(()=>{
        promise = fetch(`/api/status/${name}`).then((res)=> res.json()).then((data)=>{
            idsList = data;
        }); 
    });
</script>

<div class="flex flex-col h-fit bg-dark-color-lighter px-2 rounded-lg shadow-lg w-80 md:w-52 lg:w-80 xl:w-96">
    <p class="text-lg font-normal text-accent-2-color-lighter p-0 py-1 m-0">{name}</p>
    {#await promise}
        <h2>please wait..</h2>
    {:then data}
        {#if idsList != undefined || idsList != null}
            {#each idsList as id_num}
                <Device id={id_num}/>
            {/each} 
        {/if}
    {/await}
</div>