<script lang="ts">
	import Logs from '$lib/components/settings/logs.svelte';
	import SettingsCard from '$lib/components/settings/settingsCard.svelte';
	import UserManagement from '$lib/components/settings/userManagement.svelte';
</script>

<div class="flex flex-col gap-5">
	<SettingsCard header="User management">
		<UserManagement />
	</SettingsCard>
	<SettingsCard header="Logs">
		<Logs />
	</SettingsCard>
</div>
