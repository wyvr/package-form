<div class="base">
    <input type="email" name={get_name} {id} {required} {disabled} bind:value bind:this={input} {placeholder} />

    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>
