wyvr: {
    render: 'hydrate';
}

import { onMount, createEventDispatcher } from 'svelte';
import { set_focus } from '@src/form/Base.js';

/**
 * <Select id={'id'} bind:value={value} options={[{ name:'all', value:'*' }]} required={false} multiline={false} disabled={false} focus={false}>Label</Select>
 */

 const dispatch = createEventDispatcher();

export let id = null;
export let value = null;
export let options = null;
export let required = false;
export let disabled = false;
export let focus = false;

let input;

$: set_focus(focus, input)

onMount(() => {});
