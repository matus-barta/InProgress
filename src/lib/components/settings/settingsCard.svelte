<script lang="ts">
	export let header: string;
</script>

<div class="flex flex-col gap-3 bg-dark-color-lighter p-2 rounded-lg">
	<h1>{header}</h1>
	<slot />
</div>
