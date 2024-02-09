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
        <div class="revealer" on:mousedown={show} on:mouseup={hide}>
            {#if revealed}
                ✘
            {:else}
                👁
            {/if}
        </div>
    {/if}
</div>

<style>
    @import '@src/form/_base.css';
    @import '@src/form/_input.css';

    .revealer {
        position: absolute;
        right: 0;
        bottom: 0;
        width: calc(var(--size) * 2.5);
        height: calc(var(--size) * 2.5);
        padding: var(--size);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .revealer:after {
        position: absolute;
        opacity: 0;
        content: '';
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(closest-side, var(--color-primary), transparent);
        transition: opacity 0.1s linear;
        z-index: 1;
    }
    .revealer:hover::after,
    .revealer:active::after {
        opacity: 0.5;
    }
</style>
