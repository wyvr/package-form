<script>
wyvr: {
    render: 'hydrate';
}

import { set_focus } from '@src/form/Base.js';
import { onMount } from 'svelte';

/**
 * <Text id={'id'} bind:value={value} required={false} multiline={false} disabled={false} focus={false} readonly={false}>Label</Text>
 */

export let id = null;
export let name = null;
export let value = null;
export let required = false;
export let multiline = false;
export let disabled = false;
export let focus = false;
export let placeholder = null;
export let readonly = false;
export let autoresize = true;

let input;

$: set_focus(focus, input);

$: get_name = name ? name : id;

function adjustHeight() {
    if (autoresize && multiline && input && value !== null) {
        // Reset height to auto to get proper scrollHeight
        input.style.height = 'auto';
        
        // Get computed styles
        const style = window.getComputedStyle(input);
        const borderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        const paddingHeight = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        
        // Calculate total height needed
        const totalHeight = input.scrollHeight + borderHeight + paddingHeight;
        
        // Set the height accounting for border and padding
        input.style.height = `${totalHeight}px`;
    }
}

$: adjustHeight(value, multiline, autoresize);

onMount(() => {
    if (autoresize && multiline) {
        adjustHeight();
    }
});
</script>

<div class="base">
    {#if multiline}
        <textarea
            name={get_name}
            {id}
            {required}
            {disabled}
            bind:value
            bind:this={input}
            {placeholder}
            {readonly}
            on:input={adjustHeight}
            style={autoresize ? "overflow: hidden; resize: none;" : ""}
        />
    {:else}
        <input
            name={get_name}
            {id}
            {required}
            {disabled}
            bind:value
            bind:this={input}
            {placeholder}
            {readonly}
        />
    {/if}
    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>

<style>
    @import "@src/form/_base.css";
    @import "@src/form/_input.css";
    @import "@src/form/_textarea.css";
</style>
