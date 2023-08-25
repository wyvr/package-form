wyvr: {
    render: 'hydrate';
}

import { onMount } from 'svelte';
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

onMount(() => {});
