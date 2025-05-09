<script>
wyvr: {
    render: 'hydrate';
}

import { onMount, createEventDispatcher } from 'svelte';

/**
 * <Slider id={'id'} bind:value={value} required={false} multiline={false} disabled={false} focus={false} readonly={false}>Label</Slider>
 */

const dispatch = createEventDispatcher();

export let id = null;
export let name = null;
export let min = 0;
export let max = 100;
export let step = 1;
export let from = 0;
export let to = 100;
export let readonly = false;

$: get_name = name ? name : id;

onMount(() => {});

function update() {
    dispatch('input', { from, to });
}
</script>

<div class="base">
    <!-- <Slider bind:value name={id} on:input={(e)=>{console.log(e)}} {min} {max} {step} {range} {order} /> -->
    <div>
        from {from} to {to}
        <input type="range" name="{get_name}_from" id="{id}_from" bind:value={from} {min} {max} {step} {readonly} on:change={() => update(from, to)} />
        -
        <input type="range" name="{get_name}_from" id="{id}_to" bind:value={to} {min} {max} {step} {readonly} on:change={() => update(from, to)} />
    </div>
    {#if $$slots.default}
        <label for="{id}_from"><slot /></label>
    {/if}
</div>

<style>
    @import '@src/form/_base.css';
    @import '@src/form/_input.css';
</style>
