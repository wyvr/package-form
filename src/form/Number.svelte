<div class="base">
    <input type="number" name={get_name} {id} {min} {max} {step} {required} {disabled} bind:value bind:this={input} {placeholder} />

    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>
