<script>
    wyvr: {
        render: 'hydrate';
    }

    import { set_focus } from '@src/form/Base.js';

    /**
     * <Email id={'id'} bind:value={value} required={false} disabled={false} focus={false} readonly={false}>Label</Email>
     */

    export let id = null;
    export let name = null;
    export let value = null;
    export let required = false;
    export let disabled = false;
    export let focus = false;
    export let placeholder = null;
    export let readonly = false;

    let input;

    $: get_name = name ? name : id;
    $: set_focus(focus, input);
</script>

<div class="base">
    <input type="email" name={get_name} {id} {required} {disabled} bind:value bind:this={input} {placeholder} {readonly} />

    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>

<style>
    @import '@src/form/_base.css';
    @import '@src/form/_input.css';
</style>
