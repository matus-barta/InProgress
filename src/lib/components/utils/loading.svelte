<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	export let size = 60;
	export let padding = true;
</script>

{#if padding}
	<div class="w-full flex items-center justify-center">
		<Circle {size} color="#f1691c" unit="px" duration="1s" />
	</div>
{:else}
	<div class="w-full flex items-center justify-center">
		<Circle {size} color="#f1691c" unit="px" duration="1s" />
	</div>
{/if}
