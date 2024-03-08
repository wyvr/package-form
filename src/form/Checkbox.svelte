<script>
    wyvr: {
        render: 'hydrate';
    }

    import { set_focus } from '@src/form/Base.js';
    import { createEventDispatcher } from 'svelte';

    /**
     * <Checkbox id={'id'} bind:value={value} required={false} disabled={false} focus={false}>Label</Checkbox>
     */

    export let id = null;
    export let name = null;
    export let value = false;
    export let required = false;
    export let disabled = false;
    export let focus = false;
    export let data = undefined;

    let input;

    const dispatch = createEventDispatcher();

    $: get_name = name ? name : id;
    $: set_focus(focus, input);
</script>

<div class="base">
    <input
        type="checkbox"
        name={get_name}
        {id}
        {required}
        {disabled}
        bind:checked={value}
        bind:this={input}
        on:change={(e) => {
            dispatch('change', { data, value });
        }}
    />
    <label for={id}><slot /></label>
</div>

<style>
    @import '@src/form/_base.css';
    @import '@src/form/_checkbox.css';
</style>
