wyvr: {
    render: 'hydrate';
}

import { onMount } from 'svelte';
import { set_focus } from '@src/form/Base.js';

/**
 * <Email id={'id'} bind:value={value} required={false} disabled={false} focus={false}>Label</Email>
 */

export let id = null;
export let name = null;
export let value = null;
export let required = false;
export let disabled = false;
export let focus = false;
export let placeholder = null;

let input;

$: get_name = name ? name : id;
$: set_focus(focus, input);

onMount(() => {});
