<script lang="ts">
    export let link:string;
    export let name:string;
</script>

<div class="px-4 hover:bg-accent-color-lighter">
    <a href="{link}">
        <div class="flex flex-row">
            <div class="h-10 w-10 py-2 stroke-white stroke-[1.5]">
                <slot/>
            </div>
            <div class="py-5 pl-1 font-light text-sm text-white uppercase">
                {name}
            </div>
        </div>
    </a>
</div>