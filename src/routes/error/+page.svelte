<script lang="ts">
    import "../../app.css";
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<style>
  .button {
	  @apply bg-accent-2-color w-full h-10 tracking-tighter rounded-lg border-2 border-accent-2-color-lighter uppercase font-light text-sm my-2;
  }
</style>

<div data-sveltekit-preload-data="off" class="flex flex-col items-center w-screen h-screen px-5 pt-10 gap-10 md:pt-20">
    <img src="logo.svg" alt="logo" class="w-80"/>
    <p>{data.errorMessage}</p>
    <a href="/login" class="max-w-lg button">
        <div class="flex flex-row justify-center items-center w-full h-full gap-2 hover:bg-accent-2-color-lighter ">
            <p>Try Again</p>
        </div>
    </a>
</div>