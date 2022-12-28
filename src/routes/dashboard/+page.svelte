<svelte:head>
    <title>InProgress - Dashboard</title>
</svelte:head>

<script lang="ts">
    import Tab from "$lib/components/tab.svelte"
</script>

<div class="w-full flex flex-col gap-5 md:gap-0 md:flex-row justify-evenly m-3">
    <Tab name="InQueue"/>
    <Tab name="InProgress"/>
    <Tab name="Done"/>
</div>