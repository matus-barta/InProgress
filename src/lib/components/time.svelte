<script lang="ts">
	import dayjs from "dayjs";


    export let time: Date;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const timeString = dayjs(time).format('D. MMM H:mm');

</script>


<div class="flex flex-row max-w-fit">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p class="pl-1 tracking-tighter">{timeString}</p>
</div>