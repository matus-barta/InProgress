<script lang="ts">
	import { redirect } from "@sveltejs/kit";
  import "../../app.css";

  const tenantId = '9d472fb9-c94f-4904-affe-efff0d19c936';

	const loginUrl = `https://login.microsoftonline.com/${tenantId}/oauthv2.0/authorize`;
</script>

<svelte:head>
  <title>
    InProgress - Login page
  </title>
</svelte:head>

<style>
  .button {
	  @apply bg-accent-2-color w-full h-10 tracking-tighter rounded-lg border-2 border-accent-2-color-lighter uppercase font-light text-sm my-2;
  }
</style>

<div class="flex flex-col items-center w-screen h-screen px-5 pt-10 gap-10 md:pt-20">
  <img src="logo.svg" alt="logo" class="w-80"/>
  <a href={loginUrl} class="max-w-lg button">
    <div class="flex flex-row justify-center items-center w-full h-full gap-2 hover:bg-accent-2-color-lighter ">
        <p>Please login with Microsoft account</p>
        <img class="w-4" src="ms-logo.svg" alt="Microsoft logo"/>
    </div>
  </a>
</div>