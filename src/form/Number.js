wyvr: {
    render: 'hydrate';
}

import { onMount } from 'svelte';
import { set_focus } from '@src/form/Base.js';

/**
 * <Number id={'id'} bind:value={value} required={false} disabled={false} focus={false} min={1} max={10} step={1}>Label</Number>
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

let input;

$: set_focus(focus, input);

$: get_name = name ? name : id;

onMount(() => {});
