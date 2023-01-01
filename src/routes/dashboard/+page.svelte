<svelte:head>
    <title>InProgress - Dashboard</title>
</svelte:head>

<script lang="ts">
    import Tab from "$lib/components/tab.svelte"
    import { options } from "$lib/options";

    let unique = {};

    function reloadData(){
        unique = {};
    }
</script>

<div class="w-fit grid grid-cols-1 gap-5 xl:gap-10 md:grid-cols-2 lg:grid-cols-3">
    {#key unique}
        {#each options as option}
            <Tab name={option} on:reloadData={reloadData}/>
        {/each}
    {/key}
</div>