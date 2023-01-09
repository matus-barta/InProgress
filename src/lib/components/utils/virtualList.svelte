<script lang="ts">
	export let items: any;
</script>

{#key items}
	{#each items as item}
		<slot {item} />
	{/each}
{/key}
