<script lang="ts">
	import type { CheckSerialNumber } from '$lib/schemas/device.schema';
	import VirtualList from '$lib/components/utils/virtualList.svelte';
	import SearchResult from '$lib/components/searchResult.svelte';
	import Loading from '$lib/components/utils/loading.svelte';

	let result: CheckSerialNumber[];
	let query: string;

	let promise: Promise<void | Response>;

	function fetchQuery() {
		if (query != undefined && query != null && query != '') {
			const url = `/api/search?q=${query}`;
			promise = fetch(url)
				.then((res) => res.json())
				.then((data) => {
					result = data;
					console.log(result);
				})
				.catch((e) => console.log(e));
		}
	}
</script>

<div class="flex flex-col w-full max-w-xl px-5">
	<label for="search">Search</label>
	<input
		id="search"
		name="search"
		placeholder="type to search"
		bind:value={query}
		on:keyup={fetchQuery}
	/>

	{#if result != undefined}
		{#await promise}
			<Loading />
		{:then data}
			<div class="flex flex-col gap-5">
				<VirtualList items={result} let:item>
					<SearchResult searchResult={item} />
				</VirtualList>
			</div>
		{/await}
	{/if}
</div>
