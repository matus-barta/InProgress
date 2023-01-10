<script lang="ts">
	import type { LogSchema } from '$lib/schemas/log.schema';
	import { onMount } from 'svelte';
	import Loading from '../utils/loading.svelte';
	import VirtualList from '../utils/virtualList.svelte';
	import Log from './log.svelte';

	let promise: Promise<Response | void>;
	let logs: LogSchema[];

	let limit: string;
	let level: string;

	let url = `/api/admin/log?limit=10`;

	onMount(() => {
		loadData();
	});

	function loadData() {
		urlBuilder();
		promise = fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				logs = data;
			});
	}

	function urlBuilder() {
		url = `/api/admin/log?limit=${limit}`;
		if (level != 'None') url = `${url}&level=${level}`;

		console.log(`URL builder: ${url}`);
	}
</script>

<div class="flex flex-row justify-evenly gap-5">
	<div class="w-full">
		<label for="log level">Filter by Log level</label>
		<select bind:value={level} name="log level" on:change={loadData}>
			<option>None</option>
			<option>INFO</option>
			<option>WARN</option>
			<option>ERROR</option>
		</select>
	</div>

	<div class="w-full">
		<label for="limit">Limit number of results</label>
		<select bind:value={limit} name="limit" on:change={loadData}>
			<option>50</option>
			<option>100</option>
			<option>500</option>
			<option>All</option>
		</select>
	</div>
</div>

{#if promise != undefined}
	{#await promise}
		<Loading />
	{:then data}
		<div class="table w-full">
			<div class="table-header-group font-semibold">
				<div class="table-cell text-center">CreatedAt</div>
				<div class="table-cell text-center">Level</div>
				<div class="table-cell text-center">Where</div>
				<div class="table-cell text-center">Message</div>
			</div>
			<div class="table-row-group">
				<VirtualList bind:items={logs} let:item>
					<Log logEntry={item} />
				</VirtualList>
			</div>
		</div>
	{/await}
{/if}

<style>
	select {
		@apply w-full;
	}
</style>
