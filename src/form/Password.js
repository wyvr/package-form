wyvr: {
    render: 'hydrate';
}

import { onMount } from 'svelte';
import { set_focus } from '@src/form/Base.js';

/**
 * <Password id={'id'} bind:value={value} required={false} disabled={false} reveal={true} focus={false}>Label</Password>
 */

export let id = null;
export let value = null;
export let required = false;
export let disabled = false;
export let reveal = true;
export let focus = false;

let revealed = false;
let pwd;

function show() {
    revealed = true;
}
function hide() {
    revealed = false;
    pwd.focus();
}

$: set_focus(focus, pwd);

onMount(() => {});
