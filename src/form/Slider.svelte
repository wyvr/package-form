<script>
</script>

<div class="base">
    <!-- <Slider bind:value name={id} on:input={(e)=>{console.log(e)}} {min} {max} {step} {range} {order} /> -->
    <div>
        from {from} to {to}
        <input type="range" id="{id}_from" bind:value={from} {min} {max} {step} on:change={() => update(from, to)} /> -
        <input type="range" id="{id}_to" bind:value={to} {min} {max} {step} on:change={() => update(from, to)} />
    </div>
    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>
