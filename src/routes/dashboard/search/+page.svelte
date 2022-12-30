<script lang="ts">
    import type { CheckSerialNumber } from '$lib/schemas/device.schema';
    import VirtualList from '$lib/components/virtualList.svelte';
    import SearchResult from '$lib/components/searchResult.svelte';
	import Loading from '$lib/components/loading.svelte';

    let result: CheckSerialNumber[];
    let query: string;

    let promise: Promise<void|Response>;

    function fetchQuery(){
        if(query != undefined && query != null && query != ''){
            const url = `/api/search?q=${query}`;
            promise = fetch(url).then((res) => res.json()).then((data) => {
                result = data;
                console.log(result);
            }).catch((e) => console.log(e));
        }
    }
</script>

<div class="flex flex-col w-full py-12 max-w-xl p-5">
    <input placeholder="type to search" bind:value={query} on:keyup={fetchQuery}/>

    {#if result != undefined}
        {#await promise}
            <Loading/>
        {:then data} 
            <VirtualList items={result} let:item>
                <SearchResult searchResult={item}/>
            </VirtualList>
        {/await} 
    {/if}
</div>