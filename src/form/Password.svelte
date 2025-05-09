<script>
wyvr: {
    render: 'hydrate';
}

import { onMount } from 'svelte';
import { set_focus } from '@src/form/Base.js';

/**
 * <Password id={'id'} bind:value={value} required={false} disabled={false} reveal={true} focus={false} readonly={false}>Label</Password>
 */

export let id = null;
export let name = null;
export let value = null;
export let required = false;
export let disabled = false;
export let reveal = true;
export let focus = false;
export let readonly = false;

let revealed = false;
let pwd;

function show() {
    revealed = true;
}
function hide() {
    revealed = false;
    pwd.focus();
}

$: get_name = name ? name : id;
$: set_focus(focus, pwd);

onMount(() => {});
</script>

<div class="base">
    {#if revealed}
        <input name={get_name} {id} {required} {disabled} {readonly} type="text" bind:value bind:this={pwd} />
    {:else}
        <input name={get_name} {id} {required} {disabled} {readonly} type="password" bind:value bind:this={pwd} />
    {/if}
    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
    {#if reveal}
        <button type="button" class="revealer" on:mousedown={show} on:mouseup={hide}>
            {#if $$slots.reveal}
                <slot name="reveal" {revealed} />
            {:else if revealed}
                hide
            {:else}
                show
            {/if}
        </button>
    {/if}
</div>

<style>
    @import '@src/form/_base.css';
    @import '@src/form/_input.css';
    @import '@src/form/_revealer.css';
</style>
