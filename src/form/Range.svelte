<script>
    let handle1;
    let handle2;

    onMount(()=>{
        dragable(handle1)
        dragable(handle2)
    })
</script>

<div class="base">
    <div class="input">
        <div class="item">
            <label for={id}_from>{__('form.from')}</label>
            <input type="number" id="{id}_from" bind:value={internal_from} min={internal_min} max={internal_max} {step} {required} {disabled} on:change={() => update(from, to)} />
        </div>
        <div class="item">
            <label for={id}_to>{__('form.to')}</label>
            <input type="number" id="{id}_to" bind:value={internal_to} min={internal_min} max={internal_max} {step} {required} {disabled} on:change={() => update(from, to)} />
        </div>
    </div>
    <!-- <div>{JSON.stringify(range, null, 4)}</div> -->
    <div class="slider" class:dragging={!!dragging_handle} class:over-handle={!!over_handle} bind:this={slider} aria-hidden="true" style="--slider-bar-offset: 0; --slider-bar-scale: 1;">
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
