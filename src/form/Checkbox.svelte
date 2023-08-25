<div class="base">
    <input type="checkbox" name={get_name} {id} {required} {disabled} bind:checked={value} bind:this={input} />
    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>
