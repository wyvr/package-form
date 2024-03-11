<script>
    wyvr: {
        render: 'hydrate';
    }

    import { set_focus } from '@src/form/Base.js';

    /**
     * <Date id={'id'} bind:value={value} required={false} disabled={false} focus={false} min={undefined} max={undefined} readonly={false}>Label</Date>
     */

    export let id = null;
    export let name = null;
    export let value = null;
    export let required = false;
    export let disabled = false;
    export let focus = false;
    export let placeholder = null;
    export let min = null;
    export let max = null;
    export let readonly = false;

    let input;
    let internal_value;

    $: get_name = name ? name : id;
    $: set_focus(focus, input);
    $: update_value(value);
    function update_value() {
        if (value instanceof Date) {
            internal_value = value.toISOString().slice(0, 10);
            return;
        }
        internal_value = value.slice(0, 10);
    }
</script>

<div class="base">
    <input
        type="date"
        name={get_name}
        {id}
        {min}
        {max}
        {required}
        {disabled}
        bind:value={internal_value}
        bind:this={input}
        {placeholder}
        {readonly}
        on:change={() => {
            value = internal_value;
        }}
    />

    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>

<style>
    @import '@src/form/_base.css';
    @import '@src/form/_input.css';
    @import '@src/form/_date.css';
</style>
