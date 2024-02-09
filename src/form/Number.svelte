<script>
    wyvr: {
        render: 'hydrate';
    }

    import { set_focus } from '@src/form/Base.js';

    /**
     * <Number id={'id'} bind:value={value} required={false} disabled={false} focus={false} min={1} max={10} step={1} readonly={false}>Label</Number>
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
    export let step = null;
    export let readonly = false;

    let input;

    $: get_name = name ? name : id;
    $: set_focus(focus, input);
</script>

<div class="base">
    <input type="number" name={get_name} {id} {min} {max} {step} {required} {disabled} bind:value bind:this={input} {placeholder} {readonly} />

    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>

<style>
    @import '@src/form/_base.css';
    @import '@src/form/_input.css';
    @import '@src/form/_number.css';
</style>
