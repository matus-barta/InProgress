<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../../app.css';

	import type { PageData } from './$types';
	export let data: PageData;

	onMount(() => {
		console.log(`Redirect: ${data.redirect}`);
		if (data.redirect.startsWith('/error') || data.redirect.startsWith('/dashboard')) {
			console.log(`Redirect: ${data.redirect}`);
			goto(data.redirect);
		}
	});
</script>

<svelte:head>
	<title>InProgress - Login page</title>
</svelte:head>

<div
	data-sveltekit-preload-data="off"
	class="flex flex-col items-center w-screen h-screen px-5 pt-10 gap-10 md:pt-20"
>
	<img src="logo.svg" alt="logo" class="w-80" />
	<a href={data.redirect} class="max-w-lg button">
		<div
			class="flex flex-row justify-center items-center w-full h-full gap-2 hover:bg-accent-2-color-lighter "
		>
			<p>Please login with Microsoft account</p>
			<img class="w-4" src="ms-logo.svg" alt="Microsoft logo" />
		</div>
	</a>
</div>

<style>
	.button {
		@apply bg-accent-2-color w-full h-10 tracking-tighter rounded-lg border-2 border-accent-2-color-lighter uppercase font-light text-sm my-2;
	}
</style>
