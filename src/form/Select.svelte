<script>
wyvr: {
    render: 'hydrate';
}

import { createEventDispatcher } from 'svelte';
import { set_focus } from '@src/form/Base.js';

/**
 * <Select id={'id'} bind:value={value} options={[{ name:'all', value:'*' }]} required={false} multiline={false} disabled={false} focus={false}>Label</Select>
 */

const dispatch = createEventDispatcher();

export let id = null;
export let name = null;
export let value = null;
export let options = null;
export let required = false;
export let disabled = false;
export let focus = false;

let input;

$: get_name = name ? name : id;
$: set_focus(focus, input);
</script>

<div class="base">
    <div class="select">
        <select name={get_name} {id} {required} {disabled} bind:value bind:this={input} on:change={() => dispatch('input', value)}>
            {#each options as option}
                <option value={option.value}>{option.name}</option>
            {/each}
        </select>
    </div>
    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>

<style>
    @import '@src/form/_base.css';
    @import '@src/form/_select.css';
</style>
