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

<div class="w-fit grid grid-cols-1 gap-5 xl:gap-10 md:grid-cols-2 lg:grid-cols-3">
    {#key unique}
        <Tab name="InQueue" on:reloadData={reloadData}/>
        <Tab name="InProgress" on:reloadData={reloadData}/>
        <Tab name="Done" on:reloadData={reloadData}/>
    {/key}
</div>