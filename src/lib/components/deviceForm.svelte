<script lang="ts">
	import type { CheckSerialNumber, ReadDeviceSchema, UpdateDevicesSchema } from "$lib/schemas/device.schema";
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    const goBack = () => dispatch('goBack');

    export let data: CheckSerialNumber;
    const empty = data.Id == 0;

    console.log(JSON.stringify(data));

    let formData: UpdateDevicesSchema;
    if (empty) formData = {
                SerialNumber: data.SerialNumber,
                Status: 'InQueue',
                User: '',
                Note: ''
            }

    let promise: Promise<void | Response>;
    let resData: ReadDeviceSchema;
    if (!empty){ //not empty SN so we load existing device
        promise = fetch(`/api/device/${data.Id}`).then((res) => res.json()).then((data) => {
            resData = data;

            formData = {
                SerialNumber: resData.SerialNumber,
                Status: resData.Status,
                User: resData.User,
                Note: resData.Note
            }
        });
    }

    let hideResult = true;
    let finalResult: Response;

    function processData(){
        try{
            promise = fetch(`/api/device`,{
                method: 'POST',
                body: JSON.stringify(formData)
                }).then((res) => finalResult = res);
            hideResult = false;
        }catch(e){
            console.log(e);
        }
    }
</script>

<div class="flex flex-col justify-center items-center gap-5 w-full p-5">
    {#await promise}
        <h2>please wait...</h2>
    {:then data} 
        {#if hideResult}
            <form on:submit|preventDefault={processData} class="flex flex-col w-full max-w-xl">
                <label for="sn">Serial Number</label>
                <input type="text" id="sn" name="sn" bind:value={formData.SerialNumber} disabled={!empty}>

                <label for="status">Status</label>
                <input type="text" id="status" name="status" value={formData.Status} disabled>

                <label for="user">User</label>
                <input type="text" id="user" name="user" bind:value={formData.User}>

                {#if !empty}
                    <label for="createdAt">Created At</label>
                    <input type="text" id="createdAt" name="createdAt" value={resData.CreatedAt} disabled>

                    <label for="updatedAt">Updated At</label>
                    <input type="text" id="updatedAt" name="updatedAt" value={resData.UpdatedAt} disabled>
                {/if}

                <label for="note">Note</label>
                <textarea id="note" name="note" rows="10" cols="30" bind:value={formData.Note}/>

                <div class="flex flex-row w-full justify-evenly">
                    <button>
                    {#if empty}
                        Create
                    {:else}
                        Update
                    {/if}
                    </button>
                    <button on:click|preventDefault={goBack}>
                        Cancel
                    </button>
                </div>
            </form>
        {:else}
            <div class="flex flex-col items-center justify-center w-full">
                <h2>
                    {#if finalResult.ok}Success!{:else}Fail 🙁{/if}
                </h2>
                <button class="max-w-sm" on:click|preventDefault={goBack}>
                    Go Scan
                </button>
            </div>
        {/if}
    {/await}
</div>
