<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex flex-col gap-5">
	<h1>User management</h1>
	{#each data.allUsers as user}
		<p>{user.Name}</p>
		<p>{user.Username}</p>
	{/each}
</div>
