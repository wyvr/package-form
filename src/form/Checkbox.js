wyvr: {
    render: 'hydrate';
}

import { onMount } from 'svelte';
import { set_focus } from '@src/form/Base.js';

/**
 * <Checkbox id={'id'} bind:value={value} required={false} disabled={false} focus={false}>Label</Checkbox>
 */

export let id = null;
export let name = null;
export let value = false;
export let required = false;
export let disabled = false;
export let focus = false;

let input;

$: set_focus(focus, input);

$: get_name = name ? name : id;

onMount(() => {});
