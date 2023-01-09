<script lang="ts">
	import { UserSchema } from '$lib/schemas/user.schema';
	import dayjs from 'dayjs';
	import Checkbox from '$lib/components/utils/checkbox.svelte';
	import { createEventDispatcher } from 'svelte';

	export let user: UserSchema;
	export let addUser = false;

	const dispatch = createEventDispatcher();
	const valid = () => dispatch('valid');
	const invalid = () => dispatch('invalid');

	const emptyField = 'N/A';
	const formatString = 'D.M.YYYY - H:mm';

	function checkEmptyDate(date: Date | undefined) {
		if (date == undefined) return emptyField;
		else return dayjs(date).format(formatString);
	}
	function checkEmptyString(text: string | undefined) {
		if (text == undefined) return emptyField;
		else return text;
	}

	function validate() {
		try {
			UserSchema.parse(user);
			valid();
		} catch (e) {
			invalid();
		}
	}

	function updateUser() {
		if (!addUser) {
			fetch(`/api/admin/user`, {
				method: 'POST',
				body: JSON.stringify(user)
			});
		}
	}

	function resetSessionId() {
		user.SessionId = '';
		updateUser();
	}
</script>

<div class="table-row text-sm odd:bg-dark-color-more-lighter">
	<div class="table-cell py-1 px-2 text-center align-middle">{checkEmptyString(user.Name)}</div>
	{#if addUser}
		<input
			type="email"
			placeholder="email@example.com"
			class="table-cell py-1 px-2 text-left align-middle"
			bind:value={user.Username}
			on:keyup={validate}
		/>
	{:else}
		<div class="table-cell py-1 px-2 text-center align-middle">{user.Username}</div>
	{/if}
	<div class="table-cell py-1 px-2 text-center align-middle">
		{checkEmptyDate(user.LastAccessAt)}
	</div>
	<div class="table-cell py-1 px-2 text-center align-middle">
		{checkEmptyDate(user.LastLoginAt)}
	</div>
	<Checkbox bind:checked={user.Admin} on:check={updateUser} />
	<Checkbox bind:checked={user.Allowed} on:check={updateUser} />
	<div class="table-cell py-1 px-2 text-center align-middle">
		<button on:click={resetSessionId}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="inherit"
				stroke="inherit"
				class="w-4 h-4 stroke-2 stroke-white p-[1px]"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
				/>
			</svg>
		</button>
	</div>
</div>

<style>
	input {
		@apply m-0 border-none w-full rounded-none bg-dark-color-even-more-lighter;
	}
	button {
		@apply rounded-[4px] border p-0 w-fit m-0;
	}
</style>
