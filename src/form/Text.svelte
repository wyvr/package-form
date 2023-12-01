<script>
    wyvr: {
        render: 'hydrate';
    }

    import { set_focus } from '@src/form/Base.js';

    /**
     * <Text id={'id'} bind:value={value} required={false} multiline={false} disabled={false} focus={false}>Label</Text>
     */

    export let id = null;
    export let name = null;
    export let value = null;
    export let required = false;
    export let multiline = false;
    export let disabled = false;
    export let focus = false;
    export let placeholder = null;

    let input;

    $: set_focus(focus, input);

    $: get_name = name ? name : id;
</script>

<div class="base">
    {#if multiline}
        <textarea name={get_name} {id} {required} {disabled} bind:value bind:this={input} {placeholder} />
    {:else}
        <input name={get_name} {id} {required} {disabled} bind:value bind:this={input} {placeholder} />
    {/if}
    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>

<style>
    @import '@src/form/_base.css';
    @import '@src/form/_input.css';
    @import '@src/form/_textarea.css';
</style>
