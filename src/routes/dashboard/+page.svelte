<svelte:head>
    <title>InProgress - Dashboard</title>
</svelte:head>

<script lang="ts">
    import Tab from "$lib/components/tab.svelte"

    let unique = {};

    function reloadData(){
        unique = {};
    }
</script>

<div class="w-full flex flex-col gap-5 md:gap-0 md:flex-row justify-evenly m-3">
    {#key unique}
        <Tab name="InQueue" on:reloadData={reloadData}/>
        <Tab name="InProgress" on:reloadData={reloadData}/>
        <Tab name="Done" on:reloadData={reloadData}/>
    {/key}
</div>