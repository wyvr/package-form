<script>
    /**
     * @Warning: This component is not finished yet.
    */

    wyvr: {
        render: 'hydrate';
    }

    import { onMount, createEventDispatcher } from 'svelte';
    import { __ } from '@wyvr/generator';
    import debounce from '@src/form/debounce';
    import throttle from '@src/form/throttle';
    import { to_result, round, value_to_offset, offset_to_value, limit } from '@src/form/_slider';

    /**
     * <Slider id={'id'} bind:value={value} required={false} multiline={false} disabled={false}>Label</Slider>
     */

    const dispatch = createEventDispatcher();

    export let id = null;
    export let name = null;
    export let value = null;
    export let required = false;
    export let disabled = false;
    export let min = 0;
    export let max = 100;
    export let step = 1;
    export let from = 0;
    export let to = 100;

    let internal_value = [];
    let slider;
    let canvas;
    let canvas_x = 0;
    let canvas_width = 0;
    let handle_width = 0;
    let dragging_handle;
    let over_handle = false;
    let handles = [];
    let range = [];
    let update_debounced = () => {};
    let render_throttled = () => {};
    let render_debounced = () => {};

    let internal_from;
    let internal_to;

    let is_touching = false;
    let touch_x = 0;

    $: get_name = name ? name : id;
    $: decimals = (step + '').split('.').length > 0 ? (step + '').split('.')[1].length : 0;
    // $: internal_from = round(from, decimals);
    // $: internal_to = round(to, decimals);
    $: internal_min = Math.floor(isNaN(min) ? 0 : min);
    $: internal_max = Math.ceil(isNaN(max) ? 0 : max);
    $: {
        update_debounced(from, to);
    }
    // $: {
    //     console.log(internal_value)
    // }

    onMount(() => {
        canvas.setAttribute('draggable', false);
        canvas.addEventListener('mousemove', drag);
        canvas.addEventListener('mousedown', drag_start);
        canvas.addEventListener('mouseup', drag_end);
        canvas.addEventListener('mouseout', drag_end);

        // canvas.addEventListener('touchstart', touch_start);
        // canvas.addEventListener('touchend', touch_end);
        // canvas.addEventListener('touchcancel', touch_end);
        // canvas.addEventListener('touchmove', touch);

        update_debounced = debounce((from, to) => {
            internal_from = round(from, decimals);
            internal_to = round(to, decimals);
            update();
        });

        render_throttled = throttle(() => {
            recalculate_elements();
            recalculate_bar();
            recalculate_handles();
        }, 250);

        render_debounced = debounce(() => {
            recalculate_elements();
            recalculate_bar();
            recalculate_handles();
        });

        // delay it so that every onmount is ready
        setTimeout(() => {
            recalculate_elements();
            recalculate_bar();
            recalculate_handles(from, to);
        }, 50);

        window.addEventListener('resize', () => {
            render_throttled();
            render_debounced();
        });
    });

    function update() {
        const result = to_result(internal_from, internal_to);
        dispatch('input', result);
        value = result;
        recalculate_bar();
        recalculate_handles();
    }
    function recalculate_elements() {
        // get the sizes of some elements
        const canvas_rect = canvas.getBoundingClientRect();
        canvas_x = canvas_rect.x;
        canvas_width = canvas_rect.width;
        if (Array.isArray(handles) && handles.length > 0) {
            const handle_rect = handles[0].getBoundingClientRect();
            handle_width = handle_rect.width;
        }
    }
    function recalculate_bar(optional_from, optional_to) {
        if (isNaN(optional_from)) {
            optional_from = internal_from;
        }
        if (isNaN(optional_to)) {
            optional_to = internal_to;
        }
        // console.warn('from/to', optional_from, optional_to);
        // console.warn('min/max', min, max);
        // console.warn('widths', canvas_width, handle_width);
        // console.warn('--slider-bar-offset', value_to_offset(optional_from, min, max, canvas_width, handle_width));
        slider.style.setProperty('--slider-bar-offset', `${value_to_offset(optional_from, min, max, canvas_width, handle_width)}px`);
        const scale = limit((optional_to - optional_from) / (max - min), 0, 1);
        // console.warn('--slider-bar-scale', scale);
        slider.style.setProperty('--slider-bar-scale', scale);
    }

    function recalculate_handles(optional_from, optional_to) {
        if (Array.isArray(handles) && handles.length > 0) {
            if (isNaN(optional_from)) {
                optional_from = internal_from;
            }
            if (isNaN(optional_to)) {
                optional_to = internal_to;
            }
            set_handle_to_value(handles[0], optional_from);
            if (handles[1]) {
                set_handle_to_value(handles[1], optional_to);
            }
        }
    }

    function set_handle_to_value(handle, val) {
        set_handle_to_offset(handle, value_to_offset(val, min, max, canvas_width, handle_width), val);
    }
    function set_handle_to_offset(handle, offset, val) {
        if (!handle) {
            return;
        }
        handle.style.setProperty('--slider-handle-offset', `${offset}px`);
        if (!isNaN(val)) {
            console.log(val);
            handle.setAttribute('data-value', round(val, decimals));
        }
    }

    function dragable(element) {
        handles.push(element);
    }
    function drag_start(event) {
        drag_reset();
        if (!over_handle) {
            return;
        }
        dragging_handle = over_handle;
        if (dragging_handle) {
            dragging_handle.classList.add('dragging');
        }
    }
    function drag_end() {
        drag_reset();
    }
    function touch_start(event) {
        // drag_reset();
        is_touching = true;
        // drag(event);
        // if (!over_handle) {
        //     return;
        // }
        // dragging_handle = over_handle;
        // if (dragging_handle) {
        //     dragging_handle.classList.add('dragging');
        // }
    }
    function touch(e) {
        // drag(event);
        if (is_touching) {
            let x = 0;
            // @see https://stackoverflow.com/questions/41993176/determine-touch-position-on-tablets-with-javascript/61732450#61732450
            if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
                var evt = typeof e.originalEvent === 'undefined' ? e : e.originalEvent;
                var touch = evt.touches[0] || evt.changedTouches[0];
                x = touch.pageX;
            } else if (
                e.type == 'mousedown' ||
                e.type == 'mouseup' ||
                e.type == 'mousemove' ||
                e.type == 'mouseover' ||
                e.type == 'mouseout' ||
                e.type == 'mouseenter' ||
                e.type == 'mouseleave'
            ) {
                x = e.clientX;
            }
            touch_x = canvas_x + limit(x - canvas_x, 0, canvas_width);
            e.pageX = touch_x;
            drag(e);
        }
    }
    function touch_end() {
        is_touching = false;
        // drag_reset();
    }
    function drag_reset() {
        if (dragging_handle) {
            dragging_handle = null;
        }
        handles.forEach((handle) => handle.classList.remove('dragging'));
    }
    function drag(e) {
        if (e == null || e.target == null) {
            return;
        }
        const rect = e.target.getBoundingClientRect();

        let correction = 0;
        const width = canvas_width - handle_width;
        if (dragging_handle) {
            correction = handle_width / 2;
        }
        const x = Math.max(0, Math.min(canvas_width, Math.round(e.pageX - rect.x - correction)));

        if (dragging_handle) {
            set_handle_to_offset(dragging_handle, x, offset_to_value(x, min, max, canvas_width, handle_width));
        }

        let temp_range = [];
        let temp_handle = null;
        let ordered_handles = [];
        handles.forEach((handle) => {
            const cur_handle_rect = handle.getBoundingClientRect();
            const left = cur_handle_rect.x - canvas_x;
            // check if the cursor is over the handle
            if (x >= left && x <= left + cur_handle_rect.width) {
                temp_handle = handle;
            }
            if (dragging_handle) {
                temp_range.push(left);
                ordered_handles.push({ x, handle });
            }
        });
        temp_range.sort((a, b) => a - b);
        if (dragging_handle) {
            const value_range = max - min;
            range = temp_range.map((left) => {
                return value_range * (left / width) + min;
            });
            update_debounced(range[0], range[range.length - 1]);
            recalculate_bar(range[0], range[range.length - 1]);
        }
        over_handle = temp_handle;
        if (ordered_handles.length > 0) {
            ordered_handles.sort((a, b) => a.x - b.x);
        }
    }

    function get_handle_info_from_x(x, width) {
        let temp_range = [];
        let temp_handle = null;
        let ordered_handles = [];
        handles.forEach((handle) => {
            const cur_handle_rect = handle.getBoundingClientRect();
            const left = cur_handle_rect.x - canvas_x;
            // check if the cursor is over the handle
            if (x >= left && x <= left + cur_handle_rect.width) {
                temp_handle = handle;
            }

            temp_range.push(left);
            ordered_handles.push({ x, handle });
        });
        const value_range = max - min;
        temp_range = temp_range
            .sort((a, b) => a - b)
            .map((left) => {
                return value_range * (left / width) + min;
            });
        if (ordered_handles.length > 0) {
            ordered_handles.sort((a, b) => a.x - b.x);
        }
        over_handle = temp_handle;
        return {
            over: temp_handle,
            ordered: ordered_handles,
            range,
        };
    }
    function is_handle_dragged(handle) {
        if (!handle) {
            return false;
        }
        return handle == dragging_handle;
    }

    let handle1;
    let handle2;

    onMount(() => {
        dragable(handle1);
        dragable(handle2);
    });
</script>

<div class="base">
    <div class="input">
        <div class="item">
            <label for="{id}_from">{__('form.from')}</label>
            <input type="number" id="{id}_from" bind:value={internal_from} min={internal_min} max={internal_max} {step} {required} {disabled} on:change={() => update(from, to)} />
        </div>
        <div class="item">
            <label for="{id}_to">{__('form.to')}</label>
            <input type="number" id="{id}_to" bind:value={internal_to} min={internal_min} max={internal_max} {step} {required} {disabled} on:change={() => update(from, to)} />
        </div>
    </div>
    <!-- <div>{JSON.stringify(range, null, 4)}</div> -->
    <div
        class="slider"
        class:dragging={!!dragging_handle}
        class:over-handle={!!over_handle}
        bind:this={slider}
        aria-hidden="true"
        style="--slider-bar-offset: 0; --slider-bar-scale: 1;"
    >
        <div class="canvas" bind:this={canvas}>
            <div class="bar"></div>
            <div class="handle" bind:this={handle1}><i class="ri-menu-line"></i></div>
            <div class="handle" bind:this={handle2}><i class="ri-menu-line"></i></div>
        </div>
    </div>
    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>

<style>
    @import '@src/form/_base.css';
    @import '@src/form/_input.css';
    @import '@src/form/_slider.css';
    @import '@src/form/_slider-handle.css';

    .input {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .input .item {
        width: calc(50% - (var(--size) / 4));
    }
</style>
