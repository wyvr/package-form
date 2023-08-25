wyvr: {
    render: 'hydrate';
}

import { onMount, createEventDispatcher } from 'svelte';
import { set_focus } from '@src/form/Base.js';

/**
 * <Slider id={'id'} bind:value={value} required={false} multiline={false} disabled={false} focus={false}>Label</Slider>
 */

const dispatch = createEventDispatcher();

export let id = null;
export let value = null;
export let required = false;
export let disabled = false;
export let focus = false;
export let min = 0;
export let max = 100;
export let step = 1;
export let range = false;
export let order = false;
export let from = 0;
export let to = 100;

let internal_value = [];

// $: {
//     console.log(internal_value)
// }

onMount(() => {});

function update() {
    console.log(from, to);
    dispatch('input', { from, to });
}
