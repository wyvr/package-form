<div class="base">
    {#if multiline}
        <textarea name={get_name} {id} {required} {disabled} bind:value bind:this={input} {placeholder} />
    {:else}
        <input name={get_name} {id} {required} {disabled} bind:value bind:this={input} {placeholder} />
    {/if}
    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>
