<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let checked = false;

	const dispatch = createEventDispatcher();
	const check = () => dispatch('check');
</script>

<div class="table-cell align-middle">
	<div class="flex flex-col items-center">
		{#if checked}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<svg
				on:click={() => {
					checked = !checked;
					check();
				}}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="inherit"
				stroke="inherit"
				class="checkbox bg-accent-color"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
			</svg>
		{:else}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<svg
				on:click={() => {
					checked = !checked;
					check();
				}}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="inherit"
				stroke="inherit"
				class="checkbox"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		{/if}
	</div>
</div>

<style>
	.checkbox {
		@apply w-4 h-4 stroke-2 stroke-white rounded-[4px] border border-dark-color-2-even-more-lighter;
	}
	.checkbox:hover {
		@apply bg-accent-color-lighter;
	}
</style>
