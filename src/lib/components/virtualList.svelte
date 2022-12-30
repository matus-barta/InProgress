<script lang="ts">
	import type { CheckSerialNumber } from "$lib/schemas/device.schema";

    export let items: CheckSerialNumber[];
</script>

<div class="flex flex-col gap-5">
    {#each items as item}
		<slot item={item}></slot>
	{/each}
</div>