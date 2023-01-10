<script lang="ts">
	import type { LogSchema } from '$lib/schemas/log.schema';
	import dayjs from 'dayjs';

	export let logEntry: LogSchema;

	const formatString = 'D.M.YYYY - H:mm';
	function formatDate(date: Date) {
		return dayjs(date).format(formatString);
	}
</script>

{#if logEntry.Level == 'INFO'}
	<div class="row odd:bg-dark-color-more-lighter">
		<div class="cell">{formatDate(logEntry.CreatedAt)}</div>
		<div class="cell">{logEntry.Level}</div>
		<div class="cell">{logEntry.Where}</div>
		<div class="cell message">
			{logEntry.Message}
		</div>
	</div>
{:else if logEntry.Level == 'WARN'}
	<div class="row bg-orange-500 odd:bg-amber-500">
		<div class="cell">{formatDate(logEntry.CreatedAt)}</div>
		<div class="cell">{logEntry.Level}</div>
		<div class="cell">{logEntry.Where}</div>
		<div class="cell message">
			{logEntry.Message}
		</div>
	</div>
{:else if logEntry.Level == 'ERROR'}
	<div class="row bg-red-800 odd:bg-red-700">
		<div class="cell">{formatDate(logEntry.CreatedAt)}</div>
		<div class="cell">{logEntry.Level}</div>
		<div class="cell">{logEntry.Where}</div>
		<div class="cell message">
			{logEntry.Message}
		</div>
	</div>
{/if}

<style>
	.row {
		@apply table-row text-xs font-mono;
	}
	.message {
		@apply max-w-xs overflow-hidden;
	}
	.cell {
		@apply table-cell py-1 px-2 text-center align-middle;
	}
</style>
