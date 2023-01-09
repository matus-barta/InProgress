<script lang="ts">
	import Loading from '$lib/components/utils/loading.svelte';
	import User from '$lib/components/settings/user.svelte';
	import VirtualList from '$lib/components/utils/virtualList.svelte';
	import type { UserSchema } from '$lib/schemas/user.schema';
	import { onMount } from 'svelte';

	let user: UserSchema;
	let allUser: UserSchema[];

	onMount(() => {
		loadAllUsers();
	});

	let addUser = false;
	let valid = false;

	let createUserPromise: Promise<void | Response>;
	let loadUsersPromise: Promise<void | Response>;
	let loadingData = false;

	function loadAllUsers() {
		loadUsersPromise = fetch('/api/admin/user').then((res) => {
			loadingData = false;
			return res.json().then((data) => {
				allUser = data as UserSchema[];
			});
		});
	}

	function createUser() {
		createUserPromise = fetch(`/api/admin/user`, {
			method: 'PUT',
			body: JSON.stringify(user)
		}).then(async () => {
			loadingData = true;
			await loadAllUsers();
		});
	}

	function resetVars() {
		valid = false;
		addUser = false;
	}
</script>

{#if loadUsersPromise != undefined}
	{#await loadUsersPromise}
		<Loading />
	{:then data}
		<div class="table w-fit">
			<div class="table-header-group font-semibold">
				<div class="table-cell text-center">Name</div>
				<div class="table-cell text-center">Email</div>
				<div class="table-cell text-center">Last Access</div>
				<div class="table-cell text-center">Last Login</div>
				<div class="table-cell text-center px-2">Admin</div>
				<div class="table-cell text-center px-2">Allowed</div>
				<div class="table-cell text-center px-2">Reset Session</div>
			</div>
			<div class="table-row-group">
				<VirtualList bind:items={allUser} let:item>
					<User user={item} />
				</VirtualList>
				{#if addUser}
					<User
						bind:user
						addUser
						on:valid={() => {
							valid = true;
						}}
						on:invalid={() => {
							valid = false;
						}}
					/>
				{/if}
			</div>
		</div>
	{/await}
{/if}
<div class="flex flex-row gap-5 justify-start">
	<button
		class="w-36 p-1"
		on:click={() => {
			user = { Username: '', Allowed: false, Admin: false };
			addUser = true;
		}}>Add User</button
	>
	{#if loadingData}
		{#await createUserPromise}
			<div
				class="w-36 h-fit p-1 border-2 rounded-lg shadow-lg my-2 border-dark-color-even-more-lighter bg-dark-color-more-lighter"
			>
				<Loading size={25} padding={false} />
			</div>
		{/await}
	{:else}
		<button
			disabled={!valid}
			class="w-36 p-1"
			on:click={() => {
				createUser();
				resetVars();
			}}>Save changes</button
		>
	{/if}
</div>
