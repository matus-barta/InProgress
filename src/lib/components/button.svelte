<script lang="ts">
	export let link: string;
	export let name: string;
	export let isUser = false;
</script>

<div class="px-2 md:px-3 h-full lg:px-4 hover:bg-accent-color-lighter stroke-white text-white">
	<a href={link}>
		<div class="flex flex-row h-full items-center">
			{#if isUser}
				<div class="pr-1 font-light text-sm text-inherit uppercase">
					{name}
				</div>
				<div class="h-10 w-10 stroke-inherit stroke-[1.5]">
					<slot />
				</div>
			{:else}
				<div class="h-10 w-10 stroke-inherit stroke-[1.5]">
					<slot />
				</div>
				<div class="pl-1 font-light text-sm text-inherit uppercase hidden md:inline-flex">
					{name}
				</div>
			{/if}
		</div>
	</a>
</div>
