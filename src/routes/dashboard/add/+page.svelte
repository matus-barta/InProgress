<script lang="ts">
	import DeviceForm from "$lib/components/deviceForm.svelte";
    import type { CheckSerialNumber } from '$lib/schemas/device.schema'

    let device: CheckSerialNumber = {Id: 0, SerialNumber: ''};

    let unique = {};

    function reloadData(){
        unique = {};
    }
</script>
<div class="flex flex-col w-full">
    {#key unique}
        <DeviceForm data={device} on:goBack={reloadData}/>
    {/key}
</div>